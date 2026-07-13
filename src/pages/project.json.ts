import project from "../../project.json";

export function GET() {
  return new Response(JSON.stringify(project, null, 2), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
