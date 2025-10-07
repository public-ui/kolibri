#!/usr/bin/env node

/**
 * Pre-build script um Sample-Daten zur Build-Zeit zu sammeln und zu serialisieren.
 * Das wird benötigt, weil auf Vercel nur das MCP-Package deployed wird,
 * nicht das komplette Monorepo.
 */

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Import der bestehenden Sample-Index Logik
import { buildSampleIndex } from './src/sample-index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prebuildSamples() {
	console.log('🔨 Pre-building sample index for deployment...');

	try {
		const index = await buildSampleIndex();
		console.log(`📦 Found ${index.entries.length} samples`);

		// Serialisiere die Sample-Daten
		const serializedData = {
			entries: index.entries,
			generatedAt: index.generatedAt.toISOString(),
			buildMode: 'prebuild',
		};

		// Schreibe als JSON für dist/
		const jsonOutputPath = path.join(__dirname, 'src', 'samples.json');
		await writeFile(jsonOutputPath, JSON.stringify(serializedData, null, 2));

		// Schreibe als JavaScript-Modul für Vercel API (wird mit Function gebundelt)
		const jsContent = `// Auto-generated sample data for Vercel deployment
export const samplesData = ${JSON.stringify(serializedData, null, 2)};
export default samplesData;
`;
		const jsOutputPath = path.join(__dirname, 'src', 'samples.mjs');
		await writeFile(jsOutputPath, jsContent);

		// Kopiere auch direkt ins api/ Verzeichnis für Vercel
		const apiJsPath = path.join(__dirname, 'api', 'samples.mjs');
		await writeFile(apiJsPath, jsContent);

		console.log(`✅ Sample index written to ${jsonOutputPath}`);
		console.log(`✅ Sample module written to ${jsOutputPath}`);
		console.log(`✅ Sample API module written to ${apiJsPath}`);
		console.log(`📊 Total samples: ${index.entries.length}`);

		// Debug: zeige erste paar Samples
		if (index.entries.length > 0) {
			console.log('📋 First few samples:');
			index.entries.slice(0, 5).forEach((entry) => {
				console.log(`   - ${entry.id}`);
			});
		}
	} catch (error) {
		console.error('❌ Error pre-building samples:', error);
		process.exit(1);
	}
}

prebuildSamples();
