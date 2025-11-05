import Fuse from 'fuse.js';
import type { SampleEntry } from './data.js';

const FUSE_OPTIONS: Fuse.IFuseOptions<SampleEntry> = {
	includeScore: true,
	shouldSort: true,
	threshold: 0.4,
	keys: [
		{ name: 'id', weight: 0.3 },
		{ name: 'name', weight: 0.3 },
		{ name: 'group', weight: 0.2 },
		{ name: 'description', weight: 0.15 },
		{ name: 'tags', weight: 0.05 },
	],
};

export interface SearchOptions {
	threshold?: number;
	limit?: number;
	kind?: 'sample' | 'doc';
}

export interface SearchResult {
	item: SampleEntry;
	score: number;
}

export function searchEntries(entries: SampleEntry[], query: string, options: SearchOptions = {}): SearchResult[] {
	const normalizedQuery = query.trim();
	if (!normalizedQuery) {
		return entries.map((item) => ({ item, score: 1 }));
	}

	const fuseOptions = {
		...FUSE_OPTIONS,
		threshold: options.threshold ?? FUSE_OPTIONS.threshold,
	};

	// Filter by kind if specified
	const filteredEntries = options.kind ? entries.filter((e) => e.kind === options.kind) : entries;

	const fuse = new Fuse(filteredEntries, fuseOptions);
	const results = fuse.search(normalizedQuery);

	const searchResults = results.map((result) => ({
		item: result.item,
		score: result.score ?? 1,
	}));

	// Apply limit if specified
	if (options.limit && options.limit > 0) {
		return searchResults.slice(0, options.limit);
	}

	return searchResults;
}
