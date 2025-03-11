import { Locator, Page, expect } from "@playwright/test";

class ProductsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    elements = {
        productTitle: (parent?: Locator) => (parent ? parent.locator('[data-test="inventory-item-name"]') : this.page.locator('[data-test="inventory-item-name"]')),
        productPrice: (parent?: Locator) => (parent ? parent.locator('[data-test="inventory-item-price"]') : this.page.locator('[data-test="inventory-item-price"]')),
    };

    async verifierContenuDesProduits(product: Locator): Promise<void> {
        await expect(this.elements.productTitle(product)).toBeVisible();
        await expect(this.elements.productPrice(product)).toBeVisible();
    }
}

export default ProductsPage;
