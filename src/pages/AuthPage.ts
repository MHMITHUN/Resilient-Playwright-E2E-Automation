import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { UserRegistrationData } from '../utils/testData';

export class AuthPage extends BasePage {
  // Signup Elements
  readonly signupNameInput: Locator = this.page.locator('input[data-qa="signup-name"]');
  readonly signupEmailInput: Locator = this.page.locator('input[data-qa="signup-email"]');
  readonly signupButton: Locator = this.page.locator('button[data-qa="signup-button"]');

  // Account Information Elements
  readonly genderMrRadio: Locator = this.page.locator('#id_gender1');
  readonly genderMrsRadio: Locator = this.page.locator('#id_gender2');
  readonly passwordInput: Locator = this.page.locator('input[data-qa="password"]');
  readonly daysSelect: Locator = this.page.locator('select[data-qa="days"]');
  readonly monthsSelect: Locator = this.page.locator('select[data-qa="months"]');
  readonly yearsSelect: Locator = this.page.locator('select[data-qa="years"]');
  readonly newsletterCheckbox: Locator = this.page.locator('#newsletter');
  readonly optinCheckbox: Locator = this.page.locator('#optin');

  // Address Information Elements
  readonly firstNameInput: Locator = this.page.locator('input[data-qa="first_name"]');
  readonly lastNameInput: Locator = this.page.locator('input[data-qa="last_name"]');
  readonly companyInput: Locator = this.page.locator('input[data-qa="company"]');
  readonly addressInput: Locator = this.page.locator('input[data-qa="address"]');
  readonly address2Input: Locator = this.page.locator('input[data-qa="address2"]');
  readonly countrySelect: Locator = this.page.locator('select[data-qa="country"]');
  readonly stateInput: Locator = this.page.locator('input[data-qa="state"]');
  readonly cityInput: Locator = this.page.locator('input[data-qa="city"]');
  readonly zipcodeInput: Locator = this.page.locator('input[data-qa="zipcode"]');
  readonly mobileNumberInput: Locator = this.page.locator('input[data-qa="mobile_number"]');
  readonly createAccountButton: Locator = this.page.locator('button[data-qa="create-account"]');

  // Confirmation Elements
  readonly accountCreatedHeader: Locator = this.page.locator('h2[data-qa="account-created"]');
  readonly accountDeletedHeader: Locator = this.page.locator('h2[data-qa="account-deleted"]');
  readonly continueButton: Locator = this.page.locator('a[data-qa="continue-button"]');

  // Login Elements
  readonly loginEmailInput: Locator = this.page.locator('input[data-qa="login-email"]');
  readonly loginPasswordInput: Locator = this.page.locator('input[data-qa="login-password"]');
  readonly loginButton: Locator = this.page.locator('button[data-qa="login-button"]');
  readonly loginErrorMessage: Locator = this.page.locator('.login-form p[style*="color: red"]');
  readonly signupErrorMessage: Locator = this.page.locator('.signup-form p[style*="color: red"]');

  async initiateSignup(name: string, email: string) {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async fillAccountInformation(data: UserRegistrationData) {
    await expect(this.passwordInput).toBeVisible({ timeout: 15000 });

    if (data.title === 'Mr') {
      await this.genderMrRadio.check();
    } else {
      await this.genderMrsRadio.check();
    }

    await this.passwordInput.fill(data.password);
    await this.daysSelect.selectOption(data.day);
    await this.monthsSelect.selectOption(data.month);
    await this.yearsSelect.selectOption(data.year);

    await this.newsletterCheckbox.check();
    await this.optinCheckbox.check();

    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.companyInput.fill(data.company);
    await this.addressInput.fill(data.address);
    if (data.address2) {
      await this.address2Input.fill(data.address2);
    }
    await this.countrySelect.selectOption(data.country);
    await this.stateInput.fill(data.state);
    await this.cityInput.fill(data.city);
    await this.zipcodeInput.fill(data.zipcode);
    await this.mobileNumberInput.fill(data.mobileNumber);

    await this.createAccountButton.click();
  }

  async login(email: string, pass: string) {
    await this.loginEmailInput.fill(email);
    await this.loginPasswordInput.fill(pass);
    await this.loginButton.click();
  }

  async clickContinue() {
    await this.continueButton.click();
    await this.dismissAdOverlays();
  }
}
