import type { InputPasswordProps, InputPasswordWatches, InputTypeOnOff } from '../../schema';
import { validateHasCounter, watchBoolean, watchNumber, watchString, watchValidator } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class InputPasswordController extends InputIconController implements InputPasswordWatches {
	protected readonly component: Generic.Element.Component & InputPasswordProps;

	public constructor(component: Generic.Element.Component & InputPasswordProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAutoComplete(value?: InputTypeOnOff): void {
		watchValidator(
			this.component,
			'_autoComplete',
			(value): boolean => typeof value === 'string' && (value === 'on' || value === 'off'),
			new Set(['on | off']),
			value,
		);
	}

	public validateHasCounter(value?: boolean): void {
		validateHasCounter(this.component, value);
	}
	public validatePasswordVisible(value?: boolean): void {
		watchBoolean(this.component, '_passwordVisible', value);
	}

	public validateMaxLength(value?: number): void {
		watchNumber(this.component, '_maxLength', value, {
			min: 0,
		});
	}

	public validatePattern(value?: string): void {
		watchString(this.component, '_pattern', value);
	}

	public validatePlaceholder(value?: string): void {
		watchString(this.component, '_placeholder', value);
	}

	public validateReadOnly(value?: boolean): void {
		watchBoolean(this.component, '_readOnly', value);
	}

	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateHasCounter(this.component._hasCounter);
		this.validateMaxLength(this.component._maxLength);
		this.validatePattern(this.component._pattern);
		this.validatePlaceholder(this.component._placeholder);
		this.validateReadOnly(this.component._readOnly);
		this.validateRequired(this.component._required);
		this.validateValue(this.component._value);
		this.validatePasswordVisible(this.component._passwordVisible);
	}
}
