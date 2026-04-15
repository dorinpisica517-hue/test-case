# Installation Guide - Amazon E2E Testing Suite

This guide walks you through setting up the Amazon E2E Testing Suite on your computer, step by step.

## 📌 System Requirements

Before starting, ensure your computer meets these requirements:

- **RAM**: At least 4GB (8GB recommended)
- **Disk Space**: At least 500MB free space
- **Internet**: Active internet connection
- **Supported OS**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18+)

## 🔧 Step 1: Install Node.js

Node.js is required to run the test suite. It includes npm (Node Package Manager).

### Windows

1. Visit [nodejs.org](https://nodejs.org/)
2. Click the "LTS" (Long Term Support) version button
3. Run the installer (.msi file)
4. Follow the installation wizard (accept all defaults)
5. Open Command Prompt and verify:

   ```bash
   node --version
   npm --version
   ```

### macOS

1. Visit [nodejs.org](https://nodejs.org/)
2. Download the LTS version for macOS
3. Run the installer (.pkg file)
4. Follow the installation steps
5. Open Terminal and verify:

   ```bash
   node --version
   npm --version
   ```

### Linux (Ubuntu/Debian)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
```

## 📥 Step 2: Download the Test Project

### Option A: Clone from Git (Recommended)

```bash
git clone <repository-url>
cd amazon-e2e-testing
```

### Option B: Manual Download

1. Download the project as a ZIP file from your repository
2. Extract it to your desired location
3. Open a terminal/command prompt in the extracted folder

## 📚 Step 3: Install Dependencies

Navigate to the project folder and install required packages:

```bash
npm install
```

This will:

- Download Cypress (testing framework)
- Download Cucumber preprocessor
- Download other dependencies
- Create a `node_modules/` folder

**⏱️ This may take 2-5 minutes on first run.**

### Verify Installation

```bash
npx cypress --version
```

You should see version information displayed.

## 🎯 Step 4: First Test Run

### Run Tests in Headless Mode (Recommended for CI/CD)

#### Chrome

```bash
npm run test:chrome
```

#### Firefox

```bash
npm run test:firefox
```

#### Edge

```bash
npm run test:edge
```

### Run Tests in Interactive Mode (GUI)

To see the tests run visually in a browser:

```bash
npm run test:headed
```

This will:

1. Open the Cypress Test Runner window
2. Display available test files
3. Let you click to run individual tests
4. Show real-time test execution in a browser

## 📂 Project Structure

```
amazon-e2e-testing/
├── cypress/
│   ├── e2e/
│   │   ├── amazon-shopping.feature    ← Cucumber test scenarios
│   │   └── amazon-shopping.cy.js      ← Test steps implementation
│   ├── support/
│   │   ├── commands.js                ← Custom Cypress commands
│   │   ├── e2e.js                     ← Setup and hooks
│   │   └── helpers/                   ← Reusable functions
│   │       ├── productHelpers.js
│   │       ├── basketHelpers.js
│   │       ├── navigationHelpers.js
│   │       └── commonHelpers.js
├── cypress.config.js                  ← Main configuration file
├── package.json                       ← Dependencies list
├── platform-config.js                 ← Multi-OS configuration
├── README.md                          ← Full documentation
└── INSTALLATION.md                    ← This file
```

## 🌐 Available Commands

```bash
# Run tests in Chrome (headless)
npm run test:chrome

# Run tests in Firefox (headless)
npm run test:firefox

# Run tests in Edge (headless)
npm run test:edge

# Open interactive test runner
npm run test:headed

# Run with visual debugging
npm run test:debug

# Run all browsers sequentially
npm run test:all-browsers
```

## 🔍 Understanding Test Output

### Successful Test Run

```
Running: amazon-shopping.feature (1 of 1)
✓ Scenario: Search for cheapest snacks and add to basket (2ms)
✓ Scenario: Add multiple products and verify basket total (5ms)
✓ Scenario: Verify checkout redirects to registration (3ms)

Passing: 3
Failing: 0
Pending: 0
```

### Failed Test Run

If a test fails, you'll see:

- ❌ Which step failed
- Why it failed (assertion error, timeout, etc.)
- Screenshot of the page at failure point
- Video recording of the test execution

Check `cypress/screenshots/` and `cypress/videos/` directories.

## ⚙️ Configuration

### Change Amazon Region

Edit `cypress.config.js`:

```javascript
e2e: {
  baseUrl: "https://www.amazon.co.uk",  // Change to .de, .fr, .ca etc.
}
```

### Increase Timeouts

If tests timeout on slower internet:

```javascript
e2e: {
  pageLoadTimeout: 60000,      // 60 seconds
  defaultCommandTimeout: 15000 // 15 seconds
}
```

### Enable/Disable Videos

In `cypress.config.js`:

```javascript
e2e: {
  video: true,     // Record videos
  screenshot: true // Take screenshots on failure
}
```

## 🐛 Troubleshooting

### Issue: "npm: command not found"

**Solution**: Node.js wasn't installed correctly

- Reinstall Node.js from [nodejs.org](https://nodejs.org/)
- Restart your terminal after installation

### Issue: "port 3000 already in use"

**Solution**: Another service is using the port

```bash
# Kill the process (adjust port number if different)
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### Issue: Tests timeout on slow internet

**Solution**: Increase timeouts in `cypress.config.js` (see Configuration section)

### Issue: "Module not found" errors

**Solution**: Reinstall dependencies

```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Tests pass locally but fail in CI/CD

**Solution**:

- Use headless mode: `npm run test:chrome`
- Add explicit waits between actions
- Check for hardcoded paths or URLs

## 🌍 Continuous Integration (CI/CD)

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm install
      - run: npm run test:chrome
```

### GitLab CI Example

Create `.gitlab-ci.yml`:

```yaml
test:
  image: node:18
  script:
    - npm install
    - npm run test:chrome
```

## 💡 Tips for Success

1. **Keep Amazon URL updated**: Amazon may change their URL structure
2. **Run tests regularly**: Catch changes early
3. **Use descriptive test names**: Makes failures easier to understand
4. **Take screenshots**: Helps with debugging
5. **Review videos**: Visual evidence of test execution

## 📖 Next Steps

1. Read [README.md](README.md) for full documentation
2. Review test scenarios in `cypress/e2e/amazon-shopping.feature`
3. Explore helper functions in `cypress/support/helpers/`
4. Customize tests for your specific needs

## 🆘 Getting Help

If you encounter issues:

1. Check the Troubleshooting section above
2. Review [Cypress documentation](https://docs.cypress.io/)
3. Check Cypress server logs: `npm run test:debug`
4. Look for error messages in `cypress/screenshots/` and videos

## ✅ Installation Checklist

- [ ] Node.js installed and verified
- [ ] Project downloaded/cloned
- [ ] Dependencies installed (`npm install` completed)
- [ ] Cypress verified (`npx cypress --version` works)
- [ ] First test run successful
- [ ] Successfully opened Cypress Test Runner
- [ ] Ran at least one test scenario

**Congratulations!** Your test suite is ready to use! 🎉

---

**Need more help?** Refer to the main [README.md](README.md) file.
