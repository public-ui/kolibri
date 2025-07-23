import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-headline': {
		elements: Record<string, never>;
		modifiers: Set<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong' | 'group' | 'primary' | 'secondary' | 'single'>;
	};
	'kol-heading-group': {
		elements: Record<string, never>;
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-headline': {
		elements: {},
		modifiers: new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'group', 'primary', 'secondary', 'single']),
	},
	'kol-heading-group': { elements: {}, modifiers: null },
};

const BEM_CLASS_HEADLINE = bem('kol-headline');
const BEM_CLASS_HEADING_GROUP = bem('kol-heading-group');

export { bem as genBemHeading, BEM as BEM_HEADING };
export { BEM_CLASS_HEADLINE, BEM_CLASS_HEADING_GROUP };
