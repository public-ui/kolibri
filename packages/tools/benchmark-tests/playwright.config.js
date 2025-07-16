import { defineConfig, devices } from '@playwright/test';

const TEST_TIMEOUT = parseInt(process.env.TEST_TIMEOUT || '10000', 10);

export default defineConfig({
	testDir: 'tests',
	testMatch: '*.playwright.ts',
	timeout: 2 * TEST_TIMEOUT,
	use: {
		headless: true,
		viewport: { width: 800, height: 600 },
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
			launchOptions: {
				args: ['--js-flags=--expose-gc'],
			},
		},
	],
	webServer: {
		command: 'npx serve -p 3000',
		cwd: 'public',
		reuseExistingServer: false,
		url: 'http://localhost:3000',
	},
});
