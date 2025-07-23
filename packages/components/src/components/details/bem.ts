import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-details': {
		elements: {
			heading: { modifiers: null };
			'heading-button': { modifiers: null };
			content: { modifiers: null };
			wrapper: { modifiers: null };
			'wrapper-animation': { modifiers: null };
		};
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-details': {
		elements: {
			heading: { modifiers: null },
			'heading-button': { modifiers: null },
			content: { modifiers: null },
			wrapper: { modifiers: null },
			'wrapper-animation': { modifiers: null },
		},
		modifiers: null,
	},
};

const BEM_CLASS_DETAILS = bem('kol-details');
const BEM_CLASS_DETAILS__HEADING = bem('kol-details', 'heading');
const BEM_CLASS_DETAILS__HEADING_BUTTON = bem('kol-details', 'heading-button');
const BEM_CLASS_DETAILS__CONTENT = bem('kol-details', 'content');
const BEM_CLASS_DETAILS__WRAPPER = bem('kol-details', 'wrapper');
const BEM_CLASS_DETAILS__WRAPPER_ANIMATION = bem('kol-details', 'wrapper-animation');

export { bem as genBemDetails, BEM as BEM_DETAILS };
export {
	BEM_CLASS_DETAILS,
	BEM_CLASS_DETAILS__HEADING,
	BEM_CLASS_DETAILS__HEADING_BUTTON,
	BEM_CLASS_DETAILS__CONTENT,
	BEM_CLASS_DETAILS__WRAPPER,
	BEM_CLASS_DETAILS__WRAPPER_ANIMATION,
};
