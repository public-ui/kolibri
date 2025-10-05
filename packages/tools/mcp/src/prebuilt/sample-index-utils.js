import { buildSampleIndex } from '../sample-index.js';

export function createSampleIndexFromData(data = {}) {
	const entries = Array.isArray(data?.entries)
		? data.entries.map((entry) => ({
				id: entry.id,
				group: entry.group,
				name: entry.name,
				path: entry.path,
				code: entry.code,
			}))
		: [];

	const indexMap = new Map(entries.map((entry) => [entry.id, entry]));
	const generatedAt = data?.generatedAt ? new Date(data.generatedAt) : new Date();

	return {
		entries,
		generatedAt,
		map: indexMap,
		list(query) {
			if (!query) {
				return entries;
			}

			const normalized = query.trim().toLowerCase();
			return entries.filter((entry) => {
				const id = entry.id?.toLowerCase() ?? '';
				const group = entry.group?.toLowerCase() ?? '';
				const name = entry.name?.toLowerCase() ?? '';
				return id.includes(normalized) || group.includes(normalized) || name.includes(normalized);
			});
		},
		get(id) {
			return indexMap.get(id);
		},
	};
}

export async function buildDynamicSampleIndex() {
	return buildSampleIndex();
}
