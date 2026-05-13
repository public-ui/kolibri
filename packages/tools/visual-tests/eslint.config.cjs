const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
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
			eqeqeq: 'error',
		},
	},
];
