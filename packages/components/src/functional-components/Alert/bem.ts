import { generateBemClassNames } from 'typed-bem';

/**
 * This file defines the BEM schema for the kol-alert component.
 */

/**
 * The schema defines the structure of the BEM class names
 */
type SCHEMA = {
	'kol-alert': {
		/**
		 * Here we define the elements we needed
		 * to realize a minimal full featured alert
		 * component (DOM).
		 */
		elements: {
			container: {
				modifiers: null;
			};
			icon: {
				modifiers: null;
			};
			heading: {
				/**
				 * Some elements needs modifiers to
				 * style them properly.
				 */
				modifiers: Set<'h0' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
			};
			content: {
				modifiers: null;
			};
			closer: {
				modifiers: null;
			};
		};
		/**
		 * Here we define the modifiers related to the
		 * kol-alert component properties.
		 */
		modifiers: Set<'hasCloser' | 'type-default' | 'type-error' | 'type-info' | 'type-success' | 'type-warning' | 'variant-card' | 'variant-msg'>;
	};
};

/**
 * Define the generator function for the BEM class names.
 */
const bem = generateBemClassNames<SCHEMA>();

/**
 * Define a constants object that contains the BEM schema for
 * reuse to generate SCSS files in themes.
 */
const BEM: SCHEMA = {
	'kol-alert': {
		elements: {
			closer: { modifiers: null },
			heading: { modifiers: new Set(['h0', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']) },
			icon: { modifiers: null },
			content: { modifiers: null },
			container: { modifiers: null },
		},
		modifiers: new Set(['hasCloser', 'type-default', 'type-error', 'type-info', 'type-success', 'type-warning', 'variant-card', 'variant-msg']),
	},
};

/**
 * Define the static BEM class names for the alert component.
 */
const BEM_CLASS_ALERT__CLOSER = bem('kol-alert', 'closer');
const BEM_CLASS_ALERT__CONTENT = bem('kol-alert', 'content');
const BEM_CLASS_ALERT__ICON = bem('kol-alert', 'icon');

export { bem as genBemAlert, BEM as BEM_ALERT };
export { BEM_CLASS_ALERT__CLOSER, BEM_CLASS_ALERT__CONTENT, BEM_CLASS_ALERT__ICON };
