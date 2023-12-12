import type { Generic, LoaderCallback, RegisterOptions } from '@a11y-ui/core';
import { register as coreRegister } from '@a11y-ui/core';

import { I18nextService, II18nService } from './i18n';
import { KoliBri } from '../utils/dev.utils';

export const register = async (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	options?: RegisterOptions
): Promise<void[]> => {
	if (KoliBri.I18n === undefined) {
		Object.defineProperty(KoliBri, 'I18n', {
			value: await I18nextService.createInstance(options?.translation?.name ?? 'de', options?.translations),
			writable: false,
		});
	}
	return await coreRegister(themes, loaders, options);
};

export const getI18nService: () => II18nService | undefined = () => KoliBri.I18n as II18nService;
