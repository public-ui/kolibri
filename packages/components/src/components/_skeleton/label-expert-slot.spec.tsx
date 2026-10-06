import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolButton } from '../button/component';
import { KolLink } from '../link/component';

/**
 * `_label={false}` enables the expert slot, as the published `_label` JSDoc states: the label text is
 * not rendered and the expert slot is shown.
 */
describe('_label={false}', () => {
	it.each([
		['kol-button', KolButton, () => <kol-button _label={false as unknown as string}>Expert</kol-button>],
		[
			'kol-link',
			KolLink,
			() => (
				<kol-link _href="#" _label={false as unknown as string}>
					Expert
				</kol-link>
			),
		],
	])('enables the expert slot of %s', async (_name, component, template) => {
		const page = await newSpecPage({ components: [component], template });
		const shadow = page.root?.shadowRoot;
		expect(shadow?.querySelector('.kol-span__label')).toBeNull();
		expect(shadow?.textContent).not.toContain('false');
		expect(shadow?.querySelector('.kol-span__slot')?.hasAttribute('hidden')).toBe(false);
	});
});
