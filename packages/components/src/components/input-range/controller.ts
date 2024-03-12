import type { Generic } from 'adopted-style-sheets';

import { Stringified } from '../../types/common';
import { InputTypeOnOff, Option } from '../../types/input/types';
import { SuggestionsPropType, validateSuggestions } from '../../types/props/suggestions';
import { W3CInputValue } from '../../types/w3c';
import { watchNumber, watchValidator } from '../../utils/prop.validators';
import { InputIconController } from '../@deprecated/input/controller-icon';
import { Props, Watches } from './types';

export class InputRangeController extends InputIconController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
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

	/**
	 * @deprecated use _suggestions
	 */
	public validateList(value?: Stringified<Option<W3CInputValue>[]>): void {
		if (Array.isArray(value)) {
			this.validateSuggestions(value.map((option) => option.value));
		}
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
		this.validateList(this.component._list);
		this.validateMax(this.component._max);
		this.validateMin(this.component._min);
		this.validateStep(this.component._step);
		this.validateSuggestions(this.component._suggestions);
		this.validateValue(this.component._value);
	}
}
