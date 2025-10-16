import { existsSync } from 'node:fs';
import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { hasSearchableQuery, performFuzzySearch } from './fuzzy-search.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Robust repo root detection for local and Vercel environment
function findRepoRoot() {
	// Standard: 4 levels up from src/sample-index.js
	let repoRoot = path.resolve(__dirname, '../../../..');

	// Fallback for Vercel: Search for packages/ directory
	let current = __dirname;
	let attempts = 0;
	while (attempts < 10) {
		const packagesDir = path.join(current, 'packages');
		if (existsSync(packagesDir)) {
			repoRoot = current;
			break;
		}
		current = path.dirname(current);
		attempts++;
	}

	return repoRoot;
}

const REPO_ROOT = findRepoRoot();
const SAMPLE_ROOT = path.join(REPO_ROOT, 'packages/samples/react/src');
const ROUTE_FILENAMES = ['routes.ts', 'routes.tsx'];
const SAMPLE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];
const MARKDOWN_EXTENSIONS = ['.md', '.mdx'];
const IGNORED_DIRECTORIES = new Set(['.git', '.github', '.nx', '.turbo', '.vercel', 'dist', 'build', 'node_modules']);

const COMPONENTS_DIR = path.join(SAMPLE_ROOT, 'components');
const SCENARIOS_DIR = path.join(SAMPLE_ROOT, 'scenarios');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');

const MARKDOWN_SOURCES = [
	{ directory: DOCS_DIR, groupPrefix: 'docs', recursive: true },
	{ directory: REPO_ROOT, groupPrefix: 'docs', recursive: false },
];

function computeCounts(entries) {
	return entries.reduce(
		(acc, entry) => {
			const kind = entry.kind ?? 'sample';
			acc.total += 1;
			acc.byKind.set(kind, (acc.byKind.get(kind) ?? 0) + 1);
			return acc;
		},
		{ total: 0, byKind: new Map() },
	);
}

function normalizeEntryId(entry) {
	const kind = entry.kind ?? 'sample';
	const isDoc = kind === 'doc';
	const expectedPrefix = isDoc ? 'doc' : 'sample';
	if (typeof entry.id === 'string' && entry.id.startsWith(`${expectedPrefix}/`)) {
		return entry;
	}

	const segments = [];
	if (entry.group) {
		const groupSegments = entry.group.split('/').filter(Boolean);
		if (isDoc && groupSegments[0] === 'docs') {
			groupSegments.shift();
		}
		segments.push(...groupSegments);
	}

	if (entry.name) {
		segments.push(entry.name);
	} else if (entry.id) {
		segments.push(...String(entry.id).split('/').filter(Boolean));
	}

	const normalized = {
		...entry,
		id: [expectedPrefix, ...segments.filter(Boolean)].join('/'),
	};
	return normalized;
}

class SampleIndex {
	constructor(entries) {
		const normalizedEntries = entries.map((entry) => normalizeEntryId(entry));
		this.entries = normalizedEntries;
		this.map = new Map(normalizedEntries.map((entry) => [entry.id, entry]));
		this.generatedAt = new Date();
		const counts = computeCounts(normalizedEntries);
		this.counts = {
			total: counts.total,
			byKind: counts.byKind,
			totalSamples: counts.byKind.get('sample') ?? counts.total,
			totalDocs: counts.byKind.get('doc') ?? 0,
		};
	}

	list(query, options = {}) {
		const kinds = options.kinds ? new Set(options.kinds) : undefined;
		const normalizeKind = (entry) => entry.kind ?? 'sample';

		let results = kinds ? this.entries.filter((entry) => kinds.has(normalizeKind(entry))) : this.entries;

		if (!hasSearchableQuery(query)) {
			return results;
		}

		return performFuzzySearch(results, query);
	}

	get(id) {
		return this.map.get(id);
	}
}

export async function buildSampleIndex() {
	console.log('[buildSampleIndex] Starting sample discovery...');
	console.log('[buildSampleIndex] REPO_ROOT:', REPO_ROOT);
	console.log('[buildSampleIndex] SAMPLE_ROOT:', SAMPLE_ROOT);
	console.log('[buildSampleIndex] COMPONENTS_DIR:', COMPONENTS_DIR);
	console.log('[buildSampleIndex] SCENARIOS_DIR:', SCENARIOS_DIR);

	// Check if directories exist
	try {
		await access(SAMPLE_ROOT);
		console.log('[buildSampleIndex] ✅ SAMPLE_ROOT exists');
	} catch (error) {
		console.log('[buildSampleIndex] ❌ SAMPLE_ROOT does not exist:', error.message);
		return new SampleIndex([]);
	}

	try {
		await access(COMPONENTS_DIR);
		console.log('[buildSampleIndex] ✅ COMPONENTS_DIR exists');
	} catch (error) {
		console.log('[buildSampleIndex] ❌ COMPONENTS_DIR does not exist:', error.message);
	}

	try {
		await access(SCENARIOS_DIR);
		console.log('[buildSampleIndex] ✅ SCENARIOS_DIR exists');
	} catch (error) {
		console.log('[buildSampleIndex] ❌ SCENARIOS_DIR does not exist:', error.message);
	}

	const routeFiles = await discoverRouteFiles();
	console.log('[buildSampleIndex] Found route files:', routeFiles.length);

	const entries = [];

	for (const routeFile of routeFiles) {
		const routeDir = path.dirname(routeFile);
		const routeData = await parseRouteFile(routeFile);

		for (const [group, value] of Object.entries(routeData)) {
			if (!value || typeof value !== 'object' || Array.isArray(value)) {
				continue;
			}

			for (const [name, descriptor] of Object.entries(value)) {
				const importPath = descriptor?.__path;
				if (!importPath) {
					continue;
				}

				const absolutePath = await resolveSamplePath(routeDir, importPath);
				if (!absolutePath) {
					continue;
				}

				const code = await readFile(absolutePath, 'utf8');
				const sampleIdSegments = ['sample', group, name].filter(Boolean);
				entries.push({
					id: sampleIdSegments.join('/'),
					group,
					name,
					path: path.relative(REPO_ROOT, absolutePath),
					absolutePath,
					code,
					kind: 'sample',
				});
			}
		}
	}

	const markdownEntries = await collectMarkdownEntries();
	entries.push(...markdownEntries);

	entries.sort((a, b) => a.id.localeCompare(b.id));
	console.log('[buildSampleIndex] Total entries found:', entries.length);
	if (markdownEntries.length > 0) {
		console.log('[buildSampleIndex] Markdown entries added:', markdownEntries.length);
	}

	return new SampleIndex(entries);
}

async function discoverRouteFiles() {
	const files = [];
	for (const baseDir of [COMPONENTS_DIR, SCENARIOS_DIR]) {
		const rootRoute = await findRouteFile(baseDir);
		if (rootRoute) {
			files.push(rootRoute);
		}
		const directories = await safeReadDir(baseDir);
		for (const entry of directories) {
			const routeFile = await findRouteFile(path.join(baseDir, entry.name));
			if (routeFile) {
				files.push(routeFile);
			}
		}
	}
	return files;
}

async function safeReadDir(dir) {
	try {
		const entries = await readdir(dir, { withFileTypes: true });
		return entries.filter((entry) => entry.isDirectory());
	} catch {
		return [];
	}
}

async function readDirEntries(dir) {
	try {
		return await readdir(dir, { withFileTypes: true });
	} catch {
		return [];
	}
}

async function findRouteFile(dir) {
	for (const file of ROUTE_FILENAMES) {
		const candidate = path.join(dir, file);
		if (await pathExists(candidate)) {
			return candidate;
		}
	}
	return undefined;
}

async function pathExists(filePath) {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
}

async function parseRouteFile(filePath) {
	const raw = await readFile(filePath, 'utf8');
	const importDeclarations = [];

	let content = raw.replace(/import\s+type[^;]+;\s*/g, '').replace(/import\s+\{\s*Routes\s*\}\s+from\s+['"][^'"]+['"];\s*/g, '');

	content = content.replace(/import\s+\{\s*([^}]+)\s*\}\s+from\s+['"]([^'"]+)['"];\s*/g, (_, identifiers, source) => {
		const names = identifiers
			.split(',')
			.map((part) => part.trim())
			.filter(Boolean);
		const declarations = names.map((name) => `const ${name} = { __path: '${source}' };`).join('\n');
		importDeclarations.push(declarations);
		return '';
	});

	content = content.replace(/export\s+const\s+\w+\s*:\s*\w+\s*=\s*/, '');
	content = content.replace(/export\s+const\s+\w+\s*=\s*/, '');
	content = content.trim();
	if (content.endsWith(';')) {
		content = content.slice(0, -1);
	}

	const fnBody = `${importDeclarations.join('\n')}\nreturn ${content};`;
	const routes = new Function(fnBody)();
	return routes && typeof routes === 'object' ? routes : {};
}

async function collectMarkdownEntries() {
	const entries = [];

	for (const source of MARKDOWN_SOURCES) {
		if (!(await pathExists(source.directory))) {
			continue;
		}

		const sourceEntries = await collectMarkdownFromDirectory(source.directory, {
			groupPrefix: source.groupPrefix,
			recursive: source.recursive,
			relativeRoot: source.directory,
		});

		entries.push(...sourceEntries);
	}

	return entries;
}

async function collectMarkdownFromDirectory(directory, { groupPrefix, recursive, relativeRoot }) {
	const entries = [];
	const dirents = await readDirEntries(directory);

	for (const dirent of dirents) {
		const absolutePath = path.join(directory, dirent.name);

		if (dirent.isDirectory()) {
			if (!recursive || IGNORED_DIRECTORIES.has(dirent.name)) {
				continue;
			}

			const nestedEntries = await collectMarkdownFromDirectory(absolutePath, {
				groupPrefix,
				recursive: true,
				relativeRoot,
			});

			entries.push(...nestedEntries);
			continue;
		}

		if (!dirent.isFile()) {
			continue;
		}

		const extension = path.extname(dirent.name).toLowerCase();
		if (!MARKDOWN_EXTENSIONS.includes(extension)) {
			continue;
		}

		const code = await readFile(absolutePath, 'utf8');
		const repoRelativePath = path.relative(REPO_ROOT, absolutePath);
		const normalizedRepoPath = repoRelativePath.split(path.sep).join('/');
		const relativePath = path.relative(relativeRoot, absolutePath).split(path.sep).join('/');
		const withoutExtension = relativePath.replace(/\.[^.]+$/, '');
		const segments = withoutExtension.split('/').filter(Boolean);
		const name = segments.pop() ?? withoutExtension;
		const group = segments.length ? `${groupPrefix}/${segments.join('/')}` : groupPrefix;
		const docIdSegments = ['doc'];
		if (group.startsWith(`${groupPrefix}/`)) {
			const relativeGroup = group.slice(groupPrefix.length + 1);
			if (relativeGroup) {
				docIdSegments.push(...relativeGroup.split('/'));
			}
		} else if (group !== groupPrefix) {
			docIdSegments.push(...group.split('/'));
		}
		docIdSegments.push(name);

		entries.push({
			id: docIdSegments.join('/'),
			group,
			name,
			path: normalizedRepoPath,
			absolutePath,
			code,
			kind: 'doc',
		});
	}

	return entries;
}

async function resolveSamplePath(baseDir, relativeImport) {
	const normalized = relativeImport.replace(/['"];?$/g, '');
	const base = normalized.startsWith('.') ? normalized : `./${normalized}`;

	for (const extension of SAMPLE_EXTENSIONS) {
		const candidate = path.resolve(baseDir, `${base}${extension}`);
		if (await pathExists(candidate)) {
			return candidate;
		}
	}

	return undefined;
}

export function getRepoRoot() {
	return REPO_ROOT;
}
