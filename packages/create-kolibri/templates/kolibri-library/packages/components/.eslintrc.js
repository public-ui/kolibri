const config = {
	root: true,
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	extends: [
		'eslint:recommended',
		// 'plugin:@stencil/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	rules: {
		// '@stencil/dependency-suggestions': 'warn',
		// '@stencil/required-jsdoc': 'warn',
		// '@stencil/strict-boolean-conditions': 'warn',
		'@typescript-eslint/no-empty-interface': 'warn',
		'@typescript-eslint/no-namespace': 'warn',
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		// 'react/jsx-no-bind': 'warn',
		'no-mixed-spaces-and-tabs': 'warn',
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
};

config.overrides = config.overrides || [];
config.overrides.push({
	extends: [
		// 'plugin:react/recommended',
		'plugin:jsx-a11y/recommended',
	],
	files: ['**/*.tsx'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'jsx-a11y/no-access-key': 'off',
		// 'react/no-unused-state': 'error',
	},
});

config.plugins = config.plugins || [];
// config.plugins.push('react');
config.plugins.push('jsx-a11y');

config.settings = {
	react: {
		version: 'detect',
	},
};

module.exports = config;
