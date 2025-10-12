import test from 'node:test';
import assert from 'node:assert/strict';

import { hasSearchableQuery, performFuzzySearch } from '../src/fuzzy-search.js';
import { SampleIndex } from '../src/sample-index.js';

const SAMPLE_ENTRIES = [
	{
		id: 'sample/button/basic',
		group: 'components/button',
		name: 'basic',
		title: 'Basic Button',
		description: 'Default button style for generic actions',
		tags: ['button', 'action'],
		keywords: ['button', 'default'],
		kind: 'sample',
	},
	{
		id: 'sample/button/primary',
		group: 'components/button',
		name: 'primary',
		title: 'Primary Button',
		description: 'Primary call-to-action button variant',
		tags: ['button', 'primary'],
		keywords: ['button', 'primary'],
		kind: 'sample',
	},
	{
		id: 'sample/form/text-input',
		group: 'components/form',
		name: 'text-input',
		title: 'Text Input Field',
		description: 'Form field for textual user input',
		tags: ['form'],
		keywords: ['input', 'form'],
		kind: 'sample',
	},
	{
		id: 'doc/guides/accessibility',
		group: 'docs/guides',
		name: 'accessibility',
		title: 'Accessibility Guide',
		description: 'Documentation on accessible components',
		tags: ['guides'],
		keywords: ['accessibility', 'guide'],
		kind: 'doc',
	},
];

const index = new SampleIndex(SAMPLE_ENTRIES);

function ids(result) {
	return result.map((entry) => entry.id);
}

test('hasSearchableQuery rejects empty or whitespace only queries', () => {
	assert.equal(hasSearchableQuery(undefined), false);
	assert.equal(hasSearchableQuery(null), false);
	assert.equal(hasSearchableQuery(''), false);
	assert.equal(hasSearchableQuery('   '), false);
	assert.equal(hasSearchableQuery('button'), true);
});

test('performFuzzySearch returns all entries unchanged for empty queries', () => {
	const result = performFuzzySearch(SAMPLE_ENTRIES, '   ');
	assert.strictEqual(result, SAMPLE_ENTRIES);
});

test('performFuzzySearch treats queries case-insensitively and prioritises multi-token matches', () => {
	const results = performFuzzySearch(SAMPLE_ENTRIES, 'PRIMARY BUTTON');
	assert.deepStrictEqual(ids(results).slice(0, 2), ['sample/button/primary', 'sample/button/basic']);
	assert.ok(ids(results).every((id, index) => index < 2 || id !== 'sample/form/text-input'));
});

test('SampleIndex.list reuses fuzzy search with trimmed queries', () => {
	const trimmed = index.list('  button  ');
	const plain = index.list('button');
	assert.deepStrictEqual(ids(trimmed), ids(plain));
});

test('SampleIndex.list filters entries by kind before searching', () => {
	const docResults = index.list('guide', { kinds: ['doc'] });
	assert.deepStrictEqual(ids(docResults), ['doc/guides/accessibility']);

	const sampleResults = index.list('guide', { kinds: ['sample'] });
	assert.deepStrictEqual(ids(sampleResults), []);
});
