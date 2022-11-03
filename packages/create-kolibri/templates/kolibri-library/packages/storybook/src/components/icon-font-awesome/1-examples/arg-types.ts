import { FontAwesome } from '../font-awesome';

const ICON_OPTIONS = [''].concat(Object.getOwnPropertyNames(FontAwesome));
export const argTypes = {
	_icon: {
		name: 'Icon',
		control: {
			type: 'select',
		},
		options: ICON_OPTIONS,
		defaultValue: 'home',
	},
	_prefix: {
		name: 'Prefix',
		control: {
			type: 'select',
		},
		options: ['fas', 'fab'],
		defaultValue: 'fas',
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
