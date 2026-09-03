import { createHash } from "node:crypto";

const uuidFrom = (seed) => {
  const value = createHash("sha256").update(seed).digest("hex").slice(0, 32).split("");
  value[12] = "4";
  value[16] = ((Number.parseInt(value[16], 16) & 0x3) | 0x8).toString(16);
  const hex = value.join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

const node = (workflowId, name, type, typeVersion, position, parameters, extra = {}) => ({
  parameters,
  id: uuidFrom(`${workflowId}:${name}`),
  name,
  type,
  typeVersion,
  position,
  ...extra,
});

export const credentials = {
  postgres: {
    postgres: { id: "REPLACE_GWB_POSTGRES_CREDENTIAL_ID", name: "GWB Event Ledger Postgres" },
  },
  hubspot: {
    httpHeaderAuth: { id: "REPLACE_GWB_HUBSPOT_CREDENTIAL_ID", name: "GWB HubSpot Private App" },
  },
  brevo: {
    httpHeaderAuth: { id: "REPLACE_GWB_BREVO_CREDENTIAL_ID", name: "GWB Brevo API" },
  },
  openai: {
    httpHeaderAuth: { id: "REPLACE_GWB_OPENAI_CREDENTIAL_ID", name: "GWB OpenAI API" },
  },
  webinar: {
    httpHeaderAuth: { id: "REPLACE_GWB_WEBINAR_CREDENTIAL_ID", name: "GWB Webinar API" },
  },
  internalWebhook: {
    httpHeaderAuth: { id: "REPLACE_GWB_INTERNAL_WEBHOOK_CREDENTIAL_ID", name: "GWB Internal Webhook Auth" },
  },
};

export const manualTrigger = (workflowId, position = [0, 0]) =>
  node(workflowId, "Manual Trigger", "n8n-nodes-base.manualTrigger", 1, position, {});

export const errorTrigger = (workflowId, position = [0, 0]) =>
  node(workflowId, "Error Trigger", "n8n-nodes-base.errorTrigger", 1, position, {});

export const subWorkflowTrigger = (workflowId, position = [0, 0]) =>
  node(workflowId, "When Executed by Another Workflow", "n8n-nodes-base.executeWorkflowTrigger", 1.1, position, {
    inputSource: "passthrough",
  });

export const webhook = ({ workflowId, name, path, position = [0, 0], publicWebhook = false }) => {
  const extra = publicWebhook ? {} : { credentials: credentials.internalWebhook };
  return node(workflowId, name, "n8n-nodes-base.webhook", 2.1, position, {
    httpMethod: "POST",
    path,
    authentication: publicWebhook ? "none" : "headerAuth",
    responseMode: "responseNode",
    options: publicWebhook
      ? { allowedOrigins: "={{ $json._config?.site?.allowedOrigins || '*' }}" }
      : {},
  }, {
    webhookId: uuidFrom(`${workflowId}:webhook:${path}`),
    ...extra,
  });
};

export const schedule = (workflowId, name, rule, position = [0, 0]) =>
  node(workflowId, name, "n8n-nodes-base.scheduleTrigger", 1.2, position, {
    rule: { interval: [rule] },
  });

export const code = (workflowId, name, jsCode, position = [0, 0], extra = {}) =>
  node(workflowId, name, "n8n-nodes-base.code", 2, position, { jsCode }, extra);

export const postgres = (workflowId, name, query, queryReplacement, position = [0, 0]) =>
  node(workflowId, name, "n8n-nodes-base.postgres", 2.6, position, {
    operation: "executeQuery",
    query,
    options: queryReplacement ? { queryReplacement } : {},
  }, { credentials: credentials.postgres });

export const httpRequest = ({
  workflowId,
  name,
  method = "POST",
  url,
  body,
  position = [0, 0],
  credential,
  headers = [],
}) => node(workflowId, name, "n8n-nodes-base.httpRequest", 4.2, position, {
  method,
  url,
  authentication: credential ? "genericCredentialType" : "none",
  genericAuthType: credential ? "httpHeaderAuth" : undefined,
  sendHeaders: headers.length > 0,
  headerParameters: headers.length > 0 ? { parameters: headers } : undefined,
  sendBody: body !== undefined,
  contentType: body !== undefined ? "raw" : undefined,
  rawContentType: body !== undefined ? "application/json" : undefined,
  body,
  options: {
    timeout: 20000,
    response: { response: { neverError: false, responseFormat: "json" } },
  },
}, credential ? {
  credentials: credential,
  retryOnFail: true,
  maxTries: 5,
  waitBetweenTries: 2000,
} : {});

export const respond = (workflowId, name, responseBody, responseCode = 200, position = [0, 0]) =>
  node(workflowId, name, "n8n-nodes-base.respondToWebhook", 1.4, position, {
    respondWith: "json",
    responseBody,
    options: { responseCode },
  });

export const executeWorkflow = (workflowId, name, targetWorkflowId, position = [0, 0]) =>
  node(workflowId, name, "n8n-nodes-base.executeWorkflow", 1.2, position, {
    source: "database",
    workflowId: { __rl: true, value: targetWorkflowId, mode: "id" },
    options: { waitForSubWorkflow: true },
  });

export const ifNode = (workflowId, name, leftValue, operation = "true", rightValue, position = [0, 0]) =>
  node(workflowId, name, "n8n-nodes-base.if", 2.2, position, {
    conditions: {
      options: { caseSensitive: true, leftValue: "", typeValidation: "strict", version: 2 },
      conditions: [{
        id: uuidFrom(`${workflowId}:${name}:condition`),
        leftValue,
        rightValue,
        operator: operation === "true"
          ? { type: "boolean", operation: "true", singleValue: true }
          : { type: "string", operation },
      }],
      combinator: "and",
    },
    options: {},
  });

export const switchNode = (workflowId, name, value, rules, position = [0, 0]) =>
  node(workflowId, name, "n8n-nodes-base.switch", 3.2, position, {
    rules: {
      values: rules.map((rule, index) => ({
        conditions: {
          options: { caseSensitive: true, leftValue: "", typeValidation: "strict", version: 2 },
          conditions: [{
            id: uuidFrom(`${workflowId}:${name}:rule:${index}`),
            leftValue: value,
            rightValue: rule.equals,
            operator: { type: "string", operation: "equals" },
          }],
          combinator: "and",
        },
        renameOutput: true,
        outputKey: rule.output,
      })),
    },
    options: { fallbackOutput: "extra" },
  });

export const sticky = (workflowId, name, content, position = [0, 0], size = [420, 240]) =>
  node(workflowId, name, "n8n-nodes-base.stickyNote", 1, position, {
    content,
    height: size[1],
    width: size[0],
    color: 5,
  });

export const createConnections = () => ({});

export const connect = (connections, from, to, output = 0, input = 0) => {
  connections[from] ??= { main: [] };
  while (connections[from].main.length <= output) connections[from].main.push([]);
  connections[from].main[output].push({ node: to, type: "main", index: input });
  return connections;
};

export const linear = (connections, names) => {
  for (let index = 0; index < names.length - 1; index += 1) {
    connect(connections, names[index], names[index + 1]);
  }
  return connections;
};

export const workflow = ({ id, name, nodes, connections, description }) => ({
  id,
  name,
  active: false,
  nodes,
  connections,
  settings: {
    executionOrder: "v1",
    saveManualExecutions: true,
    callerPolicy: "workflowsFromSameOwner",
  },
  staticData: null,
  meta: {
    templateCredsSetupCompleted: false,
    garyLaunchDescription: description,
    generatedBy: "Visit-card/scripts/generate-n8n-gary-launch.mjs",
  },
  pinData: {},
  versionId: uuidFrom(`${id}:version:1`),
});

export const workflowIds = {
  S01: "gwbS01ValidateV1",
  S02: "gwbS02IdentityV1",
  S03: "gwbS03LedgerV1",
  S04: "gwbS04ConsentV1",
  S05: "gwbS05NotifyV1",
  S06: "gwbS06RetryV1",
  W00: "gwbW00ErrorsV1",
  W01: "gwbW01ProjectV1",
  W02: "gwbW02RegisterV1",
  W03: "gwbW03NurtureV1",
  W04: "gwbW04AttendanceV1",
  W05: "gwbW05IntentV1",
  W06: "gwbW06FollowupV1",
  W07: "gwbW07BookingV1",
  W08: "gwbW08PreCallV1",
  W09: "gwbW09PipelineV1",
  W10: "gwbW10ProposalV1",
  W11: "gwbW11ContentV1",
  W12: "gwbW12OnboardV1",
  W13: "gwbW13ReferralV1",
  W14: "gwbW14ReportV1",
  W99: "gwbW99SetupV1",
};
