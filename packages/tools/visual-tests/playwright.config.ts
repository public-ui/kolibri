import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

const PORT = 9998;
const URL = `http://127.0.0.1:${PORT}`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: './tests',
	snapshotDir: path.join(process.env.KOLIBRI_CWD, 'snapshots'),
	// snapshotPathTemplate: '',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'dot',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: URL,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: `npx http-server ${process.env.KOLIBRI_VISUAL_TESTS_BUILD_PATH} -p ${PORT}`,
		url: URL,
		reuseExistingServer: false,
	},
});