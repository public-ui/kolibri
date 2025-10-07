import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class SampleIndex {
	constructor(entries, generatedAt = new Date(), buildMode = 'runtime') {
		this.entries = entries;
		this.map = new Map(entries.map((entry) => [entry.id, entry]));
		this.generatedAt = generatedAt;
		this.buildMode = buildMode;
	}

	list(query) {
		if (!query) {
			return this.entries;
		}

		const normalized = query.trim().toLowerCase();
		return this.entries.filter(
			(entry) => entry.id.toLowerCase().includes(normalized) || entry.group.toLowerCase().includes(normalized) || entry.name.toLowerCase().includes(normalized),
		);
	}

	get(id) {
		return this.map.get(id);
	}
}

export async function buildSampleIndex() {
	console.log('[buildSampleIndex] Starting sample index...');

	try {
		// Try to load prebuilt data first
		// In src/ directory for development, relative to dist/ for production
		const samplesJsonPath = path.resolve(__dirname, 'samples.json');
		console.log('[buildSampleIndex] Trying to load prebuilt samples from:', samplesJsonPath);

		const jsonData = await readFile(samplesJsonPath, 'utf8');
		const data = JSON.parse(jsonData);

		console.log('[buildSampleIndex] ✅ Loaded prebuilt samples');
		console.log('[buildSampleIndex] Total entries:', data.entries.length);
		console.log('[buildSampleIndex] Build mode:', data.buildMode);
		console.log('[buildSampleIndex] Generated at:', data.generatedAt);

		return new SampleIndex(data.entries, new Date(data.generatedAt), data.buildMode);
	} catch (error) {
		console.log('[buildSampleIndex] ⚠️ Could not load prebuilt samples:', error.message);
		console.log('[buildSampleIndex] Falling back to runtime discovery...');

		// Fallback: use the original logic
		const { buildSampleIndex: originalBuildSampleIndex } = await import('./sample-index-runtime.js');
		return await originalBuildSampleIndex();
	}
}

export function getRepoRoot() {
	// Not relevant for prebuilt samples
	return __dirname;
}
