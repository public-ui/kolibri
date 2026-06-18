import { globals, typescriptConfig } from '@public-ui/eslint-config';

export default typescriptConfig({
	tsconfigRootDir: import.meta.dirname,
	globals: globals.node,
	rules: {
		'@typescript-eslint/no-explicit-any': 'error',
	},
});
