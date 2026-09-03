import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), "utf8"));
const nodeByName = (workflow, name) => {
  const found = workflow.nodes.find((node) => node.name === name);
  assert(found, `Missing node ${name}`);
  return found;
};
const runCode = (node, context) => {
  const execute = new Function("$input", "$json", "$execution", "$", node.parameters.jsCode);
  return execute(context.$input, context.$json, context.$execution || { id: "semantic-test" }, context.$ || (() => ({ item: { json: {} } })));
};

const [s01, w04, w05, w11, w13, validProject, invalidProject, attendance, engagement, transcript] = await Promise.all([
  readJson("n8n/workflows/01-s01-validate-event.json"),
  readJson("n8n/workflows/13-w04-attendance-sync.json"),
  readJson("n8n/workflows/14-w05-intent-engine.json"),
  readJson("n8n/workflows/20-w11-content-factory.json"),
  readJson("n8n/workflows/22-w13-testimonial-referral.json"),
  readJson("n8n/fixtures/project-conversation.valid.json"),
  readJson("n8n/fixtures/project-conversation.invalid.json"),
  readJson("n8n/fixtures/webinar-attendance.valid.json"),
  readJson("n8n/fixtures/engagement-event.valid.json"),
  readJson("n8n/fixtures/content-transcript.valid.json"),
]);

const validate = nodeByName(s01, "Validate and Normalize");
const validated = runCode(validate, { $input: { all: () => [{ json: validProject }] }, $json: validProject });
assert.equal(validated[0].json.valid, true);
assert.equal(validated[0].json.normalizedEmail, "camille@example.com");
assert.equal(validated[0].json.payload.diagnostic.requested, true);

const rejected = runCode(validate, { $input: { all: () => [{ json: invalidProject }] }, $json: invalidProject });
assert.equal(rejected[0].json.valid, false);
assert(rejected[0].json.validationErrors.length >= 3);

const normalizedAttendance = runCode(nodeByName(w04, "Normalize Attendance"), { $json: attendance });
assert.equal(normalizedAttendance[0].json.eventType, "webinar.attended");
assert.equal(normalizedAttendance[0].json.payload.durationMinutes, 46);
assert.equal(normalizedAttendance[0].json.eventId, "webinar:attendance-demo-0001");

const normalizedEngagement = runCode(nodeByName(w04, "Normalize First-party Engagement"), { $json: engagement });
assert.equal(normalizedEngagement[0].json.eventType, "diagnostic.requested");
assert.equal(normalizedEngagement[0].json.correlationId, "demo-journey-0001");

const scoringRow = {
  trigger_event: {
    ...normalizedAttendance[0].json,
    subjectKey: "00000000-0000-4000-8000-000000000001",
  },
  history: [
    { eventType: "masterclass.registration.submitted", payload: { registration: { organisation: "Entreprise Exemple" } } },
    { eventType: "project.conversation.submitted", payload: { diagnostic: { requested: true } } },
    { eventType: "webinar.attended", payload: normalizedAttendance[0].json.payload },
    { eventType: "booking.created", payload: {} },
  ],
};
const score = runCode(nodeByName(w05, "Calculate Explainable Score"), { $json: scoringRow });
assert.equal(score[0].json.score, 125);
assert.equal(score[0].json.temperature, "priority");
assert(score[0].json.contributions.some((item) => item.signal === "urgent90"));
assert(score[0].json.contributions.some((item) => item.signal === "diagnostic"));

const normalizedTranscript = runCode(nodeByName(w11, "Normalize Transcript"), { $json: transcript });
assert.equal(normalizedTranscript[0].json.valid, true);
assert.equal(normalizedTranscript[0].json.eventType, "content.transcript.ready");

const referralInput = {
  approved: true,
  requestType: "referral",
  clientId: "client-demo-0001",
  correlationId: "demo-journey-0001",
  name: "Camille Exemple",
  email: "camille@example.com",
};
const normalizedReferral = runCode(nodeByName(w13, "Normalize Proof Request"), { $json: referralInput });
assert.equal(normalizedReferral[0].json.eventType, "referral.requested");
assert.equal(normalizedReferral[0].json.approved, true);

console.log("Validated event normalization, rejection, scoring, transcript and human-approved referral semantics.");
