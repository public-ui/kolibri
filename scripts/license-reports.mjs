#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const outputIndex = args.indexOf('--output');
const outputPath = outputIndex === -1 ? 'docs/LICENSE_REPORTS.md' : args[outputIndex + 1];

if (!outputPath) {
	console.error('Usage: node scripts/license-reports.mjs [--output <docs/LICENSE_REPORTS.md>]');
	process.exit(1);
}

const reportTargets = [
	{ name: 'adapter-angular-v19', packageJsonPath: 'packages/adapters/angular/v19/package.json' },
	{ name: 'adapter-angular-v20', packageJsonPath: 'packages/adapters/angular/v20/package.json' },
	{ name: 'adapter-angular-v21', packageJsonPath: 'packages/adapters/angular/v21/package.json' },
	{ name: 'adapter-hydrate', packageJsonPath: 'packages/adapters/hydrate/package.json' },
	{ name: 'adapter-preact', packageJsonPath: 'packages/adapters/preact/package.json' },
	{ name: 'adapter-react', packageJsonPath: 'packages/adapters/react/package.json' },
	{ name: 'adapter-react-standalone', packageJsonPath: 'packages/adapters/react-standalone/package.json' },
	{ name: 'adapter-solid', packageJsonPath: 'packages/adapters/solid/package.json' },
	{ name: 'adapter-svelte', packageJsonPath: 'packages/adapters/svelte/package.json' },
	{ name: 'adapter-vue', packageJsonPath: 'packages/adapters/vue/package.json' },
	{ name: 'components', packageJsonPath: 'packages/components/package.json' },
	{ name: 'icons', packageJsonPath: 'packages/icons/package.json' },
	{ name: 'root', packageJsonPath: 'package.json' },
	{ name: 'sample-react', packageJsonPath: 'packages/samples/react/package.json' },
	{ name: 'theme-bwst', packageJsonPath: 'packages/themes/bwst/package.json' },
	{ name: 'theme-default', packageJsonPath: 'packages/themes/default/package.json' },
	{ name: 'theme-desy', packageJsonPath: 'packages/themes/desy/package.json' },
	{ name: 'theme-ecl', packageJsonPath: 'packages/themes/ecl/package.json' },
	{ name: 'theme-kern', packageJsonPath: 'packages/themes/kern/package.json' },
	{ name: 'themes', packageJsonPath: 'packages/themes/package.json' },
	{ name: 'tools-kolibri-cli', packageJsonPath: 'packages/tools/kolibri-cli/package.json' },
	{ name: 'tools-mcp', packageJsonPath: 'packages/tools/mcp/package.json' },
	{ name: 'tools-visual-tests', packageJsonPath: 'packages/tools/visual-tests/package.json' },
].sort((a, b) => a.name.localeCompare(b.name));

const escapeMarkdownCell = (value) =>
	String(value).replaceAll('\\', '\\\\').replaceAll('|', '\\|').replaceAll('\r\n', '<br>').replaceAll('\n', '<br>').replaceAll('\r', '<br>');

const runLicenseReport = (packageJsonPath) => {
	const result = spawnSync('pnpm', ['exec', 'license-report', '--output=json', `--package=${packageJsonPath}`], {
		encoding: 'utf8',
	});

	if (result.status !== 0) {
		const stderr = (result.stderr || '').trim();
		const stdout = (result.stdout || '').trim();
		const details = stderr || stdout || `Command failed with exit code ${result.status}`;
		throw new Error(details);
	}

	let parsed;
	try {
		parsed = JSON.parse(result.stdout);
	} catch (error) {
		throw new Error(`Invalid JSON output: ${error.message}`);
	}

	if (!Array.isArray(parsed)) {
		throw new Error('Expected JSON array output from license-report');
	}

	return parsed;
};

const lines = ['# License Reports', '', '> Overview of licenses for all packages in Kolibri.', ''];
const errors = [];

for (const target of reportTargets) {
	try {
		const report = runLicenseReport(target.packageJsonPath);

		lines.push(`## ${target.name}`);
		lines.push('');
		lines.push('| Package | License | Version | Author |');
		lines.push('| --- | --- | --- | --- |');

		const sortedDeps = [...report].sort((a, b) => {
			const licenseCompare = (a.licenseType || '').localeCompare(b.licenseType || '');
			if (licenseCompare !== 0) return licenseCompare;
			return (a.name || '').localeCompare(b.name || '');
		});

		for (const dep of sortedDeps) {
			const name = escapeMarkdownCell(dep.name || 'unknown');
			const license = escapeMarkdownCell(dep.licenseType || 'unknown');
			const version = escapeMarkdownCell(dep.installedVersion || '–');
			const author = escapeMarkdownCell(dep.author ? dep.author.split('<')[0].trim() : '–');

			lines.push(`| ${name} | ${license} | ${version} | ${author} |`);
		}

		lines.push('');
	} catch (error) {
		errors.push(`${target.name} (${target.packageJsonPath}): ${error.message}`);
	}
}

if (errors.length > 0) {
	console.error('Failed to generate one or more license reports:');
	for (const error of errors) {
		console.error(`- ${error}`);
	}
	process.exit(1);
}

const outputDir = path.dirname(outputPath);
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, `${lines.join('\n')}\n`, 'utf8');

console.log(`License report generated: ${outputPath}`);
