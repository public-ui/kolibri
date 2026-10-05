import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import { SelectFC, SelectOptionFC, SelectOptionListFC } from './select';

const error = { _type: 'error' as const, _description: 'Error' };
const options = [
	{ label: 'Eins', value: 1 },
	{
		label: 'Gruppe',
		options: [
			{ label: 'Zwei', value: 2 },
			{ label: 'Drei', value: 3, disabled: true },
		],
	},
];

describe('SelectFC', () => {
	it.each([
		['the default', {}],
		['a selected option in an optgroup', { value: [2] }],
		['several selected options', { multiple: true, size: 3, value: [1, 2] }],
		['disabled and required', { disabled: true, required: true }],
		['a touched error', { msg: error, touched: true }],
		['a hidden label and descriptions', { hideLabel: true, ariaDescribedBy: ['hint', 'msg'] }],
		['a merged class', { class: 'kol-custom' }],
	])('renders %s', async (_, props) => {
		const page = await renderFunctionalComponentToSpecPage(() => <SelectFC id="id" label="Label" options={options} {...props} />);
		expect(page.root).toMatchSnapshot();
	});
});

describe('SelectOptionListFC', () => {
	it('renders nothing without options', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<select>
				<SelectOptionListFC options={[]} />
			</select>
		));
		expect(page.root).toMatchSnapshot();
	});

	it('disables the optgroups and prefixes the keys', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<select>
				<SelectOptionListFC options={options} preKey="-9" disabled />
			</select>
		));
		expect(page.root).toMatchSnapshot();
	});
});

describe('SelectOptionFC', () => {
	it.each([
		['the key as native value', { index: '-1' }],
		['a selected single value', { selectedValue: 'value' }],
		['the selected attribute', { selected: true }],
		['a disabled option', { disabled: true }],
	])('renders %s', async (_, props) => {
		const page = await renderFunctionalComponentToSpecPage(() => <SelectOptionFC value="value" label="Label" {...props} />);
		expect(page.root).toMatchSnapshot();
	});
});
