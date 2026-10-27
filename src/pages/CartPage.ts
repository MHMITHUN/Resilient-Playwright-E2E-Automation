import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly proceedToCheckoutBtn: Locator = this.page.locator('.check_out');
  readonly cartItems: Locator = this.page.locator('#cart_info_table tbody tr');
  readonly registerLoginModalLink: Locator = this.page.locator('.modal-content a[href="/login"]');

  async proceedToCheckout() {
    await this.safeClick(this.proceedToCheckoutBtn);
    await this.dismissAdOverlays();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getItemNames(): Promise<string[]> {
    return await this.cartItems.locator('.cart_description h4 a').allInnerTexts();
  }
}
