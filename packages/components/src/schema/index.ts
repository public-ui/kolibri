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

/**
 * Resolves a single feature flag from the declared flags of any registered theme.
 *
 * This is a fallback for the theme detection mode `'auto'`: in that mode
 * `adopted-style-sheets` never sets a global default theme, so `getDefaultThemeName()`
 * returns `null` and the flags a theme declared via `KoliBri.createTheme(name, css, flags)`
 * could not be resolved otherwise. Registered theme flag sets are scanned in registration
 * order and the first defined value for `key` wins.
 */
export const getRegisteredThemeFeatureFlag = <K extends keyof KoliBriFeatureFlags>(key: K): KoliBriFeatureFlags[K] | undefined => {
	for (const flags of _themeFeatureFlagsRegistry.values()) {
		if (flags[key] !== undefined) {
			return flags[key];
		}
	}
	return undefined;
};

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
