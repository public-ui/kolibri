import js from '@eslint/js';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default [
	{
		ignores: ['dist/**', 'node_modules/**'],
	},
	{
		files: ['src/**/*.{js,mjs}'],
		languageOptions: {
			globals: globals.node,
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
			},
		},
		rules: {
			...js.configs.recommended.rules,
			eqeqeq: 'error',
		},
	},
];
