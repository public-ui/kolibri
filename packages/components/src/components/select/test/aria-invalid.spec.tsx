import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import type { SelectOption } from '../../../schema';

import { KolSelectWc } from '../component';
import { KolSelect } from '../shadow';

describe('kol-select aria-invalid', () => {
	it('sets aria-invalid="true" when msg type is error and field is touched', async () => {
		const options: SelectOption<string>[] = [
			{
				label: 'First',
				value: 'first',
			},
		];

		const page = await newSpecPage({
			components: [KolSelect, KolSelectWc],
			template: () => <kol-select _label="Label" _options={options} _msg={{ _description: 'Es ist ein Fehler aufgetreten', _type: 'error' }} _touched={true} />,
		});

		const selectWc = page.root?.shadowRoot?.querySelector('kol-select-wc');
		const select = selectWc?.querySelector('select');

		expect(select?.getAttribute('aria-invalid')).toBe('true');
	});

	it('does not set aria-invalid when msg type is not error', async () => {
		const options: SelectOption<string>[] = [
			{
				label: 'First',
				value: 'first',
			},
		];

		const page = await newSpecPage({
			components: [KolSelect, KolSelectWc],
			template: () => <kol-select _label="Label" _options={options} _msg={{ _description: 'Eine Info', _type: 'info' }} _touched={true} />,
		});

		const selectWc = page.root?.shadowRoot?.querySelector('kol-select-wc');
		const select = selectWc?.querySelector('select');

		expect(select?.getAttribute('aria-invalid')).toBeNull();
	});

	it('does not set aria-invalid when field is not touched', async () => {
		const options: SelectOption<string>[] = [
			{
				label: 'First',
				value: 'first',
			},
		];

		const page = await newSpecPage({
			components: [KolSelect, KolSelectWc],
			template: () => <kol-select _label="Label" _options={options} _msg={{ _description: 'Es ist ein Fehler aufgetreten', _type: 'error' }} />,
		});

		const selectWc = page.root?.shadowRoot?.querySelector('kol-select-wc');
		const select = selectWc?.querySelector('select');

		expect(select?.getAttribute('aria-invalid')).toBeNull();
	});

	it('does not set aria-invalid when no msg is set', async () => {
		const options: SelectOption<string>[] = [
			{
				label: 'First',
				value: 'first',
			},
		];

		const page = await newSpecPage({
			components: [KolSelect, KolSelectWc],
			template: () => <kol-select _label="Label" _options={options} _touched={true} />,
		});

		const selectWc = page.root?.shadowRoot?.querySelector('kol-select-wc');
		const select = selectWc?.querySelector('select');

		expect(select?.getAttribute('aria-invalid')).toBeNull();
	});
});
