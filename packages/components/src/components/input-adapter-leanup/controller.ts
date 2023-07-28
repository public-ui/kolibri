import { Generic } from '@a11y-ui/core';

import { validateTouched } from '../../types/props/touched';
import { watchBoolean } from '../../utils/prop.validators';
import { AssociatedInputController } from './associated.controller';
import { Props, Watches } from './types';

export class ControlledInputController extends AssociatedInputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAlert(value?: boolean): void {
		watchBoolean(this.component, '_alert', value);
	}

	public validateTouched(value?: boolean): void {
		validateTouched(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAlert(this.component._alert);
		this.validateTouched(this.component._touched);
	}
}
