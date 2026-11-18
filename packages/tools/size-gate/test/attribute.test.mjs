import assert from 'node:assert/strict';
import { test } from 'node:test';
import { SourceMapGenerator } from 'source-map';
import { attributeBytes } from '../src/attribute.mjs';

test('attributes every byte of the generated file to a source', async () => {
	const code = 'const a=1;const ü=2;\nexport{a};';
	const generator = new SourceMapGenerator({ file: 'out.js' });
	generator.addMapping({ generated: { column: 0, line: 1 }, original: { column: 0, line: 1 }, source: 'src/a.ts' });
	generator.addMapping({ generated: { column: 10, line: 1 }, original: { column: 0, line: 1 }, source: 'src/b.ts' });
	generator.addMapping({ generated: { column: 0, line: 2 }, original: { column: 0, line: 2 }, source: 'src/a.ts' });

	const totals = await attributeBytes(code, generator.toJSON());

	assert.equal(totals.get('src/a.ts'), Buffer.byteLength('const a=1;') + Buffer.byteLength('export{a};'));
	assert.equal(totals.get('src/b.ts'), Buffer.byteLength('const ü=2;\n'));
	assert.equal(
		[...totals.values()].reduce((sum, bytes) => sum + bytes, 0),
		Buffer.byteLength(code),
	);
});

test('counts text before the first mapping as unmapped', async () => {
	const generator = new SourceMapGenerator({ file: 'out.js' });
	generator.addMapping({ generated: { column: 4, line: 1 }, original: { column: 0, line: 1 }, source: 'src/a.ts' });

	const totals = await attributeBytes('/**/x', generator.toJSON());

	assert.equal(totals.get(''), 4);
	assert.equal(totals.get('src/a.ts'), 1);
});
