import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
});

export default compat.config({
	root: true,
	parserOptions: {
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
	},
	extends: [
		'eslint:recommended',
		'plugin:@stencil-community/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	rules: {
		'@typescript-eslint/consistent-type-imports': 'warn',
		'@typescript-eslint/no-unsafe-assignment': 'warn',
		'@typescript-eslint/no-duplicate-type-constituents': 'off',
		'@typescript-eslint/no-redundant-type-constituents': 'off',
                '@typescript-eslint/no-unsafe-member-access': 'off',
                '@typescript-eslint/no-unsafe-return': 'off',
                '@typescript-eslint/no-unsafe-call': 'off',
                '@typescript-eslint/no-unsafe-argument': 'off',
                '@typescript-eslint/require-await': 'off',
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
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	overrides: [
		{
			extends: ['plugin:jsx-a11y/recommended'],
			files: ['**/*.tsx'],
			parserOptions: {
				ecmaFeatures: { jsx: true },
			},
			rules: {
				'jsx-a11y/no-access-key': 'off',
				'jsx-a11y/label-has-associated-control': [
					2,
					{
						depth: 3,
					},
				],
			},
		},
		{
			files: ['**/*.ts', '**/*.tsx'],
			rules: {
				'no-mixed-spaces-and-tabs': 'off',
			},
		},
	],
	plugins: ['jsx-a11y'],
});
