#!/bin/bash

# Setup Validation Script for Amazon E2E Testing Suite
# This script verifies that all dependencies and configurations are correct

echo "=========================================="
echo "Amazon E2E Testing Suite - Setup Validator"
echo "=========================================="
echo ""

# Track validation status
VALIDATION_PASSED=true
CHECKS_TOTAL=0
CHECKS_PASSED=0

# Helper function to print status
check_item() {
    local itemName=$1
    local command=$2
    ((CHECKS_TOTAL++))
    
    if eval "$command" > /dev/null 2>&1; then
        echo "✅ $itemName"
        ((CHECKS_PASSED++))
    else
        echo "❌ $itemName"
        VALIDATION_PASSED=false
    fi
}

# Check Node.js
echo "🔍 Checking System Dependencies..."
check_item "Node.js installed" "command -v node"
check_item "npm installed" "command -v npm"
echo ""

# Check Node.js version
echo "📦 Version Information:"
echo "   Node.js: $(node --version 2>/dev/null || echo 'not found')"
echo "   npm: $(npm --version 2>/dev/null || echo 'not found')"
echo ""

# Check project structure
echo "🗂️  Checking Project Structure..."
check_item "cypress/ directory exists" "[ -d 'cypress' ]"
check_item "package.json exists" "[ -f 'package.json' ]"
check_item "cypress.config.js exists" "[ -f 'cypress.config.js' ]"
check_item "Feature file exists" "[ -f 'cypress/e2e/amazon-shopping.feature' ]"
check_item "Step definitions exist" "[ -f 'cypress/e2e/amazon-shopping.cy.js' ]"
echo ""

# Check helper files
echo "🎯 Checking Helper Files..."
check_item "productHelpers.js exists" "[ -f 'cypress/support/helpers/productHelpers.js' ]"
check_item "basketHelpers.js exists" "[ -f 'cypress/support/helpers/basketHelpers.js' ]"
check_item "navigationHelpers.js exists" "[ -f 'cypress/support/helpers/navigationHelpers.js' ]"
check_item "commonHelpers.js exists" "[ -f 'cypress/support/helpers/commonHelpers.js' ]"
echo ""

# Check documentation
echo "📚 Checking Documentation..."
check_item "README.md exists" "[ -f 'README.md' ]"
check_item "INSTALLATION.md exists" "[ -f 'INSTALLATION.md' ]"
check_item "QUICK_START.md exists" "[ -f 'QUICK_START.md' ]"
echo ""

# Check dependencies
echo "📦 Checking Node Modules..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules/ directory exists"
    ((CHECKS_PASSED++))
else
    echo "⚠️  node_modules/ not found - Run 'npm install' first"
    VALIDATION_PASSED=false
fi
((CHECKS_TOTAL++))

check_item "Cypress installed" "[ -d 'node_modules/cypress' ]"
check_item "Cucumber preprocessor installed" "[ -d 'node_modules/@badeball' ]"
echo ""

# Try to check Cypress version
echo "🧪 Checking Cypress..."
if command -v npx &> /dev/null; then
    CYPRESS_VERSION=$(npx cypress --version 2>/dev/null || echo "not found")
    echo "   Cypress: $CYPRESS_VERSION"
    
    if [ "$CYPRESS_VERSION" != "not found" ]; then
        echo "✅ Cypress executable works"
        ((CHECKS_PASSED++))
    else
        echo "❌ Cypress executable not working"
        VALIDATION_PASSED=false
    fi
else
    echo "⚠️  npx not available"
fi
((CHECKS_TOTAL++))
echo ""

# Validation Summary
echo "=========================================="
echo "📋 Validation Summary"
echo "=========================================="
echo "Checks Passed: $CHECKS_PASSED / $CHECKS_TOTAL"
echo ""

if [ "$VALIDATION_PASSED" = true ]; then
    echo "✅ All checks passed!"
    echo ""
    echo "Next steps:"
    echo "  1. Review README.md for documentation"
    echo "  2. Run: npm run test:headed"
    echo "  3. Or run: npm run test:chrome"
    echo ""
    exit 0
else
    echo "❌ Some checks failed!"
    echo ""
    echo "To fix missing dependencies:"
    echo "  1. Make sure Node.js is installed: https://nodejs.org/"
    echo "  2. Run: npm install"
    echo "  3. Re-run this validation script"
    echo ""
    exit 1
fi
