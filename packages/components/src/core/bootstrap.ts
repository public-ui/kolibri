import type { Generic, LoaderCallback, RegisterOptions } from 'adopted-style-sheets';
import { register as coreRegister, getDefaultThemeName } from 'adopted-style-sheets';
import type { KoliBriFeatureFlags, Mode } from '../schema';
import { getThemeFeatureFlags, Log, setRuntimeMode } from '../schema';
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

	/**
	 * App-level feature flag overrides. These take priority over flags declared by the active theme.
	 * To rely solely on the theme's declared flags, omit this option.
	 */
	features?: KoliBriFeatureFlags;
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

/**
 * Returns the value of a feature flag, with the following priority:
 * 1. App-level override (features option passed to bootstrap)
 * 2. Active theme's declared flags (set via KoliBri.createTheme third argument)
 * 3. undefined (component falls back to its built-in default)
 */
export const getFeatureFlag = <K extends keyof KoliBriFeatureFlags>(key: K): KoliBriFeatureFlags[K] | undefined => {
	if (options?.features?.[key] !== undefined) {
		return options.features[key];
	}
	const themeName = getDefaultThemeName();
	return themeName ? getThemeFeatureFlags(themeName)?.[key] : undefined;
};

/**
 * Merges multiple KoliBriFeatureFlags objects left-to-right (later entries win).
 * Useful for composing app-level overrides on top of a base set.
 *
 * @example
 * bootstrap(themes, loaders, { features: mergeFeatureFlags({ inputNumberButtons: 'hide' }) });
 */
export const mergeFeatureFlags = (...flagSets: (KoliBriFeatureFlags | undefined)[]): KoliBriFeatureFlags => Object.assign({}, ...flagSets.filter(Boolean));
