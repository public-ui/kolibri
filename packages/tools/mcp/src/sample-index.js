import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function normalizeEntryId(entry) {
	const kind = entry.kind ?? 'sample';
	const isDoc = kind === 'doc';
	const expectedPrefix = isDoc ? 'doc' : 'sample';
	if (typeof entry.id === 'string' && entry.id.startsWith(`${expectedPrefix}/`)) {
		return entry;
	}

	const segments = [];
	if (entry.group) {
		const groupSegments = entry.group.split('/').filter(Boolean);
		if (isDoc && groupSegments[0] === 'docs') {
			groupSegments.shift();
		}
		segments.push(...groupSegments);
	}

	if (entry.name) {
		segments.push(entry.name);
	} else if (entry.id) {
		segments.push(...String(entry.id).split('/').filter(Boolean));
	}

	return {
		...entry,
		id: [expectedPrefix, ...segments.filter(Boolean)].join('/'),
	};
}

function computeCounts(entries) {
	return entries.reduce(
		(acc, entry) => {
			const kind = entry.kind ?? 'sample';
			acc.total += 1;
			acc.byKind.set(kind, (acc.byKind.get(kind) ?? 0) + 1);
			return acc;
		},
		{ total: 0, byKind: new Map() },
	);
}

class SampleIndex {
	constructor(entries, generatedAt = new Date(), buildMode = 'runtime') {
		const normalizedEntries = entries.map((entry) => normalizeEntryId(entry));
		this.entries = normalizedEntries;
		this.map = new Map(normalizedEntries.map((entry) => [entry.id, entry]));
		this.generatedAt = generatedAt;
		this.buildMode = buildMode;
		const counts = computeCounts(normalizedEntries);
		this.counts = {
			total: counts.total,
			byKind: counts.byKind,
			totalSamples: counts.byKind.get('sample') ?? counts.total,
			totalDocs: counts.byKind.get('doc') ?? 0,
		};
	}

	list(query, options = {}) {
		const kinds = options.kinds ? new Set(options.kinds) : undefined;
		const normalizeKind = (entry) => entry.kind ?? 'sample';
		let results = kinds ? this.entries.filter((entry) => kinds.has(normalizeKind(entry))) : this.entries;

		if (!query) {
			return results;
		}

		const normalized = query.trim().toLowerCase();
		return results.filter(
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
