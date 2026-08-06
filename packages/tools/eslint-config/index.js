/**
 * @fileoverview Shared ESLint flat config presets for the KoliBri monorepo.
 *
 * Every package builds its `eslint.config.mjs` from the presets exported here, so
 * plugin versions, ignore patterns and the common rule set are managed in exactly
 * one place. Package-specific concerns stay in the package's own config file and
 * are passed in via the preset options (`files`, `ignores`, `rules`, …).
 */

import js from '@eslint/js';
import stencilPlugin from '@stencil-community/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import boundariesPlugin from 'eslint-plugin-boundaries';
import jsonPlugin from 'eslint-plugin-json';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import requireBarrelImport from './rules/require-barrel-import.js';

/**
 * Custom KoliBri ESLint plugin (registered as `kolibri` in configs).
 */
export const kolibriPlugin = {
	rules: {
		'require-barrel-import': requireBarrelImport,
	},
};

/**
 * Ignore patterns shared by all packages.
 */
export const defaultIgnores = ['dist/**', 'node_modules/**', '**/assets/**'];

/**
 * Rules every package agrees on, regardless of language or framework.
 */
export const baseRules = {
	eqeqeq: 'error',
};

/**
 * Recommended rule sets of @typescript-eslint. The plugin exposes its presets in
 * legacy format ({ plugins, rules }), so only the `rules` portion is exported for
 * spreading into flat config objects.
 */
export const tsRecommendedRules = tsPlugin.configs?.recommended?.rules ?? {};
export const tsTypeCheckedRules =
	tsPlugin.configs?.['recommended-type-checked']?.rules ?? tsPlugin.configs?.['recommended-requiring-type-checking']?.rules ?? {};

/*
 * Re-export the centrally managed plugins/parsers for package configs with
 * special needs (e.g. the Stencil setup in @public-ui/components).
 */
export { boundariesPlugin, globals, js, jsonPlugin, jsxA11yPlugin, reactHooksPlugin, reactPlugin, stencilPlugin, tsParser, tsPlugin };

/**
 * Preset for plain JavaScript (Node.js) packages.
 *
 * @param {object} [options]
 * @param {string[]} [options.files] Glob patterns of the files to lint.
 * @param {string[]} [options.ignores] Additional ignore patterns.
 * @param {Record<string, unknown>} [options.rules] Additional or overriding rules.
 * @returns {import('eslint').Linter.Config[]}
 */
export function nodeConfig({ files = ['src/**/*.{js,mjs}'], ignores = [], rules = {} } = {}) {
	return [
		{
			ignores: [...defaultIgnores, ...ignores],
		},
		{
			files,
			languageOptions: {
				globals: globals.node,
				parserOptions: {
					ecmaVersion: 'latest',
					sourceType: 'module',
				},
			},
			rules: {
				...js.configs.recommended.rules,
				...baseRules,
				...rules,
			},
		},
	];
}

/**
 * Preset for type-aware TypeScript linting.
 *
 * @param {object} options
 * @param {string} options.tsconfigRootDir Pass `import.meta.dirname` of the package config.
 * @param {string[]} [options.project] tsconfig file(s) used for type information.
 * @param {string[]} [options.files] Glob patterns of the files to lint.
 * @param {string[]} [options.ignores] Additional ignore patterns.
 * @param {Record<string, unknown>} [options.globals] Additional globals (e.g. `globals.node`).
 * @param {boolean} [options.jsx] Enable JSX parsing.
 * @param {boolean} [options.typeChecked] Spread the recommended + type-checked rule sets.
 * @param {Record<string, unknown>} [options.rules] Additional or overriding rules.
 * @returns {import('eslint').Linter.Config[]}
 */
export function typescriptConfig({
	tsconfigRootDir,
	project = ['./tsconfig.json'],
	files = ['src/**/*.{ts,tsx}'],
	ignores = [],
	globals: extraGlobals,
	jsx = false,
	typeChecked = false,
	rules = {},
} = {}) {
	if (!tsconfigRootDir) {
		throw new Error('typescriptConfig requires `tsconfigRootDir` (pass `import.meta.dirname`) to resolve tsconfig paths correctly in the monorepo.');
	}
	return [
		{
			ignores: [...defaultIgnores, ...ignores],
		},
		{
			files,
			languageOptions: {
				parser: tsParser,
				...(extraGlobals ? { globals: extraGlobals } : {}),
				parserOptions: {
					project,
					sourceType: 'module',
					tsconfigRootDir,
					...(jsx ? { ecmaFeatures: { jsx: true } } : {}),
				},
			},
			plugins: {
				'@typescript-eslint': tsPlugin,
			},
			rules: {
				// Standard recommended rules apply to every TypeScript package.
				...js.configs.recommended.rules,
				...tsRecommendedRules,
				// The noisy type-aware rule set is opt-in via `typeChecked`.
				...(typeChecked ? tsTypeCheckedRules : {}),
				// TypeScript itself reports unresolved identifiers more reliably than `no-undef`.
				'no-undef': 'off',
				// Monorepo-wide convention: ignore underscore-prefixed args and intentionally unused caught errors.
				'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', caughtErrors: 'none', ignoreRestSiblings: true }],
				...baseRules,
				...rules,
			},
		},
	];
}

/**
 * Preset for the theme packages (TypeScript with relaxed unsafe-* rules, because
 * themes consume the generated component types which may be untyped at lint time).
 *
 * @param {object} options
 * @param {string} options.tsconfigRootDir Pass `import.meta.dirname` of the package config.
 * @param {Record<string, unknown>} [options.rules] Additional or overriding rules.
 * @returns {import('eslint').Linter.Config[]}
 */
export function themeConfig({ tsconfigRootDir, rules = {} } = {}) {
	return typescriptConfig({
		tsconfigRootDir,
		rules: {
			'@typescript-eslint/no-namespace': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'warn',
			'@typescript-eslint/no-unsafe-call': 'warn',
			'@typescript-eslint/no-unsafe-member-access': 'warn',
			...rules,
		},
	});
}

/**
 * Preset for the React sample applications (TypeScript + React + Hooks + a11y).
 *
 * @param {object} options
 * @param {string} options.tsconfigRootDir Pass `import.meta.dirname` of the package config.
 * @param {string[]} [options.ignores] Additional ignore patterns.
 * @param {Record<string, unknown>} [options.rules] Additional or overriding rules.
 * @returns {import('eslint').Linter.Config[]}
 */
export function reactConfig({ tsconfigRootDir, ignores = [], rules = {} } = {}) {
	return [
		// Reuse the shared TypeScript setup (parser, ignores, recommended rules).
		...typescriptConfig({
			tsconfigRootDir,
			project: true,
			files: ['src/**/*.{js,jsx,ts,tsx}'],
			ignores,
			jsx: true,
			globals: { ...globals.browser, ...globals.node },
			rules: {
				'@typescript-eslint/consistent-type-imports': 'error',
				'@typescript-eslint/no-unsafe-member-access': 'error',
				/**
				 * These are demonstration applications: examples intentionally use
				 * `any` to stay terse, so explicit `any` is allowed here.
				 */
				'@typescript-eslint/no-explicit-any': 'off',
				...rules,
			},
		}),
		// React / Hooks / a11y layer on top of the TypeScript base.
		//
		// The plugins' full `recommended` rule sets are intentionally NOT spread in
		// here: these are demonstration apps and enabling them surfaces ~100
		// pre-existing findings (positive tabindex, unescaped entities, exhaustive
		// deps, …) that are out of scope for the shared lint setup. A curated subset
		// is enabled instead; individual samples can opt into more via `rules`.
		{
			files: ['src/**/*.{js,jsx,ts,tsx}'],
			plugins: {
				react: reactPlugin,
				'react-hooks': reactHooksPlugin,
				'jsx-a11y': jsxA11yPlugin,
			},
			rules: {
				'react/no-unused-state': 'error',
				'react/react-in-jsx-scope': 'off',
				// Enable all recommended react-hooks rules
				...reactHooksPlugin.configs.recommended.rules,
			},
			settings: {
				react: { version: 'detect' },
			},
		},
	];
}
