import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-avatar': {
		elements: {
			image: { modifiers: null };
			initials: { modifiers: null };
		};
		modifiers: null;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-avatar': {
		elements: {
			image: { modifiers: null },
			initials: { modifiers: null },
		},
		modifiers: null,
	},
};

const BEM_CLASS_AVATAR = bem('kol-avatar');
const BEM_CLASS_AVATAR__IMAGE = bem('kol-avatar', 'image');
const BEM_CLASS_AVATAR__INITIALS = bem('kol-avatar', 'initials');

export { bem as genBemAvatar, BEM as BEM_AVATAR };
export { BEM_CLASS_AVATAR, BEM_CLASS_AVATAR__IMAGE, BEM_CLASS_AVATAR__INITIALS };
