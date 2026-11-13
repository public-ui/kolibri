import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import { CheckboxFC } from './checkbox';
import { FormFieldFC } from './component';
import { FieldControlFC } from './field-control';
import { RadioFC } from './radio';

const error = { _type: 'error' as const, _description: 'Error' };
const noop = (): void => {};

describe('FieldControlFC', () => {
	it.each([
		['the default', {}],
		['the label on the left', { labelAlign: 'left' as const }],
		['the label on the right', { labelAlign: 'right' as const }],
		['a hidden label as tooltip', { hideLabel: true }],
		['a hint', { hint: 'Hint' }],
		['no hint', { hint: 'Hint', renderNoHint: true }],
		['disabled, required and read-only', { disabled: true, readOnly: true, required: true }],
		['a touched error', { msg: error, touched: true }],
		['a merged class', { class: 'kol-input-checkbox__field-control' }],
	])('renders %s', async (_, props) => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<FieldControlFC id="id" label="Label" refTooltip={noop} {...props}>
				<input />
			</FieldControlFC>
		));
		expect(page.root).toMatchSnapshot();
	});
});

describe('CheckboxFC', () => {
	it.each([
		['the default', {}, {}],
		['the switch variant, checked', { variant: 'switch' as const }, { checked: true }],
		['the button variant, indeterminate', { variant: 'button' as const }, { indeterminate: true }],
		['disabled with a touched error', {}, { disabled: true, msg: error, touched: true }],
	])('renders %s', async (_, props, inputProps) => {
		const page = await renderFunctionalComponentToSpecPage(() => <CheckboxFC icon="kolicon-check" {...props} inputProps={{ id: 'id', ...inputProps }} />);
		expect(page.root).toMatchSnapshot();
	});
});

describe('RadioFC', () => {
	it.each([
		['the default', {}],
		['checked', { checked: true }],
		['disabled with a touched error', { disabled: true, msg: error, touched: true }],
	])('renders %s', async (_, inputProps) => {
		const page = await renderFunctionalComponentToSpecPage(() => <RadioFC inputProps={{ id: 'id', ...inputProps }} />);
		expect(page.root).toMatchSnapshot();
	});
});

describe('FormFieldFC as fieldset', () => {
	it.each([
		['vertical', 'vertical' as const],
		['horizontal', 'horizontal' as const],
	])('renders a legend and the %s orientation', async (_, orientation) => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<FormFieldFC component="fieldset" orientation={orientation} id="id" label="Label" refTooltip={noop}>
				<input />
			</FormFieldFC>
		));
		expect(page.root).toMatchSnapshot();
	});
});
