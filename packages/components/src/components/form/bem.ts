import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-form': {
		elements: {
			alert: { modifiers: null };
			link: { modifiers: null };
			'mandatory-fields-hint': { modifiers: null };
		};
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-form': {
		elements: {
			alert: { modifiers: null },
			link: { modifiers: null },
			'mandatory-fields-hint': { modifiers: null },
		},
		modifiers: null,
	},
};

const BEM_CLASS_FORM = bem('kol-form');
const BEM_CLASS_FORM__ALERT = bem('kol-form', 'alert');
const BEM_CLASS_FORM__LINK = bem('kol-form', 'link');
const BEM_CLASS_FORM__MANDATORY_FIELDS_HINT = bem('kol-form', 'mandatory-fields-hint');

export { bem as genBemForm, BEM as BEM_FORM };
export { BEM_CLASS_FORM, BEM_CLASS_FORM__ALERT, BEM_CLASS_FORM__LINK, BEM_CLASS_FORM__MANDATORY_FIELDS_HINT };
