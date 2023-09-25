import { Generic } from '@a11y-ui/core';

import { InputTypeOnOff } from '../../types/input/types';
import { HideErrorPropType, validateHideError } from '../../types/props/hide-error';
import { SuggestionsPropType, validateSuggestions } from '../../types/props/suggestions';
import { a11yHint } from '../../utils/a11y.tipps';
import { watchString, watchValidator } from '../../utils/prop.validators';
import { InputIconController } from '../@deprecated/input/controller-icon';
import { Props, Watches } from './types';

export class InputColorController extends InputIconController implements Watches {
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
			value
		);
	}

	/**
	 * @deprecated remains to satisfy `Watches` interface
	 */
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public validateList(): void {}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	public validateHideError(value?: HideErrorPropType): void {
		validateHideError(this.component, value, {
			hooks: {
				afterPatch: () => {
					if (this.component.state._hideError) {
						a11yHint('Property hide-error for inputs: Only use when the error message is shown outside of the input component.');
					}
				},
			},
		});
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateHideError(this.component._hideError);
		this.validateSuggestions(this.component._suggestions || this.component._list);
		this.validateValue(this.component._value);
	}
}
