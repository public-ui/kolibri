import type { AnyIconFontClass, KoliBriCustomIcon, KoliBriHorizontalIconsProp, KoliBriIconsProp, KoliBriIconsState } from '../types';
import type { Stringified } from '../types/common';
import { isObject, isString, isStyle } from '../validators';
import type { AlignPropType } from './align';

/* types */
export type IconsPropType = Stringified<KoliBriIconsProp>;
export type IconsHorizontalPropType = Stringified<KoliBriHorizontalIconsProp>;

/**
 * Defines the icon classnames.
 */
export type PropIcons = {
	icons: IconsPropType;
};
export type PropHorizontalIcons = {
	icons: IconsHorizontalPropType;
};

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

export const isIcon = (value?: unknown): boolean =>
	typeof value === 'object' &&
	value !== null &&
	(typeof (value as KoliBriCustomIcon).style === 'undefined' || isStyle((value as KoliBriCustomIcon).style)) &&
	(typeof (value as KoliBriCustomIcon).label === 'undefined' || isString((value as KoliBriCustomIcon).label)) &&
	isString((value as KoliBriCustomIcon).icon, 1);
