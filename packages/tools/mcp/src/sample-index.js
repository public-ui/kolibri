import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../../..');
const SAMPLE_ROOT = path.join(REPO_ROOT, 'packages/samples/react/src');
const ROUTE_FILENAMES = ['routes.ts', 'routes.tsx'];
const SAMPLE_EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

const COMPONENTS_DIR = path.join(SAMPLE_ROOT, 'components');
const SCENARIOS_DIR = path.join(SAMPLE_ROOT, 'scenarios');

class SampleIndex {
	constructor(entries) {
		this.entries = entries;
		this.map = new Map(entries.map((entry) => [entry.id, entry]));
		this.generatedAt = new Date();
	}

	list(query) {
		if (!query) {
			return this.entries;
		}

		const normalized = query.trim().toLowerCase();
		return this.entries.filter(
			(entry) => entry.id.toLowerCase().includes(normalized) || entry.group.toLowerCase().includes(normalized) || entry.name.toLowerCase().includes(normalized),
		);
	}

	get(id) {
		return this.map.get(id);
	}
}

export async function buildSampleIndex() {
	const routeFiles = await discoverRouteFiles();
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
				entries.push({
					id: `${group}/${name}`,
					group,
					name,
					path: path.relative(REPO_ROOT, absolutePath),
					absolutePath,
					code,
				});
			}
		}
	}

	entries.sort((a, b) => a.id.localeCompare(b.id));

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
	} catch (error) {
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
	} catch (error) {
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
	// eslint-disable-next-line no-new-func
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

export function getRepoRoot() {
	return REPO_ROOT;
}
