import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  readonly navHome: Locator = this.page.getByRole('link', { name: 'Home' });
  readonly navProducts: Locator = this.page.getByRole('link', { name: 'Products' });
  readonly navCart: Locator = this.page.getByRole('link', { name: 'Cart' });
  readonly navSignupLogin: Locator = this.page.getByRole('link', { name: 'Signup / Login' });
  readonly navContactUs: Locator = this.page.getByRole('link', { name: 'Contact us' });
  readonly navLogout: Locator = this.page.getByRole('link', { name: 'Logout' });
  readonly navDeleteAccount: Locator = this.page.getByRole('link', { name: 'Delete Account' });
  readonly loggedInUserText: Locator = this.page.locator('li:has-text("Logged in as")');
  readonly newsletterInput: Locator = this.page.locator('#susbscribe_email');
  readonly newsletterButton: Locator = this.page.locator('#subscribe');
  readonly newsletterSuccess: Locator = this.page.locator('.alert-success');

  async open() {
    await this.goto('/');
  }

  async clickSignupLogin() {
    await this.safeClick(this.navSignupLogin);
    await this.dismissAdOverlays();
  }

  async clickProducts() {
    await this.safeClick(this.navProducts);
    await this.dismissAdOverlays();
  }

  async clickCart() {
    await this.safeClick(this.navCart);
    await this.dismissAdOverlays();
  }

  async clickContactUs() {
    await this.safeClick(this.navContactUs);
    await this.dismissAdOverlays();
  }

  async clickLogout() {
    await this.safeClick(this.navLogout);
    await this.dismissAdOverlays();
  }

  async deleteAccount() {
    await this.safeClick(this.navDeleteAccount);
    await this.dismissAdOverlays();
  }

  async isLoggedInAs(name: string): Promise<boolean> {
    await this.dismissAdOverlays();
    return await this.page.getByText(`Logged in as ${name}`).isVisible();
  }

  async subscribeNewsletter(email: string) {
    await this.newsletterInput.scrollIntoViewIfNeeded();
    await this.newsletterInput.fill(email);
    await this.newsletterButton.click();
  }
}
