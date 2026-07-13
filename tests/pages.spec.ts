import { expect, test } from "@playwright/test";

test("production artifact works at the GitHub Pages base path", async ({ page, request }) => {
  const failedAssets: string[] = [];
  page.on("response", (response) => {
    if (response.status() >= 400) failedAssets.push(`${response.status()} ${response.url()}`);
  });

  await page.goto("./");
  await expect(page.getByRole("heading", { name: "Agent Workflow Canvas" })).toBeAttached();
  await expect(page.getByRole("button", { name: "Run workflow" })).toBeVisible();
  expect(failedAssets).toEqual([]);

  for (const path of ["llms.txt", "project.json", "sitemap.xml", "robots.txt", "social-preview.png"]) {
    const response = await request.get(`./${path}`);
    expect(response.ok(), `${path} should resolve below the deployed base path`).toBeTruthy();
  }
});
