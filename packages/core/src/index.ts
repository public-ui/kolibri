import type { Generic, LoaderCallback, RegisterOptions } from '@a11y-ui/core';
import { register as componentRegister } from '@public-ui/components';

/**
 * @deprecated Moved to \@public-ui/components.
 */
export const register = (
	themes:
		| Generic.Theming.RegisterPatch<string, string, string>
		| Generic.Theming.RegisterPatch<string, string, string>[]
		| Set<Generic.Theming.RegisterPatch<string, string, string>>,
	loaders: LoaderCallback | LoaderCallback[] | Set<LoaderCallback>,
	options?: RegisterOptions
): Promise<void[]> => componentRegister(themes, loaders, options);
