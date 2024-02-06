import { checkA11y, injectAxe } from 'axe-playwright';
import { ROUTES } from './sample-app.routes.js';

import { blocklist, configureTest, renameSnapshotName } from './basis.config.js';

export const createAxeTests = (
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
		test(`axe test for '${route}' (${postfix})`, async ({ page }, testInfo) => {
			await page.emulateMedia({
				colorScheme,
				forcedColors, // only works with chromium
				media,
				reducedMotion,
			});
			const outputPath = renameSnapshotName(testInfo.outputDir);
			await page.goto(`/#${route}?hideMenus`, { waitUntil: 'networkidle' });
			if (options?.viewportSize) {
				await page.setViewportSize(options.viewportSize);
			}
			if (options?.waitForTimeout) {
				await page.waitForTimeout(options.waitForTimeout);
			}
			await injectAxe(page);
			await checkA11y(
				page,
				undefined,
				{
					axeOptions: {
						runOnly: {
							type: 'tag',
							values: ['best-practices', 'wcag2a', 'wcag2aa', 'wcag21aa'],
						},
					},
					detailedReport: true,
					detailedReportOptions: {
						html: true,
					},
				},
				options?.axe?.skipFailures ?? true,
				'html',
				{
					outputDirPath: outputPath.replace(/\/[^/]+$/, ''),
					outputDir: `axe-${process.env.THEME_EXPORT.toLocaleLowerCase()}`,
					reportFileName: `${route.replace('/', '-')}.html`,
				},
			);
		});
	});
};
