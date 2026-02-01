module.exports = {
	ignorePatterns: ['.eslintrc.js'],
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:jsx-a11y/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		project: true,
		sourceType: 'module',
		tsconfigRootDir: __dirname,
	},
	plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y'],
	rules: {
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-unsafe-member-access': 'error',
		eqeqeq: 'error',
		'react/no-unused-state': 'error',
		'react/react-in-jsx-scope': 'off',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};
