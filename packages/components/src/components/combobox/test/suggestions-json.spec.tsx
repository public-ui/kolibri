import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolCombobox } from '../component';

const getRenderedOptionTexts = (root: HTMLElement): string[] =>
	Array.from(root.shadowRoot?.querySelectorAll('li.kol-custom-suggestions-option') ?? []).map((li) => li.textContent ?? '');

describe('kol-combobox suggestions as JSON string', () => {
	it('renders the parsed suggestions after a JSON-string update, without any filtering', async () => {
		const page = await newSpecPage({
			components: [KolCombobox],
			template: () => <kol-combobox _label="Input" _suggestions={[]} />,
		});
		expect(getRenderedOptionTexts(page.root!)).toEqual([]);

		page.root!._suggestions = '["North","South"]';
		await page.waitForChanges();

		expect(getRenderedOptionTexts(page.root!)).toEqual(['North', 'South']);
	});
});
