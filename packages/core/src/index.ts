import { register as componentRegister } from '@public-ui/components';

/**
 * @deprecated Moved to \@public-ui/components.
 */
export const register = (() => {
	console.debug(
		`The register functions has been moved to the @public-ui/components package and thus the @public-ui/core package is deprecated. Now you can import the register function directly from the @public-ui/components package.`
	);
	return componentRegister;
})();
