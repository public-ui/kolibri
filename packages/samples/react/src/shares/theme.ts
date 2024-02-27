import { SelectOption } from '@public-ui/components';

export const THEMES = ['bmf', 'default', 'ecl-ec', 'ecl-eu', 'itzbund'] as const;
export type Theme = (typeof THEMES)[number] | 'unstyled';

const drafts: Theme[] = ['ecl-ec', 'ecl-eu', 'itzbund'];

export const isDraftTheme = (theme: Theme) => drafts.includes(theme);

export const isTheme = (value: unknown) => {
	return (
		typeof value === 'string' &&
		(value === 'bmf' || value === 'default' || value === 'ecl-ec' || value === 'ecl-eu' || value === 'itzbund' || value === 'unstyled')
	);
};

export type Store = {
	darkMode: boolean;
	theme: Theme;
};

export const THEME_OPTIONS: SelectOption<Theme>[] = [
	{
		label: 'Unstyled (Uncolored)',
		value: 'unstyled',
	},
	{
		label: 'Bundesministerium der Finanzen (Tested)',
		value: 'bmf',
	},
	{
		label: 'Default (Tested)',
		value: 'default',
	},
	{
		label: 'European Commission (Draft)',
		value: 'ecl-ec',
	},
	{
		label: 'European Union (Draft)',
		value: 'ecl-eu',
	},
	{
		label: 'Informationstechnikzentrum Bund (Draft)',
		value: 'itzbund',
	},
];
