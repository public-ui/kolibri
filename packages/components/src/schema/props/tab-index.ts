import type { Generic } from 'adopted-style-sheets';

import type { WatchNumberOptions } from '../utils';
import { a11yHint, watchNumber } from '../utils';

/**
 * @deprecated We prefer to use it on the host element with the default tabIndex. Please make sure not to use tabIndex for disabled elements. The property will be removed in the next major version.
 */
export type TabIndexPropType = number;

/**
 * Defines which tab-index the primary element of the component has.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex
 *
 * @deprecated We prefer to use it on the host element with the default tabIndex. Please make sure not to use tabIndex for disabled elements. The property will be removed in the next major version.
 */
export type PropTabIndex = {
	tabIndex: TabIndexPropType;
};

/**
 * @deprecated We prefer to use it on the host element with the default tabIndex. Please make sure not to use tabIndex for disabled elements. The property will be removed in the next major version.
 */
const options: WatchNumberOptions = {
	hooks: {
		afterPatch: (value) => {
			if (value !== -1 && value !== 0) {
				a11yHint(`Don't Use Tabindex Greater than 0: https://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html`);
			}
		},
	},
};

/**
 * @deprecated We prefer to use it on the host element with the default tabIndex. Please make sure not to use tabIndex for disabled elements. The property will be removed in the next major version.
 */
export const validateTabIndex = (component: Generic.Element.Component, value?: TabIndexPropType): void => {
	watchNumber(component, '_tabIndex', value, options);
};
