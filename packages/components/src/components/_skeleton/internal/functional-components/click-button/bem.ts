import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-click-button': {
		elements: {
			label: {
				modifiers: null;
			};
		};
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-click-button': {
		elements: {
			label: { modifiers: null },
		},
		modifiers: null,
	},
};

const BEM_CLASS_CLICK_BUTTON = bem('kol-click-button');
const BEM_CLASS_CLICK_BUTTON__LABEL = bem('kol-click-button', 'label');

export { bem as genBemClickButton, BEM as BEM_CLICK_BUTTON };
export { BEM_CLASS_CLICK_BUTTON, BEM_CLASS_CLICK_BUTTON__LABEL };
