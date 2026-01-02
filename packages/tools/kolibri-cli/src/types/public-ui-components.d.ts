declare module '@public-ui/components' {
	import type { generateBemScssFile } from 'typed-bem/scss';

	type BemDefinition = Parameters<typeof generateBemScssFile>[0];

	export const BEM_ALERT: BemDefinition;
	export const BEM_ICON: BemDefinition;
}
