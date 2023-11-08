import { Generic } from '@a11y-ui/core';

import { HideErrorPropType, validateHideError } from '../../types/props/hide-error';
import { MultiplePropType, validateMultiple } from '../../types/props/multiple';
import { a11yHint } from '../../utils/a11y.tipps';
import { InputTextEmailController } from '../input-text/controller';
import { Props, Watches } from './types';

export class InputEmailController extends InputTextEmailController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateHideError(value?: HideErrorPropType): void {
		validateHideError(this.component, value, {
			hooks: {
				afterPatch: () => {
					if (this.component.state._hideError) {
						a11yHint('Property hide-error for inputs: Only use when the error message is shown outside of the input component.');
					}
				},
			},
		});
	}

	public validateMultiple(value?: MultiplePropType): void {
		validateMultiple(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateHideError(this.component._hideError);
		this.validateMultiple(this.component._multiple);
	}
}
