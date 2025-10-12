import Fuse from 'fuse.js';

const FUSE_OPTIONS = {
	includeScore: true,
	shouldSort: true,
	ignoreLocation: true,
	threshold: 0.35,
	keys: [
		{ name: 'id', weight: 0.4 },
		{ name: 'group', weight: 0.2 },
		{ name: 'name', weight: 0.3 },
		{ name: 'title', weight: 0.3 },
		{ name: 'description', weight: 0.2 },
		{ name: 'tags', weight: 0.15 },
		{ name: 'keywords', weight: 0.15 },
	],
};

function normalizeQuery(query) {
	if (query == null) {
		return '';
	}

	return String(query).trim();
}

export function hasSearchableQuery(query) {
	return normalizeQuery(query).length > 0;
}

export function performFuzzySearch(entries, query) {
	const normalizedQuery = normalizeQuery(query);
	if (normalizedQuery.length === 0) {
		return entries;
	}

	const fuse = new Fuse(entries, FUSE_OPTIONS);
	const results = fuse.search(normalizedQuery);

	return results
		.sort((a, b) => {
			const aScore = typeof a.score === 'number' ? a.score : 0;
			const bScore = typeof b.score === 'number' ? b.score : 0;
			if (aScore !== bScore) {
				return aScore - bScore;
			}

			return String(a.item.id ?? '').localeCompare(String(b.item.id ?? ''));
		})
		.map((result) => result.item);
}
