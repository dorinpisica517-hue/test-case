// Import commands
import './commands'

// Disable uncaught exception handling for testing
Cypress.on('uncaught:exception', (err, runnable) => {
  // Return false to prevent Cypress from failing the test
  // This is useful for handling Amazon's AJAX errors
  return false
})

// Set up before hooks
beforeEach(() => {
  // Optionally set viewport for cross-browser testing
  cy.viewport(1280, 720)
})

// Handle network errors gracefully
Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  const mergedOptions = {
    failOnStatusCode: false,
    ...options
  }
  return originalFn(url, mergedOptions)
})