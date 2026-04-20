// Custom commands for Amazon testing

Cypress.Commands.add('goToBasket', () => {
  cy.get('#nav-cart-count-container').click()
  cy.url().should('include', '/cart')
})

Cypress.Commands.add('acceptCookies', () => {
  cy.get('body').then(($body) => {
    const selectors = [
      'button[data-action="a-expander-toggle"]',
      'button:contains("Accept")',
      '[role="dialog"] button:contains("Accept")'
    ]
    selectors.forEach((selector) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).first().click({ force: true })
      }
    })
  })
})

Cypress.Commands.add('addToBasket', () => {
  cy.get('[data-component-type="s-result-item"]').first().as('cheapestProduct')
  cy.get('@cheapestProduct')
    .find('button:has-text("Add to Basket"), button:has-text("Add to basket")')
    .first()
    .click({ force: true })
})