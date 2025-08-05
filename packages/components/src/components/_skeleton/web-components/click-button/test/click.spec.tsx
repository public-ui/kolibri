import { newSpecPage } from '@stencil/core/testing';
import { KolClickButton } from '../component';

describe('KolClickButton', () => {
	it('calls handleClick when clicked', async () => {
		const page = await newSpecPage({
			components: [KolClickButton],
			html: `<kol-click-button _label="Click"></kol-click-button>`,
		});
		const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
		const button = page.root!.shadowRoot!.querySelector('button')!;
		button.click();
		expect(logSpy).toHaveBeenCalled();
		logSpy.mockRestore();
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
