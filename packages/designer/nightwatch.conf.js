const path = require('path');

const COMMON = {
  acceptInsecureCerts: true,
  javascriptEnabled: true,
  acceptSslCerts: true,
};
const CHROME = {
  ...COMMON,
  browserName: 'chrome',
  chromeOptions: {
    w3c: false,
  },
};

const reportDir = path.resolve(process.cwd(), '.reports/nightwatch');

module.exports = {
  src_folders: ['tests/e2e'],
  output_folder: reportDir,
  custom_commands_path: ['./node_modules/nightwatch-axe-verbose/src/commands'],
  test_settings: {
    default: {
      screenshots: {
        enabled: true,
        path: path.resolve(reportDir, 'screenshots'),
        on_failure: true,
      },
    },
    chrome: {
      webdriver: {
        start_process: true,
        server_path: './chromedriver.exe',
        port: 9515,
      },
      desiredCapabilities: CHROME,
    },
  },
};
