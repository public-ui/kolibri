const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const { dirname } = require('path');


module.exports = [
	{
		ignores: ['dist/**', 'node_modules/**', 'test/**/*.mjs'],
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			globals: {
				node: true,
				es2022: true,
			},
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2022,
				tsconfigRootDir: __dirname,
				project: ['./tsconfig.json'],
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
		},
	},
	{
		files: ['test/**/*.mjs'],
		languageOptions: {
			globals: {
				node: true,
				es2022: true,
			},
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2022,
			},
		},
		rules: {
		},
	},
];
