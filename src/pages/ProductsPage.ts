import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  readonly searchInput: Locator = this.page.locator('#search_product');
  readonly searchButton: Locator = this.page.locator('#submit_search');
  readonly productsHeader: Locator = this.page.locator('.features_items h2.title');
  readonly productItems: Locator = this.page.locator('.features_items .col-sm-4');
  readonly modalContent: Locator = this.page.locator('.modal-content');
  readonly continueShoppingBtn: Locator = this.page.locator('button:has-text("Continue Shopping")');
  readonly viewCartLink: Locator = this.page.locator('.modal-content a[href="/view_cart"]');

  async searchProduct(name: string) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
    await this.dismissAdOverlays();
  }

  async addFirstProductToCart() {
    await this.productItems.first().hover();
    await this.productItems.first().locator('.add-to-cart').first().click();
    await expect(this.modalContent).toBeVisible({ timeout: 10000 });
  }

  async addProductByIndex(index: number) {
    const item = this.productItems.nth(index);
    await item.hover();
    await item.locator('.add-to-cart').first().click();
    await expect(this.modalContent).toBeVisible({ timeout: 10000 });
  }

  async continueShopping() {
    await this.continueShoppingBtn.click();
  }

  async goToCartFromModal() {
    await this.viewCartLink.click();
    await this.dismissAdOverlays();
  }
}
