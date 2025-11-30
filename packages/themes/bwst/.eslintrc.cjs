module.exports = {
	root: true,
	env: {
		node: true,
	},
	ignorePatterns: ['**/dist/**', '**/node_modules/**'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				project: 'tsconfig.json',
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
			plugins: ['@typescript-eslint'],
			extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
			rules: {
				'@typescript-eslint/no-namespace': 'off',
				eqeqeq: 'error',
			},
		},
		{
			files: ['*.js', '*.mjs'],
			parser: 'espree',
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
			},
			extends: ['eslint:recommended'],
			rules: {
				eqeqeq: 'error',
			},
		},
		{
			files: ['*.cjs'],
			parser: 'espree',
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'script',
			},
			env: {
				node: true,
			},
			extends: ['eslint:recommended'],
			rules: {
				eqeqeq: 'error',
			},
		},
	],
};
