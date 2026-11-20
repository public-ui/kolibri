import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ownerOf } from '../src/package-of.mjs';

test('cuts a pnpm store path at the last node_modules', () => {
	assert.deepEqual(ownerOf('../../node_modules/.pnpm/markdown-it@14.3.3/node_modules/markdown-it/lib/index.mjs'), {
		group: 'markdown-it',
		kind: 'dependency',
		module: 'markdown-it/lib/index.mjs',
	});
});

test('keeps the scope of a scoped package', () => {
	assert.equal(ownerOf('../../node_modules/.pnpm/@floating-ui+dom@1.8.0/node_modules/@floating-ui/dom/dist/x.mjs').group, '@floating-ui/dom');
});

test('assigns the Stencil runtime and its virtual modules to @stencil/core', () => {
	assert.equal(ownerOf('../../node_modules/.pnpm/@stencil+core@4.45.3/node_modules/@stencil/core/internal/client/index.js').kind, 'runtime');
	assert.equal(ownerOf('@stencil/core/internal/app-data').kind, 'runtime');
	assert.equal(ownerOf('@lazy-browser-entrypoint?app-data=conditional').group, '@stencil/core');
});

test('groups own code by component and by top-level folder', () => {
	assert.deepEqual(ownerOf('src/components/badge/component.tsx'), { group: 'components/badge', kind: 'own', module: 'src/components/badge/component.tsx' });
	assert.equal(ownerOf('src/utils/markdown.ts').group, 'utils');
	assert.equal(ownerOf('src/i18n.ts').group, 'src');
});

test('recognizes a style sheet behind a query string', () => {
	assert.deepEqual(ownerOf('src/components/badge/style.scss?tag=kol-badge&mode=default'), {
		group: 'components/badge',
		kind: 'css',
		module: 'src/components/badge/style.scss',
	});
});

test('reports unmapped bytes', () => {
	assert.equal(ownerOf('').group, '(unmapped)');
});
