import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export interface SampleEntry {
	id: string;
	kind: 'doc' | 'sample' | 'scenario' | 'spec';
	name: string;
	group?: string;
	description?: string;
	tags?: string[];
	code?: string;
	path?: string;
}

interface SampleIndexCounts {
	total: number;
	totalDocs: number;
	totalSamples: number;
	totalScenarios: number;
	totalSpecs: number;
	byKind: Record<string, number>;
}

interface SampleIndexMetadata {
	generatedAt: string | null;
	buildMode: string;
	counts: SampleIndexCounts;
	repo: {
		commit: string | null;
		branch: string | null;
		repoUrl: string | null;
	};
}

interface SerializedSampleIndex {
	entries?: SampleEntry[];
	metadata?: Partial<SampleIndexMetadata> & {
		counts?: Partial<SampleIndexCounts> & { byKind?: Record<string, number> | Map<string, number> };
	};
}

let cachedData: { entries: SampleEntry[]; metadata: SampleIndexMetadata } | undefined;

function calculateCounts(entries: SampleEntry[]): SampleIndexCounts {
	const byKind: Record<string, number> = {};

	for (const entry of entries) {
		byKind[entry.kind] = (byKind[entry.kind] ?? 0) + 1;
	}

	return {
		total: entries.length,
		totalDocs: byKind.doc ?? 0,
		totalSamples: byKind.sample ?? 0,
		totalScenarios: byKind.scenario ?? 0,
		totalSpecs: byKind.spec ?? 0,
		byKind,
	};
}

function normalizeEntry(entry: SampleEntry): SampleEntry {
	const normalizedKind: SampleEntry['kind'] = entry.kind === 'doc' ? 'doc' : entry.kind === 'scenario' ? 'scenario' : entry.kind === 'spec' ? 'spec' : 'sample';
	const tags = Array.isArray(entry.tags) ? entry.tags.map((tag) => String(tag)).filter((tag) => tag.trim().length > 0) : undefined;

	return {
		...entry,
		kind: normalizedKind,
		tags,
	};
}

function normalizeMetadata(metadata: SerializedSampleIndex['metadata'], entries: SampleEntry[]): SampleIndexMetadata {
	const counts = calculateCounts(entries);
	const repo = metadata?.repo ?? { commit: null, branch: null, repoUrl: null };

	return {
		generatedAt: metadata?.generatedAt ?? null,
		buildMode: metadata?.buildMode ?? 'unknown',
		counts: {
			total: metadata?.counts?.total ?? counts.total,
			totalDocs: metadata?.counts?.totalDocs ?? counts.totalDocs,
			totalSamples: metadata?.counts?.totalSamples ?? counts.totalSamples,
			totalScenarios: metadata?.counts?.totalScenarios ?? counts.totalScenarios,
			totalSpecs: metadata?.counts?.totalSpecs ?? counts.totalSpecs,
			byKind:
				metadata?.counts?.byKind instanceof Map
					? Object.fromEntries(metadata.counts.byKind.entries())
					: metadata?.counts?.byKind
						? Object.fromEntries(Object.entries(metadata.counts.byKind).map(([key, value]) => [key, Number(value)]))
						: counts.byKind,
		},
		repo: {
			commit: repo.commit ?? null,
			branch: repo.branch ?? null,
			repoUrl: repo.repoUrl ?? null,
		},
	};
}

/**
 * Load sample data from the static index file in shared/
 * The index MUST be generated before build/dev using: node scripts/generate-sample-index.mjs
 * This ensures no runtime index generation is needed.
 */
function loadSampleData(): { entries: SampleEntry[]; metadata: SampleIndexMetadata } {
	if (cachedData) {
		return cachedData;
	}

	try {
		// Try to load from shared/sample-index.json (static, pre-generated)
		const indexPath = fileURLToPath(new URL('../shared/sample-index.json', import.meta.url));
		const parsed = JSON.parse(readFileSync(indexPath, 'utf8')) as SerializedSampleIndex;
		const entries = Array.isArray(parsed.entries) ? parsed.entries.map(normalizeEntry) : [];

		if (entries.length === 0) {
			throw new Error('Sample index does not contain any entries.');
		}

		const metadata = normalizeMetadata(parsed.metadata, entries);
		cachedData = { entries, metadata };
		return cachedData;
	} catch (error) {
		throw new Error(
			`Failed to load sample index from shared/sample-index.json. ` +
				`Please run 'pnpm generate-index' to create the index file. ` +
				`Error: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
}

export function getAllEntries(): SampleEntry[] {
	return loadSampleData().entries;
}

export function getEntryById(id: string): SampleEntry | undefined {
	return getAllEntries().find((entry) => entry.id === id);
}

export function getSampleIndexMetadata(): SampleIndexMetadata {
	return loadSampleData().metadata;
}
