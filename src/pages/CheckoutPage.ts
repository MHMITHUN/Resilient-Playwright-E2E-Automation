import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  readonly deliveryAddressBox: Locator = this.page.locator('#address_delivery');
  readonly billingAddressBox: Locator = this.page.locator('#address_invoice');
  readonly commentTextarea: Locator = this.page.locator('textarea[name="message"]');
  readonly placeOrderButton: Locator = this.page.locator('a[href="/payment"]');

  async enterComment(comment: string) {
    await this.commentTextarea.fill(comment);
  }

  async clickPlaceOrder() {
    await this.safeClick(this.placeOrderButton);
    await this.dismissAdOverlays();
  }
}
