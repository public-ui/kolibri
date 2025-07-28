import type { Generic } from 'adopted-style-sheets';

import type { AcceptPropType, InputFileProps, InputFileWatches, MultiplePropType, RequiredPropType } from '../../schema';
import { validateAccept, validateMultiple, validateRequired } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

export class InputFileController extends InputIconController implements InputFileWatches {
	protected readonly component: Generic.Element.Component & InputFileProps;

	public constructor(component: Generic.Element.Component & InputFileProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAccept(value?: AcceptPropType): void {
		validateAccept(this.component, value);
	}

	public validateMultiple(value?: MultiplePropType): void {
		validateMultiple(this.component, value);
	}

	public validateRequired(value?: RequiredPropType): void {
		validateRequired(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAccept(this.component._accept);
		this.validateMultiple(this.component._multiple);
		this.validateRequired(this.component._required);
	}
}
