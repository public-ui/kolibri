import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-card': {
		elements: {
			header: { modifiers: null };
			headline: { modifiers: null };
			content: { modifiers: null };
			'close-button': { modifiers: null };
		};
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-card': {
		elements: {
			header: { modifiers: null },
			headline: { modifiers: null },
			content: { modifiers: null },
			'close-button': { modifiers: null },
		},
		modifiers: null,
	},
};

const BEM_CLASS_CARD = bem('kol-card');
const BEM_CLASS_CARD__HEADER = bem('kol-card', 'header');
const BEM_CLASS_CARD__HEADLINE = bem('kol-card', 'headline');
const BEM_CLASS_CARD__CONTENT = bem('kol-card', 'content');
const BEM_CLASS_CARD__CLOSE_BUTTON = bem('kol-card', 'close-button');

export { bem as genBemCard, BEM as BEM_CARD };
export { BEM_CLASS_CARD, BEM_CLASS_CARD__HEADER, BEM_CLASS_CARD__HEADLINE, BEM_CLASS_CARD__CONTENT, BEM_CLASS_CARD__CLOSE_BUTTON };
