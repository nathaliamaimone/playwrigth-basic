import { test, expect } from "@playwright/test";

test ("Localizando por data-test", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.getByTestId("username").fill("Nathália Maimone");
})

test ("Asserts básicos", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/v1/");
    const loginButton = await page.locator('input#login-button');
    await expect.soft(loginButton).toBeVisible();	//se falhar nessa validação o teste não vai parar. 
    await expect(loginButton).toHaveText("LOGIN");
    await expect(loginButton).toHaveCSS("background-color", "rgb(226, 35, 26)");
    await expect(loginButton).toHaveAttribute("value", "LOGIN");
    await expect(loginButton).not.toBeHidden();
    await expect(loginButton).not.toHaveCSS("background-color", "rgb(0, 0, 0)");
})

test ("Ações básicas", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/forgot_password");
    const emailInput = await page.locator('input#email');
    await emailInput.fill("nathalia.maimone@mail.com");
    await emailInput.fill("");
    await emailInput.pressSequentially("1234567") // imita a ação de declado, letra por letra. 
    await expect(emailInput).toHaveValue("1234567");
})

test ("Acessar uma página e procurar por um link(checkbox)", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com");
    const checkBoxLink = await page.locator('a[href="/checkboxes"]');
    await expect(checkBoxLink).toBeVisible();
    await checkBoxLink.click();

    const checkbox1 = await page.locator('input[type="checkbox"]').nth(0);
    await expect(checkbox1).toBeVisible();
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();

    const checkbox2 = await page.locator('input[type="checkbox"]').nth(1);
    await expect(checkbox2).toBeVisible();
    await checkbox2.uncheck();
    await expect(checkbox2).not.toBeChecked();
})

test ("Ações básicas (dropdown)", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/dropdown");
    const dropdown = await page.locator('select#dropdown');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('1');
    await expect(dropdown).toHaveValue('1');

    await dropdown.selectOption({ label: 'Option 2' });
    await expect(dropdown).toHaveValue('2');
})

test ("Ações básicas (hovers)", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/hovers");

    const figure1 = await page.locator('div.figure').nth(0);
    const figure2 = await page.locator('div.figure').nth(1);	
    const figure3 = await page.locator('div.figure').nth(2);

    const hoverFigure1 = figure1.locator('.figcaption');
    const hoverFigure2 = figure2.locator('.figcaption');
    const hoverFigure3 = figure3.locator('.figcaption');

    await figure1.hover();
    await expect(hoverFigure1).toBeVisible();
    await expect(hoverFigure2).not.toBeVisible();
    await expect(hoverFigure3).not.toBeVisible();

    await figure2.hover();
    await expect(hoverFigure1).not.toBeVisible();
    await expect(hoverFigure2).toBeVisible();
    await hoverFigure2.locator('a').click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/users/2');

    await page.goBack(); // voltar para página anterior

    await figure3.hover();
    await expect(hoverFigure3).toBeVisible();
    await hoverFigure3.getByRole('link').click();
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/users/3');
})



