import type { Generic, LoaderCallback, RegisterOptions } from '@a11y-ui/core';
import { register as coreRegister, STORE } from '@a11y-ui/core';
import { I18nextService, II18nService } from './i18n';

export const register = (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	options?: RegisterOptions
): Promise<void[]> => {
	try {
		if (STORE.I18n === undefined) {
			Object.defineProperty(STORE, 'I18n', {
				value: new I18nextService(options?.translation?.name ?? 'de', options?.translations),
				writable: false,
			});
		}
	} catch (e) {
		// das Laden der Sprache ist optional
	}
	return coreRegister(themes, loaders, options);
};

export const getI18nService: () => II18nService | undefined = () => STORE?.I18n;

// TODO: remove later
export const getTranslationService = () => STORE?.I18n;
