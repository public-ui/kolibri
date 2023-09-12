import { test, expect, TestInfo } from '@playwright/test';
// @ts-ignore
import { routes } from '@public-ui/sample-react/src/routes-test.ts';

// https://github.com/microsoft/playwright/issues/7575#issuecomment-1288164474
export const configureSnapshotPath =
	(options?: {}) =>
	({}: any, testInfo: TestInfo): any => {
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
				.replace('-1-', '-');
			return result;
		};
	};

test.beforeEach(configureSnapshotPath());

routes.forEach((route) => {
	test(`snapshot for ${route}`, async ({ page }) => {
		await page.goto(`/#/${route}`, { waitUntil: 'networkidle' });
		await page.waitForSelector(`kol-button[_aria-label="Weiter zum nächsten Komponenten-Beispiel"]`);
		await expect(page).toHaveScreenshot({
			fullPage: true,
		});
	});
});
