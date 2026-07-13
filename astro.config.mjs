import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kevinastuhuaman.github.io",
  base: process.env.TEST_BASE === "root" ? "/" : "/agent-workflow-canvas",
  output: "static",
});
