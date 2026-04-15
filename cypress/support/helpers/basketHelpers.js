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

export function navigateToBasket() {
  cy.get("#nav-cart-count-container").click();
  cy.url().should("include", "/cart");
  cy.get("#sc-active-cart, .sc-list-item").should("exist");
}

export function verifyProductInBasket(productName) {
  cy.get(".sc-list-item-content").should("exist");
  cy.get("span.a-truncate-cut").should("contain", productName);
}

export function addProductToCart() {
  // Check for confirmation message
  cy.get('[data-action="a-popover-trigger"]').should("exist");
  
  // Verify basket counter is visible and updated
  cy.get("#nav-cart-count").should("exist");
  cy.get("#nav-cart-count")
    .invoke("text")
    .then((count) => {
      const countNum = parseInt(count.trim());
      expect(countNum).to.be.greaterThan(0);
    });
}

export function getCartItemPrices() {
  return cy.get("#sc-active-cart .sc-list-item, .sc-list-item").then(($items) => {
    const prices = [];

    $items.each((_, item) => {
      const $item = Cypress.$(item);
      let priceText = $item.find('.a-price .a-offscreen').first().text().trim();
      if (!priceText) {
        priceText = $item.find('.sc-product-price, .sc-item-price').first().text().trim();
      }
      const price = parsePriceText(priceText);
      if (!Number.isNaN(price)) {
        prices.push(price);
      }
    });

    return prices;
  });
}

export function getCartSubtotal() {
  return cy
    .contains(/Subtotal/i, { timeout: 15000 })
    .parents("div")
    .find('.a-price .a-offscreen')
    .first()
    .invoke("text")
    .then((text) => {
      return parsePriceText(text);
    });
}

export function verifyBasketCalculation() {
  navigateToBasket();
  getCartItemPrices().then((prices) => {
    const expectedTotal = prices.reduce((sum, value) => sum + value, 0);
    getCartSubtotal().then((subtotal) => {
      expect(subtotal).to.be.closeTo(expectedTotal, 0.5);
    });
  });
}

export function ensureBasketHasProducts(count) {
  getBasketCount().then((currentCount) => {
    if (currentCount < count) {
      for (let i = currentCount; i < count; i++) {
        cy.visit("/");
        cy.get('input#twotabsearchtextbox').type("Snickers{enter}");
        cy.wait(1000);
        cy.get('[data-component-type="s-result-item"]')
          .first()
          .find("h2 a")
          .first()
          .click({ force: true });
        cy.wait(2000);
        cy.get("#add-to-cart-button, input#add-to-cart-button", { timeout: 15000 })
          .first()
          .click({ force: true });
        cy.wait(1000);
      }
    }
  });
}
