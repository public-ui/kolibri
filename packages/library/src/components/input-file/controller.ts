import { Generic } from '@public-ui/core';
import { watchBoolean, watchString } from '../../utils/prop.validators';
import { InputController } from '../@deprecated/input/controller';
import { Props, Watches } from './types';

export class InputFileController extends InputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateAccept(value?: string): void {
		watchString(this.component, '_accept', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateMultiple(value?: boolean): void {
		watchBoolean(this.component, '_multiple', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAccept(this.component._accept);
		this.validateMultiple(this.component._multiple);
		this.validateRequired(this.component._required);
		this.validateValue(this.component._value);
	}
}
