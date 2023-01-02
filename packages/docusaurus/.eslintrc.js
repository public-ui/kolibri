module.exports = {
	extends: ['eslint:recommended', 'plugin:@docusaurus/recommended', 'plugin:mdx/recommended'],
	ignorePatterns: ['**/assets/**', '**/*.md'],
	overrides: [
		{
			extends: [
				'plugin:@typescript-eslint/recommended',
				'plugin:@typescript-eslint/recommended-requiring-type-checking',
				'plugin:jsx-a11y/recommended',
				'plugin:react/recommended',
			],
			files: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: '2015',
				project: ['./tsconfig.json'],
				sourceType: 'module',
				tsconfigRootDir: __dirname,
			},
			plugins: ['@typescript-eslint', 'jsx-a11y', 'react'],

			settings: {
				react: {
					version: 'detect',
				},
			},
		},
	],
	plugins: ['@docusaurus'],
	root: true,
};
