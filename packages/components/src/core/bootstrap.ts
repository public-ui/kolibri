import type { Generic, LoaderCallback, RegisterOptions } from 'adopted-style-sheets';
import { register as coreRegister } from 'adopted-style-sheets';
import { setRuntimeMode, type Mode } from '../schema/utils/reuse';
import { setCustomTagNames } from './component-names';
import { initializeI18n } from './i18n';

type KoliBriOptions = RegisterOptions & {
	/**
	 * This option allows you to transform the component tag names.
	 */
	transformTagName?: (tagName: string) => string;

	/**
	 * When enabled, all input fields will reflect their current value to the host element, making it accessible outside the shadow DOM.
	 */
	reflectInputValues?: boolean;

	/**
	 * Set the runtime mode of the library. Defaults to 'production'.
	 */
	mode?: Mode;
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
	if (koliBriOptions?.mode) {
		setRuntimeMode(koliBriOptions.mode);
	}
	initializeI18n(koliBriOptions?.translation?.name ?? 'de', koliBriOptions?.translations);
	if (koliBriOptions?.transformTagName) {
		setCustomTagNames(koliBriOptions?.transformTagName);
	}
	const coreRegisterReturnValue = await coreRegister(themes, loaders, koliBriOptions);
	initialized = true;
	options = koliBriOptions;

	return coreRegisterReturnValue;
};

export const register = bootstrap;
export const isInitialized = () => initialized;
export const getOptions = () => options;
