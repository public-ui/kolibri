import AxeBuilder from '@axe-core/playwright';
import { test } from '@playwright/test';
import axeHtmlReporter from 'axe-html-reporter';
import process from 'process';
import { ROUTES } from './sample-app.routes.js';

const { createHtmlReport } = axeHtmlReporter;

const AXE_TAGS = ['best-practices', 'wcag2a', 'wcag2aa', 'wcag21aa'];

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

const sanitizeRouteForReport = (route) => route.replace(/[/?]/g, '-').replace(/^-+/, '') || 'root';

const buildReportOptions = (testInfo, route) => ({
	projectKey: `axe-${themeName}`,
	reportFileName: `${sanitizeRouteForReport(route)}.html`,
	outputDirPath: rename(testInfo.outputDir),
	outputDir: `axe-${themeName}`,
});

const logViolations = (route, violations) => {
	if (!violations?.length) {
		return;
	}
	console.warn(`Axe found ${violations.length} violation(s) on ${route}`);
	for (const violation of violations) {
		console.warn(`- ${violation.id}: ${violation.help} (${violation.nodes.length} nodes)`);
	}
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
	if (options?.axe?.skip === true || process.argv.includes('--update-snapshots')) {
		return;
	}
	test(`snapshot for ${route}`, async ({ page }, testInfo) => {
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

		const builder = new AxeBuilder({ page }).withTags(AXE_TAGS);
		const results = await builder.analyze();
		await testInfo.attach('axe-results', {
			body: JSON.stringify(results, null, 2),
			contentType: 'application/json',
		});
		createHtmlReport({
			results,
			options: buildReportOptions(testInfo, route),
		});
		logViolations(route, results.violations);
	});
});
