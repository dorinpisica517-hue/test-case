// Basket manipulation and verification helpers

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
  cy.get('body').then(($body) => {

    // If Add to Cart button exists
    if ($body.find('#add-to-cart-button').length > 0) {
      cy.get('#add-to-cart-button')
        .should('be.visible')
        .click();

    // If add to cart button is not present, check for "See All Buying Options"
    } else if ($body.find('#buybox-see-all-buying-choices').length > 0) {
      cy.get('#buybox-see-all-buying-choices')
        .should('be.visible')
        .click();

      cy.get('#aod-container').should('exist');
      cy.get('#a-autoid-2-offer-1')
        .should('exist')
        .click();

    } else {
      cy.log('No Add to Cart or Buying Options button found');
    }

  });
}
