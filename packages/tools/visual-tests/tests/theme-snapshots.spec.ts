import { test, expect } from '@playwright/test';
// import { ROUTE_LIST } from '@public-ui/sample-react/src/routes.tsx';

const routes = [`#/accordion/basic`, `#/avatar/basic`];

routes.forEach((route) => {
	test(`Matches snapshot for ${route}`, async ({ page }) => {
		await page.goto(`/${route}`, { waitUntil: 'domcontentloaded' });
		await page.waitForSelector(`body`);
		await expect(page).toHaveScreenshot({
			fullPage: true,
		});
	});
});
