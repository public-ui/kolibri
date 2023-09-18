import { test, expect } from '@playwright/test';
import { ROUTES } from './sample-app.routes.js';

// https://github.com/microsoft/playwright/issues/7575#issuecomment-1288164474
export const configureSnapshotPath =
	() =>
	({}, testInfo) => {
		const originalSnapshotPath = testInfo.snapshotPath;
		testInfo.snapshotPath = (snapshotName) => {
			const result = originalSnapshotPath
				.apply(testInfo, [snapshotName])

				// Remove browser name from snapshot name
				// .replace('-chromium', '')
				// .replace('-firefox', '')

				// Remove os name from snapshot name
				.replace('-darwin', '')
				.replace('-linux', '')
				.replace('-windows', '')

				// Remove test counter from snapshot name
				.replace('-1-', '-')

				// Make different snapshot folder for different themes
				.replace('theme-snapshots.spec.js', `theme-${process.env.THEME_EXPORT.toLocaleLowerCase()}`)
				.replace('-snapshots', '');
			return result;
		};
	};

test.beforeEach(configureSnapshotPath());

/**
 * @todo stabilize and re-enable test
 */
const blocklist = [];

ROUTES.filter((route) => !blocklist.includes(route)).forEach((route) => {
	test(`snapshot for ${route}`, async ({ page }) => {
		await page.goto(`/#${route}?hideMenus`, { waitUntil: 'networkidle' });
		await page.setViewportSize({
			width: 1920,
			height: 1280,
		});
		// await page.waitForTimeout(250);
		await expect(page).toHaveScreenshot({
			// fullPage: true,
			maxDiffPixelRatio: 0.1, // 0.03,
		});
	});
});
