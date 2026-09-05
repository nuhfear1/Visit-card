import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const path = resolve(root, "n8n/gary-launch.connected.json");
const workflow = JSON.parse(await readFile(path, "utf8"));
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const outgoingTargets = (connections, source) => (connections[source]?.main || []).flat().map((edge) => edge.node);

check(workflow && !Array.isArray(workflow), "root must be one workflow object, not an array");
check(workflow.name === "GWB | Gary Launch | Connected System", "unexpected workflow name");
check(workflow.active === false, "workflow must import inactive");
check(workflow.settings?.executionOrder === "v1", "executionOrder must be v1");
check(Array.isArray(workflow.nodes) && workflow.nodes.length > 185, "inlined workflow should contain more than the modular node count");

const names = new Set();
const ids = new Set();
const incoming = new Set();
const webhookPaths = new Set();
const triggerTypes = new Set([
  "n8n-nodes-base.manualTrigger",
  "n8n-nodes-base.errorTrigger",
  "n8n-nodes-base.webhook",
  "n8n-nodes-base.scheduleTrigger",
]);

for (const node of workflow.nodes || []) {
  check(node.name && !names.has(node.name), `duplicate or missing node name: ${node.name || "unknown"}`);
  check(node.id && !ids.has(node.id), `duplicate or missing node id: ${node.id || "unknown"}`);
  names.add(node.name);
  ids.add(node.id);
  check(node.type !== "n8n-nodes-base.executeWorkflow", `${node.name}: Execute Workflow was not inlined`);
  check(node.type !== "n8n-nodes-base.executeWorkflowTrigger", `${node.name}: sub-workflow trigger remains`);
  if (node.type === "n8n-nodes-base.code") {
    try {
      new Function("$input", "$json", "$execution", "$", node.parameters?.jsCode || "");
    } catch (error) {
      failures.push(`${node.name}: invalid JavaScript: ${error.message}`);
    }
  }
  if (node.type === "n8n-nodes-base.webhook") {
    const path = node.parameters?.path;
    check(path && !webhookPaths.has(path), `${node.name}: duplicate or missing webhook path ${path || ""}`);
    webhookPaths.add(path);
  }
}

for (const [source, outputs] of Object.entries(workflow.connections || {})) {
  check(names.has(source), `unknown connection source: ${source}`);
  for (const branch of outputs.main || []) {
    for (const edge of branch) {
      check(names.has(edge.node), `${source}: unknown target ${edge.node}`);
      incoming.add(edge.node);
    }
  }
}

for (const node of workflow.nodes || []) {
  if (!triggerTypes.has(node.type) && node.type !== "n8n-nodes-base.stickyNote") {
    check(incoming.has(node.name), `${node.name}: unreachable node`);
  }
}

const serialized = JSON.stringify(workflow);
const nodeReferencePattern = /\$\(['"]([^'"]+)['"]\)/g;
for (const match of serialized.matchAll(nodeReferencePattern)) {
  check(names.has(match[1]), `expression references an unknown node: ${match[1]}`);
}
check(!serialized.includes('"n8n-nodes-base.executeWorkflow"'), "serialized workflow still contains Execute Workflow nodes");

const reachable = new Set(workflow.nodes.filter((node) => triggerTypes.has(node.type)).map((node) => node.name));
const queue = [...reachable];
while (queue.length) {
  const source = queue.shift();
  for (const target of outgoingTargets(workflow.connections, source)) {
    if (!reachable.has(target)) {
      reachable.add(target);
      queue.push(target);
    }
  }
}
for (const node of workflow.nodes || []) {
  if (node.type !== "n8n-nodes-base.stickyNote") check(reachable.has(node.name), `${node.name}: not reachable from any trigger`);
}

if (failures.length) {
  console.error(`Connected n8n workflow validation failed with ${failures.length} error(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

const triggers = workflow.nodes.filter((node) => triggerTypes.has(node.type));
console.log(`Validated one importable workflow object with ${workflow.nodes.length} nodes, ${triggers.length} trigger entries and ${webhookPaths.size} webhooks.`);
