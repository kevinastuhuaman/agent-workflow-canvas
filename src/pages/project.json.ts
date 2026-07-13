const project = {
  schemaVersion: 1,
  name: "Agent Workflow Canvas",
  author: {
    name: "Kevin Astuhuaman",
    portfolio: "https://portfolio.kevinastuhuaman.com",
    github: "https://github.com/kevinastuhuaman",
  },
  thesis:
    "Enterprise AI should make uncertainty, authority, and recovery visible before an agent takes consequential action.",
  users: ["operations teams", "product managers", "non-technical workflow owners"],
  capabilities: [
    "agent workflow design",
    "human-in-the-loop approval",
    "execution traces",
    "confidence routing",
    "fail-closed permissions",
    "recovery",
    "enterprise UX",
  ],
  scenarios: [
    { id: "mismatch", outcome: "paused for accountable finance approval" },
    { id: "clean", outcome: "completed through the automatic branch" },
    { id: "permission", outcome: "failed closed, then recovered with scoped access" },
  ],
  evidence: {
    liveProduct: "https://kevinastuhuaman.github.io/agent-workflow-canvas/",
    source: "https://github.com/kevinastuhuaman/agent-workflow-canvas",
    decisions: "https://github.com/kevinastuhuaman/agent-workflow-canvas/tree/main/DECISIONS",
    tests: "https://github.com/kevinastuhuaman/agent-workflow-canvas/tree/main/tests",
  },
  publicationMode: "open prototype",
  data: "synthetic",
  ipBoundary:
    "Original demonstration code only; no employer code, customer data, production credentials, private prompts, or proprietary automation logic.",
};

export function GET() {
  return new Response(JSON.stringify(project, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
