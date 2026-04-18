import * as ProductHelpers from "../support/helpers/productHelpers";
import * as BasketHelpers from "../support/helpers/basketHelpers";
import * as NavigationHelpers from "../support/helpers/navigationHelpers";
import * as CommonHelpers from "../support/helpers/commonHelpers";

describe("Amazon Shopping - Search and Basket Verification", () => {
  it("Searches cheapest Snickers and Skittles, adds both to basket, verifies calculation, and checks checkout redirect", () => {
    // 1. Start with a clean basket and home page
    NavigationHelpers.navigateToAmazonHomepage();

    // 2. Search for the cheapest Snickers and add it
    ProductHelpers.searchForProduct("Snickers");
    ProductHelpers.verifySearchResults("Snickers");
    ProductHelpers.findCheapestProductPrice();
    BasketHelpers.addProductToCart();

    // 3. Search for the cheapest Skittles and add it
    ProductHelpers.searchForProduct("Skittles");
    ProductHelpers.verifySearchResults("Skittles");
		cy.wait(2000); // Wait for search results to stabilize
    ProductHelpers.findCheapestProductPrice();
    BasketHelpers.addProductToCart();

    // 4. Verify basket state and calculation
    BasketHelpers.verifyBasketCount(2);

    // 5. Proceed to checkout and verify redirect to registration
    NavigationHelpers.proceedToCheckout();
    NavigationHelpers.verifyRedirectToRegistration();
    NavigationHelpers.verifyLoginRegistrationOptions();
  });
});

