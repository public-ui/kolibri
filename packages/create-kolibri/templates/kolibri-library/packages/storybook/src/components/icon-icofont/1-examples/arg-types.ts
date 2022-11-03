import { Icofont } from '../icofont';

const ICON_OPTIONS = [''].concat(Object.getOwnPropertyNames(Icofont));
export const argTypes = {
	_icon: {
		name: 'Icon',
		control: {
			type: 'select',
		},
		options: ICON_OPTIONS,
		defaultValue: 'home',
	},
	size: {
		name: 'Größe',
		control: {
			type: 'select',
		},
		options: ['50%', '100%', '200%', '400%'],
		defaultValue: '100%',
	},
};
