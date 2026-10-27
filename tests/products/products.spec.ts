import { test, expect } from '../../src/fixtures/test.fixture';

test.describe('Products and Cart Scenarios', () => {
  test('Search products and verify search results', async ({ homePage, productsPage, page }) => {
    await homePage.open();
    await homePage.clickProducts();
    await expect(page).toHaveURL(/.*products/);

    const searchTerm = 'Dress';
    await productsPage.searchProduct(searchTerm);

    await expect(productsPage.productsHeader).toHaveText('Searched Products');
    const count = await productsPage.productItems.count();
    expect(count).toBeGreaterThan(0);
  });

  test('Add multiple products to cart and verify cart contents', async ({
    homePage,
    productsPage,
    cartPage,
    page,
  }) => {
    await homePage.open();
    await homePage.clickProducts();

    // Add 1st item
    await productsPage.addProductByIndex(0);
    await productsPage.continueShopping();

    // Add 2nd item
    await productsPage.addProductByIndex(1);
    await productsPage.goToCartFromModal();

    await expect(page).toHaveURL(/.*view_cart/);
    const cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(2);
  });
});
