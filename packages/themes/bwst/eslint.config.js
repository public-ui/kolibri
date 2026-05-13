import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
	{
		ignores: ['**/dist/**', '**/node_modules/**'],
	},
	{
		files: ['src/**/*.{ts,tsx}'],
		languageOptions: {
			parser: tsParser,
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
			...tsPlugin.configs['recommended'].rules,
			'@typescript-eslint/no-namespace': 'off',
			eqeqeq: 'error',
		},
	},
	{
		files: ['src/**/*.{js,mjs}'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'module',
			},
		},
		rules: {
			eqeqeq: 'error',
		},
	},
	{
		files: ['src/**/*.cjs'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2022,
				sourceType: 'script',
			},
		},
		rules: {
			eqeqeq: 'error',
		},
	},
];
