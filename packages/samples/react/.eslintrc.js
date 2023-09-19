const config = require('@leanup/stack/.eslintrc');

config.overrides = config.overrides || [];
config.overrides.push({
	extends: ['plugin:react/recommended', 'plugin:jsx-a11y/recommended'],
	files: ['**/*.tsx'],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	rules: {
		'react/no-unused-state': 'error',
	},
});

config.plugins = config.plugins || [];
config.plugins.push('react');
config.plugins.push('jsx-a11y');

config.settings = {
	react: {
		version: 'detect',
	},
};

module.exports = config;
