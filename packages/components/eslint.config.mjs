import js from '@eslint/js';
import stencilPlugin from '@stencil-community/eslint-plugin';
import tseslintPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import boundariesPlugin from 'eslint-plugin-boundaries';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import kolibriPlugin from '../../eslint-rules/index.js';

/**
 * Extract recommended rules from plugin legacy configs.
 * The plugins expose their presets in legacy format ({ plugins, rules }),
 * so we spread only the `rules` portion into the flat config objects.
 */
const tsRecommendedRules = tseslintPlugin.configs?.recommended?.rules ?? {};
const tsTypeCheckedRules =
	tseslintPlugin.configs?.['recommended-type-checked']?.rules ?? tseslintPlugin.configs?.['recommended-requiring-type-checking']?.rules ?? {};
const stencilRecommendedRules = stencilPlugin.configs?.recommended?.rules ?? {};

// Remove rules from stencil recommended that require unregistered plugins
delete stencilRecommendedRules['react/jsx-no-bind'];

const jsxA11yRecommendedRules = jsxA11yPlugin.flatConfigs?.recommended?.rules ?? {};

export default [
	// Global ignores (replaces .eslintignore)
	{
		ignores: ['**/assets/**', 'scripts/*.js', 'src/**/*.js', 'src/**/*.html'],
	},

	// Base recommended JS rules
	js.configs.recommended,

	// TypeScript + Stencil configuration
	{
		files: ['src/**/*.ts', 'src/**/*.tsx'],
		plugins: {
			'@typescript-eslint': tseslintPlugin,
			'@stencil-community': stencilPlugin,
			kolibri: kolibriPlugin,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: ['./tsconfig.json', './tsconfig.node.json'],
				tsconfigRootDir: import.meta.dirname,
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			// Include recommended rules from plugins
			...tsRecommendedRules,
			...tsTypeCheckedRules,
			...stencilRecommendedRules,

			// Disable rules that TypeScript already handles
			'no-undef': 'off',

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

			'@stencil-community/async-methods': 'error',
			'@stencil-community/ban-prefix': ['off', ['stencil', 'stnl', 'st']],
			'@stencil-community/decorators-context': 'off',
			'@stencil-community/decorators-style': [
				'off',
				{
					prop: 'inline',
					state: 'inline',
					element: 'inline',
					event: 'inline',
					method: 'multiline',
					watch: 'multiline',
					listen: 'multiline',
				},
			],
			'@stencil-community/element-type': 'off',
			'@stencil-community/host-data-deprecated': 'off',
			'@stencil-community/methods-must-be-public': 'off',
			'@stencil-community/no-unused-watch': 'off',
			'@stencil-community/own-methods-must-be-private': 'off',
			'@stencil-community/own-props-must-be-private': 'off',
			'@stencil-community/prefer-vdom-listener': 'off',
			'@stencil-community/props-must-be-public': 'off',
			'@stencil-community/props-must-be-readonly': 'off',
			'@stencil-community/render-returns-host': 'off',
			'@stencil-community/reserved-member-names': 'off',
			'@stencil-community/single-export': 'off',
			'@stencil-community/strict-mutable': 'off',
			'@stencil-community/ban-exported-const-enums': 'off',
			'@stencil-community/strict-boolean-conditions': 'off',
			'@stencil-community/ban-default-true': 'off',

			eqeqeq: 'error',
			'no-console': 'error',
			'no-mixed-spaces-and-tabs': 'off',
		},
	},

	// Skeleton blueprint import rules
	{
		files: ['src/components/_skeleton/web-components/**/*.{ts,tsx}', 'src/internal/functional-components/{click-button,skeleton}/**/*.{ts,tsx}'],
		plugins: {
			boundaries: boundariesPlugin,
		},
		settings: {
			'import/resolver': {
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
			'boundaries/elements': [
				{ type: 'skeleton-web-components', pattern: 'src/components/_skeleton/web-components', mode: 'folder' },
				{
					type: 'skeleton-functional-components',
					pattern: ['src/internal/functional-components/click-button', 'src/internal/functional-components/skeleton'],
					mode: 'folder',
				},
				{ type: 'internal-functional-components', pattern: 'src/internal/functional-components', mode: 'folder' },
				{ type: 'internal-props', pattern: 'src/internal/props', mode: 'folder' },
				{ type: 'schema', pattern: 'src/schema', mode: 'folder' },
				{ type: 'testing-utils', pattern: 'src/utils/testing', mode: 'folder' },
			],
		},
		rules: {
			/**
			 * Skeleton blueprint layers may only import files from their explicitly
			 * allowed target directories.
			 */
			'boundaries/dependencies': [
				'error',
				{
					default: 'disallow',
					checkUnknownLocals: true,
					rules: [
						{
							from: { type: 'skeleton-web-components' },
							allow: {
								to: { type: ['skeleton-web-components', 'skeleton-functional-components', 'internal-functional-components', 'schema', 'testing-utils'] },
							},
						},
						{
							from: { type: 'skeleton-functional-components' },
							allow: { to: { type: ['skeleton-functional-components', 'internal-functional-components', 'internal-props', 'schema'] } },
						},
					],
				},
			],
		},
	},

	// Barrel import rule – keep the existing non-Skeleton scope separate from the Skeleton boundary rules.
	{
		files: ['src/internals/**/*.{ts,tsx}', 'src/components/avatar/*.tsx'],
		plugins: {
			kolibri: kolibriPlugin,
		},
		rules: {
			/**
			 * Props must be imported via barrel files (index.ts), not directly.
			 */
			'kolibri/require-barrel-import': [
				'error',
				{
					directories: ['schema/props'],
				},
			],
		},
	},

	// JSX accessibility rules for TSX files
	{
		files: ['src/**/*.tsx'],
		plugins: {
			'jsx-a11y': jsxA11yPlugin,
		},
		rules: {
			...jsxA11yRecommendedRules,
			'jsx-a11y/no-access-key': 'off',
			'jsx-a11y/label-has-associated-control': 'off',
		},
	},

	// E2E test overrides — relax strict typing for Playwright test patterns
	// MUST come after TypeScript config to override its rules
	{
		files: ['src/**/*.e2e.ts'],
		rules: {
			// E2E tests use (window as any) for state sharing between test setup and assertions
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			// Playwright's evaluate() returns sync values but ESLint sees them as potentially async
			'@typescript-eslint/await-thenable': 'off',
			// Unused test variables are often intentional for documentation
			'@typescript-eslint/no-unused-vars': 'off',
		},
	},
];
