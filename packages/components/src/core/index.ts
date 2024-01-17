import type { Generic, LoaderCallback, RegisterOptions } from 'adopted-style-sheets';
import { register as coreRegister } from 'adopted-style-sheets';

import { getKoliBri } from '../utils/dev.utils';
import { I18nextService } from './i18n';

import type { II18nService } from './i18n';
export const register = async (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	options?: RegisterOptions
): Promise<void[]> => {
	if (getKoliBri().I18n === undefined) {
		Object.defineProperty(getKoliBri(), 'I18n', {
			value: await I18nextService.createInstance(options?.translation?.name ?? 'de', options?.translations),
			writable: false,
		});
	}
	return await coreRegister(themes, loaders, options);
};

export const getI18nService: () => II18nService | undefined = () => getKoliBri().I18n as II18nService;
