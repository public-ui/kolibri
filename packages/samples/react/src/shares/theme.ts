import { SelectOption } from '@public-ui/components';

export const THEMES = ['bmf', 'bstw', 'default', 'ecl-ec', 'ecl-eu', 'itzbund', 'unstyled'] as const;
export type Theme = (typeof THEMES)[number];
export type ThemeAndUnstyled = Theme | 'unstyled';

const drafts: ThemeAndUnstyled[] = ['bstw', 'ecl-ec', 'ecl-eu', 'itzbund'];

export const isDraftTheme = (theme: ThemeAndUnstyled) => drafts.includes(theme);

export const isTheme = (value: unknown) => {
	return THEMES.find((theme) => theme === value) !== undefined;
};

export type Store = {
	darkMode: boolean;
	theme: ThemeAndUnstyled;
};

export const THEME_OPTIONS: SelectOption<ThemeAndUnstyled>[] = [
	{
		label: 'Unstyled (Uncolored)',
		value: 'unstyled',
	},
	{
		label: 'Bundesministerium der Finanzen (Tested)',
		value: 'bmf',
	},
	{
		label: 'BStW (Draft)',
		value: 'bstw',
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
