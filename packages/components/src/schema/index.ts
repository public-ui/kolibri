import type { Generic } from 'adopted-style-sheets';
import { Theme } from 'adopted-style-sheets';

import { KeyEnum } from './i18n-keys';
import { TagEnum } from './tag-names';

export type KoliBriFeatureFlags = {
	/**
	 * Controls visibility of step-up/step-down buttons in KolInputNumber.
	 * Default: 'show'
	 */
	inputNumberButtons?: 'show' | 'hide';
};

const _themeFeatureFlagsRegistry = new Map<string, KoliBriFeatureFlags>();

export const getThemeFeatureFlags = (themeName: string): KoliBriFeatureFlags | undefined =>
	_themeFeatureFlagsRegistry.get(themeName);

const _base = new Theme<'kol', keyof typeof KeyEnum, keyof typeof TagEnum>('kol', KeyEnum, TagEnum);
const _origCreateTheme = _base.createTheme.bind(_base);

(_base as any).createTheme = (
	name: string,
	cssMap: Record<string, string>,
	featureFlags?: KoliBriFeatureFlags,
): Generic.Theming.RegisterPatch<string, string, string> => {
	if (featureFlags) _themeFeatureFlagsRegistry.set(name, featureFlags);
	return _origCreateTheme(name, cssMap);
};

export const KoliBri = _base as unknown as Omit<typeof _base, 'createTheme'> & {
	createTheme(
		name: string,
		cssMap: Record<string, string>,
		featureFlags?: KoliBriFeatureFlags,
	): Generic.Theming.RegisterPatch<string, string, string>;
};

export * from './components';
// export * from './enums'; // only for internal use
export * from './interfaces';
export * from './props';
export * from './types';
export * from './utils';
export * from './validators';
