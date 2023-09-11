import type { Generic, LoaderCallback, RegisterOptions } from '@a11y-ui/core';
import { register as coreRegister, STORE } from '@a11y-ui/core';

import { I18nextService, II18nService } from './i18n';

export const register = async (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	options?: RegisterOptions
): Promise<void[]> => {
	if (STORE.I18n === undefined) {
		const i18n = await I18nextService.getInstance(options?.translation?.name ?? 'de', options?.translations);
		Object.defineProperty(STORE, 'I18n', {
			value: i18n,
			writable: false,
		});
	}
	return await coreRegister(themes, loaders, options);
};

export const getI18nService: () => II18nService | undefined = () => STORE?.I18n as II18nService;
