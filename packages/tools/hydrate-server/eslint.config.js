import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
	{
		ignores: ['dist/**', 'node_modules/**', 'test/**/*.mjs'],
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
			globals: {
				node: true,
				es2022: true,
			},
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2022,
				tsconfigRootDir: __dirname,
				project: ['./tsconfig.json'],
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {},
	},
	{
		files: ['test/**/*.mjs'],
		languageOptions: {
			globals: {
				node: true,
				es2022: true,
			},
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2022,
			},
		},
		rules: {},
	},
];
