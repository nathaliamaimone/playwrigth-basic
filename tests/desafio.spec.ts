import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {{
    await page.goto("https://www.saucedemo.com/v1/");
}})

test ("Desafio: Login com sucesso", async ({ page }) => {
    await page.getByTestId("username").fill('standard_user');
    await expect(page.getByTestId("username")).toHaveValue('standard_user');
    await page.getByTestId("password").fill('secret_sauce');
    await page.locator('input#login-button').click();

    await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
    await expect(page.locator('div.product_label')).toHaveText('Products');
})

test.describe('Testes negativos de login', async () => {
    
    test ("Desafio: Login com usuário bloqueado", async ({ page }) => {
        await page.getByTestId("username").fill('locked_out_user');
        await expect(page.getByTestId("username")).toHaveValue('locked_out_user');
        await page.getByTestId("password").fill('secret_sauce');
        await page.locator('input#login-button').click();
    
        await expect(page.getByTestId("error")).toBeVisible();
        await expect(page.getByTestId("error")).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        await expect(page).toHaveURL("https://www.saucedemo.com/v1/");
    
        // Alternativa
        // const errorLabel = page.locator('[data-test="error"]');
        // await expect(errorLabel).toBeVisible();
        // await expect(errorLabel).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    })
    
    test ("Desafio: Login com a senha incorreta", async ({ page }) => {
        await page.getByTestId("username").fill('standard_user');
        await expect(page.getByTestId("username")).toHaveValue('standard_user');
        await page.getByTestId("password").fill('secret_sauce_incorrect');
        await page.locator('input#login-button').click();
    
        await expect(page.getByTestId("error")).toBeVisible();
        await expect(page.getByTestId("error")).toHaveText('Epic sadface: Username and password do not match any user in this service');
        await expect(page).toHaveURL("https://www.saucedemo.com/v1/");
    })
})

test.afterAll(async ({ page }) => {	
    console.log('Teste concluído');
})

