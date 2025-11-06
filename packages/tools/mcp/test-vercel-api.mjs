#!/usr/bin/env node

/**
 * Simple test script for the Vercel API endpoint
 * Tests the MCP server with various requests
 */

const VERCEL_URL = process.env.VERCEL_URL || 'http://localhost:3000';
const ENDPOINT = `${VERCEL_URL}/mcp`;

async function testRequest(method, params = {}) {
	const body = {
		jsonrpc: '2.0',
		id: Math.floor(Math.random() * 1000),
		method,
		params,
	};

	console.log(`\n📤 Testing: ${method}`);
	console.log(`Request:`, JSON.stringify(body, null, 2));

	try {
		const response = await fetch(ENDPOINT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const result = await response.json();
		console.log(`✅ Response:`, JSON.stringify(result, null, 2));
		return result;
	} catch (error) {
		console.error(`❌ Error:`, error.message);
		return null;
	}
}

async function runTests() {
	console.log(`🧪 Testing MCP Server at: ${ENDPOINT}\n`);
	console.log('='.repeat(60));

	// Test 1: Initialize
	await testRequest('initialize', {
		protocolVersion: '2024-11-05',
		capabilities: {},
		clientInfo: {
			name: 'test-client',
			version: '1.0.0',
		},
	});

	// Test 2: List tools
	await testRequest('tools/list', {});

	// Test 3: Search for button
	await testRequest('tools/call', {
		name: 'search',
		arguments: {
			query: 'button',
			limit: 3,
		},
	});

	// Test 4: Search for docs
	await testRequest('tools/call', {
		name: 'search',
		arguments: {
			query: 'accessibility',
			kind: 'doc',
			limit: 2,
		},
	});

        // Test 5: Fetch specific entry
        await testRequest('tools/call', {
                name: 'fetch',
                arguments: {
                        id: 'button/basic',
                },
        });

	// Test 6: List resources
	await testRequest('resources/list', {});

	// Test 7: Read resource
	await testRequest('resources/read', {
		uri: 'kolibri://info',
	});

	console.log('\n' + '='.repeat(60));
	console.log('✅ All tests completed');
}

// Run tests
runTests().catch((error) => {
	console.error('❌ Test suite failed:', error);
	process.exit(1);
});
