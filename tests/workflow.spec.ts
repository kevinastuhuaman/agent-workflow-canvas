import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders an accessible work surface without viewport overflow", async ({ page }, testInfo) => {
  await page.goto("./");
  await expect(page.getByRole("main")).toBeVisible();
  const accessibility = await new AxeBuilder({ page }).analyze();
  expect(accessibility.violations).toEqual([]);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow, `${testInfo.project.name} body should not overflow`).toBe(false);
});

test("invoice mismatch pauses for review and completes only after approval", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Run workflow" }).click();
  await expect(page.getByText("Paused for finance approval")).toBeVisible();
  await expect(page.getByText("Review invoice 1048")).toBeVisible();
  await expect(page.getByText("ERP draft synced")).toHaveCount(0);
  await page.getByRole("button", { name: "Approve draft" }).click();
  await expect(page.getByText("Completed after accountable review")).toBeVisible();
  await expect(page.getByText("ERP draft synced")).toBeVisible();
  await expect(page.getByText("Approval is bound to RUN-001")).toBeVisible();
});

test("clean invoice takes the automatic branch", async ({ page }) => {
  await page.goto("./");
  await page.getByLabel("Run scenario").selectOption("clean");
  await page.getByRole("button", { name: "Run workflow" }).click();
  await expect(page.getByText("Completed with automatic routing")).toBeVisible();
  await expect(page.getByText("Draft synced and owner notified")).toBeVisible();
  await expect(page.getByText("Review invoice 1048")).toBeHidden();
  await page.getByRole("button", { name: /Seven fields extracted/ }).click();
  if ((page.viewportSize()?.width ?? 0) <= 820) {
    await page.getByRole("button", { name: "Inspector" }).click();
  }
  await expect(page.locator("[data-inspector-title]")).toHaveText("Extract invoice fields");
});

test("permission failure is explicit and recoverable", async ({ page }) => {
  await page.goto("./");
  await page.getByLabel("Run scenario").selectOption("permission");
  await page.getByRole("button", { name: "Run workflow" }).click();
  await expect(page.getByText("Failed closed before ERP commit")).toBeVisible();
  await expect(page.getByText("ERP permission expired").last()).toBeVisible();
  await page.getByRole("button", { name: "Retry with scoped access" }).click();
  await expect(page.getByText("Recovered with scoped access")).toBeVisible();
  await expect(page.getByText("Scoped ERP access restored")).toBeVisible();
});

test("route policy can be inspected and changed", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: /Route by confidence/ }).click();
  if ((page.viewportSize()?.width ?? 0) <= 820) {
    await page.getByRole("button", { name: "Inspector" }).click();
  }
  const threshold = page.getByLabel("Review threshold");
  await expect(threshold).toBeVisible();
  await threshold.fill("92");
  await expect(page.locator("[data-threshold-value]")).toHaveText("0.92");
  await expect(page.locator("[data-run-id]")).toHaveText("Not started");
  await page.getByRole("button", { name: "Run workflow" }).click();
  await expect(page.getByText("Confidence 0.71 is below the 0.92 policy")).toBeVisible();
});

test("workflow library search filters public examples", async ({ page }) => {
  await page.goto("./");
  if ((page.viewportSize()?.width ?? 0) <= 820) test.skip();
  await page.getByPlaceholder("Search workflows").fill("refund");
  await expect(page.getByRole("button", { name: /Refund evidence check/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Invoice exception review/ })).toBeHidden();
});

test("machine-readable evidence is published", async ({ request }) => {
  const [llms, project, sitemap, robots] = await Promise.all([
    request.get("./llms.txt"),
    request.get("./project.json"),
    request.get("./sitemap.xml"),
    request.get("./robots.txt"),
  ]);
  expect(llms.ok()).toBeTruthy();
  expect(await llms.text()).toContain("Human-in-the-loop product judgment");
  expect(project.ok()).toBeTruthy();
  expect((await project.json()).capabilities).toContain("fail-closed permissions");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("project.json");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Allow: /");
});
