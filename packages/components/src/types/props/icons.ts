import type { Generic } from 'adopted-style-sheets';

import { WatchOptions, objectObjectHandler, parseJson, watchValidator } from '../../utils/prop.validators';
import { isObject, isString, isStyle } from '../../utils/validator';
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
export const mapIconProp2State = (icon: KoliBriIconsProp): KoliBriIconsState => {
	let state: KoliBriIconsState = {};
	if (isString(icon, 1)) {
		state = {
			left: {
				icon: icon as AnyIconFontClass,
			},
		};
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
		const icons = component.nextState?.get('_icons') as KoliBriIconsProp;
		component.nextState?.set('_icons', mapIconProp2State(icons));
	}
};
export const isIcon = (value?: unknown): boolean =>
	typeof value === 'object' &&
	value !== null &&
	(typeof (value as KoliBriCustomIcon).style === 'undefined' || isStyle((value as KoliBriCustomIcon).style)) &&
	isString((value as KoliBriCustomIcon).icon, 1);

export const validateIcons = (component: Generic.Element.Component, value?: IconsPropType, options: WatchOptions = {}): void => {
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
				...options,
				defaultValue: {},
				hooks: {
					afterPatch: options.hooks?.afterPatch,
					beforePatch: (nextValue, nextState, component, key) => {
						if (typeof options.hooks?.beforePatch === 'function') {
							options.hooks?.beforePatch(nextValue, nextState, component, key);
						}
						beforePatchIcon(component);
					},
				},
			},
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
