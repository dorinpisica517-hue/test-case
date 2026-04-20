# Amazon E2E Testing Suite

A comprehensive, automated end-to-end testing solution for Amazon with professional reporting capabilities. Perfect for quality assurance teams, developers, and business stakeholders who need reliable test automation without technical complexity.

## 📋 Overview

This testing suite validates critical Amazon shopping workflows using business-readable test scenarios. Every test run generates exportable reports that can be shared with stakeholders, integrated into CI/CD pipelines, or archived for compliance.

### Key Benefits for Customers

- **🤖 Zero Technical Setup**: Run tests with simple npm commands
- **📊 Professional Reports**: Business-friendly HTML reports with executive summaries
- **📈 Multiple Export Formats**: JSON, XML, and PDF options for different use cases
- **🎬 Visual Evidence**: Video recordings and screenshots for complete traceability
- **🔄 Automated Workflow**: Tests run automatically and generate reports instantly

### What Gets Tested

The suite validates complete shopping journeys written in plain English:

- **Product Discovery**: Search and price comparison functionality
- **Shopping Cart**: Add, remove, and verify cart contents
- **Checkout Process**: Payment and registration workflows
- **User Experience**: Navigation and responsiveness across devices

## 🧪 Test Scenarios

The test suite includes comprehensive end-to-end scenarios written in descriptive, business-readable language:

### ✅ Complete Shopping Workflow

**As a customer, I want to search for and purchase the cheapest candy products so that I can save money on my shopping**

- Navigate to Amazon homepage
- Search for "Snickers" candy bars
- Sort results by price (low to high)
- Select and add the cheapest Snickers to cart
- Search for "Skittles" candy
- Add the cheapest Skittles to cart
- Verify cart contains 2 items
- Proceed to checkout
- Verify redirect to sign-in page

## ✨ Key Features

- **📊 Automated Reporting**: Generate professional HTML reports instantly after test execution
- **📄 Exportable Formats**: JSON, XML, and PDF exports for different business needs
- **💼 Business Language**: Test scenarios written as "As a customer, I want to..." statements
- **🎬 Visual Documentation**: Automatic video recording and failure screenshots
- **🔄 CI/CD Ready**: JUnit XML output compatible with all major CI platforms
- **🌐 Multi-Browser Support**: Chrome, Firefox, and Edge compatibility
- **🖥️ Cross-Platform**: Windows, Linux, and macOS support
- **📈 Executive Dashboards**: Summary statistics and trend analysis capabilities

## 🚀 Quick Start for Customers

### Prerequisites

- **Node.js**: Version 16+ ([Download](https://nodejs.org/))
- **npm**: Included with Node.js
- **Web Browser**: Chrome, Firefox, or Edge

### Installation (3 Simple Steps)

1. **Download and extract the project files**

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run tests and generate report**

   ```bash
   # Run tests in Chrome
   npm run test:chrome

   # Generate professional HTML report
   npm run generate-report

   # View your report
   open cypress/reports/index.html
   ```

### What You'll Get

After running the above commands, you'll have:

- ✅ Complete test execution results
- 📊 Professional HTML report with business-readable descriptions
- 📹 Video recording of test execution
- 📸 Screenshots of any failures
- 📄 Exportable JSON data for further analysis

### Understanding Your Test Results

The HTML report shows test scenarios written in plain English:

- **"As a customer, I want to search for and purchase the cheapest candy products so that I can save money on my shopping"**
- **"As a customer, I want to verify my shopping cart maintains product information so that I can review my selections"**

Each test includes execution time, pass/fail status, and detailed error information if applicable.

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
│   │   └── amazon-shopping.cy.js       # Main test specification
│   ├── support/
│   │   ├── commands.js                 # Custom Cypress commands
│   │   ├── e2e.js                      # Global setup and hooks
│   │   └── helpers/
│   │       ├── productHelpers.js       # Product search/selection logic
│   │       ├── basketHelpers.js        # Basket operations
│   │       └── navigationHelpers.js    # Navigation and checkout
│   ├── downloads/                      # Downloaded files during tests
│   ├── fixtures/                       # Test data files
│   ├── reports/                        # Generated test reports (HTML, JSON, XML)
│   ├── screenshots/                    # Test failure screenshots
│   └── videos/                         # Test execution video recordings
├── browserstack.json                   # BrowserStack configuration
├── cypress.config.js                   # Cypress configuration
├── generate-report.js                  # HTML report generator script
├── package.json                        # Dependencies and scripts
├── INSTALLATION.md                     # Detailed installation guide
├── PROJECT_SETUP.md                    # Project setup summary
├── QUICK_START.md                      # Developer quick reference
├── validate-setup.bat                  # Windows setup validation
├── validate-setup.sh                   # Unix setup validation
└── README.md                           # This file
```

## 🧪 Test Scenarios

The test suite includes comprehensive end-to-end scenarios written in descriptive, business-readable language:

### 1. Complete Shopping Workflow

**As a customer, I want to search for and purchase the cheapest candy products so that I can save money on my shopping**

- Navigate to Amazon homepage
- Search for "Snickers" candy bars
- Sort results by price (low to high)
- Select and add the cheapest Snickers to cart
- Search for "Skittles" candy
- Add the cheapest Skittles to cart
- Verify cart contains 2 items
- Proceed to checkout
- Verify redirect to sign-in page

### 2. Shopping Cart Persistence

**As a customer, I want to verify my shopping cart maintains product information so that I can review my selections**

- Start with empty shopping cart
- Add a Snickers product to cart
- Navigate to cart page
- Verify product details are maintained
- Confirm cart count is accurate

## 🛠️ Helper Functions

### Product Helpers (`productHelpers.js`)

- `searchForProduct(productName)` - Search for a product using Amazon's search box
- `verifySearchResults(productName)` - Confirm search results appear and contain the product
- `findCheapestProductPrice()` - Sort products by price and select the cheapest option

### Basket Helpers (`basketHelpers.js`)

- `addProductToCart()` - Add the selected product to the shopping basket
- `verifyBasketCount(expectedCount)` - Assert the correct number of items in basket

### Navigation Helpers (`navigationHelpers.js`)

- `navigateToAmazonHomepage()` - Navigate to Amazon's main page
- `proceedToCheckout()` - Start the checkout process
- `verifyRedirectToRegistration()` - Confirm redirection to login/signup page
- `verifyLoginRegistrationOptions()` - Verify login and registration options are displayed
- `handleContinueShoppingIfPresent()` - Handle Amazon's continue shopping modal if it appears

## 🔧 Configuration

### Cypress Configuration (`cypress.config.js`)

The main configuration includes:

- **Base URL**: `https://www.amazon.com` (configurable for different regions)
- **Viewport**: 1280x720 (desktop testing)
- **Timeouts**: 30s page load, 10s command timeout
- **Retries**: 1 retry in headless mode, 0 in interactive mode

### BrowserStack Integration (`browserstack.json`)

For cloud-based testing across multiple browser/OS combinations:

- Configured browsers: Chrome, Edge on Windows 10
- Authentication credentials included
- Supports parallel test execution

### Platform Configuration (`platform-config.js`)

Advanced configuration for different platforms and environments.

## 📊 Test Reporting

### Automated Exportable Reports

The project generates comprehensive, exportable test reports in multiple formats automatically after test execution:

#### HTML Reports (Business-Ready)

- **Generate**: `npm run generate-report`
- **Location**: `cypress/reports/index.html`
- **Features**:
  - Executive summary with pass/fail statistics
  - Business-readable test descriptions ("As a customer, I want to...")
  - Detailed execution times and error messages
  - One-click JSON export functionality
  - Print-friendly formatting for reports
  - Color-coded status indicators

#### JSON Reports (Integration-Ready)

- **Location**: `cypress/reports/test-results.json`
- **Usage**: Perfect for CI/CD pipelines and custom dashboards
- **Contains**: Complete test execution data, screenshots, videos, and metadata

#### JUnit XML Reports (CI/CD Standard)

- **Location**: `cypress/reports/junit-*.xml`
- **Usage**: Native integration with Jenkins, GitLab CI, Azure DevOps
- **Standard**: Compatible with all major testing frameworks and CI tools

#### Visual Evidence

- **Screenshots**: `cypress/screenshots/` (automatic on test failures)
- **Videos**: `cypress/videos/` (complete test execution recordings, kept only when tests fail)
- **Console Output**: Real-time results displayed in terminal

### Complete Reporting Workflow

```bash
# 1. Run tests (automatically generates JSON data)
npm run test:chrome

# 2. Generate HTML report from test results
npm run generate-report

# 3. View professional report
open cypress/reports/index.html

# 4. Export data (optional - click button in HTML report)
# JSON export available directly from the HTML report
```

### Report Export Options

- **HTML Export**: Save/print directly from browser
- **JSON Export**: Click "Export Report (JSON)" button in HTML report
- **PDF Export**: Use browser's print to PDF functionality
- **XML Integration**: JUnit files ready for CI/CD pipelines

## 🎯 How to Use the Reports

### For Business Stakeholders

1. Open `cypress/reports/index.html` in any web browser
2. Review the executive summary showing pass/fail statistics
3. Read test scenarios in plain English to understand what was validated
4. Export JSON data for integration with other business intelligence tools

### For Development Teams

1. Use JUnit XML files for CI/CD pipeline integration
2. Review video recordings for debugging failed tests
3. Analyze JSON data for performance metrics and trends
4. Share HTML reports with product owners and QA teams

### For Compliance & Auditing

1. Generate timestamped reports for regulatory requirements
2. Export PDF versions for formal documentation
3. Archive JSON data for long-term analysis
4. Include screenshots and videos as evidence of test execution

## 🖥️ Cross-Platform Setup

### Windows

```bash
# Use Command Prompt or PowerShell
npm install
npm run test:chrome
```

Use `validate-setup.bat` to verify your setup.

### macOS

```bash
# Use Terminal
npm install
npm run test:chrome
```

Use `validate-setup.sh` to verify your setup.

### Linux

```bash
# Use Terminal
npm install
npm run test:chrome
```

Use `validate-setup.sh` to verify your setup.

## 🌐 Browser Compatibility

| Browser | Status | Notes |
|---------|--------|-------|
| Chrome  | ✅ Supported | Primary browser for testing |
| Firefox | ✅ Supported | Full feature support |
| Edge    | ✅ Supported | Chromium-based Edge |

## 🔍 Debugging

### Enable Debug Mode

```bash
npm run test:debug
```

This runs tests in headed mode with Chrome, keeping the browser open for inspection.

### View Console Logs

During interactive testing (`npm run test:headed`), open DevTools (F12) to see console messages and errors.

### Add Custom Logging

In your test files or helpers:

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

### Issue: Tests pass locally but fail in CI/CD

**Solution**:

- Use headless mode: `npm run test:chrome`
- Add explicit waits: `cy.wait(1000)` between actions
- Check for conflicting browser extensions

## 📚 Learning Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress API Reference](https://docs.cypress.io/api/api/table-of-contents)

## 🤝 Contributing

When adding new tests:

1. **Follow DRY principle**: Use existing helpers before creating new ones
2. **Organize code**: Place logic in appropriate helper files
3. **Document changes**: Update this README if adding new features
4. **Test thoroughly**: Run tests across all supported browsers

## 📝 Example: Adding a New Test

### Step 1: Add Test Case

In `amazon-shopping.cy.js`:

```javascript
it("New test scenario description", () => {
  // Use existing helpers
  NavigationHelpers.navigateToAmazonHomepage();
  ProductHelpers.searchForProduct("New Product");
  // Add your test logic
});
```

### Step 2: Add Helper Function (if needed)

In appropriate helper file, e.g., `productHelpers.js`:

```javascript
export function newHelperFunction() {
  // Your helper logic
}
```

## 📞 Support

For issues or questions:

1. Check the [Ttroubleshooting](#-troubleshooting) section
2. Review test logs in `cypress/screenshots/` or `cypress/videos/`
3. Inspect the Amazon page structure using browser DevTools
4. Check the detailed guides: `INSTALLATION.md`, `QUICK_START.md`

## 📄 License

This project is provided as-is for testing purposes.

---

**Version**: 1.0.0
**Last Updated**: April 20, 2026
**Tested On**: Chrome, Firefox, Edge | Windows, Linux, macOS
**Reporting**: HTML, JSON, JUnit XML | Video on Failure | Screenshots Included
