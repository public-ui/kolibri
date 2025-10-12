import Fuse from 'fuse.js';

const FUSE_OPTIONS = {
	includeScore: true,
	shouldSort: false,
	ignoreLocation: true,
	isCaseSensitive: false,
	threshold: 0.5,
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
	const tokens = normalizedQuery
		.toLowerCase()
		.split(/\s+/u)
		.map((token) => token.trim())
		.filter(Boolean);

	const aggregated = new Map();

	function mergeResults(results, weight, tokenKey) {
		for (const result of results) {
			const { item } = result;
			if (!item) {
				continue;
			}

			const score = typeof result.score === 'number' ? result.score : 1;
			const existing = aggregated.get(item) ?? {
				item,
				scoreSum: 0,
				weightSum: 0,
				bestScore: Number.POSITIVE_INFINITY,
				tokens: new Set(),
			};

			existing.scoreSum += score * weight;
			existing.weightSum += weight;
			existing.bestScore = Math.min(existing.bestScore, score);
			if (tokenKey) {
				existing.tokens.add(tokenKey);
			}

			aggregated.set(item, existing);
		}
	}

	mergeResults(fuse.search(normalizedQuery), Math.max(tokens.length, 1), undefined);
	for (const token of tokens) {
		mergeResults(fuse.search(token), 1, token);
	}

	return Array.from(aggregated.values())
		.map((entry) => {
			const averageScore = entry.weightSum > 0 ? entry.scoreSum / entry.weightSum : entry.bestScore;
			return {
				item: entry.item,
				averageScore,
				bestScore: entry.bestScore,
				tokensMatched: entry.tokens.size,
			};
		})
		.sort((a, b) => {
			if (a.tokensMatched !== b.tokensMatched) {
				return b.tokensMatched - a.tokensMatched;
			}

			if (a.bestScore !== b.bestScore) {
				return a.bestScore - b.bestScore;
			}

			if (a.averageScore !== b.averageScore) {
				return a.averageScore - b.averageScore;
			}

			return String(a.item.id ?? '').localeCompare(String(b.item.id ?? ''));
		})
		.map((entry) => entry.item);
}
