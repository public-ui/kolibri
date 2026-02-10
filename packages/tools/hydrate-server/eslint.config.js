import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
		rules: {
			...js.configs.recommended.rules,
			...tsPlugin.configs['recommended'].rules,
		},
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
		rules: {
			...js.configs.recommended.rules,
		},
	},
];
