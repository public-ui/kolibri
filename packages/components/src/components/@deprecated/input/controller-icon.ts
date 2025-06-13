import type { Generic } from 'adopted-style-sheets';

import type { IconsHorizontalPropType, NumberString } from '../../../schema';
import { watchValidator } from '../../../schema';
import { validateIcons } from '../../../schema';

import { InputController } from './controller';

import type { Props, Watches } from './types-icon';

export class InputIconController extends InputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;
	private readonly numberStringRegex = /^\d+(\.\d+)?$/; // https://regex101.com/r/mET6Tx/1

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateIcons(value?: IconsHorizontalPropType): void {
		validateIcons(this.component, value);
	}

	public isNumberString(value: unknown): value is NumberString {
		return typeof value === 'string' && this.numberStringRegex.test(value);
	}

	protected readonly parseToNumber = (value?: number | NumberString | null): number | null => {
		if (typeof value === 'number') {
			return isNaN(value) ? null : value;
		}
		if (this.isNumberString(value)) {
			return parseFloat(value);
		}
		return null;
	};

	protected readonly validateNumber = (propName: string, value?: number | NumberString | null) => {
		return watchValidator(
			this.component,
			propName,
			(value): boolean =>
				value === undefined || value === null || typeof value === 'number' || (typeof value === 'string' && this.numberStringRegex.test(value)),
			new Set(['number', 'NumberString']),
			value,
			{
				hooks: {
					beforePatch: (value: unknown, nextState) => {
						if (nextState?.has(propName)) {
							nextState?.set(propName, this.parseToNumber(value as number | NumberString | null));
						}
					},
				},
			},
		);
	};

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateIcons(this.component._icons);
	}
}
