// Grenz-Guard für @public-ui/functional-components.
//
// Das Paket enthält ausschließlich Stencil-Funktionskomponenten: den Render-Layer, den die
// Web-Component-Shells rendern und den künftige Runtime-Implementierungen übernehmen können.
// Erlaubt sind `@stencil/core`, das framework-freie internals (relative Quellpfade) und die
// Sibling-Funktionskomponenten des Pakets. Verboten ist jede Gegenrichtung: Importe aus den
// Shell-Layern von @public-ui/components (`src/components`, `src/core`, `src/global`) und
// Importe anderer Frameworks.
import { boundariesPlugin, jsxA11yPlugin, kolibriPlugin } from '@public-ui/eslint-config';
import tsParser from '@typescript-eslint/parser';

const jsxA11yRecommendedRules = jsxA11yPlugin.flatConfigs?.recommended?.rules ?? {};

export default [
	{
		files: ['src/**/*.{ts,tsx}'],
		plugins: {
			kolibri: kolibriPlugin,
		},
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['@public-ui/components', '@public-ui/components/*', '**/src/components/**', '**/src/core/**', '**/src/global/**'],
							message:
								'Gegenrichtung verboten: Die Shells rendern die Funktionskomponenten, nie umgekehrt. Shell-Code gehört in packages/components. Siehe README.md.',
						},
						{
							group: ['lit', 'lit/*', '@lit/*', 'lit-html', 'lit-html/*', 'lit-element'],
							message: 'Lit-Rendering gehört in packages/components/lit. Siehe README.md.',
						},
						{
							group: ['react', 'react/*', 'react-dom', 'react-dom/*', 'vue', 'vue/*', '@vue/*', 'solid-js', 'solid-js/*', 'svelte'],
							message: 'Adapter-Code gehört in packages/adapters/*. Siehe README.md.',
						},
					],
				},
			],
		},
	},

	// JSX accessibility rules for the functional components' TSX output.
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

	// Requiredness is threaded into apply — the form-field base class is the one applier outside a
	// component config that passes it through (the rule moves here from the components package).
	{
		files: ['src/form-field/base-web-component.tsx'],
		plugins: {
			kolibri: kolibriPlugin,
		},
		rules: {
			'kolibri/apply-passes-required': 'error',
			'kolibri/prop-required-no-initializer': 'error',
			'kolibri/prop-optional-requires-initializer': 'error',
		},
	},

	// Skeleton blueprint boundary: the skeleton functional components may only import their own
	// layer, the shared functional-components layer and the internals (moved here from the
	// components package, whose ESLint run no longer covers these files).
	{
		files: ['src/{click-button,skeleton}/**/*.{ts,tsx}'],
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
				{
					type: 'skeleton-functional-components',
					pattern: ['src/click-button', 'src/skeleton'],
					mode: 'folder',
				},
				{ type: 'functional-components', pattern: 'src', mode: 'folder' },
				{ type: 'internals', pattern: '../internals/src', mode: 'folder' },
				{ type: 'testing-utils', pattern: '../src/utils/testing', mode: 'folder' },
			],
		},
		rules: {
			'boundaries/dependencies': [
				'error',
				{
					default: 'disallow',
					checkUnknownLocals: true,
					rules: [
						{
							from: { type: 'skeleton-functional-components' },
							allow: {
								to: {
									type: ['skeleton-functional-components', 'functional-components', 'internals', 'testing-utils'],
								},
							},
						},
					],
				},
			],
		},
	},
];
