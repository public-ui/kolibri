import type { ComboboxWatches, ComboboxProps, SuggestionsPropType } from '../../schema';
import { watchBoolean, validateSuggestions, watchString } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';

export class ComboboxController extends InputIconController implements ComboboxWatches {
	protected readonly component: Generic.Element.Component & ComboboxProps;

	public constructor(component: Generic.Element.Component & ComboboxProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validatePlaceholder(value?: string): void {
		watchString(this.component, '_placeholder', value);
	}
	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validatePlaceholder(this.component._placeholder);
		this.validateRequired(this.component._required);
		this.validateSuggestions(this.component._suggestions);
		this.validateValue(this.component._value);
	}
}
