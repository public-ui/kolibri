import type { Generic } from 'adopted-style-sheets';

import { watchString } from '../utils';

export type QuotePropType = string;

/**
 * Defines the text of the quote.
 *
 * @deprecated Unused legacy schema of `kol-quote`. The component normalizes and validates its props
 * internally (`internal/props`); this exported schema is kept only for backwards compatibility and
 * will be removed in a future major release.
 */
export type PropQuote = {
	quote: QuotePropType;
};

/**
 * @deprecated Unused legacy schema of `kol-quote`. The component validates its props internally
 * (`internal/props`); this exported validator is kept only for backwards compatibility and will be
 * removed in a future major release.
 */
export const validateQuote = (component: Generic.Element.Component, value?: QuotePropType): void => {
	watchString(component, '_quote', value, {
		required: true,
	});
};
