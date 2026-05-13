export type Theme = {
	name: string;
	key: string;
};

export const UNSTYLED_THEME: Theme = {
	name: 'Unstyled (Uncolored)',
	key: 'unstyled',
};

export const PUBLIC_THEMES: Theme[] = [
	{
		name: 'Default',
		key: 'default',
	},
	{
		name: 'BWSt (v4)',
		key: 'bwst',
	},
	{
		name: 'European Commission (v4)',
		key: 'ecl-ec',
	},
	{
		name: 'European Union (in progress)',
		key: 'ecl-eu',
	},
	{
		name: 'KERN-UX Standard (v2)',
		key: 'kern-v2',
	},
	{
		name: 'Zoll Design System (v11)',
		key: 'desy-v11',
	},
];
