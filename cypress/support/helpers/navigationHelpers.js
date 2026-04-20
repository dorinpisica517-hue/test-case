// Navigation helpers for checkout and page transitions
export function proceedToCheckout() {
  cy.visit("/cart");
  cy.wait(1000);
  
  // Find and click the checkout button
  cy.get("input[name='proceedToRetailCheckout'], button:contains('Proceed to checkout')")
    .first()
    .click({ force: true });
}

export function verifyRedirectToRegistration() {
  // Check if we're on a login/registration page
  cy.url().then((url) => {
    expect(
      url.includes("/ap/signin") || 
      url.includes("/gp/cart") ||
      url.includes("/gp/checkout")
    ).to.be.true;
  });
  
  // Verify sign-in form elements exist
  cy.get(
    'input[name="email"], input[type="email"], input[name="username"]'
  ).should("exist");
}

export function verifyLoginRegistrationOptions() {
  // Check for "Create account" option
  cy.get('a:contains("Create"), button:contains("Create"), span:contains("Create your")')
    .should("exist");
  
  // Check for email/login input
  cy.get(
    'input[placeholder*="Email"], input[placeholder*="email"], input[type="email"]'
  ).should("exist");
}

export function navigateToAmazonHomepage() {
  cy.visit("/", { 
    failOnStatusCode: false,
    timeout: 60000
  });
  cy.get("body", { timeout: 15000 }).should("exist");
  // Wait for page to stabilize
  cy.wait(2000);
}
