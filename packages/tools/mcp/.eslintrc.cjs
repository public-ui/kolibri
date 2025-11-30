module.exports = {
	extends: ['eslint:recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2022,
	},
	plugins: ['html'],
	rules: {
		eqeqeq: 'error',
	},
	overrides: [
		{
			files: ['src/**/*.ts'],
			extends: [
				'eslint:recommended',
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:jsdoc/recommended-typescript',
				'prettier',
			],
			parserOptions: {
				project: 'tsconfig.json',
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
		},
		{
			files: ['test/**/*.js'],
			extends: ['plugin:jsdoc/recommended'],
			env: {
				node: true,
				es2022: true,
			},
			rules: {
				'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			},
		},
		{
			files: ['*.json', '**/*.json'],
			extends: ['plugin:json/recommended'],
		},
		{
			files: ['public/**/*.html'],
			env: {
				browser: true,
				es2022: true,
			},
			globals: {
				__BUILD_TOTAL_COUNT__: 'readonly',
				__BUILD_SAMPLE_COUNT__: 'readonly',
				__BUILD_SPEC_COUNT__: 'readonly',
				__BUILD_DOC_COUNT__: 'readonly',
				__BUILD_SCENARIO_COUNT__: 'readonly',
			},
			rules: {
				'no-unused-vars': ['error', { argsIgnorePattern: '^_|^e$' }],
			},
		},
	],
};
