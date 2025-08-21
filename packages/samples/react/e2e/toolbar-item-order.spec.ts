import { expect, test } from '@playwright/test';

test.describe('KolToolbar Button Reactivation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('#/scenarios/toolbar-item-order?hideMenus');
	});

	test('KolToolbar A - All buttons disable immediately after click', async ({ page }) => {
		const toolbar = page.getByRole('toolbar', { name: 'KolToolbar A' });
		const buttons = toolbar.getByRole('button');

		await buttons.nth(0).click();

		const count = await buttons.count();
		for (let i = 0; i < count; i++) {
			await expect(buttons.nth(i)).toBeDisabled();
		}
	});

	test('KolToolbar A - All buttons re-enable after 2 seconds', async ({ page }) => {
		const toolbar = page.getByRole('toolbar', { name: 'KolToolbar A' });
		const buttons = toolbar.getByRole('button');

		await buttons.nth(0).click();
		await page.waitForTimeout(2500);

		const count = await buttons.count();
		for (let i = 0; i < count; i++) {
			await expect(buttons.nth(i)).toBeEnabled();
		}
	});

	test('KolToolbar A - Clicking different buttons has same disable behavior', async ({ page }) => {
		const toolbar = page.getByRole('toolbar', { name: 'KolToolbar A' });
		const buttons = toolbar.getByRole('button');
		const count = await buttons.count();

		for (let buttonIndex = 0; buttonIndex < count; buttonIndex++) {
			await page.waitForTimeout(100);

			await buttons.nth(buttonIndex).click();

			for (let i = 0; i < count; i++) {
				await expect(buttons.nth(i)).toBeDisabled();
			}

			await page.waitForTimeout(2500);
		}
	});

	test('KolToolbar B - All buttons disable immediately after click', async ({ page }) => {
		const toolbar = page.getByRole('toolbar', { name: 'KolToolbar B' });
		const buttons = toolbar.getByRole('button');

		await buttons.nth(0).click();

		const count = await buttons.count();
		for (let i = 0; i < count; i++) {
			await expect(buttons.nth(i)).toBeDisabled();
		}
	});

	test('KolToolbar B - All buttons re-enable after 2 seconds', async ({ page }) => {
		const toolbar = page.getByRole('toolbar', { name: 'KolToolbar B' });
		const buttons = toolbar.getByRole('button');

		await buttons.nth(0).click();
		await page.waitForTimeout(2500);

		const count = await buttons.count();
		for (let i = 0; i < count; i++) {
			await expect(buttons.nth(i)).toBeEnabled();
		}
	});

	test('KolToolbar B - Clicking different buttons has same disable behavior', async ({ page }) => {
		const toolbar = page.getByRole('toolbar', { name: 'KolToolbar B' });
		const buttons = toolbar.getByRole('button');
		const count = await buttons.count();

		for (let buttonIndex = 0; buttonIndex < count; buttonIndex++) {
			await page.waitForTimeout(100);

			await buttons.nth(buttonIndex).click();

			for (let i = 0; i < count; i++) {
				await expect(buttons.nth(i)).toBeDisabled();
			}

			await page.waitForTimeout(2500);
		}
	});

	test('Both toolbars - Buttons start in enabled state', async ({ page }) => {
		const toolbarA = page.getByRole('toolbar', { name: 'KolToolbar A' });
		const toolbarB = page.getByRole('toolbar', { name: 'KolToolbar B' });

		const buttonsA = toolbarA.getByRole('button');
		const buttonsB = toolbarB.getByRole('button');

		// Prüfe initiale States
		const countA = await buttonsA.count();
		const countB = await buttonsB.count();

		for (let i = 0; i < countA; i++) {
			await expect(buttonsA.nth(i)).toBeEnabled();
		}

		for (let i = 0; i < countB; i++) {
			await expect(buttonsB.nth(i)).toBeEnabled();
		}
	});

	test('Cross-toolbar interaction - One toolbar click does not affect other toolbar', async ({ page }) => {
		const toolbarA = page.getByRole('toolbar', { name: 'KolToolbar A' });
		const toolbarB = page.getByRole('toolbar', { name: 'KolToolbar B' });

		const buttonsA = toolbarA.getByRole('button');
		const buttonsB = toolbarB.getByRole('button');

		// Klick auf Toolbar A
		await buttonsA.nth(0).click();

		// Toolbar A sollte disabled sein
		const countA = await buttonsA.count();
		for (let i = 0; i < countA; i++) {
			await expect(buttonsA.nth(i)).toBeDisabled();
		}

		// Toolbar B sollte weiterhin enabled sein
		const countB = await buttonsB.count();
		for (let i = 0; i < countB; i++) {
			await expect(buttonsB.nth(i)).toBeEnabled();
		}
	});

	test('Timing precision - Buttons are still disabled at 1.5 seconds', async ({ page }) => {
		const toolbar = page.getByRole('toolbar', { name: 'KolToolbar A' });
		const buttons = toolbar.getByRole('button');

		await buttons.nth(0).click();
		await page.waitForTimeout(1500); // Waiting only 1.5sec

		const count = await buttons.count();
		for (let i = 0; i < count; i++) {
			await expect(buttons.nth(i)).toBeDisabled();
		}
	});
});
