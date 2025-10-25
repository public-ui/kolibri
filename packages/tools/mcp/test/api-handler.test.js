import assert from 'node:assert/strict';
import test from 'node:test';

import { handleApiRequest } from '../src/api-handler.js';

const SAMPLE_ENTRIES = [
	{
		id: 'sample/button/basic',
		group: 'components/button',
		name: 'basic',
		path: 'packages/samples/react/src/routes/button/basic.tsx',
		code: "export const Sample = () => 'button-basic';",
		kind: 'sample',
	},
	{
		id: 'doc/getting-started',
		group: 'docs',
		name: 'getting-started',
		path: 'docs/getting-started.md',
		code: '# Getting Started',
		kind: 'doc',
	},
];

const entryMap = new Map(SAMPLE_ENTRIES.map((entry) => [entry.id, entry]));

const MOCK_INDEX = {
	entries: SAMPLE_ENTRIES,
	counts: { total: SAMPLE_ENTRIES.length, totalSamples: 1, totalDocs: 1 },
	generatedAt: new Date('2024-01-02T03:04:05.000Z'),
	buildMode: 'runtime',
	list(query, options = {}) {
		const kinds = options.kinds ? new Set(options.kinds) : undefined;
		let results = kinds ? SAMPLE_ENTRIES.filter((entry) => kinds.has(entry.kind ?? 'sample')) : SAMPLE_ENTRIES;
		const normalizedQuery = typeof query === 'string' ? query.trim().toLowerCase() : '';
		if (!normalizedQuery) {
			return results;
		}

		return results.filter((entry) => `${entry.id} ${entry.name} ${entry.group}`.toLowerCase().includes(normalizedQuery));
	},
	get(id) {
		return entryMap.get(id);
	},
};

async function invokeJsonRpc(method, params, id = 'test-id') {
	const response = await handleApiRequest({
		method: 'POST',
		url: 'http://localhost/mcp/',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ jsonrpc: '2.0', id, method, params }),
		getIndex: async () => MOCK_INDEX,
	});

	return response;
}

test('initialize returns MCP-compliant capabilities and initialize resource metadata', async () => {
	const response = await invokeJsonRpc('initialize', {
		protocolVersion: '2024-05-30',
		capabilities: {},
		clientInfo: { name: 'node-test', version: '1.0.0' },
	});

	assert.equal(response.statusCode, 200);
	assert.equal(response.body.jsonrpc, '2.0');
	assert.equal(response.body.id, 'test-id');

	const result = response.body.result;
	assert.equal(result.protocolVersion, '2024-05-30');
	assert.deepEqual(result.serverInfo.name, 'kolibri-mcp');
	assert.ok(result.capabilities);
	assert.ok(result.capabilities.resources);
	assert.equal(Array.isArray(result.capabilities.resources), false);
	assert.deepEqual(result.capabilities.resources, { subscribe: false, listChanged: false });
	assert.equal(result.instructions.includes('resources/list'), true);

	assert.ok(Array.isArray(result.data.resources));
	const resource = result.data.resources[0];
	assert.equal(resource.uri, 'kolibri://initialize');
	assert.equal(resource.mimeType, 'text/markdown');
	assert.ok(resource.size > 0);
});

test('resources/list exposes the initialize resource with a non-empty size', async () => {
	const response = await invokeJsonRpc('resources/list', {});

	assert.equal(response.statusCode, 200);
	assert.equal(response.body.jsonrpc, '2.0');
	const { resources, nextCursor } = response.body.result;
	assert.equal(Array.isArray(resources), true);
	assert.equal(resources.length >= 1, true);
	const initializeResource = resources[0];
	assert.equal(initializeResource.uri, 'kolibri://initialize');
	assert.equal(initializeResource.mimeType, 'text/markdown');
	assert.ok(initializeResource.size > 0);
	assert.equal(nextCursor, null);
});

test('resources/read returns markdown instructions containing sample statistics', async () => {
	const response = await invokeJsonRpc('resources/read', { uri: 'kolibri://initialize' }, 'read-id');

	assert.equal(response.statusCode, 200);
	assert.equal(response.body.id, 'read-id');
	const [{ uri, mimeType, text }] = response.body.result.contents;
	assert.equal(uri, 'kolibri://initialize');
	assert.equal(mimeType, 'text/markdown');
	assert.equal(text.includes('Total entries: 2'), true);
	assert.equal(text.includes('Component samples: 1'), true);
	assert.equal(text.includes('Documentation entries: 1'), true);
	assert.equal(text.includes('Index generated at: 2024-01-02T03:04:05.000Z'), true);
});

test('resources/read returns an error for unknown URIs', async () => {
	const response = await invokeJsonRpc('resources/read', { uri: 'kolibri://missing' });

	assert.equal(response.statusCode, 200);
	assert.equal(response.body.error.code, -32004);
	assert.equal(response.body.error.message.includes('Resource not found'), true);
	assert.deepEqual(response.body.error.data, { uri: 'kolibri://missing' });
});
