import { nvdaTest as test } from '@guidepup/playwright';
import { expect } from '@playwright/test';

const SCREEN_READER_ENABLED = /^(1|true)$/i.test(process.env.KOLIBRI_SCREEN_READER ?? '');
const NVDA_SUPPORTED = process.platform === 'win32';

test.describe('NVDA screen reader navigation', () => {
	test.skip(!SCREEN_READER_ENABLED || !NVDA_SUPPORTED, 'NVDA screen reader tests require Windows and KOLIBRI_SCREEN_READER=1.');

	test('reads the visually hidden page heading @screen-reader', async ({ page, nvda }) => {
		const route = 'alert/basic';
		const hideMenusParam = `${route.includes('?') ? '&' : '?'}hideMenus`;
		await page.goto(`/#${route}${hideMenusParam}`);
		await page.waitForLoadState('networkidle');

		const headingLocator = page.locator('h1.visually-hidden');
		await headingLocator.waitFor();

		const expectedHeading = (await headingLocator.innerText()).trim().toLowerCase();

		await nvda.navigateToWebContent();

		let spokenPhrase = '';
		let attempt = 0;

		while (attempt < 10) {
			await nvda.perform(nvda.keyboardCommands.moveToNextHeading);
			spokenPhrase = (await nvda.lastSpokenPhrase()).toLowerCase();
			if (spokenPhrase.includes(expectedHeading)) {
				break;
			}
			attempt++;
		}

		expect(spokenPhrase).toContain(expectedHeading);
	});
});
