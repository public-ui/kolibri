import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

import { searchEntries } from '../dist/search.mjs';
import { extractComponentTags, extractMarkdownDescription, extractSampleDescription } from '../scripts/index-metadata.mjs';

test('extractSampleDescription returns the plain text of the SampleDescription block', () => {
	const code = `
		<SampleDescription>
			<p>
				Shows the <code>_label</code> of a{' '}
				<KolLink _href="#" _label="link" /> inside a form.
			</p>
		</SampleDescription>`;

	assert.equal(extractSampleDescription(code), 'Shows the _label of a inside a form.');
	assert.equal(extractSampleDescription('<KolButton />'), undefined);
});

test('extractSampleDescription truncates long texts at a word boundary', () => {
	const description = extractSampleDescription(`<SampleDescription>${'word '.repeat(200)}</SampleDescription>`);

	assert.ok(description.length <= 301);
	assert.ok(description.endsWith('word…'));
});

test('extractMarkdownDescription prefers the front matter description', () => {
	assert.equal(
		extractMarkdownDescription('---\ntitle: X\ndescription: "Front matter text"\n---\n# X\n\nParagraph text that is long enough.'),
		'Front matter text',
	);
});

test('extractMarkdownDescription returns the first prose paragraph', () => {
	const markdown = [
		'# Title',
		'',
		'[![badge](https://example.com/badge.svg)](https://example.com)',
		'',
		'<!-- comment -->',
		'',
		'```ts',
		'const ignored = true;',
		'```',
		'',
		'## Problem',
		'',
		'The **table** uses [`aria-labelledby`](https://example.com)',
		'across the shadow boundary.',
	].join('\n');

	assert.equal(extractMarkdownDescription(markdown), 'The table uses aria-labelledby across the shadow boundary.');
	assert.equal(extractMarkdownDescription('# Only a heading'), undefined);
});

test('extractMarkdownDescription leaves no HTML comment opener behind', () => {
	assert.equal(extractMarkdownDescription('# T\n\nVisible text that comes first <!-<!---->- hidden text.'), 'Visible text that comes first');
	assert.equal(extractMarkdownDescription('# T\n\nVisible paragraph that is long enough.\n\n<!-- unclosed'), 'Visible paragraph that is long enough.');
	assert.equal(extractMarkdownDescription('# T\n\n<!-- unclosed\n\nHidden paragraph that is long enough.'), undefined);
});

test('extractComponentTags collects React adapters and custom elements', () => {
	const code = `
		import { KolForm, KolInputDate } from '@public-ui/react-v19';
		<KolForm><KolInputDate /><kol-button-link /></KolForm>`;

	assert.deepEqual(extractComponentTags(code), ['kol-button-link', 'kol-form', 'kol-input-date']);
});

test('the generated index provides descriptions and tags for general search terms', () => {
	const { entries } = JSON.parse(readFileSync(new URL('../shared/sample-index.json', import.meta.url), 'utf8'));
	const samples = entries.filter((entry) => entry.kind === 'sample');

	assert.ok(entries.find((entry) => entry.id === 'sample/button/basic')?.description);
	assert.ok(samples.filter((entry) => entry.description).length / samples.length > 0.8);

	// Neither id, name nor group contain "accessibility"; only descriptions do, somewhere in the middle of their text.
	assert.ok(searchEntries(entries, 'accessibility', { limit: 5 }).length > 0);
});
