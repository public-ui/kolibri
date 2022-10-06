import type { Generic } from '@a11y-ui/core';

import { register as coreRegister } from '@a11y-ui/core';
import type { LoaderCallback, RegisterOptions } from '@a11y-ui/core/types/theme';

import { TranslationService } from './i18n';

export * from '@a11y-ui/core';

/**
 *
 * @param themes
 * @param loaders
 * @param options
 * @returns
 */
export const register = (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	options?: RegisterOptions
): Promise<void[]> => {
	try {
		const service = new TranslationService(options?.translations || [], options?.translation?.name);
		if (window.A11yUi === undefined) {
			Object.defineProperty(window, 'A11yUi', {
				value: {},
				writable: false,
			});
		}
		Object.defineProperty(window.A11yUi, 'TranslationService', {
			value: service,
			writable: false,
		});
	} catch (e) {
		// das Laden der Sprache ist optional
	}
	return coreRegister(themes, loaders, options);
};

export const getTranslationService = () => window.A11yUi?.TranslationService;
