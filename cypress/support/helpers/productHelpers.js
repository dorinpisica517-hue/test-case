// Product searching and manipulation helpers
function parsePriceText(text) {
  const normalized = text.replace(/[^0-9.]/g, "");
  return parseFloat(normalized);
}

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
	cy.get('.a-button.a-button-base').eq(0).scrollIntoView().should('be.visible');
	cy.get('.a-button.a-button-base').eq(0).click();
	cy.pause();
}

export function getProductName() {
  return cy
    .get('[data-component-type="s-result-item"]')
    .first()
    .find("h2 a span")
    .invoke("text")
    .then((name) => {
      cy.wrap(name).as("addedProductName");
      return name;
    });
}

export function verifyProductDetailsLoaded() {
  cy.get('[data-feature-name="dp-price-block"]', { timeout: 10000 }).should(
    "exist"
  );
}
