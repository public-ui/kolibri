/**
 * happy-dom natively supports Shadow DOM, Custom Elements, adoptedStyleSheets,
 * MutationObserver, ResizeObserver and HTMLDialogElement, so no DOM polyfills
 * are needed for the Stencil based components.
 */

import '@testing-library/jest-dom/vitest';
import { configure } from 'shadow-dom-testing-library';
import { beforeAll } from 'vitest';

configure({});

// Register the KoliBri custom elements and warm up the component chunks used
// in the tests. Stencil loads custom element chunks lazily on first connect,
// which can race with React unmounts ("Constructor for ... was not found"
// rejections). Importing the chunks eagerly evaluates them in Vite's module
// cache, so Stencil's lazy imports resolve immediately once the tests start
// rendering. The chunk paths are exposed via aliases (see vitest.config.ts),
// because @public-ui/components does not export ./dist.
beforeAll(async () => {
	const { defineCustomElements } = await import('@public-ui/components/loader');
	defineCustomElements();
	await Promise.all([
		import('@public-ui/components/dist/esm/kol-button.entry.js'),
		import('@public-ui/components/dist/esm/kol-button-wc.entry.js'),
		import('@public-ui/components/dist/esm/kol-card.entry.js'),
		import('@public-ui/components/dist/esm/kol-card-wc.entry.js'),
		import('@public-ui/components/dist/esm/kol-drawer.entry.js'),
		import('@public-ui/components/dist/esm/kol-input-text.entry.js'),
		import('@public-ui/components/dist/esm/kol-table-stateful.entry.js'),
		import('@public-ui/components/dist/esm/kol-table-stateless.entry.js'),
		import('@public-ui/components/dist/esm/kol-table-stateless-wc.entry.js'),
		import('@public-ui/components/dist/esm/kol-toolbar.entry.js'),
	]);
});
