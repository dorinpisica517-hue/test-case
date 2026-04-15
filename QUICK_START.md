# Quick Start Guide - For Developers

A quick reference guide for developers working with the Amazon E2E Testing Suite.

## 🚀 First Time Setup (2 minutes)

```bash
# 1. Navigate to project directory
cd /path/to/amazon-e2e-testing

# 2. Install dependencies (once per machine)
npm install

# 3. Run tests
npm run test:chrome
```

## ✅ Project Status

This is a **production-ready** Cypress + Cucumber test suite with:

✅ **4 Complete Test Scenarios**

- Search for cheapest products
- Add multiple products and verify calculations
- Check checkout redirection to registration
- Verify basket persistence

✅ **Reusable Helper Functions** (DRY Principle)

- `productHelpers.js` - Product search & selection
- `basketHelpers.js` - Cart operations
- `navigationHelpers.js` - Page navigation
- `commonHelpers.js` - Shared utilities

✅ **Multi-Browser Support**

- Chrome (primary)
- Firefox
- Edge

✅ **Multi-OS Support**

- Windows 10+
- macOS 10.15+
- Linux (Ubuntu 18+)

✅ **Comprehensive Documentation**

- README.md - Full documentation
- INSTALLATION.md - Step-by-step setup guide
- QUICK_START.md - This file

## 📁 Key Files

| File | Purpose |
| ------ | --------- |
| `cypress.config.js` | Main configuration with Cucumber setup |
| `package.json` | Dependencies & scripts |
| `cypress/e2e/amazon-shopping.feature` | Cucumber test scenarios (Gherkin) |
| `cypress/e2e/amazon-shopping.cy.js` | Step definitions |
| `cypress/support/helpers/` | Reusable function libraries |
| `platform-config.js` | Browser & platform configurations |
| `.env.example` | Environment variable template |

## 🧪 Available NPM Scripts

```bash
npm run test:chrome        # Run all tests in Chrome (headless)
npm run test:firefox       # Run all tests in Firefox (headless)
npm run test:edge          # Run all tests in Edge (headless)
npm run test:headed        # Open interactive Cypress GUI
npm run test:debug         # Run with visual debugging
npm run test:all-browsers  # Run Chrome → Firefox → Edge
```

## 🎯 Example: Running a Specific Test

To run only critical tests:

```bash
# Edit cypress.config.js and add:
# specPattern: "cypress/e2e/*.feature"
```

Or use Cypress filter in the GUI:

```bash
npm run test:headed
# Then select the feature file you want to run
```

## 🔗 Test Scenarios at a Glance

### Scenario 1: Search & Add Single Product

```gherkin
When I search for "Snickers"
And I add the cheapest product to basket
Then basket count should update to 1
```

### Scenario 2: Multiple Products & Calculation

```gherkin
When I search for "Snickers"
And I add the cheapest product to basket
And I search for "Skittles"
And I add the cheapest product to basket
Then basket total should be calculated correctly
```

### Scenario 3: Checkout Redirect

```gherkin
When I proceed to checkout
Then I should be redirected to registration page
```

### Scenario 4: Navigation & Persistence

```gherkin
When I navigate back to search
Then basket count should still be 1
```

## 🛠️ Customization Guide

### Add a New Test Scenario

1. **Add to feature file** (`cypress/e2e/amazon-shopping.feature`):

```gherkin
@smoke
Scenario: Your new scenario
  When I do something
  Then something should happen
```

1. **Add step definition** (`cypress/e2e/amazon-shopping.cy.js`):

```javascript
When("I do something", () => {
  // Your code here
});

Then("something should happen", () => {
  // Your assertion here
});
```

1. **Create helper if needed** (in `cypress/support/helpers/`):

```javascript
export function doSomething() {
  // Reusable logic
}
```

### Change Amazon Region

In `cypress.config.js`:

```javascript
e2e: {
  baseUrl: "https://www.amazon.co.uk"  // UK
  // or
  // baseUrl: "https://www.amazon.de"  // Germany
  // baseUrl: "https://www.amazon.fr"  // France
}
```

### Adjust Timing

In `cypress.config.js`:

```javascript
e2e: {
  defaultCommandTimeout: 10000,  // 10 seconds per command
  pageLoadTimeout: 30000,        // 30 seconds for page load
  requestTimeout: 5000           // 5 seconds for API calls
}
```

## 🐛 Quick Debugging

**Tests failing?** Try these steps:

1. **Run in GUI mode** to see what's happening:

   ```bash
   npm run test:headed
   ```

2. **Add wait times** if Amazon is slow:

   ```javascript
   cy.wait(2000);  // Wait 2 seconds
   ```

3. **Use debug logs**:

   ```javascript
   cy.log('Current basket count: ' + count);
   ```

4. **Check screenshots**:

   ```bash
   open cypress/screenshots/
   ```

5. **Review video**:

   ```bash
   open cypress/videos/
   ```

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
name: Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run test:chrome
```

### Run on Schedule

```yaml
on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9am
```

## 📊 Test Reports

Tests automatically generate:

- `cypress/screenshots/` - Screenshots on failure
- `cypress/videos/` - Full test execution videos
- Console output - Test results summary

## 🎓 Learning Resources

- [Cypress Docs](https://docs.cypress.io/)
- [Gherkin Syntax](https://cucumber.io/docs/gherkin/)
- [BDD Testing](https://en.wikipedia.org/wiki/Behavior-driven_development)

## 📝 Code Examples

### Search for a product and check results

```javascript
When("I search for {string}", (productName) => {
  ProductHelpers.searchForProduct(productName);
  cy.get('[data-component-type="s-search-results"]').should("exist");
});
```

### Verify basket calculation

```javascript
Then("basket total should be calculated correctly", () => {
  BasketHelpers.verifyBasketCalculation();
});
```

### Custom command usage

```javascript
cy.navigateToAmazon();
cy.searchProduct("Snickers");
cy.addToBasket();
```

## ⚡ Performance Tips

1. **Use CSS selectors** (faster than XPath):

   ```javascript
   cy.get('[data-test="add-to-basket"]')  // ✅ Fast
   cy.xpath('//button[text()="Add"]')      // ❌ Slower
   ```

2. **Avoid hard waits** when possible:

   ```javascript
   cy.get('.product').should('exist')     // ✅ Smart wait
   cy.wait(5000)                          // ❌ Hard wait
   ```

3. **Parallelize test runs** with Cypress Cloud

## 🎉 You're All Set

Your Amazon E2E testing suite is ready to use. For more details, see:

- **Setup**: [INSTALLATION.md](INSTALLATION.md)
- **Full Docs**: [README.md](README.md)

Happy testing! 🧪

---

**Version**: 1.0.0  
**Last Updated**: April 2026  
**Maintained For**: Chrome, Firefox, Edge | Windows, Linux, macOS
