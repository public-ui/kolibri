import { generateBemClassNames } from 'typed-bem';

/**
 * Central BEM Schema Registry for all KoliBri Components
 *
 * This file serves as the single source of truth for all BEM class name structures
 * across the entire KoliBri component library. By centralizing component schemas here,
 * we ensure consistency, prevent duplication, and enable powerful tooling.
 *
 * Benefits:
 * - Type safety across all components
 * - Consistent BEM structure
 * - Single point of maintenance
 * - Automatic SCSS generation
 * - Better IDE support and autocomplete
 * - forBlock integration for component-specific generators
 */

/**
 * Complete schema definition for all KoliBri components
 */
type KoliBriComponentsBemSchema = {
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
	'kol-avatar': {
		elements: {
			image: {
				modifiers: null;
			};
			initials: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
	'kol-icon': {
		elements: {
			icon: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
	'kol-quote': {
		elements: {
			blockquote: {
				modifiers: null;
			};
			cite: {
				modifiers: null;
			};
			figcaption: {
				modifiers: null;
			};
			quote: {
				modifiers: null;
			};
		};
		modifiers: Set<'block' | 'inline'>;
	};
	'kol-skeleton': {
		elements: {
			container: {
				modifiers: null;
			};
			name: {
				modifiers: null;
			};
			counter: {
				modifiers: null;
			};
			actions: {
				modifiers: null;
			};
		};
		modifiers: Set<'has-name' | 'is-hidden'>;
	};
	'kol-click-button': {
		elements: {
			label: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
	'kol-span': {
		elements: {
			container: {
				modifiers: null;
			};
			icon: {
				modifiers: Set<'bottom' | 'left' | 'right' | 'top'>;
			};
			label: {
				modifiers: null;
			};
		};
		modifiers: Set<'has-badge' | 'hide-label'>;
	};
};

/**
 * Create the central BEM generator instance
 * This single instance is used across all components
 */
export const bem = generateBemClassNames<KoliBriComponentsBemSchema>();

/**
 * Export the complete BEM schema for reuse
 * to generate SCSS files in themes.
 */
const BEM: KoliBriComponentsBemSchema = {
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
	'kol-avatar': {
		elements: {
			image: { modifiers: null },
			initials: { modifiers: null },
		},
		modifiers: null,
	},
	'kol-icon': {
		elements: {
			icon: { modifiers: null },
		},
		modifiers: null,
	},
	'kol-quote': {
		elements: {
			blockquote: { modifiers: null },
			cite: { modifiers: null },
			figcaption: { modifiers: null },
			quote: { modifiers: null },
		},
		modifiers: new Set(['block', 'inline']),
	},
	'kol-skeleton': {
		elements: {
			actions: { modifiers: null },
			container: { modifiers: null },
			counter: { modifiers: null },
			name: { modifiers: null },
		},
		modifiers: new Set(['has-name', 'is-hidden']),
	},
	'kol-click-button': {
		elements: {
			label: { modifiers: null },
		},
		modifiers: null,
	},
	'kol-span': {
		elements: {
			container: { modifiers: null },
			icon: { modifiers: new Set(['bottom', 'left', 'right', 'top']) },
			label: { modifiers: null },
		},
		modifiers: new Set(['has-badge', 'hide-label']),
	},
};

export { BEM };
