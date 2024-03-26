import { test, expect } from '@playwright/test';
import { ROUTES } from './sample-app.routes.js';

// https://github.com/microsoft/playwright/issues/7575#issuecomment-1288164474
export const configureSnapshotPath =
	() =>
	// eslint-disable-next-line no-empty-pattern
	({}, testInfo) => {
		const originalSnapshotPath = testInfo.snapshotPath;
		testInfo.snapshotPath = (snapshotName) => {
			const result = originalSnapshotPath
				.apply(testInfo, [snapshotName])

				// Remove browser name from snapshot name
				// .replace('-chromium', '')
				// .replace('-firefox', '')

				// Remove os name from snapshot name
				// .replace('-darwin', '')
				// .replace('-linux', '')
				// .replace('-windows', '')

				// Remove test counter from snapshot name
				.replace('-1-', '-')

				// Make different snapshot folder for different themes
				.replace('theme-snapshots.spec.js', `theme-${(process.env.THEME_EXPORT || 'default').toLocaleLowerCase()}`)
				.replace('-snapshots', '');
			return result;
		};
	};

test.beforeEach(configureSnapshotPath());

// https://playwright.dev/docs/emulation
test.use({
	colorScheme: 'light',
	locale: 'de-DE',
	isMobile: false,
	timezoneId: 'Europe/Berlin',
	viewport: {
		width: 800,
		height: 0,
	},
});

const blocklist = [];

ROUTES.forEach((options, route) => {
	if (blocklist.includes(route)) {
		return;
	}
	test(`snapshot for ${route}`, async ({ page }) => {
		await page.goto(`/#${route}?hideMenus`, { waitUntil: 'networkidle' });
		if (options?.viewportSize) {
			await page.setViewportSize(options.viewportSize);
		}
		if (options?.waitForTimeout) {
			await page.waitForTimeout(options.waitForTimeout);
		}
		await expect(page).toHaveScreenshot({
			fullPage: true,
			maxDiffPixelRatio: 0.025,
			...options,
		});
	});
});
