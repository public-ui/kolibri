import assert from 'node:assert/strict';
import test from 'node:test';

import { getEntryById } from '../dist/data.mjs';
import { createKolibriMcpServer } from '../dist/mcp.mjs';

const DEFAULT_LIMIT = 5;

async function runSearch(server, query = 'button', limit = DEFAULT_LIMIT) {
	const searchTool = server._registeredTools?.search;
	assert.ok(searchTool, 'expected search tool to be registered');

	const response = await searchTool.callback({ query, limit });
	assert.ok(response?.structuredContent, 'search tool should return structured content');
	return response.structuredContent;
}

test('search tool results stay consistent with fetch results', async () => {
	const server = createKolibriMcpServer();
	const structuredContent = await runSearch(server);

	assert.ok(structuredContent.results.length > 0, 'search should return at least one result');

	const fetchTool = server._registeredTools?.fetch;
	assert.ok(fetchTool, 'expected fetch tool to be registered');

	for (const result of structuredContent.results) {
		assert.strictEqual(Object.prototype.hasOwnProperty.call(result, 'code'), false, 'search results should not expose code');

		const entry = getEntryById(result.id);
		assert.ok(entry, `expected entry ${result.id} to be resolvable via getEntryById`);

		assert.strictEqual(entry.id, result.id);
		assert.strictEqual(entry.kind, result.kind);
		assert.strictEqual(entry.name, result.name);
		assert.strictEqual(result.group, entry.group ?? 'N/A');
		assert.strictEqual(result.description, entry.description ?? 'N/A');
		assert.deepStrictEqual(result.tags, Array.isArray(entry.tags) ? entry.tags : []);

		const fetchResponse = await fetchTool.callback({ id: result.id });
		assert.ok(fetchResponse?.structuredContent, 'fetch tool should return structured content');
		assert.strictEqual(fetchResponse.structuredContent.id, result.id);
		assert.strictEqual(typeof fetchResponse.structuredContent.code, 'string', 'fetch should include code content');
	}
});
