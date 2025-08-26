import type { Generic } from 'adopted-style-sheets';

import { emptyStringByArrayHandler, objectObjectHandler, parseJson, setState } from '../utils';
import { isObject } from '../validators';
import type { ButtonProps, LinkProps } from '../../schema';

/* types */
export type ToolbarItemPropType = ButtonProps | LinkProps;
export type ToolbarItemsPropType = ToolbarItemPropType[];

/**
 * Defines the primary toolbar items.
 */
export type PropToolbarItems = {
	items: ToolbarItemsPropType;
};

/* validator */
export const validateToolbarItems = (component: Generic.Element.Component, value?: ToolbarItemsPropType): void => {
	emptyStringByArrayHandler(value, () => {
		objectObjectHandler(value, () => {
			if (typeof value === 'undefined') {
				value = [];
			} else if (typeof value === 'string') {
				value = parseJson<ToolbarItemPropType[]>(value);
			}
			if (Array.isArray(value) && value.every((items: ToolbarItemPropType) => isObject(items))) {
				setState(component, '_items', value);
			}
		});
	});
};
