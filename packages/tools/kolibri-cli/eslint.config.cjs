const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const json = require('eslint-plugin-json');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const react = require('eslint-plugin-react');
const html = require('eslint-plugin-html');

module.exports = [
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
	{
		files: ['src/**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			globals: {
				Buffer: 'readonly',
				__dirname: 'readonly',
				__filename: 'readonly',
				console: 'readonly',
				global: 'readonly',
				process: 'readonly',
			},
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
			json,
			'jsx-a11y': jsxA11y,
			react,
			html,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs['recommended'].rules,
			...tsPlugin.configs['recommended-requiring-type-checking'].rules,
			...json.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
			...react.configs.recommended.rules,

			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					caughtErrors: 'none',
					ignoreRestSiblings: true,
				},
			],
			eqeqeq: 'error',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
];
