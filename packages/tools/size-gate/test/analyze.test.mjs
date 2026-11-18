import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import { analyzeComponents } from '../src/analyze-components.mjs';
import { readThemeSheets } from '../src/analyze-theme.mjs';

const dir = mkdtempSync(join(tmpdir(), 'size-gate-'));
after(() => rmSync(dir, { force: true, recursive: true }));

const files = {
	'a.entry.js': `import './index-x.js';\nimport './shared.js';\nexport const a = 1;`,
	'b.entry.js': `import './index-x.js';\nimport './shared.js';\nexport const b = 2;`,
	'c.entry.js': `import './index-x.js';\nimport './c-only.js';\nexport const c = 3;`,
	'c-only.js': `export const big = '${'c'.repeat(4000)}';`,
	'index-x.js': 'export const runtime = 1;',
	'index.js': `export * from './index-x.js';`,
	'loader.js': `import './index-x.js';\n//# sourceMappingURL=loader.js.map\n`,
	'shared.js': 'export const shared = 1;',
	'unused.js': 'export const unused = 1;',
};

test('derives core, entries and the load count from the import graph', async () => {
	for (const [file, code] of Object.entries(files)) {
		writeFileSync(join(dir, file), code);
	}

	const report = await analyzeComponents(dir);

	assert.deepEqual(report.core.files, ['index-x.js', 'index.js', 'loader.js', 'shared.js']);
	assert.deepEqual(
		report.entries.map((entry) => [entry.tag, entry.chunks]),
		[
			['a', ['a.entry.js']],
			['b', ['b.entry.js']],
			['c', ['c-only.js', 'c.entry.js']],
		],
	);
	assert.equal(report.files.find((file) => file.file === 'unused.js').loadCount, 0);
	assert.equal(report.files.find((file) => file.file === 'loader.js').sizes.raw, Buffer.byteLength(`import './index-x.js';`));
	assert.equal(report.sourceMaps, false);
	assert.ok('entry:c' in report.metrics);
	assert.deepEqual(report.sets, { duplicates: [], hotspots: [] });
});

test('reads the CSS strings that createTheme assigns to the tags', () => {
	const code = [
		'var css_248z$1 = ".a{content:\\"x\\"}";',
		'var css_248z = ":host{}";',
		"const DEFAULT = KoliBri.createTheme('default', {",
		'    GLOBAL: css_248z,',
		"    'KOL-A': css_248z$1,",
		'});',
	].join('\n');

	const sheets = readThemeSheets(code);

	assert.deepEqual([...sheets.keys()], ['GLOBAL', 'KOL-A']);
	assert.equal(sheets.get('KOL-A').css, '.a{content:"x"}');
	assert.equal(sheets.get('KOL-A').theme, 'default');
});
