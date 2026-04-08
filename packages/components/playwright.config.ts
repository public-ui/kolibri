import { defineConfig, devices, expect } from '@playwright/test';
import { matchers } from '@stencil/playwright';

expect.extend(matchers);

/* See https://playwright.dev/docs/test-configuration */
export default defineConfig({
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
		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] },
		// },
		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] },
		// },
	],
	use: {
		timezoneId: 'Europe/Berlin',
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure',
	},
});
