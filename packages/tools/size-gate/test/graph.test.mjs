import assert from 'node:assert/strict';
import { test } from 'node:test';
import { buildGraph, loadCounts, staticClosure } from '../src/graph.mjs';

const chunks = new Map([
	['a.entry.js', `import { x } from './shared.js';\nimport './side.js';\nconst lazy = () => import('./lazy.js');`],
	['b.entry.js', `import{x}from"./shared.js";export*from'./b-only.js';`],
	['b-only.js', 'export const y = 1;'],
	['lazy.js', `import { x } from './shared.js';`],
	['shared.js', `export { z } from './core.js';\nconst text = "import from './missing.js'";`],
	['side.js', ''],
	['core.js', 'export const z = 1;'],
]);

test('reads static and dynamic relative imports of known files', () => {
	const graph = buildGraph(chunks);
	assert.deepEqual(graph.get('a.entry.js'), { dynamic: ['lazy.js'], static: ['shared.js', 'side.js'] });
	assert.deepEqual(graph.get('b.entry.js').static, ['b-only.js', 'shared.js']);
	assert.deepEqual(graph.get('shared.js').static, ['core.js']);
});

test('follows only static imports in the closure', () => {
	const graph = buildGraph(chunks);
	assert.deepEqual([...staticClosure(graph, 'a.entry.js')].sort(), ['a.entry.js', 'core.js', 'shared.js', 'side.js']);
});

test('counts the entries that load a chunk', () => {
	const counts = loadCounts(buildGraph(chunks), ['a.entry.js', 'b.entry.js']);
	assert.equal(counts.get('core.js'), 2);
	assert.equal(counts.get('side.js'), 1);
	assert.equal(counts.get('lazy.js'), 0);
});
