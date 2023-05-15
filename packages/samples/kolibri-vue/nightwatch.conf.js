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
	'goog:chromeOptions': {
		// More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
		//
		// w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
		w3c: true,
		args: [
			//'--no-sandbox',
			//'--ignore-certificate-errors',
			//'--allow-insecure-localhost',
			//'--headless'
		],
	},
};

const reportDir = path.resolve(process.cwd(), '.reports/nightwatch');

module.exports = {
	src_folders: ['tests/e2e'],
	// // See https://nightwatchjs.org/guide/concepts/page-object-model.html
	// page_objects_path: [],
	// // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
	// custom_commands_path: [],
	// // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
	// custom_assertions_path: [],
	plugins: ['nightwatch-axe-verbose'],
	output_folder: reportDir,
	// // See https://nightwatchjs.org/guide/concepts/test-globals.html
	// globals_path: '',
	// webdriver: {},
	test_workers: {
		enabled: true,
	},
	test_settings: {
		default: {
			screenshots: {
				enabled: true,
				path: path.resolve(reportDir, 'screenshots'),
				on_failure: true,
			},
			// desiredCapabilities: {
			// 	browserName: 'chrome',
			// },
			// webdriver: {
			// 	start_process: true,
			// 	server_path: '',
			// },
		},
		chrome: {
			webdriver: {
				start_process: true,
				server_path: chromedriver.path,
				port: 9515,
				cli_args: [
					// --verbose
				],
			},
			desiredCapabilities: CHROME,
		},

		'android.real.chrome': {
			desiredCapabilities: {
				real_mobile: true,
				browserName: 'chrome',
				'goog:chromeOptions': {
					// More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
					//
					// w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
					w3c: true,
					args: [
						//'--no-sandbox',
						//'--ignore-certificate-errors',
						//'--allow-insecure-localhost',
						//'--headless'
					],
					androidPackage: 'com.android.chrome',
					// add the device serial to run tests on, if multiple devices are online
					// Run command: `$ANDROID_HOME/platform-tools/adb devices`
					// androidDeviceSerial: ''
				},
			},

			webdriver: {
				start_process: true,
				server_path: 'chromedriver-mobile/chromedriver',
				cli_args: [
					// --verbose
				],
			},
		},

		'android.emulator.chrome': {
			desiredCapabilities: {
				real_mobile: false,
				avd: 'nightwatch-android-11',
				browserName: 'chrome',
				'goog:chromeOptions': {
					// More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
					//
					// w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
					w3c: true,
					args: [
						//'--no-sandbox',
						//'--ignore-certificate-errors',
						//'--allow-insecure-localhost',
						//'--headless'
					],
					androidPackage: 'com.android.chrome',
					// add the device serial to run tests on, if multiple devices are online
					// Run command: `$ANDROID_HOME/platform-tools/adb devices`
					// androidDeviceSerial: ''
				},
			},

			webdriver: {
				start_process: true,
				server_path: 'chromedriver-mobile/chromedriver',
				cli_args: [
					// --verbose
				],
			},
		},
	},
};
