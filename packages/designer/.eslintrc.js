const config = require('@leanup/stack/.eslintrc');

config.parserOptions = {
	tsconfigRootDir: __dirname,
};

config.overrides = config.overrides || [];
config.overrides.push({
	extends: ['plugin:jsx-a11y/recommended'],
	files: ['**/*.tsx'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
});

config.plugins = config.plugins || [];
config.plugins.push('jsx-a11y');

config.overrides[0].rules['@typescript-eslint/no-unsafe-member-access'] = ['warn'];

config.settings = {
	react: {
		version: 'detect',
	},
};

module.exports = config;
