import type { Generic, LoaderCallback, RegisterOptions } from 'adopted-style-sheets';
import { register as coreRegister } from 'adopted-style-sheets';
import { configI18n, initI18n } from './i18n';
import { setCustomTagNames } from './component-names';

let initialized = false;

type KoliBriOptions = RegisterOptions & {
	transformTagName?: (tagName: string) => string;
};

export const bootstrap = async (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	options?: KoliBriOptions,
): Promise<void[]> => {
	await initI18n(options?.translation?.name);
	await configI18n(options?.translation?.name ?? 'de', options?.translations);
	if (options?.transformTagName) {
		setCustomTagNames(options?.transformTagName);
	}
	const coreRegisterReturnValue = await coreRegister(themes, loaders, options);
	initialized = true;

	return coreRegisterReturnValue;
};

export const register = bootstrap;
export const isInitialized = () => initialized;
