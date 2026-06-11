import { typescriptConfig } from '@public-ui/eslint-config';

export default typescriptConfig({
	tsconfigRootDir: import.meta.dirname,
	rules: {
		'@typescript-eslint/no-namespace': 'off',
		/**
		 * This adapter is generic glue around react-hook-form: it forwards
		 * `Control<any>`, event handlers and spread props through deliberately
		 * untyped boundaries, so `any` is intentional here.
		 */
		'@typescript-eslint/no-explicit-any': 'off',
	},
});
