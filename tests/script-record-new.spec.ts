import { test, expect } from '@playwright/test';

test('Criando novo script utilizando Record new', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.getByText('Swag Labs').click();
    await page.getByTestId('username').click();
    await page.getByTestId('username').fill('error_user');
    await page.getByTestId('password').click();
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();
    await page.getByTestId('title').click();
});

// Posso utilizar o Record new para criar um novo script e testar sempre com um novo arquivo.
// Record at cursor a partir de um determinado ponto.
// Devo criar o script e depois incluir melhorias e validações necessárias. 