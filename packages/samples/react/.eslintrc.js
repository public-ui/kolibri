const config = require('@leanup/stack/.eslintrc');

config.parserOptions = {
	tsconfigRootDir: __dirname,
};

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
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-unsafe-member-access': 'error',
		'react/no-unused-state': 'error',
		eqeqeq: "error",
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
