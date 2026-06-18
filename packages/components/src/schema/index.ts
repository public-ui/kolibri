import { Theme } from 'adopted-style-sheets';

import { KeyEnum } from './i18n-keys';
import { TagEnum } from './tag-names';

/**
 * KoliBri-specific feature flags.
 *
 * Flags live in the global theming store of `adopted-style-sheets`, which is shared across
 * bundle boundaries — the same mechanism that lets theme CSS work across packages. Augmenting
 * the registry here makes `getFeatureFlag()` and the `features` bootstrap option fully typed.
 * Set values via the `features` option of `bootstrap()`; read them with `getFeatureFlag(key)`.
 */
declare module 'adopted-style-sheets' {
	interface FeatureFlagRegistry {
		/**
		 * Controls visibility of step-up/step-down buttons in KolInputNumber.
		 * Default: 'show'
		 */
		inputNumberButtons: 'show' | 'hide';
	}
}

export const KoliBri = new Theme<'kol', keyof typeof KeyEnum, keyof typeof TagEnum>('kol', KeyEnum, TagEnum);

export * from './components';
// export * from './enums'; // only for internal use
export * from './interfaces';
export * from './props';
export * from './types';
export * from './utils';
export * from './validators';
