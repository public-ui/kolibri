import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import htmlPlugin from 'eslint-plugin-html';
import jsdoc from 'eslint-plugin-jsdoc';
import jsonPlugin from 'eslint-plugin-json';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';

export default [
	{ ignores: ['dist/**', 'node_modules/**'] },
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
			globals: {
				...globals.node,
				...globals.browser,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			react: reactPlugin,
			'jsx-a11y': jsxA11y,
			jsdoc,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...tsPlugin.configs['recommended-requiring-type-checking'].rules,
			...reactPlugin.configs.recommended.rules,
			...jsxA11y.configs.recommended.rules,
			...jsdoc.configs.recommended.rules,
			...prettier.rules,
			eqeqeq: 'error',
		},
		settings: { react: { version: 'detect' } },
	},
	{
		files: ['**/*.html'],
		plugins: { html: htmlPlugin },
		processor: 'html',
		rules: {
			eqeqeq: 'error',
		},
	},
	{
		files: ['**/*.json'],
		plugins: { json: jsonPlugin },
		rules: {
			...(jsonPlugin.configs?.recommended?.rules ?? {}),
		},
	},
];
