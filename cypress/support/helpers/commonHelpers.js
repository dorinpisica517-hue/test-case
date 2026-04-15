// Common utility helpers
export function waitForElement(selector, timeout = 10000) {
  cy.get(selector, { timeout }).should("exist");
}

export function scrollToElement(selector) {
  cy.get(selector).scrollIntoView().should("be.visible");
}

export function getElementText(selector) {
  return cy.get(selector).invoke("text");
}

export function clickElement(selector) {
  cy.get(selector).click({ force: true });
}

export function typeText(selector, text) {
  cy.get(selector).clear().type(text);
}

export function verifyElementExists(selector) {
  cy.get(selector).should("exist");
}

export function verifyElementVisible(selector) {
  cy.get(selector).should("be.visible");
}

export function verifyElementContainsText(selector, text) {
  cy.get(selector).should("contain", text);
}

export function clearLocalStorage() {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
}

export function clearCookies() {
  cy.clearCookies();
}

export function setViewport(width = 1280, height = 720) {
  cy.viewport(width, height);
}

export function navigateToAmazon() {
  cy.visit("https://www.amazon.com", { 
    failOnStatusCode: false,
    timeout: 30000 
  });
  cy.get("body").should("exist");
}

export function handleAmazonPopups() {
  cy.get("body").then(($body) => {
    // Close any modal dialogs
    if ($body.find('[data-action="a-expander-toggle"]').length > 0) {
      cy.get('[data-action="a-expander-toggle"]').first().click({ force: true }).catch(() => {});
    }
  });
}
