import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';
import * as process from 'process';

// Validate and set ENVs
const PORT = parseInt(process.env.KOLIBRI_VISUAL_TEST_PORT || '', 10);
const BASE_URL = `http://localhost:${PORT}`;

const CWD = process.env.KOLIBRI_CWD ?? '';
const TIMEOUT = parseInt(process.env.KOLIBRI_VISUAL_TESTS_TIMEOUT || '15000', 10);
const EXPECT_TIMEOUT = parseInt(process.env.KOLIBRI_VISUAL_TESTS_EXPECT_TIMEOUT || '5000', 10);
const BUILD_PATH = process.env.KOLIBRI_VISUAL_TESTS_BUILD_PATH ?? '';
const THEME = (process.env.THEME_EXPORT || 'default').toLocaleLowerCase();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	snapshotDir: path.join(CWD, 'snapshots'),
	// snapshotPathTemplate: '',
	outputDir: path.join(CWD, 'test-results'),
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Allow to override the expectation timeout for slow environments */
	timeout: TIMEOUT,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'line',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: BASE_URL,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	expect: {
		timeout: EXPECT_TIMEOUT,
	},

	/* Configure projects for major browsers */
	projects: [
		// {
		// 	name: 'chrome',
		// 	use: { ...devices['Desktop Chrome'] },
		// },
		// {
		// 	name: 'edge',
		// 	use: { ...devices['Desktop Edge'] },
		// },
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: `npx serve -p ${PORT}`,
		cwd: path.resolve(BUILD_PATH),
		url: BASE_URL,
		reuseExistingServer: false,
	},
	snapshotPathTemplate: `{snapshotDir}/theme-${THEME}/{arg}-{projectName}-{platform}{ext}`,
});
