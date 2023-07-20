import { Generic } from '@a11y-ui/core';

import { validateMultiple } from '../../types/props/multiple';
import { InputTextEmailController } from '../input-text/controller';
import { Props, Watches } from './types';

export class InputEmailController extends InputTextEmailController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateMultiple(value?: boolean): void {
		validateMultiple(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateMultiple(this.component._multiple);
	}
}
