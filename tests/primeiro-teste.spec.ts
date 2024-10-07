import test from "@playwright/test";

test ("Visitando a página do Playwright", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await page.locator('.getStarted_Sjon').click();
})

test ("Visitando a página do Playwright (2)", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    await page.getByText('Get Started').click();
})

test ("Visitando a página do Playwright (3)", async ({ page }) => {
    await page.goto("https://playwright.dev/");
    const text = await page.getByText('enables reliable end-to-end testing for modern web apps').textContent();
    console.log(text);
})