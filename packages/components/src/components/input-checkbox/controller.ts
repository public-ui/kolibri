import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { CheckedPropType, validateChecked } from '../../types/props/checked';
import { HideErrorPropType, validateHideError } from '../../types/props/hide-error';
import { IndeterminatePropType, validateIndeterminate } from '../../types/props/indeterminate';
import { StencilUnknown } from '../../types/unknown';
import { a11yHint } from '../../utils/a11y.tipps';
import { setState, watchValidator } from '../../utils/prop.validators';
import { isString } from '../../utils/validator';
import { InputCheckboxRadioController } from '../input-radio/controller';
import { InputCheckboxIconsProp, InputCheckboxIconsState, InputCheckboxVariant, inputCheckboxVariantOptions, Props, Watches } from './types';

export class InputCheckboxController extends InputCheckboxRadioController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public readonly setFormAssociatedCheckboxValue = (value: StencilUnknown) => {
		if (this.component._checked) {
			this.setFormAssociatedValue(value);
		} else {
			this.setFormAssociatedValue(null);
		}
	};

	public validateChecked(value?: CheckedPropType): void {
		validateChecked(this.component, value);
		this.setFormAssociatedCheckboxValue(this.component.state._value as StencilUnknown);
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

	public validateIcons(value?: Stringified<InputCheckboxIconsProp>): void {
		watchValidator(
			this.component,
			'_icons',
			(value): boolean => {
				return typeof value === 'object' && value !== null && (isString(value.checked, 1) || isString(value.indeterminate, 1) || isString(value.unchecked, 1));
			},
			new Set(['InputCheckboxIcons']),
			value,
			{
				hooks: {
					beforePatch: (nextValue: unknown, nextState: Map<string, unknown>, component: Generic.Element.Component) => {
						nextState.set('_icons', {
							...(component.state._icons as InputCheckboxIconsState),
							...(nextValue as InputCheckboxIconsProp),
						});
					},
				},
			}
		);
	}

	public validateIndeterminate(value?: IndeterminatePropType): void {
		validateIndeterminate(this.component, value);
	}

	public validateValue(value?: Stringified<StencilUnknown>): void {
		setState(this.component, '_value', value);
		this.setFormAssociatedCheckboxValue(this.component.state._value as StencilUnknown);
	}

	public validateVariant(value?: InputCheckboxVariant): void {
		watchValidator(
			this.component,
			'_variant',
			(value): boolean => typeof value === 'string' && inputCheckboxVariantOptions.includes(value),
			new Set([`String {${inputCheckboxVariantOptions.join(', ')}`]),
			value
		);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateChecked(this.component._checked);
		this.validateHideError(this.component._hideError);
		this.validateIcons(this.component._icons);
		this.validateIndeterminate(this.component._indeterminate);
		this.validateValue(this.component._value);
		this.validateVariant(this.component._variant);
	}
}
