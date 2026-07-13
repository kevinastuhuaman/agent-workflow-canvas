import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kevinastuhuaman.github.io",
  base: process.env.TEST_BASE === "root" ? "/" : "/agent-workflow-canvas",
  outDir: process.env.TEST_PAGES === "1" ? "./.pages-preview/agent-workflow-canvas" : "./dist",
  output: "static",
});
