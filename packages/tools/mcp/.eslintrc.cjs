module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	root: true,
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	extends: ['eslint:recommended'],
	rules: {
		'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
	},
};
