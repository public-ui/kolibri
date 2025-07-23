import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-breadcrumb': {
		elements: {
			list: { modifiers: null };
			'list-element': { modifiers: null };
			'list-element-span': { modifiers: null };
			link: { modifiers: null };
			icon: { modifiers: null };
		};
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-breadcrumb': {
		elements: {
			list: { modifiers: null },
			'list-element': { modifiers: null },
			'list-element-span': { modifiers: null },
			link: { modifiers: null },
			icon: { modifiers: null },
		},
		modifiers: null,
	},
};

const BEM_CLASS_BREADCRUMB = bem('kol-breadcrumb');
const BEM_CLASS_BREADCRUMB__LIST = bem('kol-breadcrumb', 'list');
const BEM_CLASS_BREADCRUMB__LIST_ELEMENT = bem('kol-breadcrumb', 'list-element');
const BEM_CLASS_BREADCRUMB__LIST_ELEMENT_SPAN = bem('kol-breadcrumb', 'list-element-span');
const BEM_CLASS_BREADCRUMB__LINK = bem('kol-breadcrumb', 'link');
const BEM_CLASS_BREADCRUMB__ICON = bem('kol-breadcrumb', 'icon');

export { bem as genBemBreadcrumb, BEM as BEM_BREADCRUMB };
export {
	BEM_CLASS_BREADCRUMB,
	BEM_CLASS_BREADCRUMB__LIST,
	BEM_CLASS_BREADCRUMB__LIST_ELEMENT,
	BEM_CLASS_BREADCRUMB__LIST_ELEMENT_SPAN,
	BEM_CLASS_BREADCRUMB__LINK,
	BEM_CLASS_BREADCRUMB__ICON,
};
