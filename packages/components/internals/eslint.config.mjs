// Framework-Freiheits-Guard für @public-ui/internals.
//
// Das Paket enthält ausschließlich stateless, framework-freie Schichten (Schema-Typen,
// Validatoren, Controller). Die Aufnahme- und Ausschlusskriterien stehen in ARCHITECTURE.md;
// diese Konfiguration setzt die dortige Grenze 1 maschinell durch: Framework-Importe — auch als
// Typ-Importe — gehören in die Runtime-Pakete (packages/components, packages/components/lit).
import tsParser from '@typescript-eslint/parser';

export default [
	{
		files: ['src/**/*.{ts,tsx}'],
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
							message: 'internals ist framework-frei: Stencil-Code gehört in packages/components (Stencil-Runtime). Siehe ARCHITECTURE.md.',
						},
						{
							group: ['lit', 'lit/*', '@lit/*', 'lit-html', 'lit-html/*', 'lit-element'],
							message: 'internals ist framework-frei: Lit-Code gehört in packages/components/lit (Lit-Runtime). Siehe ARCHITECTURE.md.',
						},
						{
							group: ['react', 'react/*', 'react-dom', 'react-dom/*', 'vue', 'vue/*', '@vue/*', 'solid-js', 'solid-js/*', 'svelte'],
							message: 'internals ist framework-frei: Adapter-Code gehört in packages/adapters/*.',
						},
					],
				},
			],
		},
	},
];
