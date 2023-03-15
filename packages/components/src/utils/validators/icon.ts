import { Generic } from '@a11y-ui/core';
import { ButtonStates } from '../../types/button-link';
import { AnyIconFontClass, KoliBriAllIcon, KoliBriCustomIcon, KoliBriIconProp, KoliBriIconState } from '../../types/icon';
import { Alignment } from '../../types/props/alignment';
import { objectObjectHandler, parseJson, watchValidator } from '../prop.validators';
import { isObject, isString, isStyle } from '../validator';

const mapCustomIcon = (state: KoliBriIconState, alignment: Alignment | 'top' | 'bottom', icon?: AnyIconFontClass | KoliBriCustomIcon) => {
	if (isObject(icon)) {
		state[alignment] = icon as KoliBriCustomIcon;
	} else if (isString(icon, 1)) {
		state[alignment] = {
			icon: icon as AnyIconFontClass,
		};
	}
};

export const mapIconProp2State = (icon: KoliBriIconProp, iconAlign?: Alignment): KoliBriIconState => {
	let state: KoliBriIconState = {};
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
	if (component.nextState?.has('_icon')) {
		const icon = component.nextState?.get('_icon') as KoliBriIconProp;
		const iconAlign = (component.nextState?.get('_iconAlign') as Alignment) || (component.state as ButtonStates)._iconAlign;
		component.nextState?.set('_icon', mapIconProp2State(icon, iconAlign));
	} else if (component.nextState?.has('_iconAlign')) {
		const lastIconAlign = (component.state as ButtonStates)._iconAlign as Alignment;
		component.nextState?.set('_icon', {
			[lastIconAlign]: undefined,
			[component.nextState?.get('_iconAlign') as Alignment]: (component.state as ButtonStates)._icon[lastIconAlign],
		});
	}
};

export const isIcon = (value?: unknown): boolean =>
	typeof value === 'object' &&
	value !== null &&
	(typeof (value as KoliBriCustomIcon).style === 'undefined' || isStyle((value as KoliBriCustomIcon).style)) &&
	isString((value as KoliBriCustomIcon).icon, 1);

export const validateIcon = (component: Generic.Element.Component, value?: KoliBriIconProp): void => {
	objectObjectHandler(value, () => {
		try {
			value = parseJson<KoliBriIconProp>(value as string);
		} catch (e) {
			// value behält den ursprünglichen Wert
		}
		watchValidator(
			component,
			'_icon',
			(value): boolean => {
				return (
					value === null ||
					isString(value, 1) ||
					(typeof value === 'object' &&
						value !== null &&
						(isString((value as KoliBriAllIcon).left, 1) ||
							isIcon((value as KoliBriAllIcon).left) ||
							isString((value as KoliBriAllIcon).right, 1) ||
							isIcon((value as KoliBriAllIcon).right) ||
							isString((value as KoliBriAllIcon).top, 1) ||
							isIcon((value as KoliBriAllIcon).top) ||
							isString((value as KoliBriAllIcon).bottom, 1) ||
							isIcon((value as KoliBriAllIcon).bottom)))
				);
			},
			new Set(['KoliBriIcon']),
			value,
			{
				hooks: {
					beforePatch: (nextValue: unknown, nextState: Map<string, unknown>) => {
						if (nextValue === null) {
							nextState.set('_icon', {});
						}
						beforePatchIcon(component);
					},
				},
				required: true,
			}
		);
	});
};

export const watchIconAlign = (component: Generic.Element.Component, value?: Alignment): void => {
	watchValidator(component, '_iconAlign', (value) => value === 'left' || value === 'right', new Set(['Alignment {left, right, top, bottom}']), value, {
		hooks: {
			beforePatch: () => {
				beforePatchIcon(component);
			},
		},
	});
};
