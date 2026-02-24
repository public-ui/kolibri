const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const jsxA11y = require('eslint-plugin-jsx-a11y');
const reactHooks = require('eslint-plugin-react-hooks');
const globals = require('globals');

module.exports = [
	{
		ignores: ['dist/**', 'node_modules/**', '.vite/**'],
	},
	{
		files: ['src/**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
				project: true,
				tsconfigRootDir: __dirname,
			},
			globals: {
				...globals.browser,
				...globals.node,
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
			...tsPlugin.configs['recommended-requiring-type-checking'].rules,
			...jsxA11y.configs.recommended.rules,

			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-unsafe-member-access': 'error',
			eqeqeq: 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'react-hooks/rules-of-hooks': 'error',
		},
	},
];
