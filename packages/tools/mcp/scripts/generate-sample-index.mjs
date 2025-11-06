#!/usr/bin/env node

/**
 * Generate sample index from repository
 * This script scans the repository for sample files and documentation,
 * and generates a static JSON file that can be consumed at runtime.
 *
 * Usage: node scripts/generate-sample-index.mjs
 */

import { existsSync } from 'node:fs';
import { access, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PACKAGE_ROOT = path.resolve(__dirname, '..');
const SHARED_DIR = path.join(PACKAGE_ROOT, 'shared');
const OUTPUT_FILE = path.join(SHARED_DIR, 'sample-index.json');
const PUBLIC_DIR = path.join(PACKAGE_ROOT, 'public');
const LANDING_PAGE = path.join(PUBLIC_DIR, 'index.html');

// Robust repo root detection
function findRepoRoot() {
	let repoRoot = path.resolve(__dirname, '../../../..');
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

function getCommitMetadata() {
	const commit = process.env.GITHUB_SHA || process.env.VERCEL_GIT_COMMIT_SHA || null;
	const branch = process.env.GITHUB_REF_NAME || process.env.VERCEL_GIT_COMMIT_REF || null;
	const repoUrl = process.env.GITHUB_REPOSITORY ? `https://github.com/${process.env.GITHUB_REPOSITORY}` : null;
	return { commit, branch, repoUrl };
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

	return {
		...entry,
		id: [expectedPrefix, ...segments.filter(Boolean)].join('/'),
	};
}

async function pathExists(filePath) {
	try {
		await access(filePath);
		return true;
	} catch {
		return false;
	}
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

async function generateSampleIndex() {
	console.log('[generate-sample-index] Starting sample discovery...');
	console.log('[generate-sample-index] REPO_ROOT:', REPO_ROOT);
	console.log('[generate-sample-index] SAMPLE_ROOT:', SAMPLE_ROOT);

	// Check if directories exist
	try {
		await access(SAMPLE_ROOT);
		console.log('[generate-sample-index] ✅ SAMPLE_ROOT exists');
	} catch (error) {
		console.log('[generate-sample-index] ❌ SAMPLE_ROOT does not exist:', error.message);
		return { metadata: { counts: { total: 0, totalSamples: 0, totalDocs: 0 } }, entries: [] };
	}

	const routeFiles = await discoverRouteFiles();
	console.log('[generate-sample-index] Found route files:', routeFiles.length);

	const entries = [];

	// Collect sample entries from routes
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
					code,
					kind: 'sample',
				});
			}
		}
	}

	// Collect markdown documentation entries
	const markdownEntries = await collectMarkdownEntries();
	entries.push(...markdownEntries);

	// Normalize all entry IDs
	const normalizedEntries = entries.map((entry) => {
		const normalized = normalizeEntryId(entry);
		// Remove absolutePath from output
		const { absolutePath, ...rest } = normalized;
		// Normalize line endings
		return {
			...rest,
			code: typeof rest.code === 'string' ? rest.code.replace(/\r\n?/g, '\n') : rest.code,
		};
	});

	normalizedEntries.sort((a, b) => a.id.localeCompare(b.id));

	const totalSamples = normalizedEntries.filter((e) => e.kind !== 'doc').length;
	const totalDocs = normalizedEntries.filter((e) => e.kind === 'doc').length;

	console.log('[generate-sample-index] Total entries found:', normalizedEntries.length);
	console.log('[generate-sample-index] Samples:', totalSamples);
	console.log('[generate-sample-index] Docs:', totalDocs);

	const payload = {
		metadata: {
			generatedAt: new Date().toISOString(),
			buildMode: process.env.CI ? 'ci' : 'local',
			counts: {
				total: normalizedEntries.length,
				totalSamples,
				totalDocs,
			},
			repo: getCommitMetadata(),
		},
		entries: normalizedEntries,
	};

	return payload;
}

async function main() {
	try {
		const index = await generateSampleIndex();

		// Ensure shared directory exists
		await mkdir(SHARED_DIR, { recursive: true });

		// Write index to shared directory
		await writeFile(OUTPUT_FILE, JSON.stringify(index, null, 2), 'utf8');

                console.log(`[generate-sample-index] ✅ Successfully wrote ${index.entries.length} entries to ${OUTPUT_FILE}`);

                await updateLandingPageCounts(index);

                process.exit(0);
	} catch (error) {
		console.error('[generate-sample-index] ❌ Failed to generate sample index:', error);
		process.exit(1);
	}
}

main();

async function updateLandingPageCounts(index) {
        try {
                const html = await readFile(LANDING_PAGE, 'utf8');

                const counts = index?.metadata?.counts ?? {};
                const markers = [
                        {
                                placeholder: '__BUILD_TOTAL_COUNT__',
                                htmlComment: '<!--BUILD:TOTAL_COUNT-->',
                                jsComment: '/*BUILD:TOTAL_COUNT*/',
                                value: Number.isFinite(counts.total) ? String(counts.total) : '0',
                        },
                        {
                                placeholder: '__BUILD_SAMPLE_COUNT__',
                                htmlComment: '<!--BUILD:SAMPLE_COUNT-->',
                                jsComment: '/*BUILD:SAMPLE_COUNT*/',
                                value: Number.isFinite(counts.totalSamples) ? String(counts.totalSamples) : '0',
                        },
                        {
                                placeholder: '__BUILD_DOC_COUNT__',
                                htmlComment: '<!--BUILD:DOC_COUNT-->',
                                jsComment: '/*BUILD:DOC_COUNT*/',
                                value: Number.isFinite(counts.totalDocs) ? String(counts.totalDocs) : '0',
                        },
                ];

                const escapeRegExp = (input) => input.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

                let updated = html;
                let changed = false;

                for (const marker of markers) {
                        const { placeholder, htmlComment, jsComment, value } = marker;

                        if (updated.includes(`${htmlComment}${placeholder}`)) {
                                const next = updated.replaceAll(`${htmlComment}${placeholder}`, `${htmlComment}${value}`);
                                if (next !== updated) {
                                        changed = true;
                                        updated = next;
                                }
                        }

                        const htmlPattern = new RegExp(`${escapeRegExp(htmlComment)}\s*([0-9][0-9,]*)`, 'g');
                        const htmlReplaced = updated.replace(htmlPattern, `${htmlComment}${value}`);
                        if (htmlReplaced !== updated) {
                                changed = true;
                                updated = htmlReplaced;
                        }

                        if (updated.includes(`${placeholder} ${jsComment}`)) {
                                const next = updated.replaceAll(`${placeholder} ${jsComment}`, `${value} ${jsComment}`);
                                if (next !== updated) {
                                        changed = true;
                                        updated = next;
                                }
                        }

                        const jsPattern = new RegExp(`([0-9][0-9,]*)\s*${escapeRegExp(jsComment)}`, 'g');
                        const jsReplaced = updated.replace(jsPattern, `${value} ${jsComment}`);
                        if (jsReplaced !== updated) {
                                changed = true;
                                updated = jsReplaced;
                        }
                }

                if (changed) {
                        await writeFile(LANDING_PAGE, updated, 'utf8');
                        console.log(
                                `[generate-sample-index] ✅ Updated landing page counts in ${path.relative(
                                        PACKAGE_ROOT,
                                        LANDING_PAGE,
                                )}`,
                        );
                } else {
                        console.warn(
                                `[generate-sample-index] ⚠️ No landing page placeholders replaced. Check tokens in ${path.relative(
                                        PACKAGE_ROOT,
                                        LANDING_PAGE,
                                )}`,
                        );
                }
        } catch (error) {
                console.warn(
                        `[generate-sample-index] ⚠️ Unable to update landing page counts (${error.message}). Ensure ${path.relative(
                                PACKAGE_ROOT,
                                LANDING_PAGE,
                        )} contains __BUILD_* placeholders.`,
                );
        }
}
