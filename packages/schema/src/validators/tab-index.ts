import type { Generic } from 'adopted-style-sheets';

import type { WatchNumberOptions } from '../utils';
import { a11yHint, watchNumber } from '../utils';

/**
 * Accessibility hints
 * - https://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html
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
 * Diese Methode validiert das Property und setzt den State, wenn es valide ist.
 */
export const validateTabIndex = (component: Generic.Element.Component, value?: number): void => {
	watchNumber(component, '_tabIndex', value, options);
};
