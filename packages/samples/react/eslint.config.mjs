import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import htmlPlugin from 'eslint-plugin-html';
import jsonPlugin from 'eslint-plugin-json';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
	{
		ignores: ['dist/**', 'node_modules/**', 'test-results/**', 'public/**', '**/assets/**', '**/complex-form/**'],
		linterOptions: { reportUnusedDisableDirectives: 'off' },
	},
	js.configs.recommended,
	{
		files: ['src/**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json'],
				tsconfigRootDir: import.meta.dirname,
				sourceType: 'module',
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
			},
			globals: { ...globals.browser, ...globals.node },
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			react: reactPlugin,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...prettier.rules,
			eqeqeq: 'error',

			'no-undef': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'@typescript-eslint/consistent-type-imports': 'off',
		},
		settings: { react: { version: 'detect' } },
	},
	{
		files: ['src/**/*.{tsx}'],
		plugins: { react: reactPlugin, 'jsx-a11y': jsxA11y, '@typescript-eslint': tsPlugin },
		rules: {
			...reactPlugin.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
			'react/no-unused-state': 'error',
			'@typescript-eslint/consistent-type-imports': 'error',
		},
	},
	{
		files: ['**/*.html'],
		plugins: { html: htmlPlugin },
		processor: 'html',
		rules: { eqeqeq: 'error' },
	},
	{
		files: ['**/*.json'],
		plugins: { json: jsonPlugin },
		rules: { ...(jsonPlugin.configs?.recommended?.rules ?? {}) },
	},
];
