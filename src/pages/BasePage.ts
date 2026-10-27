import { Page, Locator, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

export class BasePage {
  constructor(protected page: Page) {}

  /**
   * Navigate to a path, handle stealth setup, and wait out anti-bot verification
   */
  async goto(pathUrl = '/') {
    // Inject stealth before navigation if not already injected
    await this.page.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    }).catch(() => {});

    await this.page.goto(pathUrl, { waitUntil: 'domcontentloaded' });
    await this.waitForAntiBotChallenge();
    await this.dismissAdOverlays();
  }

  /**
   * Cloudflare verification challenge handler (non-intrusive)
   */
  async waitForAntiBotChallenge(timeout = 30000) {
    try {
      await this.page.waitForFunction(
        () => !document.title.includes('One moment') && !document.title.includes('Loading'),
        { timeout }
      );
    } catch {
      // If it still hasn't resolved within timeout, check if title is valid
      const title = await this.page.title();
      if (!title.includes('Automation Exercise')) {
        console.warn(`[BasePage] Current title is "${title}" after challenge timeout.`);
      }
    }
  }

  /**
   * Dismiss and suppress intrusive Google Ads / Vignettes that intercept Playwright clicks
   */
  async dismissAdOverlays() {
    // 1. Check if URL has been redirected to google vignette
    if (this.page.url().includes('#google_vignette')) {
      const cleanUrl = this.page.url().split('#')[0];
      await this.page.goto(cleanUrl, { waitUntil: 'domcontentloaded' }).catch(() => {});
    }

    // 2. Hide known ad iframes and sticky ad wrappers via CSS injection
    await this.page.addStyleTag({
      content: `
        iframe[id*="aswift"],
        iframe[name*="aswift"],
        ins.adsbygoogle,
        #google_esf,
        #ad_iframe,
        div[id^="google_ads_iframe"] {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `
    }).catch(() => {});
  }

  /**
   * Click with built-in ad dismissal fallback
   */
  async safeClick(locator: Locator) {
    await this.dismissAdOverlays();
    try {
      await locator.click();
    } catch {
      await this.dismissAdOverlays();
      await locator.click({ force: true });
    }
  }

  /**
   * Capture screenshot to screenshots directory
   */
  async captureScreenshot(name: string): Promise<string> {
    const screenshotDir = path.resolve(process.cwd(), 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
    }
    const cleanName = name.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const filePath = path.join(screenshotDir, `${cleanName}.png`);
    await this.page.screenshot({ path: filePath, fullPage: false });
    return filePath;
  }
}
