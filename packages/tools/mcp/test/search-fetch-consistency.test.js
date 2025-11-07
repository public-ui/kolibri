import assert from 'node:assert/strict';
import test from 'node:test';

import { getEntryById } from '../dist/data.mjs';
import { createKolibriMcpServer } from '../dist/mcp.mjs';

test('search tool results only expose metadata and align with fetch entries', async () => {
	const server = createKolibriMcpServer();
	const tools = server._registeredTools ?? {};
	assert.ok(tools.search, 'search tool should be registered');
	assert.ok(tools.fetch, 'fetch tool should be registered');

	const response = await tools.search.callback({ query: 'button', limit: 5 }, {});
	assert.ok(response);
	assert.ok(Array.isArray(response.content), 'search tool should provide textual content');
	assert.ok(response.content.length > 0, 'search response should contain at least one text block');

	const textOutput = response.content.map((entry) => (typeof entry?.text === 'string' ? entry.text : '')).join('\n');
	assert.ok(!textOutput.includes('```'), 'search text output must not include code fences');

	const structured = response.structuredContent;
	assert.ok(structured, 'search tool should provide structured content');
	assert.strictEqual(structured.query, 'button');
	assert.ok(Array.isArray(structured.results), 'structured results should be an array');
	assert.ok(structured.results.length > 0, 'structured results should contain entries');

	for (const result of structured.results) {
		assert.ok(!Object.prototype.hasOwnProperty.call(result, 'code'), `search result ${result.id} must not expose code`);

		const fullEntry = getEntryById(result.id);
		assert.ok(fullEntry, `getEntryById should return an entry for ${result.id}`);
		assert.strictEqual(fullEntry?.id, result.id);
		assert.strictEqual(fullEntry?.kind, result.kind);
		assert.strictEqual(fullEntry?.name, result.name);
		assert.strictEqual(result.group, fullEntry?.group ?? 'N/A');
		assert.strictEqual(result.description, fullEntry?.description ?? 'N/A');
		assert.deepStrictEqual(result.tags, fullEntry?.tags ?? []);
		assert.strictEqual(result.path, fullEntry?.path ?? 'N/A');

		const fetchResponse = await tools.fetch.callback({ id: result.id }, {});
		assert.ok(fetchResponse, `fetch tool should resolve for ${result.id}`);
		assert.ok(Array.isArray(fetchResponse.content), 'fetch tool should return textual content');
		assert.ok(
			fetchResponse.content.some((entry) => entry?.text?.includes(result.id)),
			'fetch response text should reference the entry id',
		);

		const fetchStructured = fetchResponse.structuredContent;
		assert.ok(fetchStructured, 'fetch tool should include structured content');
		assert.strictEqual(fetchStructured.id, fullEntry?.id);
		assert.strictEqual(fetchStructured.kind, fullEntry?.kind);
		assert.strictEqual(fetchStructured.name, fullEntry?.name);
		assert.strictEqual(fetchStructured.group, fullEntry?.group ?? 'N/A');
		assert.strictEqual(fetchStructured.description, fullEntry?.description ?? 'N/A');
		assert.deepStrictEqual(fetchStructured.tags, fullEntry?.tags ?? []);
		assert.strictEqual(fetchStructured.path, fullEntry?.path ?? 'N/A');
		assert.strictEqual(fetchStructured.code, fullEntry?.code ?? 'No code available');
	}
});
