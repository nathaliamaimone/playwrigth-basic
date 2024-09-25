import test from "@playwright/test";

test ("Localizando por data-test", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByTestId("username").fill("Nathália Maimone");
})