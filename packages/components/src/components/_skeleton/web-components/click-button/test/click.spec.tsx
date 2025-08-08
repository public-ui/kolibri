import { newSpecPage } from '@stencil/core/testing';
import { KolClickButton } from '../component';

describe('KolClickButton', () => {
	it('increments eCount when clicked', async () => {
		const page = await newSpecPage({
			components: [KolClickButton],
			html: `<kol-click-button _label="Click"></kol-click-button>`,
		});
		const button = page.root!.shadowRoot!.querySelector('button')!;
		button.click();
		await page.waitForChanges();
		expect(button.textContent).toBe('Click 1');
	});

	it('increments eCount on "e" keydown', async () => {
		const page = await newSpecPage({
			components: [KolClickButton],
			html: `<kol-click-button _label="Click"></kol-click-button>`,
		});
		const win = page.win as Window & typeof globalThis;
		win.dispatchEvent(new win.KeyboardEvent('keydown', { key: 'e' }));
		await page.waitForChanges();
		expect(page.root!.shadowRoot!.querySelector('button')!.textContent).toBe('Click 1');
	});
});
