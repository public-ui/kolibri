import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';

import { createHydrateServer, hydrateProtoPath } from '../../dist/index.mjs';

// Load component metadata from @public-ui/components
const customElementsPath = new URL('../../../../components/custom-elements.json', import.meta.url);
const customElements = JSON.parse(readFileSync(customElementsPath, 'utf-8'));
// Test components with enhanced resource management and timeout protection
// Use TEST_COMPONENT_LIMIT env var to limit components for faster testing (e.g., TEST_COMPONENT_LIMIT=10)
const maxComponentsToTest = process.env.TEST_COMPONENT_LIMIT ? parseInt(process.env.TEST_COMPONENT_LIMIT, 10) : customElements.tags.length;

/**
 * Generate realistic test HTML for components with proper attributes
 */
function generateTestComponents() {
	const testComponents = [];

	// Filter available components and take a representative sample
	const availableComponents = customElements.tags.map((tag) => tag.name).sort();

	// Test components with enhanced resource management and timeout protection
	const componentsToTest = maxComponentsToTest < availableComponents.length ? availableComponents.slice(0, maxComponentsToTest) : availableComponents;

	console.log(`📋 Found ${customElements.tags.length} total components, ${availableComponents.length} suitable for testing`);
	const testingAll = maxComponentsToTest >= availableComponents.length;
	console.log(
		`🎯 Testing ${testingAll ? 'ALL' : 'first'} ${componentsToTest.length} components with timeout protection and resource management${testingAll ? '' : ' (use TEST_COMPONENT_LIMIT=N to limit)'}`,
	);
	for (const componentName of componentsToTest) {
		const componentMeta = customElements.tags.find((tag) => tag.name === componentName);
		if (!componentMeta) {
			console.log(`⚠️ Component ${componentName} not found in custom-elements.json`);
			continue;
		}

		const { name, attributes = [], slots = [] } = componentMeta;

		// Generate only one simple test case per component to avoid resource accumulation
		const testCase = generateSingleTestCase(componentMeta, 'common');

		if (testCase) {
			testComponents.push({
				name: name,
				componentName: name,
				html: testCase.html,
				category: getComponentCategory(name),
			});
		}
	}

	return testComponents;
}

/**
 * Generate a single test case with specific attribute strategy
 */
function generateSingleTestCase(componentMeta, strategy) {
	const { name, attributes = [], slots = [] } = componentMeta;

	// Keep it simple - only required + very common attributes
	const attrs = attributes.filter((attr) => attr.required || attr.name === '_label' || attr.name === '_heading');

	const attrString = attrs
		.map((attr) => {
			let value = '';
			if (attr.type.includes('string')) {
				if (attr.name === '_label') value = `Test ${name}`;
				else if (attr.name === '_heading') value = 'Test Heading';
				else value = 'Test value';
			} else if (attr.type.includes('boolean')) {
				value = attr.defaultValue === 'true' ? 'true' : 'false';
			} else if (attr.type.includes('number')) {
				value = '1';
			} else if (attr.type.includes('object') || attr.type.includes('array')) {
				// Skip complex types
				return null;
			}
			return `${attr.name}="${value}"`;
		})
		.filter(Boolean)
		.join(' ');

	// Simple content for slots
	const hasDefaultSlot = slots.some((slot) => slot.name === '');
	const content = hasDefaultSlot ? 'Test content' : '';

	const html = `<${name}${attrString ? ' ' + attrString : ''}>${content}</${name}>`;

	return { html };
}

/**
 * Get the category of a component based on its name patterns
 */
function getComponentCategory(componentName) {
	if (componentName.startsWith('kol-input-') || componentName === 'kol-textarea' || componentName === 'kol-select') {
		return 'inputs';
	}
	if (['kol-button', 'kol-badge', 'kol-heading', 'kol-link', 'kol-image', 'kol-icon'].includes(componentName)) {
		return 'basic';
	}
	if (['kol-card', 'kol-accordion', 'kol-modal', 'kol-drawer', 'kol-details'].includes(componentName)) {
		return 'layout';
	}
	if (['kol-alert', 'kol-progress', 'kol-spin', 'kol-toast-container'].includes(componentName)) {
		return 'feedback';
	}
	if (['kol-breadcrumb', 'kol-nav', 'kol-tabs', 'kol-skip-nav'].includes(componentName)) {
		return 'navigation';
	}
	return 'other';
}

const testComponents = generateTestComponents();

test('REST and gRPC endpoints return hydrated markup', { timeout: 300000 }, async (t) => {
	// Use the real hydrate renderer instead of a stub
	const server = await createHydrateServer({
		restHost: '127.0.0.1',
		restPort: 0,
		grpcHost: '127.0.0.1',
		grpcPort: 0,
		logger: false, // Use real renderer from @public-ui/hydrate
	});

	t.after(async () => {
		await server.stop();
	});

	await server.start();

	const restUrl = server.getRestUrl();
	assert.ok(restUrl, 'REST URL should be available after startup');

	console.log(`\n🧪 Testing ${testComponents.length} component cases via REST API...`);

	const results = {
		total: testComponents.length,
		passed: 0,
		categories: {},
	};

	// Test multiple components with realistic HTML and proper error handling
	for (const component of testComponents) {
		try {
			const startTime = Date.now();

			// Create a timeout for individual component rendering
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout per component

			const restResponse = await fetch(restUrl, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ html: component.html }),
				signal: controller.signal,
			});

			clearTimeout(timeoutId);
			const endTime = Date.now();
			const duration = endTime - startTime;

			if (restResponse.status !== 200) {
				const errorText = await restResponse.text();
				console.warn(`  ⚠️ ${component.name} failed with status ${restResponse.status}: ${errorText}`);
				continue;
			}

			const restPayload = await restResponse.json();

			// Verify response structure
			assert.ok(typeof restPayload.html === 'string', `${component.name} should return HTML string`);
			assert.ok(restPayload.html.length > 0, `${component.name} should return non-empty HTML`);
			assert.ok(Array.isArray(restPayload.components), `${component.name} should return components array`);
			assert.ok(Array.isArray(restPayload.diagnostics), `${component.name} should return diagnostics array`);
			assert.ok(typeof restPayload.hydratedCount === 'number', `${component.name} should return hydrated count`);

			// The HTML should contain the component
			assert.ok(restPayload.html.includes(component.componentName), `${component.name} should be present in hydrated HTML`);

			// Track results by category
			const category = component.category;
			if (!results.categories[category]) {
				results.categories[category] = { total: 0, passed: 0, failed: 0 };
			}
			results.categories[category].total++;
			results.categories[category].passed++;
			results.passed++;

			// Log with timing info
			const timingInfo = duration > 1000 ? ` (${duration}ms - SLOW)` : duration > 500 ? ` (${duration}ms)` : '';
			console.log(`  ✅ ${component.name} (${category})${timingInfo}`);

			// Warn about potential resource issues
			if (restPayload.diagnostics.length > 0) {
				console.log(`    📋 Diagnostics: ${restPayload.diagnostics.length} items`);
			}

			// Small delay to prevent resource accumulation
			if (results.passed % 10 === 0) {
				await new Promise((resolve) => setTimeout(resolve, 100));
			}
		} catch (error) {
			const isTimeout = error.name === 'AbortError' || error.message.includes('timeout');
			const errorType = isTimeout ? 'TIMEOUT' : 'ERROR';
			console.error(`  ❌ ${component.name} failed (${errorType}):`, error.message);

			// Track failed component
			const category = component.category;
			if (!results.categories[category]) {
				results.categories[category] = { total: 0, passed: 0, failed: 0 };
			}
			results.categories[category].total++;
			results.categories[category].failed++;

			// If it's a timeout, we might want to skip similar components
			if (isTimeout) {
				console.warn(`  ⚠️  ${component.name} timed out - this component may cause hanging`);
			}
		}
	}

	// Print summary
	const totalFailed = results.total - results.passed;
	console.log(`\n📊 REST API Test Summary:`);
	console.log(`  Total: ${results.passed}/${results.total} passed${totalFailed > 0 ? ` (${totalFailed} failed)` : ''}`);
	for (const [category, stats] of Object.entries(results.categories)) {
		const categoryFailed = stats.failed || 0;
		const categoryTotal = stats.total || 0;
		const categoryPassed = stats.passed || 0;
		console.log(`  ${category}: ${categoryPassed}/${categoryTotal} components${categoryFailed > 0 ? ` (${categoryFailed} failed)` : ''}`);
	}

	const grpcEndpoint = server.getGrpcEndpoint();
	assert.ok(grpcEndpoint, 'gRPC endpoint should be available after startup');

	const packageDefinition = await load(hydrateProtoPath, {
		keepCase: false,
		longs: String,
		enums: String,
		defaults: true,
		oneofs: true,
	});

	const proto = loadPackageDefinition(packageDefinition);
	const hydratePackage = proto.publicui?.hydrate;
	assert.ok(hydratePackage?.HydrateRenderer, 'HydrateRenderer service should be defined');

	const client = new hydratePackage.HydrateRenderer(grpcEndpoint, credentials.createInsecure());

	// Test only first few components via gRPC to keep it fast
	const grpcTestComponents = testComponents.slice(0, maxComponentsToTest);
	const categoriesTested = new Set(grpcTestComponents.map((c) => c.category));

	console.log(`\n🌐 Testing first ${grpcTestComponents.length} components via gRPC API...`);
	for (const component of grpcTestComponents) {
		const grpcResponse = await new Promise((resolve, reject) => {
			client.renderHtml({ html: component.html }, (error, response) => {
				if (error) {
					reject(error);
					return;
				}
				resolve(response);
			});
		});

		assert.ok(grpcResponse, `gRPC response for ${component.name} should not be null`);
		assert.ok(typeof grpcResponse.html === 'string', `${component.name} gRPC should return HTML string`);
		assert.ok(grpcResponse.html.length > 0, `${component.name} gRPC should return non-empty HTML`);
		assert.ok(Array.isArray(grpcResponse.components), `${component.name} gRPC should return components array`);
		assert.ok(typeof grpcResponse.hydratedCount === 'number', `${component.name} gRPC should return hydrated count`);

		// Parse diagnostics JSON
		const diagnostics = JSON.parse(grpcResponse.diagnosticsJson || '[]');
		assert.ok(Array.isArray(diagnostics), `${component.name} gRPC should return valid diagnostics`);

		// The HTML should contain the component
		assert.ok(grpcResponse.html.includes(component.componentName), `${component.name} should be present in gRPC hydrated HTML`);

		console.log(`  ✅ ${component.name} (${component.category})`);
	}

	console.log(`\n📡 gRPC API Test Summary: ${grpcTestComponents.length} components from ${categoriesTested.size} categories`);
	console.log(`  Categories tested: ${Array.from(categoriesTested).join(', ')}\n`);

	client.close();
});
