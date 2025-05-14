import type { Generic } from 'adopted-style-sheets';

import type { CharacterLimitPropType, InputEmailProps, InputEmailWatches, MultiplePropType } from '../../schema';
import { validateCharacterLimit, validateMultiple } from '../../schema';

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

	public validateCharacterLimit(value?: CharacterLimitPropType): void {
		validateCharacterLimit(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateCharacterLimit(this.component._characterLimit);
		this.validateMultiple(this.component._multiple);
	}
}
