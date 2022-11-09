import { Generic } from '@public-ui/core';
import { ButtonStates } from '../../types/button-link';
import { Alignment, AnyIconFontClass, KoliBriAllIcon, KoliBriCustomIcon, KoliBriIconProp, KoliBriIconState } from '../../types/icon';
import { deprecatedHint } from '../a11y.tipps';
import { objectObjectHandler, parseJson, watchValidator } from '../prop.validators';
import { isObject, isString, isStyle } from '../validator';

const mapCustomIcon = (state: KoliBriIconState, icon?: AnyIconFontClass | KoliBriCustomIcon) => {
	if (isObject(icon)) {
		state.left = icon as KoliBriCustomIcon;
	} else if (isString(icon, 1)) {
		state.left = {
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
		mapCustomIcon(state, icon.top);
		mapCustomIcon(state, icon.right);
		mapCustomIcon(state, icon.bottom);
		mapCustomIcon(state, icon.left);
	}
	return state;
};

const beforePatchIcon = (component: Generic.Element.Component): void => {
	if (component.nextState?.has('_icon')) {
		const icon = component.nextState?.get('_icon') as KoliBriIconProp;
		const iconAlign = (component.nextState?.get('_iconAlign') as Alignment) || (component.state as ButtonStates)._iconAlign;
		component.nextState?.set('_icon', mapIconProp2State(icon, iconAlign));
	} else if (component.nextState?.has('_iconAlign')) {
		const lastIconAlign = (component.state as ButtonStates)._iconAlign;
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
	deprecatedHint(
		`Das Property _icon-align bzw. _iconAlign ist veraltet. Die Ausrichtung der Icon's kann jetzt direkt über das _icon-Property vorgenommen werden. (v1.1.10: https://public-ui.github.io/?path=/story/backlog-und-changelog--page)`
	);
	watchValidator(component, '_iconAlign', (value) => value === 'left' || value === 'right', new Set(['Alignment {left, right, top, bottom}']), value, {
		hooks: {
			beforePatch: () => {
				beforePatchIcon(component);
			},
		},
	});
};
