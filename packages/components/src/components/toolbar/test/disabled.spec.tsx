import { newSpecPage } from '@stencil/core/testing';

import { KolToolbar } from '../shadow';

describe('KolToolbar _disabled toggle', () => {
	it('re-enables toolbar items after timeout', async () => {
		jest.useFakeTimers();
		const page = await newSpecPage({ components: [KolToolbar], html: '<kol-toolbar></kol-toolbar>' });
		const toolbar = page.root as HTMLKolToolbarElement;

		toolbar._items = [{ _label: 'Button', _disabled: true }];
		await page.waitForChanges();
		let button = toolbar.shadowRoot?.querySelector('kol-button-wc');
		expect(button?.hasAttribute('_disabled')).toBe(true);

		setTimeout(() => {
			toolbar._items = [{ _label: 'Button' }];
		}, 50);
		jest.runAllTimers();
		await page.waitForChanges();
		button = toolbar.shadowRoot?.querySelector('kol-button-wc');
		expect(button?.hasAttribute('_disabled')).toBe(false);
	});
});
