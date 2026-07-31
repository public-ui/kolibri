import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { TEMPLATE_REPOS, type IndexedTemplateResource } from './indexer/config.js';
import { updateTemplateIndex } from './indexer/fetcher.js';
import { calculateSimilarityScore, extractCodeBlocksFromMarkdown } from './indexer/parser.js';

/**
 * Cache-Verzeichnis für geklonte Repos
 */
const CACHE_DIR = join(process.cwd(), 'data', 'templates');

/**
 * Geladener Template-Index (wird beim Start geladen)
 */
let templateIndex: IndexedTemplateResource[] = [];

/**
 * Lädt den Template-Index aus dem Cache
 */
async function loadTemplateIndex(): Promise<IndexedTemplateResource[]> {
	try {
		const indexPath = join(CACHE_DIR, 'template-index.json');
		const content = await fs.readFile(indexPath, 'utf-8');
		const parsed = JSON.parse(content) as IndexedTemplateResource[];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		// Index existiert noch nicht
		return [];
	}
}

/**
 * Initialisiert den Template-Index (wird beim Server-Start aufgerufen)
 */
export async function initializeTemplateIndex(): Promise<void> {
	console.log('📚 Initializing template index...');

	try {
		templateIndex = await loadTemplateIndex();

		// Falls Index leer oder veraltet, neu erstellen
		if (templateIndex.length === 0) {
			await updateTemplateIndex();
			templateIndex = await loadTemplateIndex();
		}

		console.log(`✅ Template index loaded with ${templateIndex.length} resources`);
	} catch (error) {
		console.error('❌ Failed to initialize template index:', error);
		// Mit leerem Index weitermachen
		templateIndex = [];
	}
}

/**
 * Durchsucht den Template-Index
 */
export function searchTemplates(
	query: string,
	options: {
		type?: string;
		repoId?: string;
		tags?: string[];
		templateType?: string;
		limit?: number;
	} = {},
): Array<IndexedTemplateResource & { score: number }> {
	const { type, repoId, tags, templateType, limit = 20 } = options;

	// Filter anwenden
	let results = templateIndex.filter((resource) => {
		if (repoId && resource.repoId !== repoId) return false;
		if (type && resource.type !== type) return false;
		if (templateType && resource.metadata.templateType !== templateType) return false;
		if (tags && tags.length > 0) {
			const hasAllTags = tags.every((tag) => resource.metadata.tags.includes(tag));
			if (!hasAllTags) return false;
		}
		return true;
	});

	// Nach Relevanz sortieren
	results = results
		.map((resource) => ({
			...resource,
			score: calculateSimilarityScore(resource, query),
		}))
		.sort((a, b) => b.score - a.score)
		.slice(0, limit);

	return results as Array<IndexedTemplateResource & { score: number }>;
}

/**
 * Holt eine spezifische Template-Ressource
 */
export function getTemplateResource(id: string): IndexedTemplateResource | undefined {
	return templateIndex.find((resource) => resource.id === id);
}

/**
 * Extrahiert Code-Blöcke aus einer Markdown-Ressource
 */
export function getTemplateCodeBlocks(resource: IndexedTemplateResource): Array<{
	language: string;
	code: string;
	title?: string;
}> {
	if (resource.type !== 'markdown') {
		return [{ language: resource.metadata.language || 'unknown', code: resource.content }];
	}

	return extractCodeBlocksFromMarkdown(resource.content);
}

/**
 * Liste aller verfügbaren Template-Typen
 */
export function getTemplateTypes(): string[] {
	const types = new Set<string>();
	for (const repo of TEMPLATE_REPOS) {
		types.add(repo.type);
	}
	return Array.from(types);
}

/**
 * Liste aller verfügbaren Repo-IDs
 */
export function getTemplateRepoIds(): string[] {
	return TEMPLATE_REPOS.map((repo) => repo.id);
}

/**
 * Liste aller verfügbaren Tags
 */
export function getAllTemplateTags(): string[] {
	const tags = new Set<string>();
	for (const resource of templateIndex) {
		for (const tag of resource.metadata.tags) {
			tags.add(tag);
		}
	}
	return Array.from(tags).sort();
}

export { TEMPLATE_REPOS, type IndexedTemplateResource };
