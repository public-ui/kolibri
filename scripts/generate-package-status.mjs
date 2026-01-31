import { promises as fs } from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const packagesRoot = path.join(repoRoot, 'packages');
const outputPath = path.join(repoRoot, 'docs', 'PACKAGE_STATUS.md');

const ignoredDirs = new Set(['assets', 'dist', 'node_modules']);

const collectPackageJsonFiles = async (dir) => {
	const entries = await fs.readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		if (entry.isDirectory()) {
			if (ignoredDirs.has(entry.name) || entry.name.startsWith('.')) {
				continue;
			}
			files.push(...(await collectPackageJsonFiles(path.join(dir, entry.name))));
		} else if (entry.isFile() && entry.name === 'package.json') {
			files.push(path.join(dir, entry.name));
		}
	}
	return files;
};

const loadPackages = async () => {
	const packageJsonPaths = await collectPackageJsonFiles(packagesRoot);
	const packages = [];
	for (const packageJsonPath of packageJsonPaths) {
		const raw = await fs.readFile(packageJsonPath, 'utf8');
		const data = JSON.parse(raw);
		if (!data.name || data.private) {
			continue;
		}
		packages.push({ name: data.name });
	}
	return packages.sort((a, b) => a.name.localeCompare(b.name));
};

const encodePackageName = (name) => name.replace('@', '%40').replace('/', '%2F');

const fetchJson = (url) =>
	new Promise((resolve, reject) => {
		https
			.get(url, (response) => {
				if (response.statusCode && response.statusCode >= 400) {
					reject(new Error(`Request failed (${response.statusCode}) for ${url}`));
					response.resume();
					return;
				}
				const chunks = [];
				response.on('data', (chunk) => chunks.push(chunk));
				response.on('end', () => {
					try {
						const text = Buffer.concat(chunks).toString('utf8');
						resolve(JSON.parse(text));
					} catch (error) {
						reject(error);
					}
				});
			})
			.on('error', reject);
	});

const versionCompare = (a, b) =>
	a.localeCompare(b, undefined, {
		numeric: true,
		sensitivity: 'base',
	});

const getMajorVersion = (version) => Number.parseInt(version.split('.')[0], 10);

const getLatestByMajor = (versions, major) => {
	const matching = versions.filter((version) => getMajorVersion(version) === major);
	if (matching.length === 0) {
		return null;
	}
	return matching.sort(versionCompare).at(-1) ?? null;
};

const fetchLatestVersions = async (name) => {
	const encoded = encodePackageName(name);
	const registryUrl = `https://registry.npmjs.org/${encoded}`;
	try {
		const data = await fetchJson(registryUrl);
		const versions = Object.keys(data.versions ?? {});
		return {
			2: getLatestByMajor(versions, 2),
			3: getLatestByMajor(versions, 3),
			4: getLatestByMajor(versions, 4),
		};
	} catch (error) {
		console.warn(`Skipping ${name}: ${error.message}`);
		return {
			2: null,
			3: null,
			4: null,
		};
	}
};

const buildSnykBadge = (name, version, major) => {
	if (!version) {
		return '-';
	}
	const encoded = encodePackageName(name);
	const badgeUrl = `https://snyk.io/test/npm/${encoded}/${version}/badge.svg`;
	const linkUrl = `https://security.snyk.io/package/npm/${encoded}/${version}`;
	return `[![Snyk v${major}](${badgeUrl})](${linkUrl})`;
};

const renderMarkdown = async (packages) => {
	const header = `# Paket-Status (npm Majors 2, 3, 4)\n\n`;
	const intro =
		'Diese Übersicht zeigt die aktuell veröffentlichten Versionen je Major für alle öffentlich verfügbaren Pakete in diesem Repository. Die Badges kommen von Snyk und verlinken direkt zur Sicherheitsübersicht pro Version.\n\n';
	const tableHeader = '| Paket | v2 | v3 | v4 |\n| --- | --- | --- | --- |\n';
	const rows = await Promise.all(
		packages.map(async (pkg) => {
			const npmUrl = `https://www.npmjs.com/package/${pkg.name}`;
			const versions = await fetchLatestVersions(pkg.name);
			return `| [${pkg.name}](${npmUrl}) | ${buildSnykBadge(pkg.name, versions[2], 2)} | ${buildSnykBadge(pkg.name, versions[3], 3)} | ${buildSnykBadge(pkg.name, versions[4], 4)} |`;
		}),
	);
	return `${header}${intro}${tableHeader}${rows}\n`;
};

const main = async () => {
	const packages = await loadPackages();
	const markdown = await renderMarkdown(packages);
	await fs.writeFile(outputPath, markdown);
	console.log(`Wrote ${outputPath}`);
};

await main();
