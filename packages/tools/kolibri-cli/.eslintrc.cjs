module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:jsdoc/recommended',
		'plugin:json/recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:react/recommended',
		'prettier',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		project: 'tsconfig.json',
		sourceType: 'module',
		tsconfigRootDir: __dirname,
	},
	rules: {
		eqeqeq: "error",
	},
	plugins: [
		'html',
		// 'jsdoc',
		// 'json',
		// 'jsx-a11y',
		'no-loops',
		'react',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
};
