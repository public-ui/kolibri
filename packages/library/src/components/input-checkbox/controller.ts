import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../components';
import { devHint } from '../../utils/a11y.tipps';
import { setState, watchBoolean, watchValidator } from '../../utils/prop.validators';
import { isString } from '../../utils/validator';
import { InputCheckboxRadioController } from '../input-radio/controller';
import { InputCheckboxIcon, InputCheckboxVariant, Props, Watches } from './types';

export class InputCheckboxController extends InputCheckboxRadioController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateChecked(value?: boolean): void {
		watchBoolean(this.component, '_checked', value);
		this.setFormAssociatedValue(this.component.state._checked as string);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateIcon(value?: Stringified<InputCheckboxIcon>): void {
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
					beforePatch: (_value: unknown, _nextState: Map<string, unknown>): void => {
						// empty
					},
				},
			}
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateIndeterminate(value?: boolean): void {
		watchBoolean(this.component, '_indeterminate', value);
	}

	/**
	 * @deprecated
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateType(value?: InputCheckboxVariant): void {
		devHint(`The "_type" prop is deprecated. Use "_variant" instead.`);
		this.validateVariant(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateValue(value?: string): void {
		setState(this.component, '_value', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateVariant(value?: InputCheckboxVariant): void {
		watchValidator(
			this.component,
			'_variant',
			(value): boolean => typeof value === 'string' && (value === 'button' || value === 'checkbox' || value === 'switch'),
			new Set(['String {button, checkbox, switch}']),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateChecked(this.component._checked);
		this.validateIcon(this.component._icon);
		this.validateIndeterminate(this.component._indeterminate);
		this.validateValue(this.component._value);
		this.validateVariant(this.component._variant || this.component._type);
	}
}
