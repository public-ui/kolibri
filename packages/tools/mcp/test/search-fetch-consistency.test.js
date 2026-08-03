import assert from 'node:assert/strict';
import test from 'node:test';

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { getEntryById } from '../dist/data.mjs';
import { createKolibriMcpServer } from '../dist/mcp.mjs';

const DEFAULT_LIMIT = 5;

/**
 * Create server with registered tools for testing
 */
async function createServerWithRegisteredTools() {
	const registeredTools = new Map();
	const originalRegisterTool = McpServer.prototype.registerTool;

	try {
		McpServer.prototype.registerTool = function patchedRegisterTool(name, config, callback) {
			const tool = originalRegisterTool.call(this, name, config, callback);
			registeredTools.set(name, tool);
			return tool;
		};

		const server = await createKolibriMcpServer();
		return { server, registeredTools };
	} finally {
		McpServer.prototype.registerTool = originalRegisterTool;
	}
}

async function runSearch(tools, query = 'button', limit = DEFAULT_LIMIT) {
	const searchTool = tools.get('search');
	assert.ok(searchTool, 'expected search tool to be registered');

	const response = await searchTool.handler({ query, limit });
	assert.ok(response?.structuredContent, 'search tool should return structured content');
	return response.structuredContent;
}

/**
 * Verify consistent results across multiple calls
 */
test('search tool results stay consistent with fetch results', async () => {
	const { registeredTools } = await createServerWithRegisteredTools();
	const structuredContent = await runSearch(registeredTools);

	assert.ok(structuredContent.results.length > 0, 'search should return at least one result');

	const fetchTool = registeredTools.get('fetch');
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

		const fetchResponse = await fetchTool.handler({ id: result.id });
		assert.ok(fetchResponse?.structuredContent, 'fetch tool should return structured content');
		assert.strictEqual(fetchResponse.structuredContent.id, result.id);
		assert.strictEqual(typeof fetchResponse.structuredContent.code, 'string', 'fetch should include code content');
	}
});
