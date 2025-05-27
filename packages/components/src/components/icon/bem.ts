import { generateBemClassNames } from 'typed-bem';

type BEM = {
	'kol-icon': {
		elements: {
			icon: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
};

const bem = generateBemClassNames<BEM>();

const schema: BEM = {
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
export const BEM_ICON = bem('kol-icon');
export const BEM_ICON__ICON = bem('kol-icon', 'icon');

export { bem as bemAlert, schema as schemaAlert };
