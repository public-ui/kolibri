const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const jsxA11y = require('eslint-plugin-jsx-a11y');

module.exports = [
	{
		ignores: ['dist/**', 'node_modules/**', '.vite/**', '**/assets/**', '**/complex-form/**'],
	},
	{
		files: ['src/**/*.{js,jsx,ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: { jsx: true },
				ecmaVersion: 'latest',
				project: true,
				sourceType: 'module',
			},
			globals: {
				window: true,
				document: true,
				navigator: true,
				globalThis: true,
				process: true,
				Buffer: true,
				__dirname: true,
				__filename: true,
				console: true,
				setTimeout: true,
				setInterval: true,
				clearTimeout: true,
				clearInterval: true,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			react,
			'react-hooks': reactHooks,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			'@typescript-eslint/consistent-type-imports': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_',
					caughtErrors: 'none',
					ignoreRestSiblings: true,
				},
			],
			'@typescript-eslint/no-unsafe-member-access': 'error',
			'react/no-unused-state': 'error',
			'react/react-in-jsx-scope': 'off',
			eqeqeq: 'error',
		},
		settings: {
			react: { version: 'detect' },
		},
	},
];
