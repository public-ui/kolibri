// Runtime-Guard für @public-ui/components-lit (experimentelle Lit-Runtime).
//
// Die Lit-Pakete rendern mit lit-html und konsumieren die geteilte Controller-Schicht aus
// @public-ui/internals — Stencil-Quellen gehören in packages/components (Stencil-Runtime),
// Adapter-Code in packages/adapters/*. Die Eingrenzung des internals-Pakets steht in dessen
// ARCHITECTURE.md.
import tsParser from '@typescript-eslint/parser';

export default [
	{
		files: ['src/**/*.ts'],
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
							group: ['@stencil/*', '@stencil/core', '@stencil/core/internal', '@stencil/playwright'],
							message: 'Die Lit-Runtime importiert kein Stencil: Stencil-Code gehört in packages/components (Stencil-Runtime).',
						},
						{
							group: ['react', 'react/*', 'react-dom', 'react-dom/*', 'vue', 'vue/*', '@vue/*', 'solid-js', 'solid-js/*', 'svelte'],
							message: 'Die Lit-Runtime bindet keine weiteren Frameworks ein: Adapter-Code gehört in packages/adapters/*.',
						},
					],
				},
			],
		},
	},
];
