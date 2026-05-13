/* eslint-disable */

const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const stencilPlugin = require('@stencil-community/eslint-plugin');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');

module.exports = [
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
	{
		files: ['src/**/*.{ts,tsx,js}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json', './tsconfig.node.json'],
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'@stencil-community': stencilPlugin,
			'jsx-a11y': jsxA11yPlugin,
		},
		rules: {
			...tsPlugin.configs['recommended'].rules,
			/**
			 * Import types with `import type` instead of `import`.
			 */
			'@typescript-eslint/consistent-type-imports': 'warn',
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
			 * The HTML templates in TSX are recognized as any.
			 */
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',

			'@stencil-community/async-methods': 'error',
			'@stencil-community/ban-prefix': ['off', ['stencil', 'stnl', 'st']],
			'@stencil-community/decorators-context': 'off',
			'@stencil-community/decorators-style': [
				'off',
				{
					prop: 'inline',
					state: 'inline',
					element: 'inline',
					event: 'inline',
					method: 'multiline',
					watch: 'multiline',
					listen: 'multiline',
				},
			],
			'@stencil-community/element-type': 'off',
			'@stencil-community/host-data-deprecated': 'off',
			'@stencil-community/methods-must-be-public': 'off',
			'@stencil-community/no-unused-watch': 'off',
			'@stencil-community/own-methods-must-be-private': 'off',
			'@stencil-community/own-props-must-be-private': 'off',
			'@stencil-community/prefer-vdom-listener': 'off',
			'@stencil-community/props-must-be-public': 'off',
			'@stencil-community/props-must-be-readonly': 'off',
			'@stencil-community/render-returns-host': 'off',
			'@stencil-community/required-jsdoc': 'off',
			'@stencil-community/reserved-member-names': 'off',
			'@stencil-community/single-export': 'off',
			'@stencil-community/strict-mutable': 'off',
			'@stencil-community/ban-exported-const-enums': 'off',
			'@stencil-community/strict-boolean-conditions': 'off',
			'@stencil-community/ban-default-true': 'off',

			'react/jsx-no-bind': 'off',

			'no-console': 'error',
			eqeqeq: 'error',
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
	},
	{
		files: ['src/**/*.tsx'],
		plugins: {
			'jsx-a11y': jsxA11yPlugin,
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			...jsxA11yPlugin.configs.recommended.rules,
			'jsx-a11y/no-access-key': 'off',
			'jsx-a11y/label-has-associated-control': [
				2,
				{
					depth: 3, // allow labels deeply nested into spans
				},
			],
		},
	},
	{
		files: ['src/**/*.ts', 'src/**/*.tsx'],
		rules: {
			/**
			 * The typescript formatter used spaces and tabs in some cases.
			 */
			'no-mixed-spaces-and-tabs': 'off',
		},
	},
];
