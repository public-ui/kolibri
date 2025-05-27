import { generateBemClassNames } from 'typed-bem';

type BEM = {
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

const bem = generateBemClassNames<BEM>();

const schema: BEM = {
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
export const BEM_ALERT__CLOSER = bem('kol-alert', 'closer');
export const BEM_ALERT__CONTENT = bem('kol-alert', 'content');
export const BEM_ALERT__ICON = bem('kol-alert', 'icon');

export { bem as bemAlert, schema as schemaAlert };
