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

export const getThemeFeatureFlags = (themeName: string): KoliBriFeatureFlags | undefined => _themeFeatureFlagsRegistry.get(themeName);

const _base = new Theme<'kol', keyof typeof KeyEnum, keyof typeof TagEnum>('kol', KeyEnum, TagEnum);
const _origCreateTheme = _base.createTheme.bind(_base);

const _patchable = _base as unknown as {
	createTheme: (name: string, cssMap: Record<string, string>, featureFlags?: KoliBriFeatureFlags) => Generic.Theming.RegisterPatch<string, string, string>;
};
_patchable.createTheme = (name, cssMap, featureFlags) => {
	const result = _origCreateTheme(name, cssMap);
	if (featureFlags) {
		_themeFeatureFlagsRegistry.set(name, featureFlags);
	} else {
		_themeFeatureFlagsRegistry.delete(name);
	}
	return result;
};

export const KoliBri = _base as unknown as Omit<typeof _base, 'createTheme'> & {
	createTheme(name: string, cssMap: Record<string, string>, featureFlags?: KoliBriFeatureFlags): Generic.Theming.RegisterPatch<string, string, string>;
};

export * from './components';
// export * from './enums'; // only for internal use
export * from './interfaces';
export * from './props';
export * from './types';
export * from './utils';
export * from './validators';
