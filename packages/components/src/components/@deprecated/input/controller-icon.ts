import type { Generic } from 'adopted-style-sheets';

import type { IconsHorizontalPropType } from '../../../schema';
import { validateIcons } from '../../../schema';

import { InputController } from './controller';

import type { Props, Watches } from './types-icon';

export class InputIconController extends InputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateIcons(value?: IconsHorizontalPropType): void {
		validateIcons(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateIcons(this.component._icons);
	}
}
