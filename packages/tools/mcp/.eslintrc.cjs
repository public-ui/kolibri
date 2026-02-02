module.exports = {
	extends: ['eslint:recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022,
	},
	plugins: ['json'],
	rules: {
		eqeqeq: 'error',
	},
	overrides: [
		{
			files: ['src/**/*.ts'],
			extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking', 'prettier'],
			parserOptions: {
				project: 'tsconfig.json',
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
		},
		{
			files: ['test/**/*.js', 'test/**/*.mjs'],
			env: {
				node: true,
				es2022: true,
			},
			rules: {
				'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			},
		},
		{
			files: ['*.json', '**/*.json'],
			extends: ['plugin:json/recommended'],
		},
	],
};
