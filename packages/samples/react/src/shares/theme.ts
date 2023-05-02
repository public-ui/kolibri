import { SelectOption } from '@public-ui/components';

export type Theme = 'unstyled' | 'bamf' | 'bmf' | 'bpa' | 'by' | 'bzst' | 'desy-v1' | 'desy-v2' | 'ecl-ec' | 'ecl-eu' | 'itzbund' | 'mapz' | 'th' | 'zoll-v2';

export const isTheme = (value: unknown) => {
	console.log('typeof value', typeof value);
	return (
		typeof value === 'string' &&
		(value === 'unstyled' ||
			value === 'bamf' ||
			value === 'bmf' ||
			value === 'bpa' ||
			value === 'by' ||
			value === 'bzst' ||
			value === 'desy-v1' ||
			value === 'desy-v2' ||
			value === 'ecl-ec' ||
			value === 'ecl-eu' ||
			value === 'itzbund' ||
			value === 'mapz' ||
			value === 'th' ||
			value === 'zoll-v2')
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
		disabled: true,
		label: 'Bundesamt für Migration und Flüchtlinge',
		value: 'bamf',
	},
	{
		label: 'Bundesministerium der Finanzen',
		value: 'bmf',
	},
	{
		label: 'Bundesregierung',
		value: 'bpa',
	},
	{
		label: 'Freistaat Bayern (StMWi)',
		value: 'by',
	},
	{
		label: 'Bundesamt für Zoll und Steuern',
		value: 'bzst',
	},
	{
		disabled: true,
		label: 'DESY-Styleguide (v1)',
		value: 'desy-v1',
	},
	{
		label: 'DESY-Styleguide (v2)',
		value: 'desy-v2',
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
		label: 'MAPZoll-Styleguide',
		value: 'mapz',
	},
	{
		label: 'Freistaat Thüringen',
		value: 'th',
	},
	{
		label: 'Design System Zoll (v2)',
		value: 'zoll-v2',
	},
];
