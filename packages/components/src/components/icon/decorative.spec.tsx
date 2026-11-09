import { describe, expect, it } from '@jest/globals';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolIcon } from './component';

describe('kol-icon decorative label', () => {
	it('drops aria-label and role="img" when the label switches to the empty string at runtime', async () => {
		const page = await newSpecPage({
			components: [KolIcon],
			template: () => <kol-icon _icons="kolicon-houses" _label="Home icon" />,
		});
		const icon = () => page.root?.shadowRoot?.querySelector('i');
		expect(icon()?.getAttribute('aria-label')).toBe('Home icon');

		(page.root as HTMLKolIconElement)._label = '';
		await page.waitForChanges();

		expect(icon()?.getAttribute('aria-label')).toBeNull();
		expect(icon()?.getAttribute('role')).not.toBe('img');
	});
});
