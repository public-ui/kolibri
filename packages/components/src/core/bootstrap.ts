import type { Generic, LoaderCallback, RegisterOptions } from 'adopted-style-sheets';
import { register as coreRegister } from 'adopted-style-sheets';
import { setDevMode } from '../schema';
import { setCustomTagNames } from './component-names';
import { initializeI18n } from './i18n';

type Environment = 'development' | 'production';

type KoliBriOptions = RegisterOptions & {
	/**
	 * The environment in which the application is running.
	 */
	environment?: Environment;
	/**
	 * This option allows you to transform the component tag names.
	 */
	transformTagName?: (tagName: string) => string;
};

let initialized = false;

export const bootstrap = async (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	options?: KoliBriOptions,
): Promise<void[]> => {
	setDevMode(options?.environment === 'development');

	initializeI18n(options?.translation?.name ?? 'de', options?.translations);
	if (options?.transformTagName) {
		setCustomTagNames(options?.transformTagName);
	}
	const coreRegisterReturnValue = await coreRegister(themes, loaders, options);
	initialized = true;

	return coreRegisterReturnValue;
};

export const register = bootstrap;
export const isInitialized = () => initialized;
