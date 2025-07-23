import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-abbr': {
		elements: {
			abbr: { modifiers: null };
		};
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-abbr': {
		elements: {
			abbr: { modifiers: null },
		},
		modifiers: null,
	},
};

const BEM_CLASS_ABBR = bem('kol-abbr');
const BEM_CLASS_ABBR__ABBR = bem('kol-abbr', 'abbr');

export { bem as genBemAbbr, BEM as BEM_ABBR };
export { BEM_CLASS_ABBR, BEM_CLASS_ABBR__ABBR };
