import type { ComboboxWatches, ComboboxProps, SuggestionsPropType, MsgPropType } from '../../schema';
import { watchBoolean, validateSuggestions, watchString, validateMsg } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class ComboboxController extends InputIconController implements ComboboxWatches {
	protected readonly component: Generic.Element.Component & ComboboxProps;

	public constructor(component: Generic.Element.Component & ComboboxProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	protected readonly afterPatchOptions = (value: unknown, _state: Record<string, unknown>, _component: Generic.Element.Component, key: string): void => {
		key === '_value' && this.setFormAssociatedValue(value as string);
	};

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}
	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
	}
	public validateMsg(value?: MsgPropType): void {
		validateMsg(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateSuggestions(this.component._suggestions);
		this.validateRequired(this.component._required);
		this.validateValue(this.component._value);
	}
}
