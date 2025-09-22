import type { Generic, LoaderCallback, RegisterOptions } from 'adopted-style-sheets';
import { register as coreRegister } from 'adopted-style-sheets';
import type { Mode } from '../schema';
import { Log, setRuntimeMode } from '../schema';
import { setCustomTagNames } from './component-names';
import { initializeI18n } from './i18n';

type KoliBriOptions = RegisterOptions & {
	/**
	 * The environment in which the application is running.
	 */
	environment?: Mode;
	/**
	 * This option allows you to transform the component tag names.
	 */
	transformTagName?: (tagName: string) => string;

	/**
	 * When enabled, all input fields will reflect their current value to the host element, making it accessible outside the shadow DOM.
	 */
	reflectInputValues?: boolean;
};

let initialized = false;
let options: KoliBriOptions | undefined;

export const bootstrap = async (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	koliBriOptions?: KoliBriOptions,
): Promise<void[]> => {
	const nodeEnv = typeof process !== 'undefined' && process.env ? (process.env.NODE_ENV as Mode) : undefined;
	setRuntimeMode(koliBriOptions?.environment || nodeEnv || 'production');

	initializeI18n(koliBriOptions?.translation?.name ?? 'de', koliBriOptions?.translations);
	if (koliBriOptions?.transformTagName) {
		setCustomTagNames(koliBriOptions?.transformTagName);
	}
	const coreRegisterReturnValue = await coreRegister(themes, loaders, koliBriOptions);
	initialized = true;
	options = koliBriOptions;

	// Only log development message when actually in development mode
	Log.info('Development mode active - Enhanced debugging features available');

	return coreRegisterReturnValue;
};

export const register = bootstrap;
export const isInitialized = () => initialized;
export const getOptions = () => options;
