import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import json from 'eslint-plugin-json';
import globals from 'globals';

export default [
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
	{
		files: ['src/**/*.{js,mjs}'],
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2022,
			},
		},
		rules: {
			...js.configs.recommended.rules,
			eqeqeq: 'error',
		},
	},
	{
		files: ['src/**/*.ts'],
		languageOptions: {
			parser: tsParser,
			globals: globals.node,
			parserOptions: {
				project: 'tsconfig.json',
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs['recommended'].rules,
			...tsPlugin.configs['recommended-requiring-type-checking'].rules,
			eqeqeq: 'error',
		},
	},
	{
		files: ['test/**/*.js', 'test/**/*.mjs', 'test/**/*.ts'],
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2022,
			},
		},
		rules: {
			...js.configs.recommended.rules,
			'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},
	{
		files: ['*.json', '**/*.json'],
		rules: {
			...json.configs.recommended.rules,
		},
		plugins: {
			json,
		},
	},
];
