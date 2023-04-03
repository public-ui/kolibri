import { Generic } from '@a11y-ui/core';
import { watchBoolean, watchString } from '../../utils/prop.validators';
import { InputIconController } from '../@deprecated/input/controller-icon';
import { Props, Watches } from './types';

export class InputFileController extends InputIconController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAccept(value?: string): void {
		watchString(this.component, '_accept', value);
	}

	public validateMultiple(value?: boolean): void {
		watchBoolean(this.component, '_multiple', value);
	}

	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
		this.setFormAssociatedValue(this.component._value as string);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAccept(this.component._accept);
		this.validateMultiple(this.component._multiple);
		this.validateRequired(this.component._required);
		this.validateValue(this.component._value);
	}
}
