export type NodeKind = "trigger" | "agent" | "rule" | "branch" | "approval" | "action";

export type WorkflowNode = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  kind: NodeKind;
  tool: string;
};

export const nodes: WorkflowNode[] = [
  {
    id: "intake",
    title: "Invoice received",
    eyebrow: "Trigger",
    description: "Starts when a new invoice PDF arrives in the finance inbox.",
    kind: "trigger",
    tool: "Inbox connector",
  },
  {
    id: "extract",
    title: "Extract invoice fields",
    eyebrow: "AI step",
    description: "Reads the document and returns a typed invoice object with field evidence.",
    kind: "agent",
    tool: "Document model",
  },
  {
    id: "risk",
    title: "Validate totals",
    eyebrow: "Policy",
    description: "Checks totals, supplier identity, currency, and purchase-order coverage.",
    kind: "rule",
    tool: "Deterministic rules",
  },
  {
    id: "route",
    title: "Route by confidence",
    eyebrow: "Branch",
    description: "High-confidence invoices continue. Exceptions move to accountable review.",
    kind: "branch",
    tool: "Confidence policy",
  },
  {
    id: "post",
    title: "Prepare ERP entry",
    eyebrow: "Action",
    description: "Creates a draft payable entry without releasing funds.",
    kind: "action",
    tool: "ERP connector",
  },
  {
    id: "review",
    title: "Finance review",
    eyebrow: "Human approval",
    description: "Shows changed fields, evidence, and policy reasons before approval.",
    kind: "approval",
    tool: "Approval queue",
  },
  {
    id: "sync",
    title: "Sync and notify",
    eyebrow: "Action",
    description: "Commits the approved draft and writes an auditable completion event.",
    kind: "action",
    tool: "ERP and Slack",
  },
];

export const library = [
  { name: "Invoice exception review", meta: "7 steps", active: true },
  { name: "Supplier onboarding", meta: "9 steps", active: false },
  { name: "Refund evidence check", meta: "6 steps", active: false },
];

export const scenarios = [
  { id: "mismatch", label: "Invoice mismatch", note: "Requires finance approval" },
  { id: "clean", label: "Clean invoice", note: "Follows the automatic branch" },
  { id: "permission", label: "Permission revoked", note: "Fails closed and recovers" },
];
