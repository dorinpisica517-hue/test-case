export function searchForProduct(productName) {
  cy.get('input#twotabsearchtextbox').should("be.visible").click();
  cy.get('input#twotabsearchtextbox').clear().type(productName);
  cy.get('input[type="submit"]').first().click();
}

export function verifySearchResults(productName) {
  cy.get("h1").should("contain", productName);
  cy.get('.sg-col-inner h2.a-size-base').should("exist").and("contain", productName);
}

export function findCheapestProductPrice() {
  cy.get('.a-button-dropdown').click();
	cy.get('.a-dropdown-link').contains('Price: Low to High').click();
	cy.get('.s-product-image-container').eq(0).scrollIntoView().should('be.visible');
	cy.pause();
	cy.get('.s-product-image-container').eq(0).click();
}
