import { test, expect } from '@playwright/test';
import { ROUTES } from './sample-app.routes.js';

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
	animations: 'disabled',
	fullPage: true,
	maxDiffPixelRatio: 0,
	scale: 'css', // 'css' or 'device'
};

ROUTES.forEach((options, route) => {
	test(`snapshot for ${route}`, async ({ page }) => {
		const hideMenusParam = `${route.includes('?') ? '&' : '?'}hideMenus`;
		await page.goto(`/#${route}${hideMenusParam}`);
		await page.waitForLoadState('networkidle');
		await page.addStyleTag({
			content: `
				* {
					transition: none !important;
					animation: none !important;
				}
			`,
		});
		if (options?.viewportSize) {
			await page.setViewportSize(options.viewportSize);
		}
		if (options?.waitForTimeout) {
			await page.waitForTimeout(options.waitForTimeout);
		}

		/**
		 * We would like to use a readable name for the snapshot file.
		 */
		const snapshotName = `snapshot-for-${route.replace(/(\/|\?|&|=)/g, '-')}`;

		await expect(page).toHaveScreenshot(`${snapshotName}.png`, {
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
		await expect(page).toHaveScreenshot(`${snapshotName}-zoom.png`, {
			...DEFAULT_SNAPSHOT_OPTIONS,
			...options,
		});
	});
});
