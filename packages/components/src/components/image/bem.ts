import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-image': {
		elements: Record<string, never>;
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-image': {
		elements: {},
		modifiers: null,
	},
};

const BEM_CLASS_IMAGE = bem('kol-image');

export { bem as genBemImage, BEM as BEM_IMAGE };
export { BEM_CLASS_IMAGE };
