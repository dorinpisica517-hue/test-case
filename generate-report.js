const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, 'cypress/reports');
const jsonReportPath = path.join(reportsDir, 'test-results.json');
const htmlReportPath = path.join(reportsDir, 'index.html');

// Check if JSON report exists
if (!fs.existsSync(jsonReportPath)) {
  console.log('❌ No test results found. Run tests first with: npm run test:chrome');
  process.exit(1);
}

try {
  const results = JSON.parse(fs.readFileSync(jsonReportPath, 'utf8'));

  // Create HTML report
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Amazon E2E Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .summary { display: flex; gap: 20px; margin-bottom: 20px; }
        .summary-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); flex: 1; text-align: center; }
        .passed { border-left: 4px solid #28a745; }
        .failed { border-left: 4px solid #dc3545; }
        .pending { border-left: 4px solid #ffc107; }
        .test-item { background: white; margin: 10px 0; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .test-passed { border-left: 4px solid #28a745; }
        .test-failed { border-left: 4px solid #dc3545; }
        .test-pending { border-left: 4px solid #ffc107; }
        .duration { color: #666; font-size: 0.9em; }
        .error { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; padding: 10px; border-radius: 4px; margin-top: 10px; }
        .export-btn { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 10px; }
        .export-btn:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🛒 Amazon E2E Test Report</h1>
        <p>Generated on: ${new Date().toLocaleString()}</p>
        <p>Environment: Production | Browser: Chrome</p>
    </div>

    <div class="summary">
        <div class="summary-card passed">
            <h2>${results.totalPassed || 0}</h2>
            <p>Passed Tests</p>
        </div>
        <div class="summary-card failed">
            <h2>${results.totalFailed || 0}</h2>
            <p>Failed Tests</p>
        </div>
        <div class="summary-card pending">
            <h2>${results.totalPending || 0}</h2>
            <p>Pending Tests</p>
        </div>
        <div class="summary-card">
            <h2>${((results.totalDuration || 0) / 1000).toFixed(1)}s</h2>
            <p>Total Duration</p>
        </div>
    </div>

    <button class="export-btn" onclick="exportReport()">📊 Export Report (JSON)</button>
    <button class="export-btn" onclick="printReport()">🖨️ Print Report</button>

    <h2>Test Results</h2>
    ${results.runs?.map(run => `
        <div class="test-item">
            <h3>📄 ${run.spec.name}</h3>
            <div class="duration">Duration: ${((run.stats.duration || 0) / 1000).toFixed(1)}s</div>
            ${run.tests?.map(test => `
                <div class="test-item test-${test.state}">
                    <h4>${test.state === 'passed' ? '✅' : test.state === 'failed' ? '❌' : '⏳'} ${test.title.join(' > ')}</h4>
                    <div class="duration">Duration: ${((test.duration || 0) / 1000).toFixed(1)}s</div>
                    ${test.state === 'failed' && test.err ? `
                        <div class="error">
                            <strong>Error:</strong> ${test.err.message || 'Unknown error'}
                        </div>
                    ` : ''}
                </div>
            `).join('') || ''}
        </div>
    `).join('') || '<p>No test results available</p>'}

    <script>
        function exportReport() {
            const dataStr = JSON.stringify(${JSON.stringify(results)}, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

            const exportFileDefaultName = 'amazon-e2e-test-report.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        }

        function printReport() {
            window.print();
        }
    </script>
</body>
</html>`;

  // Ensure reports directory exists
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Write HTML report
  fs.writeFileSync(htmlReportPath, html);

  console.log('✅ HTML test report generated successfully!');
  console.log(`📊 Report saved to: ${htmlReportPath}`);
  console.log(`🌐 Open in browser: file://${htmlReportPath}`);

} catch (error) {
  console.error('❌ Error generating report:', error.message);
  process.exit(1);
}