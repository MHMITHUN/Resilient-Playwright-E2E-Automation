import { Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ContactUsPage extends BasePage {
  readonly getInTouchHeading: Locator = this.page.locator('.contact-form h2.title');
  readonly nameInput: Locator = this.page.locator('input[data-qa="name"]');
  readonly emailInput: Locator = this.page.locator('input[data-qa="email"]');
  readonly subjectInput: Locator = this.page.locator('input[data-qa="subject"]');
  readonly messageTextarea: Locator = this.page.locator('textarea[data-qa="message"]');
  readonly uploadFileInput: Locator = this.page.locator('input[name="upload_file"]');
  readonly submitBtn: Locator = this.page.locator('input[data-qa="submit-button"]');
  readonly successMessage: Locator = this.page.locator('.status.alert-success');
  readonly homeBtn: Locator = this.page.locator('#form-section a.btn-success');

  async fillForm(data: { name: string; email: string; subject: string; message: string; filePath?: string }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageTextarea.fill(data.message);

    if (data.filePath) {
      await this.uploadFileInput.setInputFiles(data.filePath);
    }
  }

  async submit() {
    // Handle the browser confirmation dialog ('Press OK to proceed!')
    this.page.on('dialog', async (dialog) => {
      await dialog.accept().catch(() => {});
    });

    await this.safeClick(this.submitBtn);
    await expect(this.successMessage).toBeVisible({ timeout: 20000 });
  }

  async returnHome() {
    await this.safeClick(this.homeBtn);
    await this.dismissAdOverlays();
  }
}
