import { test, expect } from '@playwright/test';
import LoginPage from "../pages/login.page";
import ProductPage from "../pages/product.page";

test.describe("Tests Produits", () => {
    let loginPage: LoginPage;
    let productPage: ProductPage;

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);

        await loginPage.saisirUsername('standard_user');
        await loginPage.saisirPassword('secret_sauce');
        await loginPage.CliquesurLogin();
        
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test("[@contenu] Tester le contenu de la page", async ({ page }) => {
        const products = await page.locator("[data-test='inventory-item']").all(); 

        for (const product of products) {
            await productPage.verifierContenuDesProduits(product);
        }
    });

    test("[@accueil] Il accède à la page d'accueil", async ({ page }) => {
        const items = await page.locator(".inventory_item").count();
        expect(items).toBeGreaterThan(1);
    });

    test.afterEach(async ({ page }) => {
        console.log("Test terminé !");
    });
});
