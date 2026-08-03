import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TEMPLATE_REPOS, type IndexedTemplateResource } from './indexer/config.js';
import { calculateSimilarityScore, extractCodeBlocksFromMarkdown } from './indexer/parser.js';

/**
 * Statischer Pfad zum Template-Index (wird zur Build-Zeit erzeugt und mit dem npm-Paket ausgeliefert)
 */
function getIndexPath(): string {
	const currentDir = fileURLToPath(new URL('.', import.meta.url));
	// dist/ liegt eine Ebene höher als src/templates/, daher muss der Pfad angepasst werden
	if (currentDir.includes('/dist/')) {
		return resolve(currentDir, '../shared/template-index.json');
	}
	return resolve(currentDir, '../../shared/template-index.json');
}

const INDEX_PATH = getIndexPath();

/**
 * Geladener Template-Index (wird beim Start geladen)
 */
let templateIndex: IndexedTemplateResource[] = [];

/**
 * Lädt den Template-Index aus der statischen JSON-Datei
 */
function loadTemplateIndex(): IndexedTemplateResource[] {
	try {
		const content = readFileSync(INDEX_PATH, 'utf-8');
		const parsed = JSON.parse(content) as IndexedTemplateResource[];
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		// Index existiert noch nicht (z. B. weil `pnpm update-templates` nicht ausgeführt wurde)
		return [];
	}
}

/**
 * Initialisiert den Template-Index (wird beim Server-Start aufgerufen)
 */
export function initializeTemplateIndex(): void {
	console.log('📚 Initializing template index...');

	templateIndex = loadTemplateIndex();

	if (templateIndex.length === 0) {
		console.warn('⚠️  Template index is empty. Run `pnpm update-templates` before building to include template data.');
	} else {
		console.log(`✅ Template index loaded with ${templateIndex.length} resources`);
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

export { type IndexedTemplateResource };
