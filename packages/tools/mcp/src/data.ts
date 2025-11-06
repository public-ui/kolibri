import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export interface SampleEntry {
	id: string;
	kind: 'sample' | 'doc';
	name: string;
	group?: string;
	description?: string;
	tags?: string[];
	code?: string;
	path?: string;
	legacyPaths?: string[];
}

export interface SampleIndexCounts {
	total: number;
	totalSamples: number;
	totalDocs: number;
	byKind: Record<string, number>;
}

export interface SampleIndexMetadata {
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
		const key = entry.kind === 'doc' ? 'doc' : 'sample';
		byKind[key] = (byKind[key] ?? 0) + 1;
	}

	return {
		total: entries.length,
		totalSamples: byKind.sample ?? 0,
		totalDocs: byKind.doc ?? 0,
		byKind,
	};
}

function normalizeEntry(entry: SampleEntry): SampleEntry {
	const normalizedKind: 'sample' | 'doc' = entry.kind === 'doc' ? 'doc' : 'sample';
	const normalizedId = typeof entry.id === 'string' ? entry.id.trim() : String(entry.id ?? '');
	const tags = Array.isArray(entry.tags) ? entry.tags.map((tag) => String(tag)).filter((tag) => tag.trim().length > 0) : undefined;
	const legacyPaths = Array.isArray(entry.legacyPaths)
		? Array.from(
				new Set(entry.legacyPaths.map((legacyPath) => String(legacyPath).trim()).filter((legacyPath) => legacyPath.length > 0 && legacyPath !== normalizedId)),
			)
		: undefined;

	return {
		...entry,
		kind: normalizedKind,
		id: normalizedId,
		tags,
		legacyPaths,
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
			totalSamples: metadata?.counts?.totalSamples ?? counts.totalSamples,
			totalDocs: metadata?.counts?.totalDocs ?? counts.totalDocs,
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
		const sharedIndexUrl = new URL('../shared/sample-index.json', import.meta.url);
		const filePath = fileURLToPath(sharedIndexUrl);
		const raw = readFileSync(filePath, 'utf8');
		const parsed = JSON.parse(raw) as SerializedSampleIndex;
		const entries = Array.isArray(parsed.entries) ? parsed.entries.map(normalizeEntry) : [];

		if (entries.length === 0) {
			throw new Error('Sample index does not contain any entries.');
		}

		const metadata = normalizeMetadata(parsed.metadata, entries);
		cachedData = { entries, metadata };
		return cachedData;
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		throw new Error(
			`Failed to load sample index from shared/sample-index.json. ` + `Please run 'pnpm generate-index' to create the index file. ` + `Error: ${message}`,
		);
	}
}

export function getAllEntries(): SampleEntry[] {
	return loadSampleData().entries;
}

export function getEntriesByKind(kind: 'sample' | 'doc'): SampleEntry[] {
	return getAllEntries().filter((entry) => entry.kind === kind);
}

export function getEntryById(id: string): SampleEntry | undefined {
	const sanitized = id.trim().replace(/^\/+/u, '').replace(/\/+/gu, '/');
	const normalizedId = sanitized.endsWith('/') ? sanitized.slice(0, -1) : sanitized;
	const entries = getAllEntries();

	for (const entry of entries) {
		if (entry.id === normalizedId) {
			return entry;
		}

		if (entry.legacyPaths?.some((legacyId) => legacyId === normalizedId)) {
			return entry;
		}
	}

	return undefined;
}

export function getSampleIndexMetadata(): SampleIndexMetadata {
	return loadSampleData().metadata;
}
