/**
 * Vitest setup file for KoliBri with happy-dom
 * This file sets up the test environment to work with Shadow DOM and Custom Elements
 *
 * happy-dom natively supports Shadow DOM, Custom Elements, adoptedStyleSheets
 * (on Document and ShadowRoot), MutationObserver, ResizeObserver and
 * HTMLDialogElement, so no DOM polyfills are needed here anymore.
 *
 * For reference, the original jsdom setup (issue #10543) required polyfills for:
 * - document.adoptedStyleSheets (Stencil: Object.getOwnPropertyDescriptor(...))
 * - ShadowRoot.adoptedStyleSheets (Stencil addStyle: ...adoptedStyleSheets.includes)
 * - ResizeObserver (not implemented in jsdom)
 * jsdom already provides HTMLDialogElement and MutationObserver natively; mocking
 * them breaks Stencil's slot relocation and MutationObserver-based waiting.
 */

import '@testing-library/jest-dom/vitest';
import { configure } from 'shadow-dom-testing-library';
import { beforeAll } from 'vitest';

// Configure shadow-dom-testing-library
configure({
	// Options for shadow DOM testing
});

// ============================================================================
// LOAD KOLIBRI COMPONENTS
// ============================================================================

// Import and register KoliBri custom elements
beforeAll(async () => {
	try {
		const { defineCustomElements } = await import('@public-ui/components/loader');
		defineCustomElements();

		// Warm up the component chunks used in the tests. Stencil loads custom
		// element chunks lazily on first connect, which can race with React
		// unmounts ("Constructor for ... was not found" rejections). Importing
		// the chunks eagerly evaluates them in Vite's module cache, so Stencil's
		// lazy imports resolve immediately once the tests start rendering.
		// The chunk paths are exposed via aliases (see vitest.config.ts and
		// tsconfig.json), because @public-ui/components does not export ./dist.
		await Promise.all([
			import('@public-ui/components/dist/esm/kol-button.entry.js'),
			import('@public-ui/components/dist/esm/kol-button-wc.entry.js'),
			import('@public-ui/components/dist/esm/kol-input-text.entry.js'),
			import('@public-ui/components/dist/esm/kol-dialog.entry.js'),
			import('@public-ui/components/dist/esm/kol-dialog-wc.entry.js'),
		]);

		console.log('✅ KoliBri custom elements registered successfully');
	} catch (error) {
		console.error('❌ Could not load KoliBri components:', error);
		throw error;
	}
});
