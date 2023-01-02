const path = require('path');
const chromedriver = require('chromedriver');

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
	plugins: ['nightwatch-axe-verbose'],
	output_folder: reportDir,
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
				server_path: chromedriver.path,
				port: 9515,
			},
			desiredCapabilities: CHROME,
		},
	},
};
