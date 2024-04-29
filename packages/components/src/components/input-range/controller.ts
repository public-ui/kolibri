import type { InputRangeProps, InputRangeWatches, InputTypeOnOff, SuggestionsPropType } from '../../schema';
import { validateSuggestions, watchNumber, watchValidator } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class InputRangeController extends InputIconController implements InputRangeWatches {
	protected readonly component: Generic.Element.Component & InputRangeProps;

	public constructor(component: Generic.Element.Component & InputRangeProps, name: string, host?: HTMLElement) {
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

	public validateMax(value?: number): void {
		watchNumber(this.component, '_max', value);
	}

	public validateMin(value?: number): void {
		watchNumber(this.component, '_min', value);
	}

	public validateStep(value?: number): void {
		watchNumber(this.component, '_step', value);
	}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public validateValue(value?: number): void {
		watchNumber(this.component, '_value', value);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateMax(this.component._max);
		this.validateMin(this.component._min);
		this.validateStep(this.component._step);
		this.validateSuggestions(this.component._suggestions);
		this.validateValue(this.component._value);
	}
}
