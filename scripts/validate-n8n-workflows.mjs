import { readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const workflowDir = resolve(root, "n8n/workflows");
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const manifest = JSON.parse(await readFile(resolve(root, "n8n/manifest.json"), "utf8"));
const bundle = JSON.parse(await readFile(resolve(root, "n8n/gary-launch.bundle.json"), "utf8"));
const workflowFiles = (await readdir(workflowDir)).filter((file) => file.endsWith(".json")).sort();
const workflows = await Promise.all(workflowFiles.map(async (file) => ({
  file,
  workflow: JSON.parse(await readFile(resolve(workflowDir, file), "utf8")),
})));

check(workflows.length === 22, `Expected 22 workflow files, found ${workflows.length}`);
check(manifest.workflowCount === workflows.length, "Manifest workflow count does not match files");
check(Array.isArray(bundle) && bundle.length === workflows.length, "Bundle count does not match files");

const workflowIds = new Set();
const webhookPaths = new Set();

for (const { file, workflow } of workflows) {
  const label = `${file} (${workflow.name || "unnamed"})`;
  check(typeof workflow.id === "string" && workflow.id.length > 5, `${label}: missing workflow id`);
  check(!workflowIds.has(workflow.id), `${label}: duplicate workflow id ${workflow.id}`);
  workflowIds.add(workflow.id);
  check(workflow.active === false, `${label}: workflow must be inactive on import`);
  check(Array.isArray(workflow.nodes) && workflow.nodes.length > 1, `${label}: missing nodes`);
  check(workflow.settings?.executionOrder === "v1", `${label}: executionOrder must be v1`);

  const names = new Set();
  const nodeIds = new Set();
  const incoming = new Map();
  for (const node of workflow.nodes || []) {
    check(node.name && !names.has(node.name), `${label}: duplicate or missing node name ${node.name || ""}`);
    names.add(node.name);
    check(node.id && !nodeIds.has(node.id), `${label}: duplicate or missing node id ${node.id || ""}`);
    nodeIds.add(node.id);
    check(Array.isArray(node.position) && node.position.length === 2, `${label}: ${node.name} has invalid position`);

    if (node.type === "n8n-nodes-base.code") {
      try {
        // Syntax validation only. n8n supplies these globals at execution time.
        new Function("$input", "$json", "$execution", "$", node.parameters?.jsCode || "");
      } catch (error) {
        failures.push(`${label}: invalid JavaScript in ${node.name}: ${error.message}`);
      }
    }

    if (node.type === "n8n-nodes-base.webhook") {
      const path = node.parameters?.path;
      check(path && !webhookPaths.has(path), `${label}: duplicate or missing webhook path ${path || ""}`);
      webhookPaths.add(path);
      if (node.parameters?.authentication !== "none") {
        check(Boolean(node.credentials?.httpHeaderAuth), `${label}: authenticated webhook ${node.name} has no credential reference`);
      }
    }

    for (const credential of Object.values(node.credentials || {})) {
      check(String(credential.id || "").startsWith("REPLACE_GWB_"), `${label}: ${node.name} embeds a non-placeholder credential id`);
      check(String(credential.name || "").startsWith("GWB "), `${label}: ${node.name} uses an unexpected credential name`);
    }
  }

  for (const [source, outputs] of Object.entries(workflow.connections || {})) {
    check(names.has(source), `${label}: connection source ${source} is not a node`);
    for (const branch of outputs.main || []) {
      for (const edge of branch || []) {
        check(names.has(edge.node), `${label}: connection target ${edge.node} is not a node`);
        incoming.set(edge.node, (incoming.get(edge.node) || 0) + 1);
      }
    }
  }

  const triggerTypes = new Set([
    "n8n-nodes-base.manualTrigger",
    "n8n-nodes-base.errorTrigger",
    "n8n-nodes-base.webhook",
    "n8n-nodes-base.scheduleTrigger",
    "n8n-nodes-base.executeWorkflowTrigger",
  ]);
  for (const node of workflow.nodes || []) {
    if (!triggerTypes.has(node.type) && node.type !== "n8n-nodes-base.stickyNote") {
      check(incoming.has(node.name), `${label}: ${node.name} is unreachable`);
    }
    if (node.type === "n8n-nodes-base.executeWorkflow") {
      const targetId = node.parameters?.workflowId?.value;
      check(typeof targetId === "string", `${label}: ${node.name} has no target workflow id`);
    }
  }
}

for (const { file, workflow } of workflows) {
  for (const node of workflow.nodes || []) {
    if (node.type === "n8n-nodes-base.executeWorkflow") {
      check(workflowIds.has(node.parameters?.workflowId?.value), `${file}: ${node.name} targets an unknown workflow`);
    }
  }
}

check(new Set(bundle.map((workflow) => workflow.id)).size === workflows.length, "Bundle has duplicate workflow ids");
for (const { workflow } of workflows) {
  check(bundle.some((entry) => entry.id === workflow.id), `Bundle is missing ${workflow.id}`);
  check(manifest.importOrder.some((entry) => entry.id === workflow.id), `Manifest is missing ${workflow.id}`);
}

const serialized = JSON.stringify({ workflows: bundle, manifest });
const secretPatterns = [
  /sk-[A-Za-z0-9_-]{20,}/,
  /pat-[A-Za-z0-9_-]{20,}/,
  /Bearer\s+eyJ[A-Za-z0-9_-]+/,
  /api[_-]?key["']?\s*[:=]\s*["'][A-Za-z0-9_-]{20,}/i,
];
for (const pattern of secretPatterns) {
  check(!pattern.test(serialized), `Generated pack appears to contain a secret matching ${pattern}`);
}

if (failures.length > 0) {
  console.error(`n8n pack validation failed with ${failures.length} error(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validated ${workflows.length} workflows, ${workflows.reduce((sum, item) => sum + item.workflow.nodes.length, 0)} nodes and ${webhookPaths.size} webhook paths.`);
