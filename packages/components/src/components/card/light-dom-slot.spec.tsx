import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolCardWc } from './wc';

/**
 * Guards a Stencil detail that no snapshot shows: light-DOM slot relocation is derived from the
 * `<slot />` found in the element file. Moving it into `CardFC` compiles and renders, but silently
 * leaves the children of `kol-card-wc` — everything a consumer puts into the card — outside it.
 */
describe('kol-card-wc light DOM slotting', () => {
	it('relocates children into the content area', async () => {
		const page = await newSpecPage({
			components: [KolCardWc],
			template: () => (
				<kol-card-wc _label="Überschrift">
					<p>Inhalt</p>
				</kol-card-wc>
			),
		});
		await page.waitForChanges();

		expect(page.root?.querySelector('.kol-card__content > p')?.textContent).toBe('Inhalt');
	});
});
