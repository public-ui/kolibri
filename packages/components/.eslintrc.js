const config = {
	root: true,
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	extends: [
		'eslint:recommended',
		// 'plugin:@stencil/recommended',
		'plugin:@stencil-community/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],
	rules: {
		/**
		 * Import types with `import type` instead of `import`.
		 */
		'@typescript-eslint/consistent-type-imports': 'warn',
		/**
		 * This rule is disabled because it is not possible to use the
		 * `no-unsafe-assignment` rule without breaking the build.
		 */
		'@typescript-eslint/no-unsafe-assignment': 'warn',

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

		"@stencil-community/async-methods": "error",
		"@stencil-community/ban-prefix": ["off", ["stencil", "stnl", "st"]],
		"@stencil-community/decorators-context": "off",
		"@stencil-community/decorators-style": [
		  "off", {
			"prop": "inline",
			"state": "inline",
			"element": "inline",
			"event": "inline",
			"method": "multiline",
			"watch": "multiline",
			"listen": "multiline"
		  }],
		"@stencil-community/element-type": "off",
		"@stencil-community/host-data-deprecated": "off",
		"@stencil-community/methods-must-be-public": "off",
		"@stencil-community/no-unused-watch": "off",
		"@stencil-community/own-methods-must-be-private": "off",
		"@stencil-community/own-props-must-be-private": "off",
		"@stencil-community/prefer-vdom-listener": "off",
		"@stencil-community/props-must-be-public": "off",
		"@stencil-community/props-must-be-readonly": "off",
		"@stencil-community/render-returns-host": "off",
		"@stencil-community/required-jsdoc": "off",
		"@stencil-community/reserved-member-names": "off",
		"@stencil-community/single-export": "off",
		"@stencil-community/strict-mutable": "off",
		"@stencil-community/ban-exported-const-enums": "off",
		"@stencil-community/strict-boolean-conditions": "off",
		"@stencil-community/ban-default-true": "off",

		"react/jsx-no-bind": 'off',

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

config.settings = {
	react: {
		version: 'detect',
	},
};

module.exports = config;
