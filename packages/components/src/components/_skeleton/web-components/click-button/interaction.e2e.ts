import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('kol-click-button', () => {
	test.beforeEach(async ({ page }) => {
		await page.setContent('<kol-click-button _label="Click"></kol-click-button>');
	});

	test('should call handleClick when clicked', async ({ page }) => {
		const logMessages: string[] = [];
		page.on('console', (msg) => {
			logMessages.push(msg.text());
		});
		await page.getByRole('button', { name: 'Click' }).click();
		expect(logMessages.length).toBeGreaterThan(0);
	});
});
