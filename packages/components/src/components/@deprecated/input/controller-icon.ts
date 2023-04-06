import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../../types/common';
import { KoliBriHorizontalIcon } from '../../../types/icon';
import { objectObjectHandler, parseJson, watchValidator } from '../../../utils/prop.validators';
import { isString } from '../../../utils/validator';
import { isIcon } from '../../../types/props/icon';
import { InputController } from './controller';
import { Props, Watches } from './types-icon';

const beforePatchIcon = (value: unknown, nextState: Map<string, unknown>): void => {
	const icon = value as KoliBriHorizontalIcon;
	if (typeof icon === 'object' && icon !== null) {
		if (isString(icon.right, 1)) {
			icon.right = { icon: icon.right as string };
		}
		if (isString(icon.left, 1)) {
			icon.left = { icon: icon.left as string };
		}
		nextState.set('_icon', icon);
	}
};

export class InputIconController extends InputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateIcon(value?: Stringified<KoliBriHorizontalIcon>): void {
		objectObjectHandler(value, () => {
			try {
				value = parseJson<KoliBriHorizontalIcon>(value as string);
				// eslint-disable-next-line no-empty
			} catch (e) {
				// value behält den ursprünglichen Wert
			}
			watchValidator(
				this.component,
				'_icon',
				(value): boolean => {
					return (
						typeof value === 'object' && value !== null && (isString(value.left, 1) || isIcon(value.left) || isString(value.right, 1) || isIcon(value.right))
					);
				},
				new Set(['KoliBriHorizontalIcon']),
				value,
				{
					hooks: {
						beforePatch: beforePatchIcon,
					},
					required: true,
				}
			);
		});
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateIcon(this.component._icon);
	}
}
