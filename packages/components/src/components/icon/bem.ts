import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-icon': {
		elements: {
			icon: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-icon': {
		elements: {
			icon: { modifiers: null },
		},
		modifiers: null,
	},
};

/**
 * Define the static BEM class names for the alert component.
 */
const BEM_CLASS_ICON = bem('kol-icon');
const BEM_CLASS_ICON__ICON = bem('kol-icon', 'icon');

export { bem as genBemAlert, BEM as BEM_ICON };
export { BEM_CLASS_ICON, BEM_CLASS_ICON__ICON };
