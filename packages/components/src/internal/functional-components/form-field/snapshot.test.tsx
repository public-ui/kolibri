import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import { FormFieldFC } from './component';

const noop = () => undefined;

describe('FormFieldFC', () => {
	it.each([
		['the default', {}],
		['a hidden label shown as tooltip', { hideLabel: true, accessKey: 'A' }],
		['a touched error message', { msg: { _type: 'error' as const, _description: 'Error' }, touched: true, alert: true }],
		['a hidden message', { msg: { _type: 'error' as const, _description: 'Error' }, touched: true, hideMsg: true }],
		['a hint', { hint: 'Hint' }],
		['required, read-only and disabled', { required: true, readOnly: true, disabled: true }],
		['a variant and a field class', { variant: 'custom', class: 'kol-input-color' }],
		['a counter', { counter: { maxLengthBehavior: 'hard' as const, maxLength: 10 } }],
		['a character limit hint', { maxLength: 10 }],
		['no label and no hint', { renderNoLabel: true, renderNoHint: true, hint: 'Hint' }],
	])('renders %s', async (_, props) => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<FormFieldFC id="field-nonce" label="Label" refTooltip={noop} {...props}>
				<input type="text" />
			</FormFieldFC>
		));
		expect(page.root).toMatchSnapshot();
	});

	it('disables the fieldset of a disabled field', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<FormFieldFC id="field-nonce" label="Label" refTooltip={noop} component="fieldset" disabled />
		));
		expect(page.root?.hasAttribute('disabled')).toBe(true);
		expect(page.root?.className).toContain('kol-form-field--disabled');
	});

	it('does not set the disabled attribute on a disabled div', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <FormFieldFC id="field-nonce" label="Label" refTooltip={noop} disabled />);
		expect(page.root?.hasAttribute('disabled')).toBe(false);
		expect(page.root?.className).toContain('kol-form-field--disabled');
	});

	it('suppresses the alert role on a hidden message even with _alert: true', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<FormFieldFC id="field-nonce" label="Label" refTooltip={noop} msg={{ _type: 'error', _description: 'Error', _alert: true }} touched hideMsg alert>
				<input type="text" />
			</FormFieldFC>
		));
		const msgEl = page.root?.querySelector('.kol-form-field__msg');
		expect(msgEl?.getAttribute('role')).toBeNull();
		expect(msgEl?.classList.contains('visually-hidden')).toBe(true);
	});
});
