import type { InputColorProps, InputColorWatches, InputTypeOnOff, SuggestionsPropType } from '../../schema';
import { inputTypeOnOffOptions, validateSuggestions, watchString, watchValidator } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class InputColorController extends InputIconController implements InputColorWatches {
	protected readonly component: Generic.Element.Component & InputColorProps;

	public constructor(component: Generic.Element.Component & InputColorProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAutoComplete(value?: InputTypeOnOff): void {
		watchValidator(
			this.component,
			'_autoComplete',
			(value): boolean => typeof value === 'string' && inputTypeOnOffOptions.includes(value),
			new Set(inputTypeOnOffOptions),
			value,
		);
	}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateSuggestions(this.component._suggestions);
		this.validateValue(this.component._value);
	}
}
