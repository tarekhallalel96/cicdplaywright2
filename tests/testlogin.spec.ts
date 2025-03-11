import { test, expect } from '@playwright/test';
import LoginPage from "../pages/login.page";
import { exec } from 'child_process';

test('Login àvec username et ot de passe correcte ', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    const loginPage:LoginPage = new LoginPage (page);
    await loginPage.saisirPassword('standard_user')
    await loginPage.saisirUsername('secret_sauce')
    await loginPage.CliquesurLogin()
    await expect(await loginPage.getErrorMessage()).toBeVisible();

    await expect(page).toHaveURL('https://www.saucedemo.com/' + 'inventory.html');
});


test('Login àvec username incorrecte et ot de passe correcte ', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');


    await page.getByPlaceholder('Username').fill('incorrecte_standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products')).toBeUndefined
});


test('Login àvec username et mot de passe incorrecte ', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');


    await page.getByPlaceholder('Username').fill('incorrecte_standard_user');
    await page.getByPlaceholder('Password').fill('incorrecte_secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products')).toBeUndefined
});

test('Login àvec username correcte et ot de passe incorrecte ', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');


    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('incorrecte_secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Products')).toBeUndefined
});