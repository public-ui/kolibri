import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolLink } from '../component';

describe('kol-link tooltip label', () => {
	it('shows the text of a label with language segments instead of the href', async () => {
		const page = await newSpecPage({
			components: [KolLink],
			template: () => <kol-link _href="https://example.com" _hideLabel _label={[{ text: 'Partly english', lang: 'en' }, { text: ' label' }]} />,
		});

		const tooltip = page.root?.shadowRoot?.querySelector('.kol-tooltip__content');
		expect(tooltip?.textContent).toContain('Partly english label');
		expect(tooltip?.textContent).not.toContain('https://example.com');
	});
});
