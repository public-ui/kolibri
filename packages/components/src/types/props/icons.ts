import { Generic } from 'adopted-style-sheets';

import { objectObjectHandler, parseJson, watchValidator } from '../../utils/prop.validators';
import { isObject, isString, isStyle } from '../../utils/validator';
import { States as ButtonStates } from '../../components/button/types';
import { Stringified } from '../common';
import { AnyIconFontClass, KoliBriCustomIcon, KoliBriIconsProp, KoliBriIconsState } from '../icons';
import { AlignPropType } from './align';

/* types */
export type IconsPropType = Stringified<KoliBriIconsProp>;

/**
 * Defines the icon classnames.
 */
export type PropIcons = {
	icons: IconsPropType;
};

/* validator */

const mapCustomIcon = (state: KoliBriIconsState, alignment: AlignPropType, icon?: AnyIconFontClass | KoliBriCustomIcon) => {
	if (isObject(icon)) {
		state[alignment] = icon as KoliBriCustomIcon;
	} else if (isString(icon, 1)) {
		state[alignment] = {
			icon: icon as AnyIconFontClass,
		};
	}
};

export const mapIconProp2State = (icon: KoliBriIconsProp, iconAlign?: AlignPropType): KoliBriIconsState => {
	let state: KoliBriIconsState = {};
	if (isString(icon, 1)) {
		switch (iconAlign) {
			case 'right':
				state = {
					right: {
						icon: icon as AnyIconFontClass,
					},
				};
				break;
			default:
				state = {
					left: {
						icon: icon as AnyIconFontClass,
					},
				};
		}
	} else if (typeof icon === 'object' && icon !== null) {
		mapCustomIcon(state, 'top', icon.top);
		mapCustomIcon(state, 'right', icon.right);
		mapCustomIcon(state, 'bottom', icon.bottom);
		mapCustomIcon(state, 'left', icon.left);
	}
	return state;
};

const beforePatchIcon = (component: Generic.Element.Component): void => {
	if (component.nextState?.has('_icons')) {
		const icon = component.nextState?.get('_icons') as KoliBriIconsProp;
		const iconAlign = (component.nextState?.get('_iconAlign') as AlignPropType) || (component.state as ButtonStates)._iconAlign;
		component.nextState?.set('_icons', mapIconProp2State(icon, iconAlign));
	} else if (component.nextState?.has('_iconAlign')) {
		const lastIconAlign = (component.state as ButtonStates)._iconAlign as AlignPropType;
		component.nextState?.set('_icons', {
			[lastIconAlign]: undefined,
			[component.nextState?.get('_iconAlign') as AlignPropType]: (component.state as ButtonStates)._icons[lastIconAlign],
		});
	}
};

export const isIcon = (value?: unknown): boolean =>
	typeof value === 'object' &&
	value !== null &&
	(typeof (value as KoliBriCustomIcon).style === 'undefined' || isStyle((value as KoliBriCustomIcon).style)) &&
	isString((value as KoliBriCustomIcon).icon, 1);

export const validateIcons = (component: Generic.Element.Component, value?: IconsPropType): void => {
	objectObjectHandler(value, () => {
		try {
			value = parseJson<KoliBriIconsProp>(value as string);
		} catch (e) {
			// value behält den ursprünglichen Wert
		}
		watchValidator(
			component,
			'_icons',
			(value): boolean => {
				return (
					value === null ||
					isString(value, 1) ||
					(typeof value === 'object' &&
						value !== null &&
						(isString(value.left, 1) ||
							isIcon(value.left) ||
							isString(value.right, 1) ||
							isIcon(value.right) ||
							isString(value.top, 1) ||
							isIcon(value.top) ||
							isString(value.bottom, 1) ||
							isIcon(value.bottom)))
				);
			},
			new Set(['KoliBriIcon']),
			value,
			{
				hooks: {
					beforePatch: (nextValue: unknown, nextState: Map<string, unknown>) => {
						if (nextValue === null) {
							nextState.set('_icons', {});
						}
						beforePatchIcon(component);
					},
				},
				required: true,
			}
		);
	});
};

export const watchIconAlign = (component: Generic.Element.Component, value?: AlignPropType): void => {
	watchValidator(component, '_iconAlign', (value) => value === 'left' || value === 'right', new Set(['Alignment {left, right, top, bottom}']), value, {
		hooks: {
			beforePatch: () => {
				beforePatchIcon(component);
			},
		},
	});
};
