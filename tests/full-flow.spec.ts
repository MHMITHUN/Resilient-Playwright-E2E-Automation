import { test, expect } from '../src/fixtures/test.fixture';
import { generateUserData, generatePaymentData } from '../src/utils/testData';

test.describe('Automation Exercise - Full Flow', () => {
  test('Sign up / Login, Add to Cart, Checkout & Place Order', async ({
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

    // 1. Open site
    await homePage.open();
    await expect(page).toHaveTitle(/Automation Exercise/);

    // 2. Click Signup / Login
    await homePage.clickSignupLogin();
    await expect(page).toHaveURL(/.*login/);

    // 3. Sign up (create new account)
    await authPage.initiateSignup(user.name, user.email);

    // 4. Fill account info
    await authPage.fillAccountInformation(user);
    await expect(authPage.accountCreatedHeader).toBeVisible({ timeout: 15000 });

    // Handle continue click
    await authPage.clickContinue();

    // 5. Verify logged in (name appears in nav)
    const isLoggedIn = await homePage.isLoggedInAs(user.name);
    expect(isLoggedIn).toBeTruthy();

    // 6. Go to Products
    await homePage.clickProducts();
    await expect(page).toHaveURL(/.*products/);

    // 7. Add first product to cart
    await productsPage.addFirstProductToCart();
    await productsPage.continueShopping();

    // 8. View Cart
    await homePage.clickCart();
    await expect(page).toHaveURL(/.*view_cart/);

    // 9. Proceed to Checkout
    await cartPage.proceedToCheckout();

    // 10. Place Order
    await checkoutPage.enterComment('Please deliver ASAP');
    await checkoutPage.clickPlaceOrder();

    // 11. Payment
    await paymentPage.fillPaymentDetails(payment);
    await paymentPage.submitPayment();

    // 12. Verify order success
    await expect(paymentPage.orderPlacedHeading).toBeVisible({ timeout: 20000 });
    await expect(paymentPage.orderSuccessText).toBeVisible();
  });
});
