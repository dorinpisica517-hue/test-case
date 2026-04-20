const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  video: true,
  videosFolder: "cypress/videos",
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/reports/junit-[hash].xml',
    toConsole: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Add JSON reporting for custom HTML reports
      on("after:run", (results) => {
        if (results) {
          const fs = require('fs');
          const path = require('path');

          const reportsDir = path.join(process.cwd(), 'cypress/reports');
          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
          }

          // Save results as JSON for custom reporting
          const jsonReportPath = path.join(reportsDir, 'test-results.json');
          fs.writeFileSync(jsonReportPath, JSON.stringify(results, null, 2));

          console.log(`📊 Test results saved to: ${jsonReportPath}`);

          // Clean up videos if all tests passed
          if (results.totalFailed === 0) {
            const videosDir = path.join(process.cwd(), 'cypress/videos');
            if (fs.existsSync(videosDir)) {
              try {
                const videoFiles = fs.readdirSync(videosDir);
                videoFiles.forEach(file => {
                  if (file.endsWith('.mp4')) {
                    const videoPath = path.join(videosDir, file);
                    fs.unlinkSync(videoPath);
                    console.log(`🗑️ Deleted video file (all tests passed): ${file}`);
                  }
                });
              } catch (error) {
                console.warn('⚠️ Could not clean up video files:', error.message);
              }
            }
          } else {
            console.log(`🎬 Kept video recordings (${results.totalFailed} test(s) failed)`);
          }
        }
      });
      return config;
    },
    baseUrl: "https://www.amazon.com",
    viewportWidth: 1280,
    viewportHeight: 720,
    specPattern: "cypress/e2e/**/*.cy.js",
    retries: {
      runMode: 1,
      openMode: 0,
    },
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
  },
});
