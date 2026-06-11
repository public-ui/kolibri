import { typescriptConfig } from '@public-ui/eslint-config';

export default typescriptConfig({
	tsconfigRootDir: import.meta.dirname,
	rules: {
		'@typescript-eslint/no-namespace': 'off',
	},
});
