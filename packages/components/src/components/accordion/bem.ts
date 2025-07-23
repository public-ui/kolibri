import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-accordion': {
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
	'kol-accordion': {
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

const BEM_CLASS_ACCORDION = bem('kol-accordion');
const BEM_CLASS_ACCORDION__HEADING = bem('kol-accordion', 'heading');
const BEM_CLASS_ACCORDION__HEADING_BUTTON = bem('kol-accordion', 'heading-button');
const BEM_CLASS_ACCORDION__CONTENT = bem('kol-accordion', 'content');
const BEM_CLASS_ACCORDION__WRAPPER = bem('kol-accordion', 'wrapper');
const BEM_CLASS_ACCORDION__WRAPPER_ANIMATION = bem('kol-accordion', 'wrapper-animation');

export { bem as genBemAccordion, BEM as BEM_ACCORDION };
export {
	BEM_CLASS_ACCORDION,
	BEM_CLASS_ACCORDION__HEADING,
	BEM_CLASS_ACCORDION__HEADING_BUTTON,
	BEM_CLASS_ACCORDION__CONTENT,
	BEM_CLASS_ACCORDION__WRAPPER,
	BEM_CLASS_ACCORDION__WRAPPER_ANIMATION,
};
