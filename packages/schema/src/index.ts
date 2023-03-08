import { KoliBri as KoliBriUnique } from '@public-ui/components';

export const KoliBri = (() => {
	console.debug(
		`All schema definitions have been moved to the component package and thus the @public-ui/schema package is deprecated. Now you can import the schema definitions directly from the @public-ui/components package.`
	);
	return KoliBriUnique;
})();
