import type { Generic } from 'adopted-style-sheets';

import type { WatchNumberOptions } from '../utils';
import { a11yHint, watchNumber } from '../utils';

/* types */
export type TabIndexPropType = number;

/**
 * Defines which tab-index the primary element of the component has.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
 */
export type PropTabIndex = {
	tabIndex: TabIndexPropType;
};

/* constants */
const options: WatchNumberOptions = {
	hooks: {
		afterPatch: (value) => {
			if (value !== -1 && value !== 0) {
				a11yHint(`Don't Use Tabindex Greater than 0: https://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html`);
			}
		},
	},
};

/* validator */
export const validateTabIndex = (component: Generic.Element.Component, value?: TabIndexPropType): void => {
	watchNumber(component, '_tabIndex', value, options);
};
