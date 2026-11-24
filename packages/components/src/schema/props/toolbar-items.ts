import type { InternalButtonProps, LinkProps } from '../../schema';

/* types */
export type ToolbarItemPropType =
	| ({
			type: 'button';
	  } & InternalButtonProps)
	| ({
			type: 'link';
	  } & LinkProps)
	| {
			type: 'hr';
	  };
export type ToolbarItemsPropType = ToolbarItemPropType[];

/**
 * Defines the primary toolbar items.
 */
export type PropToolbarItems = {
	items: ToolbarItemsPropType;
};
