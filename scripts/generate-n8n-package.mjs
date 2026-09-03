import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, rm, utimes, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, "..");
const n8nDir = resolve(root, "n8n");
const workflowDir = resolve(n8nDir, "workflows");
const buildDir = resolve(n8nDir, ".package-build");
const packagePath = resolve(n8nDir, "gary-launch.n8np");
const zipPath = resolve(n8nDir, "gary-launch-individual-workflows.zip");

const files = (await readdir(workflowDir)).filter((file) => file.endsWith(".json")).sort();
const workflows = await Promise.all(files.map(async (file) => ({
  file,
  workflow: JSON.parse(await readFile(resolve(workflowDir, file), "utf8")),
})));
const exportedAt = JSON.parse(await readFile(resolve(n8nDir, "import-order.json"), "utf8")).generatedAt;

const slugCounts = new Map();
const slugify = (name) => {
  const base = name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .trim()
    .replace(/\s+/g, "-") || "workflow";
  const count = (slugCounts.get(base) || 0) + 1;
  slugCounts.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
};

const workflowNames = new Map(workflows.map(({ workflow }) => [workflow.id, workflow.name]));
const packageEntries = workflows.map(({ workflow }) => ({
  id: workflow.id,
  name: workflow.name,
  target: `workflows/${slugify(workflow.name)}`,
}));

const credentialRequirements = new Map();
const workflowRequirements = new Map();
const nodeTypeRequirements = new Map();

const addUsage = (map, key, value, workflowId) => {
  const current = map.get(key) || { ...value, usedByWorkflows: [] };
  if (!current.usedByWorkflows.includes(workflowId)) current.usedByWorkflows.push(workflowId);
  map.set(key, current);
};

for (const { workflow } of workflows) {
  for (const node of workflow.nodes || []) {
    const versions = Array.isArray(node.typeVersion) ? node.typeVersion : [node.typeVersion];
    for (const typeVersion of versions) {
      addUsage(nodeTypeRequirements, `${node.type}:${typeVersion}`, {
        type: node.type,
        typeVersion,
      }, workflow.id);
    }

    for (const [type, credential] of Object.entries(node.credentials || {})) {
      addUsage(credentialRequirements, `${type}:${credential.id}`, {
        id: credential.id,
        name: credential.name,
        type,
      }, workflow.id);
    }

    if (node.type === "n8n-nodes-base.executeWorkflow") {
      const targetId = node.parameters?.workflowId?.value;
      if (typeof targetId === "string") {
        addUsage(workflowRequirements, targetId, {
          id: targetId,
          ...(workflowNames.has(targetId) ? { name: workflowNames.get(targetId) } : {}),
        }, workflow.id);
      }
    }
  }
}

const sourceId = createHash("sha256")
  .update(JSON.stringify(workflows.map(({ workflow }) => ({ id: workflow.id, name: workflow.name }))))
  .digest("hex");

const manifest = {
  packageFormatVersion: "1",
  exportedAt,
  sourceN8nVersion: "2.34.0",
  sourceId,
  workflows: packageEntries,
  requirements: {
    credentials: [...credentialRequirements.values()],
    workflows: [...workflowRequirements.values()],
    nodeTypes: [...nodeTypeRequirements.values()],
  },
};

await rm(buildDir, { recursive: true, force: true });
await mkdir(buildDir, { recursive: true });

// n8n requires manifest.json to be the first archive entry.
await writeFile(resolve(buildDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
for (const [index, { workflow }] of workflows.entries()) {
  const targetDir = resolve(buildDir, packageEntries[index].target);
  await mkdir(targetDir, { recursive: true });
  await writeFile(resolve(targetDir, "workflow.json"), `${JSON.stringify(workflow, null, 2)}\n`);
}

await execFileAsync("tar", [
  "--sort=name",
  "--mtime=@0",
  "--owner=0",
  "--group=0",
  "--numeric-owner",
  "-czf",
  packagePath,
  "manifest.json",
  "workflows",
], { cwd: buildDir });

const zipBuildDir = resolve(buildDir, "individual-workflows");
await mkdir(zipBuildDir, { recursive: true });
for (const { file, workflow } of workflows) {
  const stagedPath = resolve(zipBuildDir, file);
  await writeFile(stagedPath, `${JSON.stringify(workflow, null, 2)}\n`);
  await utimes(stagedPath, new Date(exportedAt), new Date(exportedAt));
}
await rm(zipPath, { force: true });
await execFileAsync("zip", ["-X", "-q", zipPath, ...files], { cwd: zipBuildDir });
await rm(buildDir, { recursive: true, force: true });

console.log(`Generated n8n package ${packagePath}`);
console.log(`Generated individual workflow archive ${zipPath}`);
