import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(process.env.COBRE_TOOLS_URL ?? "");
});

test.describe("Approve payments Admin V2", () => {
  test.use({ storageState: "playwright/.auth/user.json" });

  test("test", async ({ page }) => {
    await page.goto(process.env.COBRE_TOOLS_URL ?? "");
    await page.getByRole("button", { name: "Cobre core", exact: true }).click();
    await page.getByRole("button", { name: " Multicuenta" }).click();
    await page.locator(".vue-input").click();
    await page.getByPlaceholder("Selecciona").fill("pxt");
    await page.getByText("PXT01 - Billetera Pexto").click();
    await page
      .getByRole("button", { name: " Agregar cuenta", exact: true })
      .click();
    await page.getByPlaceholder("Selecciona un banco").click();
    await page.getByText("BANCO POPULAR").click();
    await page.getByPlaceholder("Selecciona tipo de cuenta").click();
    await page
      .getByRole("option", { name: "Ahorros" })
      .getByRole("paragraph")
      .click();
    await page.getByTestId("cobreInput").click();
    await page.getByTestId("cobreInput").fill("12345666");
    await page.getByRole("button", { name: "Guardar" }).click();
    await page.getByTestId("cobreInput").click();
    await page.getByTestId("cobreInput").fill("123456");
    await page.getByRole("button", { name: "Confirmar" }).click();
  });
});
