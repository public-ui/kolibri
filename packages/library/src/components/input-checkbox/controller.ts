import { Generic } from '@public-ui/core';
import { setState, watchBoolean, watchValidator } from '../../utils/prop.validators';
import { InputCheckboxRadioController } from '../input-radio/controller';
import { InputCheckboxType, Props, Watches } from './types';

export class InputCheckboxController extends InputCheckboxRadioController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string) {
		super(component, name);
		this.component = component;
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateChecked(value?: boolean): void {
		watchBoolean(this.component, '_checked', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateIndeterminate(value?: boolean): void {
		watchBoolean(this.component, '_indeterminate', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateType(value?: InputCheckboxType): void {
		watchValidator(
			this.component,
			'_type',
			(value): boolean => typeof value === 'string' && (value === 'checkbox' || value === 'switch'),
			new Set(['String {checkbox, switch}']),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateValue(value?: string): void {
		setState(this.component, '_value', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateChecked(this.component._checked);
		this.validateIndeterminate(this.component._indeterminate);
		this.validateType(this.component._type);
		this.validateValue(this.component._value);
	}
}
