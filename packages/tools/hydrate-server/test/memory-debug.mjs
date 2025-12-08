import { test } from 'node:test';
import { createHydrateServer, memoryMonitor } from '../dist/index.mjs';

const PROBLEMATIC_COMPONENTS = ['kol-input-color', 'kol-input-checkbox', 'kol-input-date', 'kol-input-email', 'kol-input-file'];

test('Debug problematic components', { timeout: 120000 }, async (t) => {
	const server = await createHydrateServer({
		restHost: '127.0.0.1',
		restPort: 0,
		logger: false,
	});

	t.after(async () => {
		await server.stop();
	});

	await server.start();
	const restUrl = server.getRestUrl();

	console.log('🔍 Testing problematic components individually...\n');

	for (const componentName of PROBLEMATIC_COMPONENTS) {
		console.log(`\n🧪 Testing ${componentName}...`);

		try {
			const memoryBefore = memoryMonitor.beforeRender();
			const startTime = Date.now();

			// Simple test case
			const html = `<${componentName} _label="Test"></${componentName}>`;

			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

			const response = await fetch(restUrl, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ html }),
				signal: controller.signal,
			});

			clearTimeout(timeoutId);

			memoryMonitor.afterRender(componentName, memoryBefore, startTime);

			if (response.ok) {
				const result = await response.json();
				console.log(`  ✅ Success - ${result.html.length} chars HTML`);
			} else {
				console.log(`  ❌ HTTP ${response.status}: ${await response.text()}`);
			}
		} catch (error) {
			const isTimeout = error.name === 'AbortError';
			console.log(`  ❌ ${isTimeout ? 'TIMEOUT' : 'ERROR'}: ${error.message}`);
		}

		// Wait between tests to allow cleanup
		await new Promise((resolve) => setTimeout(resolve, 2000));

		// Check memory status
		console.log(`     📊 ${memoryMonitor.getCurrentMemoryInfo()}`);

		if (memoryMonitor.isMemoryUsageDangerous()) {
			console.log('🚨 Memory usage dangerous - stopping tests');
			break;
		}
	}

	console.log('\n' + memoryMonitor.generateReport());
});
