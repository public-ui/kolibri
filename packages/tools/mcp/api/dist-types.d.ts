// Type declarations for built artifacts in dist/
// These are generated during build and match the source types

declare module '../dist/data.mjs' {
	export interface SampleEntry {
		id: string;
		name: string;
		kind: 'sample' | 'doc';
		group?: string;
		code?: string;
		description?: string;
		tags?: string[];
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

	export const FALLBACK_SAMPLES: SampleEntry[];
	export function getAllEntries(): SampleEntry[];
	export function getEntriesByKind(kind: 'sample' | 'doc'): SampleEntry[];
	export function getEntryById(id: string): SampleEntry | undefined;
	export function getSampleIndexMetadata(): SampleIndexMetadata;
}

declare module '../dist/search.mjs' {
	import type { SampleEntry } from '../dist/data.mjs';

	export interface SearchOptions {
		threshold?: number;
		limit?: number;
		kind?: 'sample' | 'doc';
	}

	export interface SearchResult {
		item: SampleEntry;
		score: number;
	}

	export function searchEntries(entries: SampleEntry[], query: string, options?: SearchOptions): SearchResult[];
}

declare module '../dist/index.mjs' {
	import type { Server } from '@modelcontextprotocol/sdk/server/index.js';

	export function createKolibriMcpServer(): Server;
}
