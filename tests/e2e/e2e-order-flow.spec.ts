import { test, expect } from '../../src/fixtures/test.fixture';
import { generateUserData, generatePaymentData } from '../../src/utils/testData';

test.describe('E2E User Journey - Automation Exercise', () => {
  test('Complete Flow: Register User -> Add Product to Cart -> Checkout -> Place Order -> Teardown', async ({
    homePage,
    authPage,
    productsPage,
    cartPage,
    checkoutPage,
    paymentPage,
    page,
  }) => {
    const user = generateUserData();
    const payment = generatePaymentData(user.name);

    // Step 1: Launch application and verify homepage
    await homePage.open();
    await expect(page).toHaveTitle(/Automation Exercise/);
    await homePage.captureScreenshot('01_homepage_loaded');

    // Step 2: Navigate to Signup / Login
    await homePage.clickSignupLogin();
    await expect(page).toHaveURL(/.*login/);

    // Step 3: Initiate Signup with dynamic user details
    await authPage.initiateSignup(user.name, user.email);

    // Step 4: Fill complete registration form and submit
    await authPage.fillAccountInformation(user);
    await expect(authPage.accountCreatedHeader).toBeVisible({ timeout: 15000 });
    await authPage.captureScreenshot('02_account_created');

    // Step 5: Continue to authenticated homepage
    await authPage.clickContinue();
    const isLoggedIn = await homePage.isLoggedInAs(user.name);
    expect(isLoggedIn).toBeTruthy();

    // Step 6: Navigate to Products catalog and add item to cart
    await homePage.clickProducts();
    await expect(page).toHaveURL(/.*products/);
    await productsPage.addFirstProductToCart();
    await productsPage.continueShopping();

    // Step 7: View Cart & Proceed to Checkout
    await homePage.clickCart();
    await expect(page).toHaveURL(/.*view_cart/);
    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBeGreaterThan(0);
    await cartPage.captureScreenshot('03_cart_items_verified');

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/.*checkout/);

    // Step 8: Add delivery comment & Place Order
    await checkoutPage.enterComment('High-priority SDET test order. Handle with care.');
    await checkoutPage.clickPlaceOrder();
    await expect(page).toHaveURL(/.*payment/);

    // Step 9: Enter Payment details & Confirm Order
    await paymentPage.fillPaymentDetails(payment);
    await paymentPage.submitPayment();
    await expect(paymentPage.orderSuccessText).toBeVisible({ timeout: 15000 });
    await paymentPage.captureScreenshot('04_order_success_confirmed');

    // Step 10: Clean Teardown - Delete Account to leave system clean
    await paymentPage.clickContinue();
    await homePage.deleteAccount();
    await expect(authPage.accountDeletedHeader).toBeVisible({ timeout: 15000 });
    await authPage.captureScreenshot('05_account_deleted_teardown');
    await authPage.clickContinue();
  });
});
