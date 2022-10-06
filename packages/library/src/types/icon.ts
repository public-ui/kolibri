import { Generic } from '@public-ui/core';
import { objectObjectHandler, parseJson, watchValidator } from '../utils/prop.validators';
import { isString, isStyle } from '../utils/validator';
import { ButtonStates } from './button-link';

export type Alignment = 'left' | 'right'; // | 'top' | 'buttom';

// ts-prune-ignore-next
export type AnyIconFontClass = string;

export type KoliBriCustomIcon = {
	icon: AnyIconFontClass;
	style?: Record<string, string>;
};

export type KoliBriHorizontalIcon =
	| {
			right: AnyIconFontClass | KoliBriCustomIcon;
			left?: AnyIconFontClass | KoliBriCustomIcon;
	  }
	| {
			right?: AnyIconFontClass | KoliBriCustomIcon;
			left: AnyIconFontClass | KoliBriCustomIcon;
	  };

// export type KoliBriVerticalIcon =
// 	| {
// 			top: AnyIconFontClass | KoliBriCustomIcon;
// 			bottom?: AnyIconFontClass | KoliBriCustomIcon;
// 	  }
// 	| {
// 			top?: AnyIconFontClass | KoliBriCustomIcon;
// 			bottom: AnyIconFontClass | KoliBriCustomIcon;
// 	  };

type KoliBriAllIcon =
	| {
			top: AnyIconFontClass | KoliBriCustomIcon;
			right?: AnyIconFontClass | KoliBriCustomIcon;
			bottom?: AnyIconFontClass | KoliBriCustomIcon;
			left?: AnyIconFontClass | KoliBriCustomIcon;
	  }
	| {
			top?: AnyIconFontClass | KoliBriCustomIcon;
			right: AnyIconFontClass | KoliBriCustomIcon;
			bottom?: AnyIconFontClass | KoliBriCustomIcon;
			left?: AnyIconFontClass | KoliBriCustomIcon;
	  }
	| {
			top?: AnyIconFontClass | KoliBriCustomIcon;
			right?: AnyIconFontClass | KoliBriCustomIcon;
			bottom: AnyIconFontClass | KoliBriCustomIcon;
			left?: AnyIconFontClass | KoliBriCustomIcon;
	  }
	| {
			top?: AnyIconFontClass | KoliBriCustomIcon;
			right?: AnyIconFontClass | KoliBriCustomIcon;
			bottom?: AnyIconFontClass | KoliBriCustomIcon;
			left: AnyIconFontClass | KoliBriCustomIcon;
	  };

export type KoliBriIconProp = AnyIconFontClass | KoliBriAllIcon;

const beforePatchIcon = (component: Generic.Element.Component): void => {
	if (component.nextState?.has('_icon')) {
		const icon = component.nextState?.get('_icon') as KoliBriIconProp;
		if (typeof icon === 'string' && icon.length > 0) {
			switch ((component.nextState?.get('_iconAlign') as Alignment) || (component.state as ButtonStates)._iconAlign) {
				case 'left':
					component.nextState?.set('_icon', {
						left: {
							icon: `icofont-${icon}`,
						},
					});
					break;
				case 'right':
					component.nextState?.set('_icon', {
						right: {
							icon: `icofont-${icon}`,
						},
					});
					break;
				// case 'top':
				//   component.nextState?.set('_icon', {
				//     top: {
				//       icon: `icofont-${icon}`,
				//     },
				//   });
				//   break;
				// case 'bottom':
				//   component.nextState?.set('_icon', {
				//     bottom: {
				//       icon: `icofont-${icon}`,
				//     },
				//   });
				//   break;
				default:
					component.nextState?.set('_icon', {
						left: {
							icon: `icofont-${icon}`,
						},
					});
			}
		} else if (typeof icon === 'object' && icon !== null) {
			if (isString(icon.top, 1)) {
				icon.top = { icon: icon.top as string };
			}
			if (isString(icon.right, 1)) {
				icon.right = { icon: icon.right as string };
			}
			if (isString(icon.bottom, 1)) {
				icon.bottom = { icon: icon.bottom as string };
			}
			if (isString(icon.left, 1)) {
				icon.left = { icon: icon.left as string };
			}
			component.nextState?.set('_icon', icon);
		}
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

export const watchIcon = (component: Generic.Element.Component, value?: KoliBriIconProp): void => {
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
