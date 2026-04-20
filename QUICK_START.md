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

This is a **production-ready** Cypress test suite with:

✅ **Complete Test Scenario**

- Search for cheapest products, add to cart with checkout verification

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
| `cypress.config.js` | Main configuration |
| `package.json` | Dependencies & scripts |
| `cypress/e2e/amazon-shopping.cy.js` | Main test specification |
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
npm run generate-report    # Generate professional HTML test reports
```

## 🎯 Example: Running a Specific Test

To run only critical tests:

```bash
# Edit cypress.config.js and add:
# specPattern: "cypress/e2e/*.cy.js"
```

Or use Cypress filter in the GUI:

```bash
npm run test:headed
# Then select the test file you want to run
```

## 🔗 Test Scenario at a Glance

### Complete Shopping Workflow

1. Navigate to Amazon homepage
2. Search for cheapest Snickers, add to cart
3. Search for cheapest Skittles, add to cart
4. Verify basket contains 2 items
5. Proceed to checkout and verify login/registration redirect

## 🛠️ Customization Guide

### Add a New Test Scenario

1. **Add to test file** (`cypress/e2e/amazon-shopping.cy.js`):

```javascript
it("As a customer, I want to [describe what you're testing]", () => {
  // Your test code here
  cy.visit('/');
  // Add your test steps
});
```

2. **Use helper functions** from `cypress/support/helpers/`:

```javascript
import { addToBasket, navigateToProduct } from '../support/helpers/basketHelpers';
// Use the helpers in your test
```

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

## ☁️ BrowserStack Integration

Run tests on BrowserStack for cross-browser and cross-platform testing:

### Setup BrowserStack

1. **Get BrowserStack Credentials**
   - Sign up at [browserstack.com](https://www.browserstack.com)
   - Note your username and access key

2. **Install BrowserStack Local**

   ```bash
   npm install -g browserstack-local
   ```

3. **Configure Credentials**
   - Update `browserstack.json` with your credentials:

   ```json
   "auth": {
     "username": "your_browserstack_username",
     "access_key": "your_access_key"
   }
   ```

### Run Tests on BrowserStack

**Currently Configured Browsers:**

- Chrome (Windows 10, latest)
- Edge (Windows 10, latest)
- Safari (OS X Mojave, latest)
- Firefox (OS X Catalina, latest)

**Command to run on BrowserStack:**

```bash
npm install -g @browserstack/local
browserstack-cypress run
```

**Stop BrowserStack Local:**

```bash
browserstack-cypress stop
```

### BrowserStack Features

- ✅ Test on 2000+ browser/OS combinations
- ✅ Parallel test execution (4 parallel sessions configured)
- ✅ Visual regression testing
- ✅ Network throttling and geolocation testing
- ✅ Detailed logs and video recordings

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

Tests automatically generate multiple report formats:

### Automated HTML Reports

```bash
npm run generate-report
```

Creates professional reports at `cypress/reports/index.html` with:

- Executive summary with pass/fail statistics
- Business-readable test descriptions
- Detailed execution times and error messages
- One-click JSON export functionality
- Print-friendly formatting

### Additional Evidence

- `cypress/screenshots/` - Screenshots on failure
- `cypress/videos/` - Full test execution videos (kept only when tests fail)
- `cypress/reports/test-results.json` - Machine-readable data
- `cypress/reports/junit-*.xml` - CI/CD integration format
- Console output - Real-time test results summary

## 🎓 Learning Resources

- [Cypress Docs](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [JavaScript Testing](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing)

## 📝 Code Examples

### Search for a product and check results

```javascript
When("I search for {string}", (productName) => {
  ProductHelpers.searchForProduct(productName);
  cy.get('[data-component-type="s-search-results"]').should("exist");
});
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
