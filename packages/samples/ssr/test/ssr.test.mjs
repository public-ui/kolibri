import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderDocument, renderFragment } from '../src/ssr.mjs';

test('kol-button is rendered as Declarative Shadow DOM with scoped styles', async () => {
	const { html } = await renderFragment('<kol-button _label="Hello world"></kol-button>');

	assert.match(html, /<template shadowrootmode="open">/, 'expected a declarative shadow root');
	assert.match(html, /<style>/, 'expected component-scoped styles inside the shadow root');
	assert.match(html, /class="[^"]*hydrated/, 'expected the host element to be marked as hydrated');
	assert.match(html, /Hello world/, 'expected the label to be part of the pre-rendered markup');
});

test('kol-input-text is hydrated to a native input', async () => {
	const { html } = await renderFragment('<kol-input-text _label="Name" _name="name"></kol-input-text>');

	assert.match(html, /<template shadowrootmode="open">/, 'expected a declarative shadow root');
	assert.match(html, /<input/, 'expected a native <input> in the pre-rendered markup');
});

test('renderDocument returns a complete, no-JavaScript document', async () => {
	const { html } = await renderDocument();

	assert.match(html, /^<!doctype html>/i, 'expected a full HTML document');
	assert.match(html, /<template shadowrootmode="open">/, 'expected Declarative Shadow DOM in the document');
	assert.match(html, /visibility: visible !important/, 'expected the reveal rule that makes components visible without JS');
	assert.doesNotMatch(html, /<script/i, 'the SSR demo must not depend on client-side JavaScript');
});
