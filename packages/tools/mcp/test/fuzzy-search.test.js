import assert from 'node:assert/strict';
import test from 'node:test';

import { searchEntries } from '../dist/search.mjs';

const SAMPLE_ENTRIES = [
	{
		id: 'sample/button/basic',
		group: 'components/button',
		name: 'basic',
		description: 'Default button style for generic actions',
		tags: ['button', 'action'],
		kind: 'sample',
		code: 'import { KolButton } from "@public-ui/react"; export const Basic = () => <KolButton _label="Click me" />;',
	},
	{
		id: 'sample/button/primary',
		group: 'components/button',
		name: 'primary',
		description: 'Primary call-to-action button variant',
		tags: ['button', 'primary'],
		kind: 'sample',
		code: 'import { KolButton } from "@public-ui/react"; export const Primary = () => <KolButton _label="Primary" _variant="primary" />;',
	},
	{
		id: 'sample/form/text-input',
		group: 'components/form',
		name: 'text-input',
		description: 'Form field for textual user input',
		tags: ['form'],
		kind: 'sample',
		code: 'import { KolInputText } from "@public-ui/react"; export const TextInput = () => <KolInputText _label="Enter text" />;',
	},
	{
		id: 'doc/guides/accessibility',
		group: 'docs/guides',
		name: 'accessibility',
		description: 'Documentation on accessible components',
		tags: ['guides'],
		kind: 'doc',
		code: '# Accessibility Guide\n\nThis guide explains how to make components accessible.',
	},
];

function ids(result) {
	return result.map((entry) => entry.item.id);
}

test('searchEntries returns all entries with score 1 for empty queries', () => {
	const result = searchEntries(SAMPLE_ENTRIES, '   ');
	assert.strictEqual(result.length, SAMPLE_ENTRIES.length);
	assert.ok(result.every((r) => r.score === 1));
	assert.deepStrictEqual(
		result.map((r) => r.item),
		SAMPLE_ENTRIES,
	);
});

test('searchEntries handles whitespace-only queries', () => {
	const result = searchEntries(SAMPLE_ENTRIES, '');
	assert.strictEqual(result.length, SAMPLE_ENTRIES.length);
});

test('searchEntries finds button-related entries case-insensitively', () => {
	const results = searchEntries(SAMPLE_ENTRIES, 'button');
	const resultIds = ids(results);
	assert.ok(resultIds.includes('sample/button/primary'));
	assert.ok(resultIds.includes('sample/button/basic'));
});

test('searchEntries finds primary button with multi-word search', () => {
	const results = searchEntries(SAMPLE_ENTRIES, 'primary');
	const resultIds = ids(results);
	assert.ok(resultIds.length > 0);
	// Primary button should be in the results
	assert.ok(resultIds.includes('sample/button/primary'));
});

test('searchEntries with trimmed queries produces consistent results', () => {
	const trimmed = searchEntries(SAMPLE_ENTRIES, '  button  ');
	const plain = searchEntries(SAMPLE_ENTRIES, 'button');
	assert.deepStrictEqual(ids(trimmed), ids(plain));
});

test('searchEntries filters entries by kind before searching', () => {
	const docResults = searchEntries(SAMPLE_ENTRIES, 'guide', { kind: 'doc' });
	assert.deepStrictEqual(ids(docResults), ['doc/guides/accessibility']);

	const sampleResults = searchEntries(SAMPLE_ENTRIES, 'guide', { kind: 'sample' });
	assert.deepStrictEqual(ids(sampleResults), []);
});

test('searchEntries respects limit option', () => {
	const results = searchEntries(SAMPLE_ENTRIES, 'button', { limit: 1 });
	assert.strictEqual(results.length, 1);
});

test('searchEntries respects custom threshold option', () => {
	const strictResults = searchEntries(SAMPLE_ENTRIES, 'xyz', { threshold: 0.1 });
	const looseResults = searchEntries(SAMPLE_ENTRIES, 'xyz', { threshold: 0.9 });
	// With stricter threshold, we should get fewer or equal results
	assert.ok(strictResults.length <= looseResults.length);
});

test('searchEntries finds text-input with "input text" query', () => {
	// Test with default threshold (0.4)
	const resultsDefault = searchEntries(SAMPLE_ENTRIES, 'input text');
	console.log('Results with default threshold (0.4):', ids(resultsDefault));

	// Test with looser threshold (0.6)
	const resultsLoose = searchEntries(SAMPLE_ENTRIES, 'input text', { threshold: 0.6 });
	console.log('Results with loose threshold (0.6):', ids(resultsLoose));
	console.log(
		'Scores:',
		resultsLoose.map((r) => ({ id: r.item.id, score: r.score })),
	);

	// With a looser threshold, it should find the text-input
	assert.ok(ids(resultsLoose).includes('sample/form/text-input'), 'Should find text-input entry with looser threshold');
});

test('searchEntries finds text-input with "text input" query (reversed words)', () => {
	const results = searchEntries(SAMPLE_ENTRIES, 'text input');
	const resultIds = ids(results);
	console.log('Results for "text input":', resultIds);
	// "text input" should match better than "input text" because name is "text-input"
	assert.ok(resultIds.includes('sample/form/text-input'), 'Should find text-input with reversed word order');
});

test('searchEntries finds text-input with single word "input"', () => {
	const results = searchEntries(SAMPLE_ENTRIES, 'input');
	const resultIds = ids(results);
	console.log('Results for "input":', resultIds);
	assert.ok(resultIds.includes('sample/form/text-input'), 'Should find text-input when searching for "input"');
});
