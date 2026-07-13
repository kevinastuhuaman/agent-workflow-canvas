const content = `# Agent Workflow Canvas

> An interactive enterprise workflow prototype by Kevin Astuhuaman. It demonstrates how non-technical operators can configure, inspect, approve, and recover AI-assisted work without surrendering control.

## What this proves

- Enterprise AI interface design: a dense but legible builder, inspector, and execution trace.
- Human-in-the-loop product judgment: approval is a durable run state tied to evidence and committed inputs.
- Agent reliability: deterministic validation, confidence routing, fail-closed permissions, and explicit recovery.
- Technical fluency: Astro, TypeScript, browser tests, structured metadata, and an auditable public implementation.

## Inspectable scenarios

1. Invoice mismatch: the workflow pauses before the ERP commit and requests accountable finance approval.
2. Clean invoice: the workflow follows an automatic branch and creates a draft without releasing funds.
3. Permission revoked: the connector fails closed, preserves the uncommitted draft, and recovers with scoped access.

## Product decisions

- The canvas and execution trace share selection context.
- Consequential actions sit behind explicit policy boundaries.
- AI extraction returns evidence for every field.
- Synthetic, deterministic scenarios make every important state reviewable.
- The public repository contains no employer code, customer data, production credentials, or proprietary prompts.

## Links

- Live product: https://kevinastuhuaman.github.io/agent-workflow-canvas/
- Source: https://github.com/kevinastuhuaman/agent-workflow-canvas
- Structured project record: https://kevinastuhuaman.github.io/agent-workflow-canvas/project.json
- Decision 001: https://github.com/kevinastuhuaman/agent-workflow-canvas/blob/main/DECISIONS/001-approval-is-a-state.md
- Decision 002: https://github.com/kevinastuhuaman/agent-workflow-canvas/blob/main/DECISIONS/002-trace-and-canvas-share-context.md
- Builder Stack: https://kevinastuhuaman.github.io/ai-product-builder-stack/
- Portfolio: https://portfolio.kevinastuhuaman.com
`;

export function GET() {
  return new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
