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

				// Identify 2. test as zoom snapshot
				.replace('-2-', '-zoom-')

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

const DEFAULT_SNAPSHOT_OPTIONS = {
	fullPage: true,
	maxDiffPixelRatio: 0,
};

ROUTES.forEach((options, route) => {
	test(`snapshot for ${route}`, async ({ page }) => {
		const hideMenusParam = `${route.includes('?') ? '&' : '?'}hideMenus`;
		await page.goto(`/#${route}${hideMenusParam}`, { waitUntil: 'networkidle' });
		if (options?.viewportSize) {
			await page.setViewportSize(options.viewportSize);
		}
		if (options?.waitForTimeout) {
			await page.waitForTimeout(options.waitForTimeout);
		}
		await expect(page).toHaveScreenshot({
			...DEFAULT_SNAPSHOT_OPTIONS,
			...options,
		});
		await page.evaluate(() => {
			// eslint-disable-next-line no-undef
			document.body.style.zoom = '400%';
			// document.body.style.transform = 'scale(4)';
			// document.body.style.transformOrigin = 'top left';
			// document.body.style.width = '25vw';
		});
		await expect(page).toHaveScreenshot({
			...DEFAULT_SNAPSHOT_OPTIONS,
			...options,
		});
	});
});
