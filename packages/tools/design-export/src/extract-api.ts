import { readFile } from 'node:fs/promises';
import type { ComponentApi } from './types.js';

/**
 * Reads the Stencil `custom-elements.json` (tags format) and reduces every tag
 * to the API facet the IR needs. The file is a build artifact of the components
 * package and is therefore read from disk, not from source.
 */
export async function extractApi(customElementsJsonPath: string): Promise<ComponentApi[]> {
	const raw = JSON.parse(await readFile(customElementsJsonPath, 'utf-8')) as {
		tags?: { name: string; attributes?: { name: string }[]; events?: { name: string }[]; slots?: { name: string; description?: string }[] }[];
	};
	if (!Array.isArray(raw.tags)) {
		throw new Error(`${customElementsJsonPath} has no tags array; build the components package first.`);
	}
	return raw.tags
		.map((tag) => ({
			tag: tag.name,
			attributes: (tag.attributes ?? []).map((attribute) => attribute.name).sort(),
			events: (tag.events ?? []).map((event) => event.name).sort(),
			slots: (tag.slots ?? []).map((slot) => ({ name: slot.name ?? '', description: slot.description })),
		}))
		.sort((a, b) => a.tag.localeCompare(b.tag));
}
