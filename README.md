# Amazon E2E Testing Suite

A comprehensive end-to-end testing project for Amazon using Cypress and Cucumber. This test suite validates core Amazon functionality including product search, basket management, and checkout processes across multiple browsers and operating systems.

## 📋 Overview

This testing suite includes automation for the following user journey:

- Search for products (Snickers and Skittles)
- Identify and select the cheapest options
- Add products to the shopping basket
- Verify basket calculations
- Test checkout process and registration flow
- Validate multi-product purchases

## ✨ Key Features

- **Cucumber Feature Files**: Business-readable test scenarios using Gherkin syntax
- **Multi-Browser Support**: Tests run on Chrome, Firefox, and Edge
- **Cross-Platform**: Windows, Linux, and macOS support
- **DRY Principles**: Reusable helper functions and shared utilities
- **Comprehensive Documentation**: Easy setup for new team members
- **Modular Architecture**: Separated concerns (helpers, commands, support files)
- **Accessibility Tags**: Tests marked for easy filtering (@smoke, @critical, @regression)

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

- **Node.js**: Version 14+ ([Download](https://nodejs.org/))
- **npm**: Comes with Node.js
- **Git**: For cloning the repository (optional)

### Installation

1. **Clone or download the project**

   ```bash
   cd /path/to/amazon-e2e-testing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This will install:
   - Cypress (testing framework)
   - Cucumber preprocessor
   - Required development dependencies

3. **Verify installation**

   ```bash
   npx cypress --version
   ```

### Running Tests

#### Run Tests Headless (CLI Mode)

**Chrome** (default)

```bash
npm run test:chrome
```

**Firefox**

```bash
npm run test:firefox
```

**Edge**

```bash
npm run test:edge
```

**All Browsers**

```bash
npm run test:all-browsers
```

#### Interactive Testing (GUI Mode)

Open Cypress Test Runner:

```bash
npm run test:headed
```

Then select the spec files to run directly in the browser.

#### Debug Mode

Run with visual debugging capabilities:

```bash
npm run test:debug
```

## 📁 Project Structure

```
amazon-e2e-testing/
├── cypress/
│   ├── e2e/
│   │   ├── amazon-shopping.feature     # Cucumber scenarios
│   │   └── amazon-shopping.cy.js       # Step definitions
│   ├── support/
│   │   ├── commands.js                 # Custom Cypress commands
│   │   ├── e2e.js                      # Global setup and hooks
│   │   └── helpers/
│   │       ├── productHelpers.js       # Product search/selection logic
│   │       ├── basketHelpers.js        # Basket operations
│   │       ├── navigationHelpers.js    # Navigation and checkout
│   │       └── commonHelpers.js        # Shared utilities
├── cypress.config.js                   # Cypress configuration
├── package.json                        # Dependencies and scripts
└── README.md                           # This file
```

## 🧪 Test Scenarios

### 1. Search and Add Single Product

**Scenario**: Search for Snickers, find the cheapest option, and add to basket

```gherkin
Scenario: Search for cheapest snacks and add to basket
  When I search for "Snickers"
  Then I should see search results for "Snickers"
  And I find and note the cheapest product price
  When I add the cheapest product to basket
  Then the product should be added to basket
  And basket count should update to 1
```

### 2. Add Multiple Products

**Scenario**: Add multiple products and verify total calculation

```gherkin
Scenario: Add multiple products and verify basket total
  When I search for "Snickers"
  And I add the cheapest product to basket
  And I search for "Skittles"
  And I add the cheapest product to basket
  Then basket count should update to 2
  And basket total should be calculated correctly
```

### 3. Checkout Redirection

**Scenario**: Verify checkout redirects unregistered users to login/registration

```gherkin
Scenario: Verify checkout redirects to registration for new users
  When I proceed to checkout
  Then I should be redirected to registration page
  And I should see login/registration options
```

## 🛠️ Helper Functions

### Product Helpers (`productHelpers.js`)

- `searchForProduct(productName)` - Search for a product
- `verifySearchResults(productName)` - Confirm search results appear
- `addCheapestProductToBasket()` - Add lowest-priced item to basket
- `findAndNoteCheapestPrice()` - Track the cheapest product price

### Basket Helpers (`basketHelpers.js`)

- `getBasketCount()` - Get current item count
- `verifyBasketCount(expectedCount)` - Assert correct number of items
- `verifyBasketCalculation()` - Validate total price calculation
- `clearBasket()` - Remove all items from basket

### Navigation Helpers (`navigationHelpers.js`)

- `proceedToCheckout()` - Start checkout process
- `verifyRedirectToRegistration()` - Confirm redirection to login/signup
- `navigateToAmazonHomepage()` - Go to Amazon home page

### Common Helpers (`commonHelpers.js`)

- `acceptCookiesIfPresent()` - Dismiss cookie consent
- `waitForElement(selector)` - Wait for element to appear
- `scrollToElement(selector)` - Scroll to element
- `clearLocalStorage()` - Clear browser storage
- `setViewport(width, height)` - Set browser viewport

## 🔧 Configuration

### Configure for Different Regions

Edit `cypress.config.js` to change the Amazon URL:

```javascript
e2e: {
  baseUrl: "https://www.amazon.com",  // Change to .co.uk, .de, etc.
  // ... other config
}
```

### Adjust Timeouts

Modify timeouts in `cypress.config.js`:

```javascript
e2e: {
  pageLoadTimeout: 30000,        // Page load timeout (ms)
  defaultCommandTimeout: 10000,  // Command timeout (ms)
  retries: {
    runMode: 1,    // Retry once in headless mode
    openMode: 0    // No retries in interactive mode
  }
}
```

## 📊 Test Reporting

### Generate Reports

Tests automatically create reports in `cypress/reports/` directory. View HTML reports:

```bash
open cypress/reports/index.html
```

### Using Test Tags

Run tests with specific tags using Cucumber syntax:

```bash
# Run only critical tests
npx cypress run --env tags="@critical"

# Run smoke tests
npx cypress run --env tags="@smoke"

# Run regression tests
npx cypress run --env tags="@regression"
```

## 🖥️ Cross-Platform Setup

### Windows

```bash
# Use Node.js Command Prompt or PowerShell
npm install
npm run test:chrome
```

### macOS

```bash
# Use Terminal
npm install
npm run test:chrome
```

### Linux

```bash
# Use Terminal
npm install
npm run test:chrome
```

## 🌐 Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome  | ✅ Supported | Primary browser for testing |
| Firefox | ✅ Supported | Full feature support |
| Edge    | ✅ Supported | Chromium-based Edge |
| Safari  | ⚠️ Limited | Limited Cypress support on macOS |

## 🔍 Debugging

### Enable Debug Mode

```bash
DEBUG=cypress:* npm run test:debug
```

### View Console Logs

During interactive testing (`npm run test:headed`), open DevTools (F12) to see console messages and errors.

### Add Custom Logging

In your step definitions or helpers:

```javascript
cy.log('Your debug message')
console.log('Your variable:', variableName)
```

## ⚠️ Troubleshooting

### Issue: Tests fail on Amazon website changes

**Solution**: Amazon's HTML structure may change. Update selectors in helper files to match current DOM:

```bash
# Run in headed mode to inspect elements
npm run test:headed
# Use DevTools to identify new selectors
```

### Issue: Timeout errors when searching

**Solution**: Increase timeouts in `cypress.config.js`:

```javascript
defaultCommandTimeout: 15000  // Increase from 10000
pageLoadTimeout: 40000        // Increase from 30000
```

### Issue: Cookie consent dialog blocks tests

**Solution**: The `acceptCookiesIfPresent()` function handles this, but if new dialogs appear, add selectors to `commonHelpers.js`.

### Issue: Tests pass locally but fail in CI/CD

**Solution**:

- Use headless mode: `npm run test:chrome`
- Add explicit waits: `cy.wait(1000)` between actions
- Disable plugins: Check `cypress.config.js` for conflicting dependencies

## 📚 Learning Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cucumber/Gherkin Guide](https://cucumber.io/docs/gherkin/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress API Reference](https://docs.cypress.io/api/api/table-of-contents)

## 🤝 Contributing

When adding new tests:

1. **Follow DRY principle**: Use existing helpers before creating new ones
2. **Use Gherkin syntax**: Write clear feature files for business stakeholders
3. **Organize helpers**: Place logic in appropriate helper files
4. **Tag tests properly**: Use `@smoke`, `@critical`, `@regression` tags
5. **Document complex steps**: Add comments for non-obvious logic

## 📝 Example: Adding a New Test

### Step 1: Add Feature Scenario

```gherkin
@smoke
Scenario: Filter products by price
  When I search for "Snickers"
  And I apply price filter from 0 to 10
  Then products should be within price range
```

### Step 2: Create Step Definition

```javascript
When("I apply price filter from {int} to {int}", (min, max) => {
  ProductHelpers.filterByPrice(min, max);
});
```

### Step 3: Add Helper Function

```javascript
export function filterByPrice(min, max) {
  cy.get('.a-price-range input').first().type(min);
  cy.get('.a-price-range input').last().type(max);
  cy.get('button:contains("Go")').click();
}
```

## 📞 Support

For issues or questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Review [Learning Resources](#-learning-resources)
3. Check test logs in `cypress/screenshots/` or `cypress/videos/`
4. Inspect the Amazon page structure using browser DevTools

## 📄 License

This project is provided as-is for testing purposes.

---

**Last Updated**: April 2026
**Maintained For**: Chrome, Firefox, Edge | Windows, Linux, macOS
