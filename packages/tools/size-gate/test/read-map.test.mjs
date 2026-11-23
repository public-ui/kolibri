import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { SourceMapGenerator } from 'source-map';
import { attributeFile, readGenerated } from '../src/read-map.mjs';

const dir = mkdtempSync(join(tmpdir(), 'size-gate-maps-'));
after(() => rmSync(dir, { force: true, recursive: true }));

test('removes every sourceMappingURL comment and trailing blank lines', () => {
	const path = join(dir, 'a.js');
	writeFileSync(path, 'const a = 1;\n//# sourceMappingURL=a.js.map\nconst b = 2;\n//# sourceMappingURL=a.js.map\n\n');
	assert.equal(readGenerated(path), 'const a = 1;\n\nconst b = 2;\n');
});

test('reads the map from the map directory before the chunk directory', async () => {
	const chunks = join(dir, 'esm');
	const maps = join(dir, 'source-maps');
	mkdirSync(chunks);
	mkdirSync(maps);
	writeFileSync(join(chunks, 'b.js'), 'x');
	const generator = new SourceMapGenerator({ file: 'b.js' });
	generator.addMapping({ generated: { column: 0, line: 1 }, original: { column: 0, line: 1 }, source: 'src/b.ts' });
	writeFileSync(join(maps, 'b.js.map'), JSON.stringify(generator.toJSON()));

	assert.deepEqual([...(await attributeFile(join(chunks, 'b.js'), 'x', maps))], [['src/b.ts', 1]]);
	assert.equal(await attributeFile(join(chunks, 'b.js'), 'x'), null);
});
