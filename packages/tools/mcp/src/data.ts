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

const FALLBACK_SAMPLE_ENTRIES: SampleEntry[] = [
	{
		id: 'sample/button/basic',
		kind: 'sample',
		name: 'Basic Button',
		group: 'button',
		description: 'A basic button component example',
		tags: ['button', 'interactive', 'form'],
		code: `import { KolButton } from '@public-ui/react';

export const BasicButton = () => (
  <KolButton _label="Click me" />
);`,
	},
	{
		id: 'sample/input/text',
		kind: 'sample',
		name: 'Text Input',
		group: 'input',
		description: 'A text input field example',
		tags: ['input', 'form', 'text'],
		code: `import { KolInput } from '@public-ui/react';

export const TextInput = () => (
  <KolInput _type="text" _label="Username" />
);`,
	},
	{
		id: 'sample/table/basic',
		kind: 'sample',
		name: 'Basic Table',
		group: 'table',
		description: 'A basic table component example',
		tags: ['table', 'data', 'grid'],
		code: `import { KolTable } from '@public-ui/react';

export const BasicTable = () => (
  <KolTable _label="User table" _data={[...] } />
);`,
	},
	{
		id: 'doc/docs/getting-started',
		kind: 'doc',
		name: 'Getting Started',
		description: 'Introduction to KoliBri component library',
		tags: ['documentation', 'guide', 'setup'],
		code: `# Getting Started with KoliBri

KoliBri is an accessible web component library...`,
	},
	{
		id: 'doc/docs/accessibility',
		kind: 'doc',
		name: 'Accessibility Guide',
		description: 'Best practices for accessibility in KoliBri',
		tags: ['documentation', 'a11y', 'accessibility'],
		code: `# Accessibility in KoliBri

All KoliBri components follow WCAG 2.1 guidelines...`,
	},
];

const FALLBACK_METADATA: SampleIndexMetadata = {
	generatedAt: null,
	buildMode: 'fallback',
	counts: calculateCounts(FALLBACK_SAMPLE_ENTRIES),
	repo: {
		commit: null,
		branch: null,
		repoUrl: null,
	},
};

let cachedData: { entries: SampleEntry[]; metadata: SampleIndexMetadata } | undefined;
let warnedAboutFallback = false;

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
	const tags = Array.isArray(entry.tags) ? entry.tags.map((tag) => String(tag)).filter((tag) => tag.trim().length > 0) : undefined;

	return {
		...entry,
		kind: normalizedKind,
		tags,
	};
}

function normalizeMetadata(metadata: SerializedSampleIndex['metadata'], entries: SampleEntry[]): SampleIndexMetadata {
	const counts = calculateCounts(entries);
	const repo = metadata?.repo ?? {};

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
			commit: repo?.commit ?? null,
			branch: repo?.branch ?? null,
			repoUrl: repo?.repoUrl ?? null,
		},
	};
}

function loadSampleData(): { entries: SampleEntry[]; metadata: SampleIndexMetadata } {
	if (cachedData) {
		return cachedData;
	}

	try {
		const samplesUrl = new URL('./samples.json', import.meta.url);
		const filePath = fileURLToPath(samplesUrl);
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
		if (!warnedAboutFallback) {
			const message = error instanceof Error ? error.message : String(error);
			console.warn(`[mcp:data] Falling back to embedded samples: ${message}`);
			warnedAboutFallback = true;
		}
		cachedData = { entries: FALLBACK_SAMPLE_ENTRIES, metadata: FALLBACK_METADATA };
		return cachedData;
	}
}

export function getAllEntries(): SampleEntry[] {
	return loadSampleData().entries;
}

export function getEntriesByKind(kind: 'sample' | 'doc'): SampleEntry[] {
	return getAllEntries().filter((entry) => entry.kind === kind);
}

export function getEntryById(id: string): SampleEntry | undefined {
	return getAllEntries().find((entry) => entry.id === id);
}

export function getSampleIndexMetadata(): SampleIndexMetadata {
	return loadSampleData().metadata;
}

export const FALLBACK_SAMPLES = FALLBACK_SAMPLE_ENTRIES;
