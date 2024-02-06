import { expect } from '@playwright/test';
import { ROUTES } from './sample-app.routes.js';

import { blocklist, configureTest } from './basis.config.js';

export const createSnapshotTests = (
	test,
	{
		colorScheme,
		forcedColors, // only works with chromium
		media,
		reducedMotion,
	},
	postfix = '',
) => {
	configureTest(test);
	ROUTES.forEach((options, route) => {
		if (blocklist.includes(route)) {
			return;
		}

		test(`snapshot test for '${route}' (${postfix})`, async ({ page }) => {
			await page.emulateMedia({
				colorScheme,
				forcedColors, // only works with chromium
				media,
				reducedMotion,
			});
			await page.goto(`/#${route}?hideMenus`, { waitUntil: 'networkidle' });
			if (options?.viewportSize) {
				await page.setViewportSize(options.viewportSize);
			}
			if (options?.waitForTimeout) {
				await page.waitForTimeout(options.waitForTimeout);
			}
			await expect(page).toHaveScreenshot({
				fullPage: true,
				maxDiffPixelRatio: 0.01,
				...options,
			});
		});
	});
};
