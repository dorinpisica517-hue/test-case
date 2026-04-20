import * as ProductHelpers from "../support/helpers/productHelpers";
import * as BasketHelpers from "../support/helpers/basketHelpers";
import * as NavigationHelpers from "../support/helpers/navigationHelpers";

describe("Amazon Shopping - Search and Basket Verification", () => {
  it("Search cheapest products, add them to cart and verify checkout redirect", () => {
    // Navigate to the Amazon homepage
    NavigationHelpers.navigateToAmazonHomepage();
    NavigationHelpers.handleContinueShoppingIfPresent();

    // Search for the cheapest Snickers and add it in your cart
    ProductHelpers.searchForProduct("Snickers");
    ProductHelpers.verifySearchResults("Snickers");
    ProductHelpers.findCheapestProductPrice();
    BasketHelpers.addProductToCart();

    // Search for the cheapest Skittles and add it in your cart
    ProductHelpers.searchForProduct("Skittles");
    ProductHelpers.verifySearchResults("Skittles");
    cy.wait(2000); // Wait for search results to stabilize
    ProductHelpers.findCheapestProductPrice();
    BasketHelpers.addProductToCart();

    // Verify the cart item calculation
    BasketHelpers.verifyBasketCount(2);

    // Proceed to checkout and verify redirect to registration
    NavigationHelpers.proceedToCheckout();
    NavigationHelpers.verifyRedirectToRegistration();
    NavigationHelpers.verifyLoginRegistrationOptions();
  });
});

