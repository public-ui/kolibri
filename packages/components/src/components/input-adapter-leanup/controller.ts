import type { Generic } from 'adopted-style-sheets';

import { validateTouched } from '../../schema';

import { AssociatedInputController } from './associated.controller';

import type { Props, Watches } from './types';

export class ControlledInputController extends AssociatedInputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateTouched(value?: boolean): void {
		validateTouched(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateTouched(this.component._touched);
	}
}
