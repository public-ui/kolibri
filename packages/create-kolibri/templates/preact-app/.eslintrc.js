const config = require('@leanup/stack/.eslintrc');

config.overrides = config.overrides || [];
config.overrides.push({
	extends: ['plugin:jsx-a11y/recommended'],
	files: ['**/*.tsx'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
});

config.plugins = config.plugins || [];
config.plugins.push('jsx-a11y');

config.settings = {
	react: {
		version: 'detect',
	},
};

module.exports = config;
