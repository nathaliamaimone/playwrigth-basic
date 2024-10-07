import {test, expect} from '@playwright/test';

test.only('Controle de nova aba', async ({page}) => {
    await page.goto('https://playwright.dev/');

    // Definindo a Promise para aguardar o carregamento da nova aba
    const pagePromise = page.context().waitForEvent('page');
    await page.locator('.gh-btn').getByText('Star').click();

    //Capturando a nova aba
    const newPage = await pagePromise;
    await newPage.waitForLoadState();

    console.log(await newPage.title());
    await expect(newPage).toHaveURL('https://github.com/microsoft/playwright');
})