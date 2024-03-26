// https://github.com/nadeesha/ts-prune
module.exports = {
	/**
	 * arg-types: werden für die auto-generierten Storybook-Stories benötigt
	 * form: die Formular-Daten werden in einer mdx-Datei verwendet
	 * index: die Index-Datei exportiert die API für andere Module
	 * stories: die Storybook-Datei exportiert die Storybook-Stories
	 */
	ignore: 'assets|dist|(arg-types|form/form|mermaid|src/index|stories).tsx?|snippets|build.config.ts|utils.ts|component-names.ts',
	skip: 'autogen',
};
