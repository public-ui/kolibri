import type { Generic } from 'adopted-style-sheets';

import type { WatchBooleanOptions } from '../utils';
import { watchBoolean } from '../utils';

export type InlinePropType = boolean;

/**
 * Renders the component inline so it aligns with surrounding text without enforcing a minimum height.
 */
export type PropInline = {
	inline: InlinePropType;
};

export const validateInline = (component: Generic.Element.Component, value?: InlinePropType, options: WatchBooleanOptions = {}): void => {
	watchBoolean(component, '_inline', value, options);
};
