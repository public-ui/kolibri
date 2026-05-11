import js from '@eslint/js';
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
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			...js.configs.recommended.rules,
			eqeqeq: 'error',
		},
	},
];
