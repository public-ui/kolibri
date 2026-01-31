import { promises as fs } from 'node:fs';
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

const buildSnykBadge = (name, major) => {
	const encoded = encodePackageName(name);
	const range = `^${major}`;
	const badgeUrl = `https://snyk.io/test/npm/${encoded}/${range}/badge.svg`;
	const linkUrl = `https://security.snyk.io/package/npm/${encoded}/${range}`;
	return `[![Snyk v${major}](${badgeUrl})](${linkUrl})`;
};

const renderMarkdown = async (packages) => {
	const header = `# Paket-Status (npm Majors 2, 3, 4)\n\n`;
	const intro =
		'Diese Übersicht zeigt die Security-Status-Badges je Major für alle öffentlich verfügbaren Pakete in diesem Repository. Die Badges kommen von Snyk und verlinken direkt zur Sicherheitsübersicht pro Major.\n\n';
	const tableHeader = '| Paket | v2 | v3 | v4 |\n| --- | --- | --- | --- |\n';
	const rows = packages.map((pkg) => {
		const npmUrl = `https://www.npmjs.com/package/${pkg.name}`;
		return `| [${pkg.name}](${npmUrl}) | ${buildSnykBadge(pkg.name, 2)} | ${buildSnykBadge(pkg.name, 3)} | ${buildSnykBadge(pkg.name, 4)} |`;
	});
	return `${header}${intro}${tableHeader}${rows.join('\n')}\n`;
};

const main = async () => {
	const packages = await loadPackages();
	const markdown = await renderMarkdown(packages);
	await fs.writeFile(outputPath, markdown);
	console.log(`Wrote ${outputPath}`);
};

await main();
