// Navigation helpers for checkout and page transitions
export function proceedToCheckout() {
  cy.get('[name="proceedToRetailCheckout"]').click();
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

export function handleContinueShoppingIfPresent(attempts = 8) {
  if (attempts === 0) {
    cy.log('Continue shopping section not found, continuing...');
    return;
  }

  cy.get('body').then(($body) => {
    const hasMessage = $body.text().includes('Click the button below to continue shopping');

    if (hasMessage) {
      cy.contains('button, a, .a-button-text', 'Continue shopping')
        .click({ force: true });
    } else {
      cy.wait(1000);
      handleContinueShoppingIfPresent(attempts - 1);
    }
  });
}
