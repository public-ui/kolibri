import { generateBemClassNames } from 'typed-bem';

type SCHEMA = {
	'kol-skeleton': {
		elements: {
			container: {
				modifiers: null;
			};
			name: {
				modifiers: null;
			};
			counter: {
				modifiers: null;
			};
			actions: {
				modifiers: null;
			};
		};
		modifiers: Set<'has-name' | 'is-hidden'>;
	};
};

const bem = generateBemClassNames<SCHEMA>();

const BEM: SCHEMA = {
	'kol-skeleton': {
		elements: {
			actions: { modifiers: null },
			container: { modifiers: null },
			counter: { modifiers: null },
			name: { modifiers: null },
		},
		modifiers: new Set(['has-name', 'is-hidden']),
	},
};

const BEM_CLASS_SKELETON = bem('kol-skeleton');
const BEM_CLASS_SKELETON__ACTIONS = bem('kol-skeleton', 'actions');
const BEM_CLASS_SKELETON__CONTAINER = bem('kol-skeleton', 'container');
const BEM_CLASS_SKELETON__COUNTER = bem('kol-skeleton', 'counter');
const BEM_CLASS_SKELETON__NAME = bem('kol-skeleton', 'name');

export { bem as genBemSkeleton, BEM as BEM_SKELETON };
export { BEM_CLASS_SKELETON, BEM_CLASS_SKELETON__ACTIONS, BEM_CLASS_SKELETON__CONTAINER, BEM_CLASS_SKELETON__COUNTER, BEM_CLASS_SKELETON__NAME };
