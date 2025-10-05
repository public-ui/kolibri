import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildSampleIndex } from './sample-index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NETLIFY_DIR = path.join(__dirname, '../netlify');
const FUNCTIONS_DIR = path.join(NETLIFY_DIR, 'functions');
const OUTPUT_PATH = path.join(FUNCTIONS_DIR, 'sample-index.json');

function serializeIndex(index) {
	return {
		entries: index.entries.map((entry) => ({
			id: entry.id,
			group: entry.group,
			name: entry.name,
			path: entry.path,
			code: entry.code,
		})),
		generatedAt: index.generatedAt.toISOString(),
	};
}

async function prebuildSampleIndex() {
	try {
		console.log('[mcp] building sample index for Netlify deployment...');
		const index = await buildSampleIndex();
		const serialized = serializeIndex(index);

		mkdirSync(FUNCTIONS_DIR, { recursive: true });
		writeFileSync(OUTPUT_PATH, JSON.stringify(serialized));

		console.log(`[mcp] sample index written to ${OUTPUT_PATH}`);
		console.log(`[mcp] total entries: ${serialized.entries.length}`);
	} catch (error) {
		console.error('[mcp] failed to prebuild sample index', error);
		process.exitCode = 1;
	}
}

prebuildSampleIndex();
