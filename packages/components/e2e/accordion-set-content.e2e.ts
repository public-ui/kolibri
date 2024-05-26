import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.skip('Accordion (set content test)', () => {
	test('should render the correct name', async ({ page }) => {
		await page.setContent('<kol-accordion _label="My Accordion" _level={1}>My Accordion content</kol-accordion>');

		expect(page.getByText('My Accordion')).toBeVisible({ timeout: 30000 });
	});
});
