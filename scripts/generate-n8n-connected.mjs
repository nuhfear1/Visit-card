import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const workflowDir = resolve(root, "n8n/workflows");
const outputPath = resolve(root, "n8n/gary-launch.connected.json");
const files = (await readdir(workflowDir)).filter((file) => file.endsWith(".json")).sort();
const workflows = await Promise.all(files.map(async (file) => JSON.parse(await readFile(resolve(workflowDir, file), "utf8"))));
const workflowsById = new Map(workflows.map((workflow) => [workflow.id, workflow]));

const rootWorkflowIds = [
  "gwbW99SetupV1",
  "gwbW00ErrorsV1",
  "gwbW01ProjectV1",
  "gwbW02RegisterV1",
  "gwbW03NurtureV1",
  "gwbW04AttendanceV1",
  "gwbW07BookingV1",
  "gwbW09PipelineV1",
  "gwbW10ProposalV1",
  "gwbW11ContentV1",
  "gwbW12OnboardV1",
  "gwbW13ReferralV1",
  "gwbW14ReportV1",
];

const clone = (value) => structuredClone(value);
const stableNodeId = (seed) => `gwb-${createHash("sha256").update(seed).digest("hex").slice(0, 24)}`;

const replaceReferences = (value, replacements) => {
  if (typeof value === "string") {
    let result = value;
    for (const [from, to] of replacements) {
      result = result
        .replaceAll(`$('${from}')`, `$('${to}')`)
        .replaceAll(`$("${from}")`, `$("${to}")`);
    }
    return result;
  }
  if (Array.isArray(value)) return value.map((entry) => replaceReferences(entry, replacements));
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, replaceReferences(entry, replacements)]));
  }
  return value;
};

const outgoingTargets = (connections, source) => (connections[source]?.main || []).flat().map((edge) => edge.node);

const terminalNodes = (nodes, connections) => {
  const sourcesWithOutput = new Set(Object.entries(connections)
    .filter(([, outputs]) => (outputs.main || []).some((branch) => branch.length > 0))
    .map(([source]) => source));
  return nodes.map((node) => node.name).filter((name) => !sourcesWithOutput.has(name));
};

const shiftGraph = (graph, anchor) => {
  const minX = Math.min(...graph.nodes.map((node) => node.position[0]));
  const entryNodes = graph.nodes.filter((node) => graph.entries.includes(node.name));
  const entryY = entryNodes.length
    ? entryNodes.reduce((sum, node) => sum + node.position[1], 0) / entryNodes.length
    : Math.min(...graph.nodes.map((node) => node.position[1]));
  const offsetX = anchor[0] - minX;
  const offsetY = anchor[1] - entryY;
  for (const node of graph.nodes) node.position = [node.position[0] + offsetX, node.position[1] + offsetY];
};

const inlineWorkflow = (workflowId, namespace, keepTriggers, stack = []) => {
  if (stack.includes(workflowId)) throw new Error(`Circular workflow dependency: ${[...stack, workflowId].join(" -> ")}`);
  const source = workflowsById.get(workflowId);
  if (!source) throw new Error(`Unknown workflow ${workflowId}`);

  const nameMap = new Map(source.nodes.map((node) => [node.name, `${namespace} · ${node.name}`]));
  let nodes = source.nodes.map((node) => {
    const renamed = replaceReferences(clone(node), nameMap);
    renamed.name = nameMap.get(node.name);
    renamed.id = stableNodeId(`${namespace}:${node.id}`);
    return renamed;
  });
  const connections = {};
  for (const [sourceName, outputs] of Object.entries(source.connections || {})) {
    connections[nameMap.get(sourceName)] = replaceReferences(clone(outputs), nameMap);
    for (const branch of connections[nameMap.get(sourceName)].main || []) {
      for (const edge of branch) edge.node = nameMap.get(edge.node);
    }
  }

  const subWorkflowTriggers = nodes.filter((node) => node.type === "n8n-nodes-base.executeWorkflowTrigger");
  let entries = keepTriggers
    ? nodes.filter((node) => node.type.endsWith("Trigger") || node.type === "n8n-nodes-base.webhook").map((node) => node.name)
    : subWorkflowTriggers.flatMap((node) => outgoingTargets(connections, node.name));

  if (!keepTriggers) {
    const triggerNames = new Set(subWorkflowTriggers.map((node) => node.name));
    nodes = nodes.filter((node) => !triggerNames.has(node.name));
    for (const triggerName of triggerNames) delete connections[triggerName];
  }

  const calls = nodes.filter((node) => node.type === "n8n-nodes-base.executeWorkflow");
  for (const call of calls) {
    const targetId = call.parameters?.workflowId?.value;
    const child = inlineWorkflow(targetId, call.name, false, [...stack, workflowId]);
    shiftGraph(child, call.position);
    const childExits = terminalNodes(child.nodes, child.connections);
    if (!child.entries.length || !childExits.length) throw new Error(`Cannot inline ${call.name}: missing entry or exit`);

    const outgoing = clone(connections[call.name]?.main || []);
    for (const outputs of Object.values(connections)) {
      for (const branch of outputs.main || []) {
        const rewritten = [];
        for (const edge of branch) {
          if (edge.node === call.name) {
            rewritten.push(...child.entries.map((entry) => ({ ...edge, node: entry })));
          } else {
            rewritten.push(edge);
          }
        }
        branch.splice(0, branch.length, ...rewritten);
      }
    }

    delete connections[call.name];
    Object.assign(connections, child.connections);
    for (const exit of childExits) {
      if (outgoing.length) connections[exit] = { main: clone(outgoing) };
    }
    nodes = nodes.filter((node) => node.name !== call.name).concat(child.nodes);
    entries = entries.flatMap((entry) => entry === call.name ? child.entries : [entry]);

    const representativeExit = childExits[0];
    nodes = nodes.map((node) => replaceReferences(node, new Map([[call.name, representativeExit]])));
  }

  return { nodes, connections, entries };
};

const combinedNodes = [];
const combinedConnections = {};
let nextY = 0;

for (const workflowId of rootWorkflowIds) {
  const source = workflowsById.get(workflowId);
  const shortName = source.name.match(/\| (W\d+) \|/)?.[1] || workflowId;
  const graph = inlineWorkflow(workflowId, shortName, true);
  const minX = Math.min(...graph.nodes.map((node) => node.position[0]));
  const minY = Math.min(...graph.nodes.map((node) => node.position[1]));
  const maxY = Math.max(...graph.nodes.map((node) => node.position[1]));
  for (const node of graph.nodes) node.position = [node.position[0] - minX, node.position[1] - minY + nextY];
  nextY += maxY - minY + 600;
  combinedNodes.push(...graph.nodes);
  Object.assign(combinedConnections, graph.connections);
}

// A workflow can't use itself as an Error Workflow. Inline W00 as the shared
// error output for integration and database nodes instead.
const errorTrigger = combinedNodes.find((node) => node.name === "W00 · Error Trigger");
const errorEntry = errorTrigger ? outgoingTargets(combinedConnections, errorTrigger.name)[0] : undefined;
if (!errorTrigger || !errorEntry) throw new Error("Connected error handler has no entry point");
combinedNodes.splice(combinedNodes.indexOf(errorTrigger), 1);
delete combinedConnections[errorTrigger.name];

const fallibleTypes = new Set(["n8n-nodes-base.httpRequest", "n8n-nodes-base.postgres"]);
for (const node of combinedNodes) {
  if (!fallibleTypes.has(node.type) || node.name.startsWith("W00 ·")) continue;
  node.onError = "continueErrorOutput";
  const outputs = combinedConnections[node.name] || { main: [] };
  outputs.main ||= [];
  outputs.main[0] ||= [];
  outputs.main[1] = [{ node: errorEntry, type: "main", index: 0 }];
  combinedConnections[node.name] = outputs;
}

combinedNodes.unshift({
  parameters: {
    content: "# Gary Launch — workflow connecté\n\nUn seul workflow importable depuis l’éditeur n8n. Chaque ligne correspond à un point d’entrée autonome de la machine : formulaires, webinar, suivi commercial, contenu et reporting.\n\nTous les anciens appels de sous-workflows ont été intégrés directement dans leurs branches.",
    height: 300,
    width: 620,
    color: 5,
  },
  id: stableNodeId("gary-launch-connected:instructions"),
  name: "Lisez-moi — Gary Launch",
  type: "n8n-nodes-base.stickyNote",
  typeVersion: 1,
  position: [-720, 0],
});

const connectedWorkflow = {
  id: "gwbGaryLaunchConnectedV1",
  name: "GWB | Gary Launch | Connected System",
  active: false,
  nodes: combinedNodes,
  connections: combinedConnections,
  settings: {
    executionOrder: "v1",
    saveManualExecutions: true,
  },
  pinData: {},
  meta: {
    templateCredsSetupCompleted: false,
    generatedFrom: "gwb-launch-modular-v1",
  },
  tags: [],
  versionId: "de4c5d4d-7f0d-4ad9-8c45-9fa6a4b09b23",
};

await writeFile(outputPath, `${JSON.stringify(connectedWorkflow, null, 2)}\n`);
console.log(`Generated connected n8n workflow with ${combinedNodes.length} nodes at ${outputPath}`);
