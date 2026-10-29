import { describe, expect, it } from '@jest/globals';
import { newSpecPage } from '@stencil/core/testing';

import { KolProgress } from '../component';

describe('kol-progress accessible name', () => {
	it('exposes the label as the accessible name of the visually hidden progress element', async () => {
		const page = await newSpecPage({
			components: [KolProgress],
			html: `<kol-progress _label="Fortschritt" _variant="bar" _max="100" _value="50"></kol-progress>`,
		});

		const progress = page.root?.shadowRoot?.querySelector('progress');
		expect(progress?.getAttribute('aria-label')).toBe('Fortschritt');
	});
});
