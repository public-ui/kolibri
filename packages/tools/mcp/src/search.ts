import Fuse, { type IFuseOptions } from 'fuse.js';
import type { SampleEntry } from './data.js';

const FUSE_OPTIONS: IFuseOptions<SampleEntry> = {
	includeScore: true,
	shouldSort: true,
	threshold: 0.4, // Default threshold for single-word queries
	minMatchCharLength: 2,
	// useExtendedSearch is set dynamically based on query type
	keys: [
		{ name: 'id', weight: 0.2 },
		{ name: 'name', weight: 0.2 },
		{ name: 'group', weight: 0.15 },
		{ name: 'description', weight: 0.1 },
		{ name: 'tags', weight: 0.05 },
		{ name: 'code', weight: 0.3 }, // Added code content search
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

	// Filter by kind if specified
	const filteredEntries = options.kind ? entries.filter((e) => e.kind === options.kind) : entries;

	// Split query into words to determine search strategy
	const words = normalizedQuery.split(/\s+/).filter((w) => w.length > 0);
	const isMultiWord = words.length > 1;

	const fuseOptions = {
		...FUSE_OPTIONS,
		// Use higher threshold for multi-word queries to find more results
		threshold: options.threshold ?? (isMultiWord ? 0.6 : FUSE_OPTIONS.threshold),
		// Only use extended search for multi-word queries
		useExtendedSearch: isMultiWord,
	};

	const fuse = new Fuse(filteredEntries, fuseOptions);

	// Convert multi-word query to OR search for better results
	// "input text password form" becomes "'input | 'text | 'password | 'form"
	const searchQuery = isMultiWord ? words.map((w) => `'${w}`).join(' | ') : normalizedQuery;

	const results = fuse.search(searchQuery);

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
