import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = resolve(import.meta.dirname, "..");
const packagePath = resolve(root, "n8n/gary-launch.n8np");
const tempDir = await mkdtemp(resolve(tmpdir(), "gwb-n8np-"));
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

try {
  const { stdout } = await execFileAsync("tar", ["-tzf", packagePath]);
  const entries = stdout.trim().split("\n");
  check(entries[0] === "manifest.json", "manifest.json must be the first archive entry");
  check(entries.every((entry) => /^[A-Za-z0-9._/-]+$/.test(entry)), "archive contains an invalid path");

  await execFileAsync("tar", ["-xzf", packagePath, "-C", tempDir]);
  const manifest = JSON.parse(await readFile(resolve(tempDir, "manifest.json"), "utf8"));
  check(manifest.packageFormatVersion === "1", "unsupported package format version");
  check(typeof manifest.exportedAt === "string" && !Number.isNaN(Date.parse(manifest.exportedAt)), "invalid exportedAt");
  check(typeof manifest.sourceN8nVersion === "string", "missing sourceN8nVersion");
  check(typeof manifest.sourceId === "string" && manifest.sourceId.length === 64, "invalid sourceId");
  check(Array.isArray(manifest.workflows) && manifest.workflows.length === 22, "package must contain 22 workflows");

  const workflowIds = new Set();
  for (const entry of manifest.workflows || []) {
    const packaged = JSON.parse(await readFile(resolve(tempDir, entry.target, "workflow.json"), "utf8"));
    check(packaged.id === entry.id, `${entry.target}: workflow ID differs from manifest`);
    check(packaged.name === entry.name, `${entry.target}: workflow name differs from manifest`);
    check(!workflowIds.has(entry.id), `duplicate packaged workflow ID ${entry.id}`);
    workflowIds.add(entry.id);
  }

  for (const requirement of manifest.requirements?.workflows || []) {
    check(workflowIds.has(requirement.id), `unknown required workflow ${requirement.id}`);
    check(requirement.usedByWorkflows.every((id) => workflowIds.has(id)), `invalid workflow usage for ${requirement.id}`);
  }
  for (const requirement of manifest.requirements?.credentials || []) {
    check(requirement.id && requirement.name && requirement.type, "invalid credential requirement");
    check(requirement.usedByWorkflows.every((id) => workflowIds.has(id)), `invalid credential usage for ${requirement.name}`);
  }
  for (const requirement of manifest.requirements?.nodeTypes || []) {
    check(requirement.type && requirement.typeVersion !== undefined, "invalid node type requirement");
    check(requirement.usedByWorkflows.every((id) => workflowIds.has(id)), `invalid node type usage for ${requirement.type}`);
  }
} finally {
  await rm(tempDir, { recursive: true, force: true });
}

if (failures.length) {
  console.error(`n8n package validation failed with ${failures.length} error(s):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Validated official .n8np layout, manifest and 22 packaged workflows.");
