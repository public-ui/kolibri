const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');

module.exports = [
	{
		ignores: ['**/assets/**', '**/complex-form/**', 'dist/**', 'node_modules/**'],
	},
	{
		files: ['src/**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 'latest',
				project: true,
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
			globals: {
				browser: true,
				es2021: true,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			react,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs['recommended'].rules,
			...react.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,

			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'warn',
			'react/no-unused-state': 'error',
			eqeqeq: 'error',
			'react/react-in-jsx-scope': 'off',
		},
		settings: {
			react: {
				version: '19.2.6',
			},
		},
	},
];
