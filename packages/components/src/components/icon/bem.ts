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

/**
 * Define the static BEM class names for the icon component.
 */
const BEM_CLASS_ICON = bem('kol-icon');
const BEM_CLASS_ICON__ICON = bem('kol-icon', 'icon');

export { BEM_CLASS_ICON, BEM_CLASS_ICON__ICON };
