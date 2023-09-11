import { test, expect } from '@playwright/test';
// @ts-ignore
import { routes } from '@public-ui/sample-react/src/routes-test.ts';

routes.forEach((route) => {
	test(`Matches snapshot for ${route}`, async ({ page }) => {
		await page.goto(`/#/${route}`, { waitUntil: 'networkidle' });
		await page.waitForSelector(`kol-button[_aria-label="Weiter zum nächsten Komponenten-Beispiel"]`);
		await expect(page).toHaveScreenshot({
			fullPage: true,
		});
	});
});
