@echo off
REM Setup Validation Script for Amazon E2E Testing Suite - Windows Version
REM This script verifies that all dependencies and configurations are correct

setlocal enabledelayedexpansion
cls

echo.
echo ==========================================
echo Amazon E2E Testing Suite - Setup Validator
echo ==========================================
echo.

REM Track validation status
set VALIDATION_PASSED=true
set CHECKS_TOTAL=0
set CHECKS_PASSED=0

REM Check Node.js
echo 🔍 Checking System Dependencies...
where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Node.js installed
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ Node.js installed
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1

where npm >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ npm installed
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ npm installed
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1
echo.

REM Check version information
echo 📦 Version Information:
for /f "delims=" %%i in ('node --version 2^>nul') do (
    echo    Node.js: %%i
)
for /f "delims=" %%i in ('npm --version 2^>nul') do (
    echo    npm: %%i
)
echo.

REM Check project structure
echo 🗂️  Checking Project Structure...

if exist "cypress" (
    echo ✅ cypress/ directory exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ cypress/ directory NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1

if exist "package.json" (
    echo ✅ package.json exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ package.json NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1

if exist "cypress.config.js" (
    echo ✅ cypress.config.js exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ cypress.config.js NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1

if exist "cypress\e2e\amazon-shopping.cy.js" (
    echo ✅ Test file exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ Test file NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1
echo.

REM Check helper files
echo 🎯 Checking Helper Files...

if exist "cypress\support\helpers\productHelpers.js" (
    echo ✅ productHelpers.js exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ productHelpers.js NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1

if exist "cypress\support\helpers\basketHelpers.js" (
    echo ✅ basketHelpers.js exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ basketHelpers.js NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1

if exist "cypress\support\helpers\navigationHelpers.js" (
    echo ✅ navigationHelpers.js exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ navigationHelpers.js NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1

if exist "cypress\support\helpers\commonHelpers.js" (
    echo ✅ commonHelpers.js exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ commonHelpers.js NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1
echo.

REM Check documentation
echo 📚 Checking Documentation...

if exist "README.md" (
    echo ✅ README.md exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ README.md NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1

if exist "INSTALLATION.md" (
    echo ✅ INSTALLATION.md exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ INSTALLATION.md NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1

if exist "QUICK_START.md" (
    echo ✅ QUICK_START.md exists
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ QUICK_START.md NOT found
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1
echo.

REM Check node_modules
echo 📦 Checking Node Modules...
if exist "node_modules" (
    echo ✅ node_modules/ directory exists
    set /a CHECKS_PASSED+=1
) else (
    echo ⚠️  node_modules/ NOT found - Run 'npm install' first
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1

if exist "node_modules\cypress" (
    echo ✅ Cypress installed
    set /a CHECKS_PASSED+=1
) else (
    echo ❌ Cypress NOT installed
    set VALIDATION_PASSED=false
)
set /a CHECKS_TOTAL+=1
echo.

REM Validation Summary
echo ==========================================
echo 📋 Validation Summary
echo ==========================================
echo Checks Passed: %CHECKS_PASSED% / %CHECKS_TOTAL%
echo.

if "%VALIDATION_PASSED%"=="true" (
    echo ✅ All checks passed!
    echo.
    echo Next steps:
    echo   1. Review README.md for documentation
    echo   2. Run: npm run test:headed
    echo   3. Or run: npm run test:chrome
    echo.
    exit /b 0
) else (
    echo ❌ Some checks failed!
    echo.
    echo To fix missing dependencies:
    echo   1. Make sure Node.js is installed: https://nodejs.org/
    echo   2. Run: npm install
    echo   3. Re-run this validation script
    echo.
    exit /b 1
)
