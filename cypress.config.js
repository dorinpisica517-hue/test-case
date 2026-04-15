const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: "https://www.amazon.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    specPattern: "cypress/e2e/amazon-shopping.cy.js",
    retries: {
      runMode: 1,
      openMode: 0,
    },
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
