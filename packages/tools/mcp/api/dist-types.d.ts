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
	}

	export const SAMPLE_DATA: SampleEntry[];
	export function getAllEntries(): SampleEntry[];
	export function getEntriesByKind(kind: 'sample' | 'doc'): SampleEntry[];
	export function getEntryById(id: string): SampleEntry | undefined;
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
