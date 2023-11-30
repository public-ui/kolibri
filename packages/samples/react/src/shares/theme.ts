import { SelectOption } from '@public-ui/components';

export type Theme = 'bmf' | 'bzst-v1' | 'default' | 'ecl-ec' | 'ecl-eu' | 'itzbund' | 'mapz' | 'th' | 'unstyled' | 'zoll-v2' | 'zoll-v3';

export const isTheme = (value: unknown) => {
	return (
		typeof value === 'string' &&
		(value === 'unstyled' ||
			value === 'bmf' ||
			value === 'bzst-v1' ||
			value === 'default' ||
			value === 'ecl-ec' ||
			value === 'ecl-eu' ||
			value === 'itzbund' ||
			value === 'mapz' ||
			value === 'th' ||
			value === 'zoll-v2' ||
			value === 'zoll-v3')
	);
};

export type Store = {
	darkMode: boolean;
	theme: Theme;
};

export const THEME_OPTIONS: SelectOption<Theme>[] = [
	{
		label: 'Unstyled',
		value: 'unstyled',
	},
	{
		label: 'Bundesministerium der Finanzen',
		value: 'bmf',
	},
	{
		label: 'Bundeszentralamt für Steuern (v1)',
		value: 'bzst-v1',
	},
	{
		label: 'Default',
		value: 'default',
	},
	{
		label: 'European Commission (ECL)',
		value: 'ecl-ec',
	},
	{
		label: 'European Union (ECL)',
		value: 'ecl-eu',
	},
	{
		label: 'Informationstechnikzentrum Bund',
		value: 'itzbund',
	},
	{
		label: '.',
		value: 'mapz',
	},
	{
		label: 'Freistaat Thüringen',
		value: 'th',
	},
	{
		label: '..',
		value: 'zoll-v2',
	},
	{
		label: '...',
		value: 'zoll-v3',
	},
];
