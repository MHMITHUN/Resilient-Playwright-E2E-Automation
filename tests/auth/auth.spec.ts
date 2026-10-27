import { test, expect } from '../../src/fixtures/test.fixture';
import { generateUserData } from '../../src/utils/testData';

test.describe('Authentication Scenarios', () => {
  test('User Login with incorrect credentials displays appropriate error', async ({
    homePage,
    authPage,
    page,
  }) => {
    await homePage.open();
    await homePage.clickSignupLogin();

    await authPage.login('nonexistent_user_9999@example.com', 'WrongPassword123');
    await expect(authPage.loginErrorMessage).toBeVisible({ timeout: 10000 });
    await expect(authPage.loginErrorMessage).toHaveText(/Your email or password is incorrect/);
  });

  test('User Registration and subsequent Logout', async ({
    homePage,
    authPage,
    page,
  }) => {
    const user = generateUserData();

    await homePage.open();
    await homePage.clickSignupLogin();
    await authPage.initiateSignup(user.name, user.email);
    await authPage.fillAccountInformation(user);
    await expect(authPage.accountCreatedHeader).toBeVisible();

    await authPage.clickContinue();
    await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible();

    // Perform Logout
    await homePage.clickLogout();
    await expect(page).toHaveURL(/.*login/);
    await expect(authPage.loginButton).toBeVisible();
  });
});
