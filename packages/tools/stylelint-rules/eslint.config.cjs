const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
	{
		ignores: ['node_modules/**'],
	},
	{
		files: ['src/**/*.js'],
		languageOptions: {
			globals: globals.node,
		},
		rules: {
			eqeqeq: 'error',
		},
	},
];
