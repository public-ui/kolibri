import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const here = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(here, '..');
const repoRoot = path.resolve(here, '../../..');

export default defineConfig({
	root: 'page',
	resolve: {
		alias: [
			// The internals are consumed as sources inside the workspace, exactly like the Stencil
			// package does (see the extends-chain constraint in the concept document).
			{ find: '@public-ui/internals', replacement: path.resolve(componentsDir, 'internals/src') },
			{ find: '@stencil/core/internal', replacement: path.resolve(here, 'stub/stencil-core.ts') },
			{ find: /^@stencil\/core$/, replacement: path.resolve(here, 'stub/stencil-core.ts') },
			{ find: '@kolibri/dist', replacement: path.resolve(componentsDir, 'dist/index.js') },
			{ find: '@kolibri/loader', replacement: path.resolve(componentsDir, 'loader/index.mjs') },
			{ find: '@kolibri/theme-default', replacement: path.resolve(repoRoot, 'packages/themes/default/dist/index.mjs') },
		],
	},
	build: {
		outDir: 'dist-page',
		emptyOutDir: true,
		rollupOptions: {
			input: path.resolve(here, 'page/index.html'),
		},
	},
	preview: {
		port: 4610,
		strictPort: true,
	},
});
