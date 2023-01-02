export type Theme = 'bamf' | 'bmf' | 'bpa' | 'bzst' | 'desy' | 'itzbund' | 'mapz' | 'th' | 'zoll';

export const isTheme = (value: unknown) =>
	typeof value === 'string' && (value === 'bmf' || value === 'bzst' || value === 'desy' || value === 'itzbund' || value === 'mapz' || value === 'th');

export type Store = {
	darkMode: boolean;
	theme: Theme;
};
