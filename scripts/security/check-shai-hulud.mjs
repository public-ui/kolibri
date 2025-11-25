#!/usr/bin/env node
import fs from 'node:fs';
import https from 'node:https';
import path from 'node:path';

const ISSUE_URL = 'https://api.github.com/repos/public-ui/kolibri/issues/8906';
const LOCKFILE_PATH = path.join(process.cwd(), 'pnpm-lock.yaml');
const FALLBACK_PACKAGE_LIST_PATH = path.join(process.cwd(), 'scripts/security/shai-hulud-2-packages.txt');
const IGNORED_DIRECTORIES = new Set(['.git', '.nx', '.turbo', 'coverage', 'dist', 'license-reports', 'node_modules', 'tmp']);

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const fetchIssueBody = () =>
	new Promise((resolve, reject) => {
		https
			.get(
				ISSUE_URL,
				{
					headers: {
						Accept: 'application/vnd.github+json',
						'User-Agent': 'kolibri-shai-hulud-audit',
					},
					family: 4,
				},
				(response) => {
					if (response.statusCode !== 200) {
						reject(new Error(`Failed to fetch issue ${ISSUE_URL}: HTTP ${response.statusCode}`));
						return;
					}

					const chunks = [];
					response.on('data', (chunk) => chunks.push(chunk));
					response.on('end', () => {
						try {
							const payload = JSON.parse(Buffer.concat(chunks).toString('utf8'));
							resolve(payload.body ?? '');
						} catch (error) {
							reject(error);
						}
					});
				},
			)
			.on('error', reject);
	});

const extractPackageList = (source) => {
	const packageBlockMatch = source.match(/```bash\s*([\s\S]*?)```/);
	const packageSection = packageBlockMatch ? packageBlockMatch[1] : source;
	const packages = new Set(
		packageSection
			.split('\n')
			.map((entry) => entry.trim())
			.filter(Boolean)
			.filter((entry) => !entry.startsWith('#')),
	);

	if (packages.size === 0) {
		throw new Error('No packages found in the compromised list.');
	}

	return [...packages];
};

const loadPackages = async () => {
	try {
		const issueBody = await fetchIssueBody();
		return { packages: extractPackageList(issueBody), source: 'issue' };
	} catch (error) {
		console.warn(`Failed to load ${ISSUE_URL}: ${error.message}`);
		const fallbackBody = await fs.promises.readFile(FALLBACK_PACKAGE_LIST_PATH, 'utf8');
		return { packages: extractPackageList(fallbackBody), source: 'fallback' };
	}
};

const readLockfile = async () => fs.promises.readFile(LOCKFILE_PATH, 'utf8');

const findLockfileMatches = (packages, lockfileContent) =>
	packages.filter((packageName) => new RegExp(`\n\s*name: ['"]?${escapeRegex(packageName)}['"]?`).test(lockfileContent));

const findPackageJsonFiles = async (directory) => {
	const entries = await fs.promises.readdir(directory, { withFileTypes: true });
	const packageJsonPaths = [];

	for (const entry of entries) {
		if (IGNORED_DIRECTORIES.has(entry.name)) {
			continue;
		}

		const entryPath = path.join(directory, entry.name);

		if (entry.isDirectory()) {
			const nestedPackageJsons = await findPackageJsonFiles(entryPath);
			packageJsonPaths.push(...nestedPackageJsons);
			continue;
		}

		if (entry.isFile() && entry.name === 'package.json') {
			packageJsonPaths.push(entryPath);
		}
	}

	return packageJsonPaths;
};

const findPackageJsonMatches = async (packages) => {
	const packageJsonPaths = await findPackageJsonFiles(process.cwd());
	const compromisedPackageSet = new Set(packages);
	const matches = new Map();

	for (const packageJsonPath of packageJsonPaths) {
		const content = await fs.promises.readFile(packageJsonPath, 'utf8');
		const manifest = JSON.parse(content);
		const compromisedDependencies = new Set();

		['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies'].forEach((key) => {
			const dependencies = manifest[key];
			if (!dependencies) {
				return;
			}

			Object.keys(dependencies).forEach((dependencyName) => {
				if (compromisedPackageSet.has(dependencyName)) {
					compromisedDependencies.add(dependencyName);
				}
			});
		});

		if (compromisedDependencies.size > 0) {
			matches.set(packageJsonPath, [...compromisedDependencies].sort());
		}
	}

	return matches;
};

const logMatches = (matches) => {
	if (matches.size === 0) {
		return;
	}

	console.error('\nCompromised dependencies referenced in package.json files:');
	for (const [filePath, packages] of matches.entries()) {
		console.error(`- ${path.relative(process.cwd(), filePath)}:`);
		packages.forEach((packageName) => console.error(`  - ${packageName}`));
	}
};

const main = async () => {
	try {
		const { packages: compromisedPackages, source } = await loadPackages();
		const lockfileContent = await readLockfile();
		const lockfileMatches = findLockfileMatches(compromisedPackages, lockfileContent);
		const packageJsonMatches = await findPackageJsonMatches(compromisedPackages);
		const compromisedCount = compromisedPackages.length.toLocaleString('en-US');

		console.log(`Checked ${compromisedCount} packages from ${source === 'issue' ? ISSUE_URL : FALLBACK_PACKAGE_LIST_PATH}.`);
		if (source === 'fallback') {
			console.warn('Issue fetch failed; used the local Shai-Hulud package list instead.');
		}

		if (lockfileMatches.length === 0) {
			console.log('No compromised packages found in pnpm-lock.yaml.');
		} else {
			console.error('\nCompromised dependencies present in pnpm-lock.yaml:');
			lockfileMatches.forEach((packageName) => console.error(`- ${packageName}`));
		}

		logMatches(packageJsonMatches);

		if (lockfileMatches.length > 0 || packageJsonMatches.size > 0) {
			process.exitCode = 1;
		}
	} catch (error) {
		console.error(`Audit failed: ${error.message}`);
		process.exitCode = 1;
	}
};

void main();
