import { describe, expect, it } from '@jest/globals';
import { newSpecPage } from '@stencil/core/testing';

import { KolAbbr } from '../component';

describe('kol-abbr long form', () => {
	it('links the deprecated label as the title expansion of the abbr element', async () => {
		const page = await newSpecPage({
			components: [KolAbbr],
			html: `<kol-abbr _label="exempli gratia">e.g.</kol-abbr>`,
		});

		expect(page.root?.shadowRoot?.querySelector('abbr')?.getAttribute('title')).toBe('exempli gratia');
	});

	it('renders no title without a label', async () => {
		const page = await newSpecPage({
			components: [KolAbbr],
			html: `<kol-abbr>e.g.</kol-abbr>`,
		});

		expect(page.root?.shadowRoot?.querySelector('abbr')?.hasAttribute('title')).toBe(false);
	});
});
