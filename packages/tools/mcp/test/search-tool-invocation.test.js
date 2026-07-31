import assert from 'node:assert/strict';
import test from 'node:test';

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';

import { createKolibriMcpServer } from '../dist/mcp.mjs';

/**
 * Connect a real MCP client to the KoliBri server over an in-memory transport.
 *
 * This exercises the full protocol-level `tools/call` path (including any
 * structured-output validation the SDK performs), which a direct `callback()`
 * invocation bypasses. Regression guard for #9989, where a `TypeError`
 * ("Cannot read properties of undefined (reading 'invoke')") was thrown when
 * the tools were invoked through the protocol.
 *
 * The returned `close` helper tears down both the client and the server so the
 * test runner does not leak open transports/streams.
 */
async function connectClient() {
	const server = await createKolibriMcpServer();
	const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

	const client = new Client({ name: 'test-client', version: '0.0.0' });

	await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);

	const close = async () => {
		await Promise.all([client.close(), server.close()]);
	};

	return { client, server, close };
}

test('search tool can be invoked via the protocol for a single-word query (#9989)', async () => {
	const { client, close } = await connectClient();
	try {
		const result = await client.callTool({ name: 'search', arguments: { query: 'LinkButton' } });

		assert.strictEqual(result.isError ?? false, false, 'search call should not report an error');
		assert.ok(Array.isArray(result.content) && result.content.length > 0, 'search should return content');
		assert.strictEqual(result.content[0].type, 'text');

		// outputSchema was removed, so guard the structured-output contract explicitly.
		assert.ok(result.structuredContent, 'search should return structuredContent');
		assert.strictEqual(result.structuredContent.query, 'LinkButton');
		assert.ok(Array.isArray(result.structuredContent.results), 'results should be an array');
	} finally {
		await close();
	}
});

test('search tool can be invoked via the protocol with a kind filter (#9989)', async () => {
	const { client, close } = await connectClient();
	try {
		const result = await client.callTool({ name: 'search', arguments: { query: 'LinkButton', kind: 'doc' } });

		assert.strictEqual(result.isError ?? false, false, 'search call with kind should not report an error');
		assert.ok(Array.isArray(result.content) && result.content.length > 0, 'search should return content');

		assert.ok(result.structuredContent, 'search should return structuredContent');
		assert.strictEqual(result.structuredContent.query, 'LinkButton');
		assert.ok(Array.isArray(result.structuredContent.results), 'results should be an array');
		assert.ok(
			result.structuredContent.results.every((r) => r.kind === 'doc'),
			'all results should match the requested kind filter',
		);
	} finally {
		await close();
	}
});

test('fetch tool can be invoked via the protocol (#9989)', async () => {
	const { client, close } = await connectClient();
	try {
		// First find a real entry id via search, then fetch it.
		const searchResult = await client.callTool({ name: 'search', arguments: { query: 'button', limit: 1 } });
		const id = searchResult.structuredContent?.results?.[0]?.id;
		assert.ok(id, 'expected search to return at least one result id');

		const result = await client.callTool({ name: 'fetch', arguments: { id } });

		assert.strictEqual(result.isError ?? false, false, 'fetch call should not report an error');
		assert.ok(Array.isArray(result.content) && result.content.length > 0, 'fetch should return content');

		assert.ok(result.structuredContent, 'fetch should return structuredContent');
		assert.strictEqual(result.structuredContent.id, id, 'fetched entry id should match the requested id');
	} finally {
		await close();
	}
});
