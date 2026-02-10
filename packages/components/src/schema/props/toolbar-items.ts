import type { Generic } from 'adopted-style-sheets';

import type { InternalButtonProps, LinkProps } from '../../schema';
import { emptyStringByArrayHandler, objectObjectHandler, parseJson, setState } from '../utils';

/* types */
export type ToolbarItemPropType =
	| ({
			type: 'button';
	  } & InternalButtonProps)
	| ({
			type: 'link';
	  } & LinkProps);
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
			}
			try {
				value = parseJson<ToolbarItemPropType[]>(value);
			} catch (e) {
				// value keeps the original items
			}
			if (Array.isArray(value) && value.every((items: ToolbarItemPropType) => typeof items === 'object' && items !== null)) {
				setState(component, '_items', value);
			}
		});
	});
};
