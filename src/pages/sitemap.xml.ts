const base = "https://kevinastuhuaman.github.io/agent-workflow-canvas";
const paths = ["/", "/llms.txt", "/project.json"];

export function GET() {
  const urls = paths.map((path) => `<url><loc>${base}${path}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
