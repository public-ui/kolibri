import { test } from '@playwright/test';
import { checkA11y, injectAxe } from 'axe-playwright';
import { ROUTES } from './sample-app.routes.js';

const themeName = (process.env.THEME_EXPORT || 'default').toLocaleLowerCase();
const rename = (snapshotName) => {
	const result = snapshotName

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
		.replace('theme-snapshots.spec.js', `axe-${themeName}`)
		.replace('-snapshots', '');
	return result;
};

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

ROUTES.forEach((options, route) => {
	// Skip unnecessary axe tests
	if (options?.axe?.skip === true) {
		return;
	}
	test(`snapshot for ${route}`, async ({ page }, testInfo) => {
		const outputPath = rename(testInfo.outputDir);
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
		if (options?.snapshot?.viewportSize) {
			await page.setViewportSize(options?.snapshot?.viewportSize);
		}
		if (options?.snapshot?.waitForTimeout) {
			await page.waitForTimeout(options?.snapshot?.waitForTimeout);
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
			options?.axe?.skipFailures ?? false,
			'html',
			{
				outputDirPath: outputPath.replace(/\/[^/]+$/, ''),
				outputDir: `axe-${themeName}`,
				reportFileName: `${route.replace('/', '-')}.html`,
			},
		);
	});
});
