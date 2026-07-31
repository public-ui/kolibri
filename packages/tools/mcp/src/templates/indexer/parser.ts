import type { IndexedTemplateResource } from './config.js';

/**
 * Parsed und extrahiert nützliche Informationen aus Template-Ressourcen
 */

/**
 * Extrahiere Code-Blöcke aus Markdown
 */
export function extractCodeBlocksFromMarkdown(markdown: string): Array<{
	language: string;
	code: string;
	title?: string;
}> {
	const codeBlockRegex = /```(\w*)\s*([\s\S]*?)```/g;
	const blocks: Array<{ language: string; code: string; title?: string }> = [];

	let match: RegExpExecArray | null;
	while ((match = codeBlockRegex.exec(markdown)) !== null) {
		const language = match[1] || '';
		const code = match[2].trim();

		// Titel extrahieren (z.B. // title: My Component)
		const titleMatch = code.match(/^\/\/\s*title:\s*(.+)$/m);
		const title = titleMatch ? titleMatch[1].trim() : undefined;

		blocks.push({ language, code, title });
	}

	return blocks;
}

/**
 * Interface für package.json-Inhalte
 */
interface PackageJsonLike {
	dependencies?: Record<string, unknown>;
	devDependencies?: Record<string, unknown>;
	peerDependencies?: Record<string, unknown>;
}

/**
 * Extrahiere Abhängigkeiten aus package.json-Inhalten
 */
export function extractDependencies(content: string): string[] {
	try {
		const packageJson = JSON.parse(content) as PackageJsonLike;
		const dependencies: string[] = [];

		if (packageJson.dependencies) {
			dependencies.push(...Object.keys(packageJson.dependencies));
		}
		if (packageJson.devDependencies) {
			dependencies.push(...Object.keys(packageJson.devDependencies));
		}
		if (packageJson.peerDependencies) {
			dependencies.push(...Object.keys(packageJson.peerDependencies));
		}

		return [...new Set(dependencies)].sort();
	} catch {
		return [];
	}
}

/**
 * Extrahiere KoliBri-spezifische Importe aus Code
 */
export function extractKolibriImports(code: string): string[] {
	const importRegex = /from\s+['"](@public-ui\/[^'"]+|kolibri[^'"]+)['"]/g;
	const imports: Set<string> = new Set();

	let match: RegExpExecArray | null;
	while ((match = importRegex.exec(code)) !== null) {
		imports.add(match[1]);
	}

	return Array.from(imports);
}

/**
 * Erzeuge eine Vorschau für eine Ressource
 */
export function generatePreview(resource: IndexedTemplateResource, maxLines: number = 10): string {
	const lines = resource.content.split('\n');
	const previewLines = lines.slice(0, maxLines);

	if (lines.length > maxLines) {
		previewLines.push(`... (${lines.length - maxLines} more lines)`);
	}

	return previewLines.join('\n');
}

/**
 * Berechne einen Similarity-Score für Suchanfragen
 */
export function calculateSimilarityScore(resource: IndexedTemplateResource, query: string): number {
	let score = 0;

	// Titel-Übereinstimmung
	if (resource.metadata.name.toLowerCase().includes(query.toLowerCase())) {
		score += 100;
	}

	// Beschreibung-Übereinstimmung
	if (resource.metadata.description?.toLowerCase().includes(query.toLowerCase())) {
		score += 50;
	}

	// Tag-Übereinstimmung
	const queryLower = query.toLowerCase();
	for (const tag of resource.metadata.tags) {
		if (tag.toLowerCase().includes(queryLower)) {
			score += 30;
		}
	}

	// Inhalt-Übereinstimmung (gewichtet nach Position)
	const contentLower = resource.content.toLowerCase();
	const firstMatchIndex = contentLower.indexOf(queryLower);
	if (firstMatchIndex !== -1) {
		// Je früher der Match, desto höher der Score
		const positionScore = Math.max(0, 100 - firstMatchIndex / 100);
		score += positionScore;
	}

	return score;
}
