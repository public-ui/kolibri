import js from '@eslint/js';
import globals from 'globals';

export default [
	{
		ignores: ['node_modules/**'],
	},
	{
		files: ['src/**/*.js'],
		languageOptions: {
			globals: globals.node,
		},
		rules: {
			...js.configs.recommended.rules,
			eqeqeq: 'error',
		},
	},
];
