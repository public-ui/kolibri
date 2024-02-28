import type { Generic, LoaderCallback, RegisterOptions } from 'adopted-style-sheets';
import { register as coreRegister } from 'adopted-style-sheets';
import { configKoliBri } from './config';
import { initI18n } from './i18n';

export const bootstrap = async (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	options?: RegisterOptions
): Promise<void[]> => {
	await initI18n(options?.translation?.name);
	await configKoliBri({
		translation: options?.translation,
		translations: options?.translations,
	});
	return await coreRegister(themes, loaders, options);
};

export const register = bootstrap;
