import { globals, typescriptConfig } from '@public-ui/eslint-config';

export default typescriptConfig({
	tsconfigRootDir: import.meta.dirname,
	files: ['src/**/*.{ts,tsx,js,jsx}'],
	jsx: true,
	globals: globals.node,
	rules: {
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				argsIgnorePattern: '^_',
				caughtErrors: 'none',
				ignoreRestSiblings: true,
			},
		],
	},
});
