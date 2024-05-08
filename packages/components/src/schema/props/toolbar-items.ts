import type { Generic } from 'adopted-style-sheets';

import { emptyStringByArrayHandler, objectObjectHandler, parseJson, setState } from '../utils';
import type { Stringified } from '../types';
import type { ButtonProps, LinkProps } from '../../schema';

/* types */
export type ToolbarItemPropType = ButtonProps | LinkProps;
export type ToolbarItemsPropType = Stringified<ToolbarItemPropType[]>;

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
			}
			try {
				value = parseJson<ToolbarItemPropType[]>(value);
				// eslint-disable-next-line no-empty
			} catch (e) {
				// value keeps the original items
			}
			if (Array.isArray(value) && value.every((items: ToolbarItemPropType) => typeof items === 'object' && items !== null)) {
				setState(component, '_items', value);
			}
		});
	});
};
