import type { Generic } from 'adopted-style-sheets';

import type { InputEmailProps, InputEmailWatches, MultiplePropType } from '@public-ui/schema';
import { validateMultiple } from '@public-ui/schema';

import { InputTextEmailController } from '../input-text/controller';

export class InputEmailController extends InputTextEmailController implements InputEmailWatches {
	protected readonly component: Generic.Element.Component & InputEmailProps;

	public constructor(component: Generic.Element.Component & InputEmailProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateMultiple(value?: MultiplePropType): void {
		validateMultiple(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateMultiple(this.component._multiple);
	}
}
