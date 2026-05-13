/* eslint-disable */

const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const jsdocPlugin = require('eslint-plugin-jsdoc');
const jsonPlugin = require('eslint-plugin-json');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const reactPlugin = require('eslint-plugin-react');
const prettierConfig = require('eslint-config-prettier');

module.exports = [
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
	{
		files: ['src/**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				project: 'tsconfig.json',
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			jsdoc: jsdocPlugin,
			json: jsonPlugin,
			'jsx-a11y': jsxA11yPlugin,
			react: reactPlugin,
		},
		rules: {
			...tsPlugin.configs['recommended'].rules,
			...jsxA11yPlugin.configs.recommended.rules,
			...reactPlugin.configs.recommended.rules,
			...prettierConfig.rules,
			eqeqeq: 'error',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
