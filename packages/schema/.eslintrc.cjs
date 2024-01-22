module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
	},
	plugins: ['@typescript-eslint', 'no-loops'],
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
	rules: {
		/**
		 * Import types with `import type` instead of `import`.
		 */
		'@typescript-eslint/consistent-type-imports': 'error',
		/**
		 * This rule is disabled because it is not possible to use the
		 * `no-unsafe-assignment` rule without breaking the build.
		 */
		'@typescript-eslint/no-unsafe-assignment': 'warn',
		/**
		 * This setting is necessary because required and optional properties
		 * and states build on each other in API design. If duplicate or redundant
		 * types were not used, changes to base types would not be propagated
		 * and would lead to errors.
		 */
		'@typescript-eslint/no-duplicate-type-constituents': 'off',
		'@typescript-eslint/no-redundant-type-constituents': 'off',
		/**
		 * ???
		 */
		'@typescript-eslint/no-namespace': 'off',
		/**
		 * Needed for `JSON.parse`.
		 */
		'@typescript-eslint/no-unsafe-return': 'off',
		/**
		 * The typescript formatter used spaces and tabs in some cases.
		 */
		'no-mixed-spaces-and-tabs': 'off',
	},
};
