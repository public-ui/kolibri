import { buildSampleIndex } from './sample-index.js';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prebuildSampleIndex() {
	try {
		console.log('Building sample index...');
		const index = await buildSampleIndex();

		// Serialize the index data
		const indexData = {
			entries: index.entries,
			generatedAt: index.generatedAt,
		};

		// Write to both locations:
		// 1. For local development
		const localOutputPath = path.join(__dirname, '../netlify/sample-index.json');
		writeFileSync(localOutputPath, JSON.stringify(indexData, null, 2));

		// 2. Embedded in the function directory for Netlify
		const embeddedOutputPath = path.join(__dirname, '../netlify/functions/sample-index.json');
		writeFileSync(embeddedOutputPath, JSON.stringify(indexData, null, 2));

		console.log(`Sample index built with ${index.entries.length} entries`);
		console.log(`Saved to: ${localOutputPath}`);
		console.log(`Embedded to: ${embeddedOutputPath}`);
	} catch (error) {
		console.error('Failed to build sample index:', error);
		process.exit(1);
	}
}
prebuildSampleIndex();
