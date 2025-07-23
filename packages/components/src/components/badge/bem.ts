import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-badge': {
		elements: {
			label: { modifiers: null };
			'smart-button': { modifiers: null };
		};
		modifiers: Set<'has-smart-button'>;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-badge': {
		elements: {
			label: { modifiers: null },
			'smart-button': { modifiers: null },
		},
		modifiers: new Set(['has-smart-button']),
	},
};

const BEM_CLASS_BADGE = bem('kol-badge');
const BEM_CLASS_BADGE__LABEL = bem('kol-badge', 'label');
const BEM_CLASS_BADGE__SMART_BUTTON = bem('kol-badge', 'smart-button');

export { bem as genBemBadge, BEM as BEM_BADGE };
export { BEM_CLASS_BADGE, BEM_CLASS_BADGE__LABEL, BEM_CLASS_BADGE__SMART_BUTTON };
