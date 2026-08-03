import { glob } from 'glob';
import { promises as fs } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import simpleGit from 'simple-git';
import { TEMPLATE_REPOS, type IndexedTemplateResource, type TemplateRepoConfig } from './config.js';

/**
 * Zielverzeichnis für den statischen Template-Index (wird ins npm-Paket gepackt)
 */
const SHARED_DIR = fileURLToPath(new URL('../../../shared', import.meta.url));
const INDEX_PATH = join(SHARED_DIR, 'template-index.json');

/**
 * Temporäres Verzeichnis für geklonte Repos (nur zur Build-Zeit)
 */
const CACHE_DIR = join(process.cwd(), '.template-cache');

/**
 * Klont oder aktualisiert ein Git-Repository
 */
async function cloneOrUpdateRepo(repoConfig: TemplateRepoConfig): Promise<string> {
	const repoPath = join(CACHE_DIR, repoConfig.id);
	const git = simpleGit();

	try {
		// Prüfe, ob Repo bereits existiert
		const exists = await fs
			.access(repoPath)
			.then(() => true)
			.catch(() => false);

		if (exists) {
			// Repo existiert → Pull latest changes
			await git.cwd(repoPath).pull();
			console.log(`✅ Updated ${repoConfig.id}`);
		} else {
			// Repo klonen (simple-git verwendet Array-Argumente für Git-Flags)
			await git.clone(`https://github.com/${repoConfig.owner}/${repoConfig.repo}.git`, repoPath, [
				'--branch',
				repoConfig.branch,
				'--single-branch',
				'--depth',
				'1',
			]);
			console.log(`✅ Cloned ${repoConfig.id}`);
		}
		return repoPath;
	} catch (error) {
		console.error(`❌ Error cloning/updating ${repoConfig.id}:`, error);
		throw error;
	}
}

/**
 * Findet alle Dateien in einem Repo, die den Include-Patterns entsprechen
 */
async function findFilesInRepo(repoPath: string, repoConfig: TemplateRepoConfig): Promise<string[]> {
	const allFiles: string[] = [];

	for (const pattern of repoConfig.includePatterns) {
		const files = await glob(pattern, {
			cwd: repoPath,
			ignore: repoConfig.excludePatterns,
			nodir: true,
		});
		allFiles.push(...files);
	}

	return [...new Set(allFiles)]; // Deduplizieren
}

/**
 * Bestimmt den Ressourcen-Typ basierend auf der Dateiendung
 */
function getResourceType(filePath: string): 'markdown' | 'code' | 'config' {
	if (filePath.endsWith('.md') || filePath.endsWith('.markdown')) {
		return 'markdown';
	}
	if (filePath.endsWith('.json') || filePath.endsWith('.yaml') || filePath.endsWith('.yml')) {
		return 'config';
	}
	return 'code';
}

/**
 * Bestimmt die Sprache für Code-Dateien
 */
function getLanguage(filePath: string): string {
	const extension = filePath.split('.').pop()?.toLowerCase();
	const languageMap: Record<string, string> = {
		ts: 'typescript',
		tsx: 'typescript',
		js: 'javascript',
		jsx: 'javascript',
		css: 'css',
		scss: 'scss',
		html: 'html',
		json: 'json',
		yaml: 'yaml',
		yml: 'yaml',
	};
	return languageMap[extension || ''] || extension || 'unknown';
}

/**
 * Extrahiert Metadaten aus Frontmatter (für Markdown-Dateien)
 */
function extractFrontmatter(content: string): Record<string, unknown> {
	const frontmatterRegex = /^---[\s\S]*?---/;
	const match = content.match(frontmatterRegex);

	if (!match) return {};

	try {
		const frontmatter = match[0].replace(/^---|---$/g, '').trim();
		// Einfaches YAML-Parsing (für komplexere Fälle: js-yaml verwenden)
		const metadata: Record<string, unknown> = {};
		frontmatter.split('\n').forEach((line) => {
			const [key, value] = line.split(':').map((s) => s.trim());
			if (key && value) {
				metadata[key] = value.replace(/^['"]|['"]$/g, '');
			}
		});
		return metadata;
	} catch {
		return {};
	}
}

/**
 * Lädt und indexiert eine einzelne Datei
 */
async function indexFile(repoPath: string, filePath: string, repoConfig: TemplateRepoConfig): Promise<IndexedTemplateResource> {
	const absolutePath = join(repoPath, filePath);
	const content = await fs.readFile(absolutePath, 'utf-8');
	const stats = await fs.stat(absolutePath);

	// Metadaten extrahieren
	const resourceType = getResourceType(filePath);
	const frontmatter = resourceType === 'markdown' ? extractFrontmatter(content) : {};

	// Zeilenanzahl berechnen
	const lines = content.split('\n').length;

	return {
		id: `${repoConfig.id}:${filePath.replace(/[/\\]/g, ':')}`,
		repoId: repoConfig.id,
		path: filePath,
		type: resourceType,
		content,
		metadata: {
			name: (frontmatter.title as string) || filePath.split('/').pop() || '',
			description: (frontmatter.description as string) || undefined,
			tags: [...(repoConfig.tags || []), ...((frontmatter.tags as string[] | undefined) ?? [])].filter((t: string) => t),
			templateType: repoConfig.type,
			language: resourceType === 'code' ? getLanguage(filePath) : undefined,
		},
		stats: {
			size: stats.size,
			lines,
			lastModified: stats.mtime.toISOString(),
		},
	};
}

/**
 * Indexiert ein komplettes Template-Repo
 */
async function indexTemplateRepo(repoConfig: TemplateRepoConfig): Promise<IndexedTemplateResource[]> {
	console.log(`📁 Indexing ${repoConfig.id}...`);

	const repoPath = await cloneOrUpdateRepo(repoConfig);
	const files = await findFilesInRepo(repoPath, repoConfig);

	console.log(`   Found ${files.length} files to index`);

	const resources: IndexedTemplateResource[] = [];
	for (const file of files) {
		try {
			const resource = await indexFile(repoPath, file, repoConfig);
			resources.push(resource);
		} catch (error) {
			console.warn(`   ⚠️  Could not index ${file}:`, error);
		}
	}

	console.log(`✅ Indexed ${resources.length} resources from ${repoConfig.id}`);
	return resources;
}

/**
 * Indexiert alle konfigurierten Template-Repos
 */
async function indexAllTemplateRepos(): Promise<IndexedTemplateResource[]> {
	const allResources: IndexedTemplateResource[] = [];

	for (const repoConfig of TEMPLATE_REPOS) {
		try {
			const resources = await indexTemplateRepo(repoConfig);
			allResources.push(...resources);
		} catch (error) {
			console.error(`❌ Failed to index ${repoConfig.id}:`, error);
		}
	}

	return allResources;
}

/**
 * Aktualisiert den Template-Index (wird zur Build-Zeit via `pnpm update-templates` aufgerufen)
 */
export async function updateTemplateIndex(): Promise<void> {
	console.log('🔄 Updating template index...');
	const resources = await indexAllTemplateRepos();

	// Speichern in shared/ damit der Index im npm-Paket enthalten ist
	await fs.mkdir(SHARED_DIR, { recursive: true });
	await fs.writeFile(INDEX_PATH, JSON.stringify(resources, null, 2));

	console.log(`✅ Template index updated with ${resources.length} resources`);
}
