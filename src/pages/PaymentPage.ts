import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { PaymentData } from '../utils/testData';

export class PaymentPage extends BasePage {
  readonly nameOnCardInput: Locator = this.page.locator('input[data-qa="name-on-card"]');
  readonly cardNumberInput: Locator = this.page.locator('input[data-qa="card-number"]');
  readonly cvcInput: Locator = this.page.locator('input[data-qa="cvc"]');
  readonly expiryMonthInput: Locator = this.page.locator('input[data-qa="expiry-month"]');
  readonly expiryYearInput: Locator = this.page.locator('input[data-qa="expiry-year"]');
  readonly payAndConfirmButton: Locator = this.page.locator('button[data-qa="pay-button"]');
  readonly orderPlacedHeading: Locator = this.page.locator('h2[data-qa="order-placed"]');
  readonly orderSuccessText: Locator = this.page.getByText('Congratulations! Your order has been confirmed!');
  readonly downloadInvoiceButton: Locator = this.page.locator('a[href^="/download_invoice"]');
  readonly continueButton: Locator = this.page.locator('a[data-qa="continue-button"]');

  async fillPaymentDetails(payment: PaymentData) {
    await this.nameOnCardInput.fill(payment.nameOnCard);
    await this.cardNumberInput.fill(payment.cardNumber);
    await this.cvcInput.fill(payment.cvc);
    await this.expiryMonthInput.fill(payment.expiryMonth);
    await this.expiryYearInput.fill(payment.expiryYear);
  }

  async submitPayment() {
    await this.payAndConfirmButton.click();
    await expect(this.orderPlacedHeading).toBeVisible({ timeout: 20000 });
  }

  async clickContinue() {
    await this.continueButton.click();
    await this.dismissAdOverlays();
  }
}
