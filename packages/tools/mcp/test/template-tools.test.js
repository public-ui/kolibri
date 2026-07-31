import assert from 'node:assert/strict';
import test from 'node:test';

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';

import { createKolibriMcpServer } from '../dist/mcp.mjs';

/**
 * Connect a real MCP client to the KoliBri server over an in-memory transport.
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

test('list_template_types returns all configured template types', async () => {
	const { client, close } = await connectClient();
	try {
		const result = await client.callTool({ name: 'list_template_types', arguments: {} });

		assert.strictEqual(result.isError ?? false, false, 'should not report an error');
		assert.ok(result.structuredContent, 'should return structuredContent');
		assert.ok(Array.isArray(result.structuredContent.types), 'types should be an array');
		assert.ok(result.structuredContent.types.includes('generic'), 'should include generic');
		assert.ok(result.structuredContent.types.includes('react'), 'should include react');
		assert.ok(result.structuredContent.types.includes('theme'), 'should include theme');
	} finally {
		await close();
	}
});

test('list_template_tags returns available tags', async () => {
	const { client, close } = await connectClient();
	try {
		const result = await client.callTool({ name: 'list_template_tags', arguments: {} });

		assert.strictEqual(result.isError ?? false, false, 'should not report an error');
		assert.ok(result.structuredContent, 'should return structuredContent');
		assert.ok(Array.isArray(result.structuredContent.tags), 'tags should be an array');
	} finally {
		await close();
	}
});

test('search_templates returns results with metadata', async () => {
	const { client, close } = await connectClient();
	try {
		const result = await client.callTool({
			name: 'search_templates',
			arguments: { query: 'button', limit: 5 },
		});

		assert.strictEqual(result.isError ?? false, false, 'should not report an error');
		assert.ok(result.structuredContent, 'should return structuredContent');
		assert.strictEqual(result.structuredContent.query, 'button');
		assert.ok(Array.isArray(result.structuredContent.results), 'results should be an array');
		assert.ok(result.structuredContent.total >= 0, 'total should be a number');

		if (result.structuredContent.results.length > 0) {
			const first = result.structuredContent.results[0];
			assert.ok(first.id, 'result should have id');
			assert.ok(first.name, 'result should have name');
			assert.ok(first.repoId, 'result should have repoId');
			assert.ok(first.type, 'result should have type');
			assert.ok(typeof first.score === 'number', 'result should have numeric score');
		}
	} finally {
		await close();
	}
});

test('search_templates respects templateType filter', async () => {
	const { client, close } = await connectClient();
	try {
		const result = await client.callTool({
			name: 'search_templates',
			arguments: { query: 'button', templateType: 'react', limit: 10 },
		});

		assert.strictEqual(result.isError ?? false, false, 'should not report an error');
		assert.ok(result.structuredContent, 'should return structuredContent');

		// All results should be of templateType "react"
		for (const r of result.structuredContent.results) {
			assert.strictEqual(r.templateType, 'react', 'all results should be react type');
		}
	} finally {
		await close();
	}
});

test('fetch_template returns full content for valid ID', async () => {
	const { client, close } = await connectClient();
	try {
		// First search to get a valid ID
		const searchResult = await client.callTool({
			name: 'search_templates',
			arguments: { query: 'button', limit: 1 },
		});

		const id = searchResult.structuredContent?.results?.[0]?.id;
		if (!id) {
			// If no templates indexed, skip this test
			console.log('⚠️  No templates indexed, skipping fetch_template test');
			return;
		}

		const result = await client.callTool({
			name: 'fetch_template',
			arguments: { id, includeCodeBlocks: true },
		});

		assert.strictEqual(result.isError ?? false, false, 'should not report an error');
		assert.ok(result.structuredContent, 'should return structuredContent');
		assert.strictEqual(result.structuredContent.id, id, 'fetched id should match');
		assert.ok(result.structuredContent.name, 'should have name');
		assert.ok(result.structuredContent.repoId, 'should have repoId');
		assert.ok(typeof result.structuredContent.codeBlocks === 'object', 'should have codeBlocks array');
	} finally {
		await close();
	}
});

test('fetch_template throws error for invalid ID', async () => {
	const { client, close } = await connectClient();
	try {
		const result = await client.callTool({
			name: 'fetch_template',
			arguments: { id: 'nonexistent:template:id' },
		});

		assert.ok(result.isError, 'should report an error for invalid ID');
		assert.ok(result.content[0].text.includes('not found'), 'error should mention not found');
	} finally {
		await close();
	}
});

test('search_templates with empty query returns all templates', async () => {
	const { client, close } = await connectClient();
	try {
		const result = await client.callTool({
			name: 'search_templates',
			arguments: { query: '', limit: 5 },
		});

		assert.strictEqual(result.isError ?? false, false, 'should not report an error');
		assert.ok(result.structuredContent, 'should return structuredContent');
		assert.ok(Array.isArray(result.structuredContent.results), 'results should be an array');
	} finally {
		await close();
	}
});
