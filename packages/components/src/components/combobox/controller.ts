import type { ComboboxProps, ComboboxWatches, PlaceholderPropType, RequiredPropType, SuggestionsPropType } from '../../schema';
import { validatePlaceholder, validateRequired, validateSuggestions, watchBoolean, watchString } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';

export class ComboboxController extends InputIconController implements ComboboxWatches {
	protected readonly component: Generic.Element.Component & ComboboxProps;

	public constructor(component: Generic.Element.Component & ComboboxProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateHasClearButton(value?: boolean): void {
		watchBoolean(this.component, '_hasClearButton', value);
	}

	public validatePlaceholder(value?: PlaceholderPropType): void {
		validatePlaceholder(this.component, value);
	}

	public validateRequired(value?: RequiredPropType): void {
		validateRequired(this.component, value);
	}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateHasClearButton(this.component._hasClearButton);
		this.validatePlaceholder(this.component._placeholder);
		this.validateRequired(this.component._required);
		this.validateSuggestions(this.component._suggestions);
		this.validateValue(this.component._value);
	}
}
