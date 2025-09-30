import { newSpecPage } from '@stencil/core/testing';

import { KolButtonWc } from '../component';

describe('KolButtonWc role handling', () => {
	it('does not render role="link" on the button element', async () => {
		const page = await newSpecPage({
			components: [KolButtonWc],
			html: '<kol-button-wc _label="Do" _role="link"></kol-button-wc>',
		});

		await page.waitForChanges();

		const button = page.root?.querySelector('button');
		expect(button?.getAttribute('role')).toBeNull();
	});

	it('keeps supported roles like "tab"', async () => {
		const page = await newSpecPage({
			components: [KolButtonWc],
			html: '<kol-button-wc _label="Do" _role="tab"></kol-button-wc>',
		});

		await page.waitForChanges();

		const button = page.root?.querySelector('button');
		expect(button?.getAttribute('role')).toBe('tab');
	});
});
