import { generateBemClassNames } from 'typed-bem';

/** BEM schema for the drawer component. */
type SCHEMA = {
	'kol-drawer': {
		elements: {
			dialog: { modifiers: null };
			wrapper: {
				modifiers: Set<'bottom' | 'is-closing' | 'left' | 'open' | 'right' | 'top'>;
			};
			content: { modifiers: null };
		};
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-drawer': {
		elements: {
			dialog: { modifiers: null },
			wrapper: {
				modifiers: new Set(['bottom', 'is-closing', 'left', 'open', 'right', 'top']),
			},
			content: { modifiers: null },
		},
		modifiers: null,
	},
};

const BEM_CLASS_DRAWER = bem('kol-drawer');
const BEM_CLASS_DRAWER__DIALOG = bem('kol-drawer', 'dialog');
const BEM_CLASS_DRAWER__WRAPPER = bem('kol-drawer', 'wrapper');
const BEM_CLASS_DRAWER__CONTENT = bem('kol-drawer', 'content');

export { bem as genBemDrawer, BEM as BEM_DRAWER };
export { BEM_CLASS_DRAWER, BEM_CLASS_DRAWER__DIALOG, BEM_CLASS_DRAWER__WRAPPER, BEM_CLASS_DRAWER__CONTENT };
