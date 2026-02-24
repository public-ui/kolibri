const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const globals = require('globals');

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
				...globals.browser,
				...globals.es2021,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs['recommended'].rules,
			...jsxA11y.configs.recommended.rules,

			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'warn',
			eqeqeq: 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react-hooks/rules-of-hooks': 'error',
		},
	},
];
