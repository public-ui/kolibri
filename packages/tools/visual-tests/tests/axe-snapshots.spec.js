import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import axeHtmlReporter from 'axe-html-reporter';
import process from 'process';
import { ROUTES } from './sample-app.routes.js';

const { createHtmlReport } = axeHtmlReporter;

const AXE_TAGS = ['best-practices', 'wcag2a', 'wcag2aa', 'wcag21aa'];

const themeName = (process.env.THEME_EXPORT || 'default').toLocaleLowerCase();

/**
 * Contrast is a property of the theme, not of the component semantics. Only the light scheme of the
 * default theme is kept free of contrast violations; in every other theme and scheme the rule is
 * reported but does not fail the test.
 */
const gatesColorContrast = (colorScheme) => themeName === 'default' && colorScheme === 'light';

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
	test(`snapshot for ${route}`, async ({ colorScheme, page }, testInfo) => {
		test.skip(['all', 'changed'].includes(testInfo.config.updateSnapshots), 'axe does not take part in the baseline generation');
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

		if (options?.axe?.skipFailures !== true) {
			const failures = results.violations
				.filter((violation) => violation.id !== 'color-contrast' || gatesColorContrast(colorScheme))
				.map((violation) => violation.id);
			// The first line of the message is what the CI summary shows (see scripts/visual-review/assert-no-errors.mjs).
			expect(failures, `axe violations on ${route}: ${failures.join(', ')}`).toEqual([]);
		}
	});
});
