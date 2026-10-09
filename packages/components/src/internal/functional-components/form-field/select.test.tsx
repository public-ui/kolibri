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

	it('forwards disabled to optgroups and options when select is disabled', async () => {
		const optgroupOptions = [
			{
				label: 'Group 1',
				options: [{ label: 'Option 1', value: '1' }],
			},
		];
		const page = await renderFunctionalComponentToSpecPage(() => <SelectFC disabled={true} id="test" label="Label" options={optgroupOptions} />);
		expect(page.root).toMatchSnapshot();
		expect(page.root?.hasAttribute('disabled')).toBe(true);
		expect(page.root?.querySelectorAll('optgroup')[0].hasAttribute('disabled')).toBe(true);
		expect(page.root?.querySelectorAll('optgroup')[0].classList.contains('kol-select__optgroup--disabled')).toBe(true);
		expect(page.root?.querySelectorAll('option')[0].hasAttribute('disabled')).toBe(true);
		expect(page.root?.querySelectorAll('option')[0].classList.contains('kol-select__option--disabled')).toBe(true);
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

	it('does not render an optgroup without options', async () => {
		const emptyGroupOptions = [
			{
				label: 'Empty Group',
				options: [],
			},
		];
		const page = await renderFunctionalComponentToSpecPage(() => (
			<select>
				<SelectOptionListFC options={emptyGroupOptions} />
			</select>
		));
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelector('optgroup')).toBeNull();
	});

	it('disables the optgroups and prefixes the keys', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<select>
				<SelectOptionListFC options={options} preKey="-9" disabled />
			</select>
		));
		expect(page.root).toMatchSnapshot();
	});

	it('renders with disabled option group', async () => {
		const disabledGroupOptions = [
			{
				disabled: true,
				label: 'Group 1',
				options: [{ label: 'Option 1', value: '1' }],
			},
		];
		const page = await renderFunctionalComponentToSpecPage(() => (
			<select>
				<SelectOptionListFC options={disabledGroupOptions} />
			</select>
		));
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelectorAll('optgroup')[0].hasAttribute('disabled')).toBe(true);
		expect(page.root?.querySelectorAll('optgroup')[0].classList.contains('kol-select__optgroup--disabled')).toBe(true);
		expect(page.root?.querySelectorAll('option')[0].hasAttribute('disabled')).toBe(true);
		expect(page.root?.querySelectorAll('option')[0].classList.contains('kol-select__option--disabled')).toBe(true);
	});

	it('renders option with disabled: false inside a disabled group as disabled', async () => {
		const disabledGroupOptions = [
			{
				disabled: true,
				label: 'Group 1',
				options: [{ disabled: false, label: 'Option 1', value: '1' }],
			},
		];
		const page = await renderFunctionalComponentToSpecPage(() => (
			<select>
				<SelectOptionListFC options={disabledGroupOptions} />
			</select>
		));
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelectorAll('optgroup')[0].hasAttribute('disabled')).toBe(true);
		expect(page.root?.querySelectorAll('optgroup')[0].classList.contains('kol-select__optgroup--disabled')).toBe(true);
		expect(page.root?.querySelectorAll('option')[0].hasAttribute('disabled')).toBe(true);
		expect(page.root?.querySelectorAll('option')[0].classList.contains('kol-select__option--disabled')).toBe(true);
	});

	it('renders option with disabled: false inside a disabled list as disabled', async () => {
		const disabledListOptions = [{ disabled: false, label: 'Option 1', value: '1' }];
		const page = await renderFunctionalComponentToSpecPage(() => (
			<select>
				<SelectOptionListFC disabled={true} options={disabledListOptions} />
			</select>
		));
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelectorAll('option')[0].hasAttribute('disabled')).toBe(true);
		expect(page.root?.querySelectorAll('option')[0].classList.contains('kol-select__option--disabled')).toBe(true);
	});

	it('renders with enabled group containing a disabled option', async () => {
		const mixedOptions = [
			{
				label: 'Group 1',
				options: [
					{ disabled: true, label: 'Option 1', value: '1' },
					{ disabled: false, label: 'Option 2', value: '2' },
				],
			},
		];
		const page = await renderFunctionalComponentToSpecPage(() => (
			<select>
				<SelectOptionListFC options={mixedOptions} />
			</select>
		));
		expect(page.root).toMatchSnapshot();
		expect(page.root?.querySelectorAll('optgroup')[0].hasAttribute('disabled')).toBe(false);
		expect(page.root?.querySelectorAll('optgroup')[0].classList.contains('kol-select__optgroup--disabled')).toBe(false);
		expect(page.root?.querySelectorAll('option')[0].hasAttribute('disabled')).toBe(true);
		expect(page.root?.querySelectorAll('option')[0].classList.contains('kol-select__option--disabled')).toBe(true);
		expect(page.root?.querySelectorAll('option')[1].hasAttribute('disabled')).toBe(false);
		expect(page.root?.querySelectorAll('option')[1].classList.contains('kol-select__option--disabled')).toBe(false);
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
