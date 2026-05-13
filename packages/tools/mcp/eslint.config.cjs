const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const json = require('eslint-plugin-json');
const globals = require('globals');

module.exports = [
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
	{
		files: ['src/**/*.{js,mjs}'],
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2022,
			},
		},
		rules: {
			...js.configs.recommended.rules,
			eqeqeq: 'error',
		},
	},
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			globals: globals.node,
			parserOptions: {
				project: 'tsconfig.json',
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs['recommended'].rules,
			...tsPlugin.configs['recommended-requiring-type-checking'].rules,
			eqeqeq: 'error',
		},
	},
	{
		files: ['test/**/*.js', 'test/**/*.mjs', 'test/**/*.ts'],
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2022,
			},
		},
		rules: {
			...js.configs.recommended.rules,
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},
	{
		files: ['*.json', '**/*.json'],
		rules: {
			...json.configs.recommended.rules,
		},
		plugins: {
			json,
		},
	},
];
