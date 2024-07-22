import type { Generic, LoaderCallback, RegisterOptions } from 'adopted-style-sheets';
import { register as coreRegister } from 'adopted-style-sheets';
import { initializeI18n } from './i18n';
import { setCustomTagNames } from './component-names';
import { Log } from '../schema';

let initialized = false;

type KoliBriOptions = RegisterOptions & {
	transformTagName?: (tagName: string) => string;
	environment?: 'DEV' | 'PROD';
};

export const bootstrap = async (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	options?: KoliBriOptions,
): Promise<void[]> => {
	const env = options?.environment || 'PROD';

	initializeI18n(options?.translation?.name ?? 'de', options?.translations);
	if (options?.transformTagName) {
		setCustomTagNames(options?.transformTagName);
	}
	const coreRegisterReturnValue = await coreRegister(themes, loaders, options);
	initialized = true;

	if (env === 'PROD') {
		Log.debug = () => {};
		Log.info = () => {};
		Log.trace = () => {};
		Log.warn = () => {};
		Log.throw = () => {};

		console.debug = () => {};
		console.info = () => {};
		console.trace = () => {};
		console.warn = () => {};
	}

	return coreRegisterReturnValue;
};

export const register = bootstrap;
export const isInitialized = () => initialized;
