import { newSpecPage } from '@stencil/core/testing';

import { KolLinkWc } from '../component';

describe('KolLinkWc role handling', () => {
	it('does not render role="button" on the anchor element', async () => {
		const page = await newSpecPage({
			components: [KolLinkWc],
			html: '<kol-link-wc _href="#" _role="button"></kol-link-wc>',
		});

		await page.waitForChanges();

		const anchor = page.root?.querySelector('a');
		expect(anchor?.getAttribute('role')).toBeNull();
	});

	it('keeps supported roles like "tab"', async () => {
		const page = await newSpecPage({
			components: [KolLinkWc],
			html: '<kol-link-wc _href="#" _role="tab"></kol-link-wc>',
		});

		await page.waitForChanges();

		const anchor = page.root?.querySelector('a');
		expect(anchor?.getAttribute('role')).toBe('tab');
	});
});
