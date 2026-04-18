// Basket manipulation and verification helpers
function parsePriceText(text) {
  const normalized = text.replace(/[^0-9.]/g, "");
  return parseFloat(normalized);
}

export function getBasketCount() {
  return cy
    .get("#nav-cart-count")
    .invoke("text")
    .then((count) => {
      return parseInt(count.trim());
    });
}

export function verifyBasketCount(expectedCount) {
  cy.get("#nav-cart-count")
    .invoke("text")
    .then((count) => {
      const actualCount = parseInt(count.trim());
      expect(actualCount).to.equal(expectedCount);
    });
}

export function addProductToCart() {
  // Click on the  See All Buying Options button 
  cy.get('#buybox-see-all-buying-choices').should("exist").click();
  
  // Verify basket counter is visible and updated
  cy.get("#aod-container").should("exist");
  cy.get("#a-autoid-2-offer-1").should("exist").click();
}
