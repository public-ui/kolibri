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
		name: 'Default (Tested)',
		key: 'default',
	},
	{
		name: 'European Commission (in progress)',
		key: 'ecl-ec',
	},
	{
		name: 'European Union (in progress)',
		key: 'ecl-eu',
	},
];
