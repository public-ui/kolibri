import { setTagTransformer } from '@stencil/core';
import type { Generic, LoaderCallback, RegisterOptions } from 'adopted-style-sheets';
import { register as coreRegister } from 'adopted-style-sheets';
import type { Mode } from '../schema';
import { Log, setRuntimeMode } from '../schema';
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
let tagTransformerSet = false;

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
		/*
		 * The transformer has to be registered before the first component is defined, otherwise
		 * elements resolve under their untransformed tag. Overwriting a transformer after that
		 * point leaves already defined elements unusable.
		 */
		if (tagTransformerSet) {
			Log.warn('The tag name transformer was already registered. Components already defined keep their current tag and will not resolve under the new one.', {
				forceLog: true,
			});
		}
		const transformTagName = koliBriOptions.transformTagName;
		/*
		 * The native Stencil transformer applies to every tag rendered through `h()`, including
		 * native HTML tags like `div` or `span`. The public `transformTagName` option only names
		 * KoliBri component tags, so the registration limits it to `kol-*` and passes other tags
		 * through unchanged.
		 */
		setTagTransformer((tag: string) => (tag.startsWith('kol-') ? transformTagName(tag) : tag));
		tagTransformerSet = true;
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
