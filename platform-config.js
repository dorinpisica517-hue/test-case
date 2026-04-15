// platform-config.js
// Multi-OS and Browser Configuration for Cross-Platform Testing

module.exports = {
  // Platform-specific configurations
  platforms: {
    windows: {
      name: 'Windows',
      drivers: ['chrome', 'firefox', 'edge'],
      defaultBrowser: 'chrome',
      notificationIcon: 'explorer.exe'
    },
    linux: {
      name: 'Linux',
      drivers: ['chrome', 'firefox'],
      defaultBrowser: 'chrome',
      notificationIcon: 'nautilus'
    },
    macos: {
      name: 'macOS',
      drivers: ['chrome', 'firefox', 'edge'],
      defaultBrowser: 'chrome',
      notificationIcon: 'Finder'
    }
  },

  // Browser-specific configurations
  browsers: {
    chrome: {
      name: 'Chrome',
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-popup-blocking',
        '--disable-web-resources',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows'
      ],
      prefs: {
        'download.prompt_for_download': false,
        'profile.default_content_settings.popups': 0
      }
    },
    firefox: {
      name: 'Firefox',
      args: [
        '-private'
      ],
      prefs: {
        'browser.privatebrowsing.autostart': false
      }
    },
    edge: {
      name: 'Edge',
      args: [
        '--disable-blink-features=AutomationControlled'
      ]
    }
  },

  // Test environment configurations
  environments: {
    development: {
      baseUrl: 'https://www.amazon.com',
      apiUrl: 'https://www.amazon.com/api'
    },
    staging: {
      baseUrl: 'https://staging.amazon.com',
      apiUrl: 'https://staging.amazon.com/api'
    },
    production: {
      baseUrl: 'https://www.amazon.com',
      apiUrl: 'https://www.amazon.com/api'
    }
  },

  // Regional configurations
  regions: {
    us: {
      url: 'https://www.amazon.com',
      currency: 'USD',
      language: 'en'
    },
    uk: {
      url: 'https://www.amazon.co.uk',
      currency: 'GBP',
      language: 'en'
    },
    de: {
      url: 'https://www.amazon.de',
      currency: 'EUR',
      language: 'de'
    },
    fr: {
      url: 'https://www.amazon.fr',
      currency: 'EUR',
      language: 'fr'
    },
    ca: {
      url: 'https://www.amazon.ca',
      currency: 'CAD',
      language: 'en'
    }
  },

  // Performance thresholds
  performance: {
    pageLoadTime: 5000,
    elementInteractionTime: 1000,
    apiResponseTime: 3000
  },

  // Accessibility standards
  accessibility: {
    checkContrast: true,
    checkImages: true,
    checkForms: true,
    wcagLevel: 'AA'
  }
};
