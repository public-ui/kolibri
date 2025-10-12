import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { computeFuzzyScore, extractQueryTokens } from './fuzzy-search.js';

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

		const queryTokens = extractQueryTokens(query);
		if (queryTokens.length === 0) {
			return results;
		}

		return results
			.map((entry) => ({ entry, score: computeFuzzyScore(entry, queryTokens) }))
			.filter((item) => Number.isFinite(item.score))
			.sort((a, b) => {
				if (a.score !== b.score) {
					return a.score - b.score;
				}

				return a.entry.id.localeCompare(b.entry.id);
			})
			.map((item) => item.entry);
	}

	get(id) {
		return this.map.get(id);
	}
}

export async function buildSampleIndex() {
	console.log('[buildSampleIndex] Starting sample index...');

	const isProduction = process.env.NODE_ENV === 'production' || process.env.BUILD_MODE === 'prebuild';
	let samplesJsonPath;
	if (isProduction) {
		// Always load from dist/samples.json in production
		if (__dirname.endsWith('/src')) {
			samplesJsonPath = path.resolve(__dirname.replace(/\/src$/, '/dist'), 'samples.json');
		} else {
			samplesJsonPath = path.resolve(__dirname, 'samples.json');
		}
	} else {
		samplesJsonPath = path.resolve(__dirname, 'samples.json');
	}
	try {
		console.log('[buildSampleIndex] Trying to load prebuilt samples from:', samplesJsonPath);
		const jsonData = await readFile(samplesJsonPath, 'utf8');
		const data = JSON.parse(jsonData);
		console.log('[buildSampleIndex] ✅ Loaded prebuilt samples');
		console.log('[buildSampleIndex] Total entries:', data.entries.length);
		console.log('[buildSampleIndex] Build mode:', data.buildMode);
		console.log('[buildSampleIndex] Generated at:', data.generatedAt);
		return new SampleIndex(data.entries, new Date(data.generatedAt), data.buildMode);
	} catch (error) {
		if (isProduction) {
			// In production, do NOT rebuild, just fail
			throw new Error('[buildSampleIndex] ❌ Prebuilt samples.json not found in production/built mode. Please run the build step before deploying.');
		}
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
