module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
	overrides: [
		{
			files: ['**/*.tsx'],
			extends: ['plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			rules: {
				'@typescript-eslint/consistent-type-imports': 'error',
				'@typescript-eslint/no-unsafe-member-access': 'error',
				'react/no-unused-state': 'error',
				eqeqeq: 'error',
			},
		},
	],
	plugins: ['react', 'jsx-a11y'],
	settings: {
		react: {
			version: 'detect',
		},
	},
};
