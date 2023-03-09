import { Generic } from '@a11y-ui/core';
import { a11yHint } from '../a11y.tipps';
import { watchNumber, WatchNumberOptions } from '../prop.validators';

/**
 * Accessibility hints
 * - https://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html
 */

const options: WatchNumberOptions = {
	hooks: {
		afterPatch: (value) => {
			if (value !== -1 && value !== 0) {
				a11yHint(`Don’t Use Tabindex Greater than 0: https://adrianroselli.com/2014/11/dont-use-tabindex-greater-than-0.html`);
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
