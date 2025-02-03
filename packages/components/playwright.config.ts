import { devices, expect } from '@playwright/test';
import { createConfig, matchers } from '@stencil/playwright';

expect.extend(matchers);

const TEST_PORT = '3333';
const TEST_URL = `http://localhost:${TEST_PORT}`;

/* See https://playwright.dev/docs/test-configuration */
export default createConfig({
	testMatch: /.*\.e2e\.ts$/,
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: [['html', { open: 'never' }]],
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},
		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},
	],
	use: {
		baseURL: TEST_URL,
		timezoneId: 'Europe/Berlin',
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure',
	},
	webServer: {
		url: TEST_URL,
		reuseExistingServer: false,
		/* The builtin Stencil server sometimes fails to serve some assets which leads to intermittent test failures. Use a more stable server (without watcher) for CI: */
		...(process.env.CI ? { command: `stencil build --dev && mv dist-e2e/kolibri dist-e2e/build && npx serve dist-e2e -p ${TEST_PORT} -L` } : {}),
	},
});
