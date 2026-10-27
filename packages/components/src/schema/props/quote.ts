import type { Generic } from 'adopted-style-sheets';

import { watchString } from '../utils';

export type QuotePropType = string;

export const validateQuote = (component: Generic.Element.Component, value?: QuotePropType): void => {
	watchString(component, '_quote', value, {
		required: true,
	});
};
