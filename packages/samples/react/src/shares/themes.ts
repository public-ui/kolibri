import { SelectOption } from '@public-ui/components';

export type Theme = 'unstyled' | 'bamf' | 'bmf' | 'bpa' | 'bzst' | 'desy-v1' | 'desy-v2' | 'ecl-ec' | 'ecl-eu' | 'itzbund' | 'mapz' | 'th' | 'zoll-v2';

export const THEME_OPTIONS: SelectOption<Theme>[] = [
	{
		label: 'Unstyled',
		value: 'unstyled',
	},
	{
		label: 'BMF-Styleguide',
		value: 'bmf',
	},
	{
		label: 'BPA-Styleguide (WIP)',
		value: 'bpa',
	},
	{
		label: 'BZSt-Styleguide (WIP)',
		value: 'bzst',
	},
	{
		label: 'DESY-Styleguide (v1)',
		value: 'desy-v1',
	},
	{
		label: 'DESY-Styleguide (v2, WIP)',
		value: 'desy-v2',
	},
	{
		label: 'European Commission (ECL)',
		value: 'ecl-ec',
	},
	{
		label: 'European Union (ECL, WIP)',
		value: 'ecl-eu',
	},
	{
		label: 'ITZBund-Styleguide',
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
		label: 'ZOLL-Styleguide v2 (WIP)',
		value: 'zoll-v2',
	},
];
