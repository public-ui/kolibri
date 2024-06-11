const config = {
	root: true,
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	extends: [
		'eslint:recommended',
		// 'plugin:@stencil/recommended',
		// 'plugin:@stencil-community/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	rules: {
		/**
		 * This setting is necessary because required and optional properties
		 * and states build on each other in API design. If duplicate or redundant
		 * types were not used, changes to base types would not be propagated
		 * and would lead to errors.
		 */
		'@typescript-eslint/no-duplicate-type-constituents': 'off',
		'@typescript-eslint/no-redundant-type-constituents': 'off',

		/**
		 * The HTML templates in TSX are recognized as any.
		 */
		'@typescript-eslint/no-unsafe-member-access': 'off',
		'@typescript-eslint/no-unsafe-return': 'off',

		'no-console': 'error',
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
		'jsx-a11y/label-has-associated-control': [
			2,
			{
				depth: 3, // allow labels deeply nested into spans
			},
		],
	},
});
config.overrides.push({
	files: ['**/*.ts', '**/*.tsx'],
	rules: {
		/**
		 * The typescript formatter used spaces and tabs in some cases.
		 */
		'no-mixed-spaces-and-tabs': 'off',
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
