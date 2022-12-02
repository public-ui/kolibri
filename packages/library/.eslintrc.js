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
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',
		'no-mixed-spaces-and-tabs': 'off',
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
config.plugins.push('no-loops');

config.settings = {
	react: {
		version: 'detect',
	},
};

module.exports = config;
