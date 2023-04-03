import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';
import { InputTextEmailController } from '../input-text/controller';
import { Props, Watches } from './types';

export class InputEmailController extends InputTextEmailController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateMultiple(value?: boolean): void {
		watchBoolean(this.component, '_multiple', value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateMultiple(this.component._multiple);
	}
}
