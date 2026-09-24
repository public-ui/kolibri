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
export type KoliBriComponentsBemSchema = {
	'kol-abbr': {
		modifiers: null;
	};
	'kol-accordion': {
		elements: {
			content: {
				modifiers: null;
			};
			heading: {
				modifiers: null;
			};
			wrapper: {
				modifiers: null;
			};
			'wrapper-animation': {
				modifiers: null;
			};
		};
		modifiers: Set<'disabled' | 'open'>;
	};
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
	'kol-badge': {
		elements: {
			label: {
				modifiers: null;
			};
			'smart-button': {
				modifiers: null;
			};
		};
		modifiers: Set<'has-smart-button'>;
	};
	'kol-version': {
		modifiers: null;
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
	'kol-card': {
		elements: {
			'close-button': {
				modifiers: null;
			};
			content: {
				modifiers: null;
			};
			header: {
				modifiers: null;
			};
			link: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
	/**
	 * The dialog carries both its own block class and the deprecated `kol-modal` one, and marks
	 * its variant with an element-style suffix (`kol-dialog__blank`, `kol-dialog__card`) rather
	 * than a modifier. Both are part of the published theming surface and are kept verbatim.
	 */
	'kol-dialog': {
		elements: {
			blank: {
				modifiers: null;
			};
			card: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
	'kol-modal': {
		elements: {
			blank: {
				modifiers: null;
			};
			card: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
	'kol-button': {
		elements: {
			'interactive-element': {
				modifiers: null;
			};
			text: {
				modifiers: null;
			};
			tooltip: {
				modifiers: null;
			};
		};
		modifiers: Set<'disabled' | 'hide-label' | 'inline' | 'standalone'>;
	};
	'kol-breadcrumb': {
		elements: {
			icon: {
				modifiers: null;
			};
			link: {
				modifiers: null;
			};
			list: {
				modifiers: null;
			};
			'list-element': {
				modifiers: null;
			};
			'list-element-span': {
				modifiers: null;
			};
			separator: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
	'kol-popover-button': {
		elements: {
			popover: {
				modifiers: null;
			};
		};
		modifiers: Set<'inline' | 'open'>;
	};
	'kol-details': {
		elements: {
			content: {
				modifiers: null;
			};
			heading: {
				modifiers: null;
			};
			wrapper: {
				modifiers: null;
			};
			'wrapper-animation': {
				modifiers: null;
			};
		};
		modifiers: Set<'disabled' | 'open'>;
	};
	/**
	 * The block class sits on the host element: everything the drawer renders is an element of it
	 * (`kol-drawer__dialog`, `kol-drawer__wrapper`, `kol-drawer__content`), so no node inside the
	 * shadow root carries the bare block name.
	 */
	'kol-drawer': {
		elements: {
			content: {
				modifiers: null;
			};
			dialog: {
				modifiers: null;
			};
			wrapper: {
				modifiers: Set<'bottom' | 'is-closing' | 'left' | 'open' | 'right' | 'top'>;
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
	'kol-meter': {
		elements: {
			bar: {
				modifiers: null;
			};
			'bar-label': {
				modifiers: null;
			};
			'bar-state': {
				modifiers: Set<'optimum' | 'suboptimal' | 'critical'>;
			};
			'bar-track': {
				modifiers: null;
			};
			'bar-fill': {
				modifiers: Set<'optimum' | 'suboptimal' | 'critical'>;
			};
			'bar-background': {
				modifiers: null;
			};
			'bar-border': {
				modifiers: null;
			};
			'value-unit': {
				modifiers: null;
			};
			value: {
				modifiers: null;
			};
			unit: {
				modifiers: null;
			};
		};
		modifiers: Set<'vertical'>;
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
	'kol-skip-nav': {
		elements: {
			list: {
				modifiers: null;
			};
			'list-item': {
				modifiers: null;
			};
		};
		modifiers: null;
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
			slot: {
				modifiers: null;
			};
		};
		modifiers: Set<'has-badge' | 'hide-label'>;
	};
	'kol-link': {
		elements: {
			'interactive-element': {
				modifiers: null;
			};
			icon: {
				modifiers: null;
			};
			text: {
				modifiers: null;
			};
		};
		modifiers: Set<'disabled' | 'external-link' | 'hide-label' | 'inline' | 'standalone'>;
	};
	'kol-form': {
		elements: {
			alert: {
				modifiers: null;
			};
			link: {
				modifiers: null;
			};
			'mandatory-fields-hint': {
				modifiers: null;
			};
		};
		modifiers: null;
	};
	'kol-split-button': {
		elements: {
			button: {
				modifiers: null;
			};
			'horizontal-line': {
				modifiers: null;
			};
			root: {
				modifiers: null;
			};
			'secondary-button': {
				modifiers: null;
			};
		};
		modifiers: null;
	};
	'kol-spin': {
		elements: {
			spinner: {
				modifiers: Set<'cycle' | 'dot' | 'none'>;
			};
			'spinner-element': {
				modifiers: Set<'1' | '2' | '3' | 'neutral'>;
			};
			loader: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
	'kol-tabs': {
		elements: {
			'button-create': {
				modifiers: null;
			};
			'button-group': {
				modifiers: null;
			};
			content: {
				modifiers: null;
			};
			tab: {
				modifiers: null;
			};
		};
		modifiers: Set<'align-bottom' | 'align-left' | 'align-right' | 'align-top'>;
	};
	'kol-toolbar': {
		elements: {
			item: {
				modifiers: null;
			};
		};
		modifiers: Set<'orientation-horizontal' | 'orientation-vertical'>;
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
	'kol-abbr': {
		modifiers: null,
	},
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
	'kol-badge': {
		elements: {
			label: { modifiers: null },
			'smart-button': { modifiers: null },
		},
		modifiers: new Set(['has-smart-button']),
	},
	'kol-version': {
		modifiers: null,
	},
	'kol-accordion': {
		elements: {
			content: { modifiers: null },
			heading: { modifiers: null },
			wrapper: { modifiers: null },
			'wrapper-animation': { modifiers: null },
		},
		modifiers: new Set(['disabled', 'open']),
	},
	'kol-avatar': {
		elements: {
			image: { modifiers: null },
			initials: { modifiers: null },
		},
		modifiers: null,
	},
	'kol-card': {
		elements: {
			'close-button': { modifiers: null },
			content: { modifiers: null },
			header: { modifiers: null },
			link: { modifiers: null },
		},
		modifiers: null,
	},
	'kol-dialog': {
		elements: {
			blank: { modifiers: null },
			card: { modifiers: null },
		},
		modifiers: null,
	},
	'kol-modal': {
		elements: {
			blank: { modifiers: null },
			card: { modifiers: null },
		},
		modifiers: null,
	},
	'kol-button': {
		elements: {
			'interactive-element': { modifiers: null },
			text: { modifiers: null },
			tooltip: { modifiers: null },
		},
		modifiers: new Set(['disabled', 'hide-label', 'inline', 'standalone']),
	},
	'kol-breadcrumb': {
		elements: {
			icon: { modifiers: null },
			link: { modifiers: null },
			list: { modifiers: null },
			'list-element': { modifiers: null },
			'list-element-span': { modifiers: null },
			separator: { modifiers: null },
		},
		modifiers: null,
	},
	'kol-popover-button': {
		elements: {
			popover: { modifiers: null },
		},
		modifiers: new Set(['inline', 'open']),
	},
	'kol-details': {
		elements: {
			content: { modifiers: null },
			heading: { modifiers: null },
			wrapper: { modifiers: null },
			'wrapper-animation': { modifiers: null },
		},
		modifiers: new Set(['disabled', 'open']),
	},
	'kol-drawer': {
		elements: {
			content: { modifiers: null },
			dialog: { modifiers: null },
			wrapper: { modifiers: new Set(['bottom', 'is-closing', 'left', 'open', 'right', 'top']) },
		},
		modifiers: null,
	},
	'kol-icon': {
		elements: {
			icon: { modifiers: null },
		},
		modifiers: null,
	},
	'kol-meter': {
		elements: {
			bar: { modifiers: null },
			'bar-background': { modifiers: null },
			'bar-border': { modifiers: null },
			'bar-fill': { modifiers: new Set(['critical', 'optimum', 'suboptimal']) },
			'bar-label': { modifiers: null },
			'bar-state': { modifiers: new Set(['critical', 'optimum', 'suboptimal']) },
			'bar-track': { modifiers: null },
			unit: { modifiers: null },
			value: { modifiers: null },
			'value-unit': { modifiers: null },
		},
		modifiers: new Set(['vertical']),
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
	'kol-skip-nav': {
		elements: {
			list: { modifiers: null },
			'list-item': { modifiers: null },
		},
		modifiers: null,
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
			slot: { modifiers: null },
		},
		modifiers: new Set(['has-badge', 'hide-label']),
	},
	'kol-link': {
		elements: {
			'interactive-element': { modifiers: null },
			icon: { modifiers: null },
			text: { modifiers: null },
		},
		modifiers: new Set(['disabled', 'external-link', 'hide-label', 'inline', 'standalone']),
	},
	'kol-form': {
		elements: {
			alert: { modifiers: null },
			link: { modifiers: null },
			'mandatory-fields-hint': { modifiers: null },
		},
		modifiers: null,
	},
	'kol-split-button': {
		elements: {
			button: { modifiers: null },
			'horizontal-line': { modifiers: null },
			root: { modifiers: null },
			'secondary-button': { modifiers: null },
		},
		modifiers: null,
	},
	'kol-spin': {
		elements: {
			loader: { modifiers: null },
			spinner: { modifiers: new Set(['cycle', 'dot', 'none']) },
			'spinner-element': { modifiers: new Set(['1', '2', '3', 'neutral']) },
		},
		modifiers: null,
	},
	'kol-tabs': {
		elements: {
			'button-create': { modifiers: null },
			'button-group': { modifiers: null },
			content: { modifiers: null },
			tab: { modifiers: null },
		},
		modifiers: new Set(['align-bottom', 'align-left', 'align-right', 'align-top']),
	},
	'kol-toolbar': {
		elements: {
			item: { modifiers: null },
		},
		modifiers: new Set(['orientation-horizontal', 'orientation-vertical']),
	},
};

export { BEM };
