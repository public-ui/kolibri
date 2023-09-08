module.exports = {
	root: true,
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	rules: {
		/**
		 * This setting is necessary because required and optional properties
		 * and states build on each other in API design. If duplicate or redundant
		 * types were not used, changes to base types would not be propagated
		 * and would lead to errors.
		 */
		'@typescript-eslint/no-duplicate-type-constituents': 'off',
		'@typescript-eslint/no-redundant-type-constituents': 'off',
	},
	overrides: [
		{
			files: ['**/*.ts', '**/*.tsx'],
			rules: {
				/**
				 * The typescript formatter used spaces and tabs in some cases.
				 */
				'no-mixed-spaces-and-tabs': 'off',
			},
		}
	],
	plugins: [
		'no-loops',
	],
};
