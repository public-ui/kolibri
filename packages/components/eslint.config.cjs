const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const stencilCommunity = require('@stencil-community/eslint-plugin');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const globals = require('globals');

const baseConfig = [
	{
		ignores: ['**/assets/**', 'scripts/*.js', 'src/**/*.js', 'src/**/*.html', 'dist/**', 'build/**', 'www/**', 'loader/**'],
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			globals: {
				...globals.browser,
				...globals.node,
				jest: true,
			},
			parserOptions: {
				project: ['./tsconfig.json', './tsconfig.node.json'],
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'@stencil-community': stencilCommunity,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs['recommended'].rules,
			...tsPlugin.configs['recommended-requiring-type-checking'].rules,
			...stencilCommunity.configs.recommended.rules,

			// Disable no-undef because TypeScript handles undefined types
			'no-undef': 'off',

			// Import types with `import type` instead of `import`.
			'@typescript-eslint/consistent-type-imports': 'warn',
			'@typescript-eslint/no-base-to-string': 'warn',

			// This setting is necessary because required and optional properties
			// and states build on each other in API design. If duplicate or redundant
			// types were not used, changes to base types would not be propagated
			// and would lead to errors.
			'@typescript-eslint/no-duplicate-type-constituents': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'off',

			// This rule is disabled because it is not possible to use the
			// `no-unsafe-assignment` rule without breaking the build.
			'@typescript-eslint/no-unsafe-assignment': 'warn',

			// The HTML templates in TSX are recognized as any.
			'@typescript-eslint/no-unsafe-argument': 'warn',
			'@typescript-eslint/no-unsafe-call': 'warn',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unused-expressions': 'warn',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					caughtErrors: 'none',
					ignoreRestSiblings: true,
				},
			],
			'@typescript-eslint/require-await': 'warn',

			'@stencil-community/async-methods': 'error',
			'@stencil-community/ban-prefix': ['off', ['stencil', 'stnl', 'st']],
			'@stencil-community/decorators-context': 'off',
			'@stencil-community/decorators-style': 'off',
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
			'@stencil-community/reserved-member-names': 'off',
			'@stencil-community/single-export': 'off',
			'@stencil-community/strict-mutable': 'off',
			'@stencil-community/ban-exported-const-enums': 'off',
			'@stencil-community/strict-boolean-conditions': 'off',
			'@stencil-community/ban-default-true': 'off',

			eqeqeq: 'error',
			'react/jsx-no-bind': 'off',
			'no-console': 'error',
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
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...jsxA11y.configs.recommended.rules,
			'jsx-a11y/no-access-key': 'off',
			'jsx-a11y/label-has-associated-control': [
				2,
				{
					depth: 3,
				},
			],
			'no-mixed-spaces-and-tabs': 'off',
		},
	},
	{
		files: ['src/**/*.ts', 'src/**/*.tsx'],
		rules: {
			'no-mixed-spaces-and-tabs': 'off',
		},
	},
	{
		files: ['src/**/*.test.{ts,tsx}', 'src/**/testing/**/*.{ts,tsx}', 'src/**/*.e2e.ts'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.jest,
			},
		},
	},
];

module.exports = baseConfig;
