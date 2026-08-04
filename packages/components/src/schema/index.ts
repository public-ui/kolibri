import { Theme } from 'adopted-style-sheets';

import { KeyEnum } from './i18n-keys';
import type { VariantClassNamePropType } from './props';
import { TagEnum } from './tag-names';

/**
 * KoliBri-specific feature flags.
 *
 * Flags live in the global theming store of `adopted-style-sheets`, which is shared across
 * bundle boundaries — the same mechanism that lets theme CSS work across packages. Augmenting
 * the registry here makes `getFeatureFlag()` and the `features` bootstrap option fully typed.
 *
 * Set values either per theme via the third argument of `KoliBri.createTheme()` or globally via
 * the `features` option of `bootstrap()`. Read them with `getFeatureFlag(key, hostElement)` —
 * always pass the component host so the value can be resolved for the active theme.
 *
 * Resolution order: global `bootstrap({ features })` override → flag declared by the theme of the
 * nearest `data-theme` ancestor of `hostElement` → `undefined`. Omitting `hostElement` skips the
 * per-theme lookup and only returns a global override (or the default theme), which silently
 * defeats per-theme configuration.
 */
declare module 'adopted-style-sheets' {
	interface FeatureFlagRegistry {
		/**
		 * Controls visibility of step-up/step-down buttons in KolInputNumber.
		 * When unset, the component treats the flag as `'show'` (buttons visible),
		 * so themes that do not declare it keep the existing behaviour.
		 */
		inputNumberButtons: 'show' | 'hide';
		/**
		 * Controls the standard variant for buttons/linkbuttons.
		 * When set this is the variant used whenever no variant is provided
		 */
		buttonVariantDefault: VariantClassNamePropType;
		/**
		 * Controls wether KolBreadcrumb shows the current page as the last entry.
		 * When unset, the component treats the flag as `'show'` (current page visible),
		 * so themes that do not declare it keep the existing behaviour.
		 */
		breadcrumbCurrentPage: 'show' | 'hide';
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
