import type { InputNumberProps, InputNumberWatches, InputTypeOnOff, NumberString, SuggestionsPropType } from '../../schema';
import { validateSuggestions, watchBoolean, watchString, watchValidator } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class InputNumberController extends InputIconController implements InputNumberWatches {
	protected readonly component: Generic.Element.Component & InputNumberProps;

	public constructor(component: Generic.Element.Component & InputNumberProps, name: string, host?: HTMLElement) {
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

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public validateMax(value?: number | NumberString): void {
		this.validateNumber('_max', value);
	}

	public validateMin(value?: number | NumberString): void {
		this.validateNumber('_min', value);
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

	public validateStep(value?: number | NumberString): void {
		this.validateNumber('_step', value);
	}

	public validateValue(value?: number | NumberString | null): void {
		this.validateNumber('_value', value);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateMax(this.component._max);
		this.validateMin(this.component._min);
		this.validateSuggestions(this.component._suggestions);
		this.validatePlaceholder(this.component._placeholder);
		this.validateReadOnly(this.component._readOnly);
		this.validateRequired(this.component._required);
		this.validateStep(this.component._step);
		this.validateValue(this.component._value);
	}
}
