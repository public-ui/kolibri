import assert from 'node:assert/strict';
import { test } from 'node:test';
import { allowedValue, evaluate, toBaseline } from '../src/gate.mjs';

const sizes = (gzip) => ({ brotli: gzip, gzip, raw: gzip * 4 });
const tolerance = { bytes: 1024, percent: 2 };

test('allows the larger tolerance for components and the percentage for totals', () => {
	assert.equal(allowedValue(10_000, 'percent-or-bytes', tolerance), 11_024);
	assert.equal(allowedValue(100_000, 'percent-or-bytes', tolerance), 102_000);
	assert.equal(allowedValue(10_000, 'percent', tolerance), 10_200);
});

test('fails a metric above its tolerance and a new set key, warns about a new metric', () => {
	const report = {
		metrics: {
			'entry:a': { rule: 'percent-or-bytes', sizes: sizes(12_000) },
			'entry:new': { rule: 'percent-or-bytes', sizes: sizes(500) },
			total: { rule: 'percent', sizes: sizes(100_000) },
		},
		sets: { hotspots: ['known', 'markdown-it'] },
	};
	const baseline = { metrics: { 'entry:a': sizes(10_000), total: sizes(100_000) }, sets: { hotspots: ['known'] }, tolerance };

	const result = evaluate(report, baseline);

	assert.equal(result.passed, false);
	assert.equal(result.failures.length, 2);
	assert.match(result.failures[0], /entry:a/);
	assert.match(result.failures[1], /markdown-it/);
	assert.equal(result.warnings.length, 1);
	assert.equal(result.rows.find((row) => row.id === 'total').status, 'ok');
});

test('reports a clear improvement and removed keys', () => {
	const report = { metrics: { total: { rule: 'percent', sizes: sizes(90_000) } }, sets: { hotspots: [] } };
	const baseline = { metrics: { gone: sizes(1), total: sizes(100_000) }, sets: { hotspots: ['markdown-it'] }, tolerance };

	const result = evaluate(report, baseline);

	assert.equal(result.passed, true);
	assert.equal(result.rows[0].status, 'improved');
	assert.equal(result.improvements.length, 3);
});

test('compares raw bytes where the metric says so', () => {
	const report = { metrics: { redundant: { field: 'raw', rule: 'percent', sizes: { brotli: 0, gzip: 0, raw: 1_100 } } } };
	const result = evaluate(report, { metrics: { redundant: { brotli: 0, gzip: 0, raw: 1_000 } }, tolerance });
	assert.equal(result.passed, false);
});

test('writes a sorted baseline and keeps a custom tolerance', () => {
	const baseline = toBaseline({ metrics: { b: { sizes: sizes(2) }, a: { sizes: sizes(1) } }, sets: { hotspots: ['z', 'a'] } }, { tolerance: { percent: 5 } });
	assert.deepEqual(Object.keys(baseline.metrics), ['a', 'b']);
	assert.deepEqual(baseline.sets.hotspots, ['a', 'z']);
	assert.deepEqual(baseline.tolerance, { bytes: 1024, percent: 5 });
});
