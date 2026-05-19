import type { AutoCompletePropType, InputColorProps, InputColorWatches, SuggestionsPropType, VariantClassNamePropType } from '../../schema';
import { validateSuggestions, validateVariantClassName, watchString } from '../../schema';
import { validateAutoComplete } from '../../schema/props/auto-complete';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class InputColorController extends InputIconController implements InputColorWatches {
	protected readonly component: Generic.Element.Component & InputColorProps;

	public constructor(component: Generic.Element.Component & InputColorProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAutoComplete(value?: AutoCompletePropType): void {
		validateAutoComplete(this.component, value);
	}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	public validateVariant(value?: VariantClassNamePropType): void {
		validateVariantClassName(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateSuggestions(this.component._suggestions);
		this.validateValue(this.component._value);
		this.validateVariant(this.component._variant);
	}
}
