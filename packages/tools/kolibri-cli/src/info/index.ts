import type { Command } from 'commander';
import os from 'os';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';
import { PackageJson } from '../types';

// Function to get the binary version
const getBinaryVersion = (command: string): string => {
	try {
		return execSync(`${command} --version`, { encoding: 'utf8' }).trim();
	} catch {
		return 'N/A';
	}
};

type OSInfo = { platform: string; arch: string; version: string };

// Get operating system information
const getOsInfo = (): OSInfo => ({
	platform: os.platform(),
	arch: os.arch(),
	version: os.release(),
});

type Binaries = { node: string; npm: string; yarn: string; pnpm: string };

// Get binaries information
const getBinariesInfo = (): Binaries => ({
	node: getBinaryVersion('node'),
	npm: getBinaryVersion('npm'),
	yarn: getBinaryVersion('yarn'),
	pnpm: getBinaryVersion('pnpm'),
});

type PackageInfo = { [key: string]: string };

// Get relevant packages information
const getRelevantPackagesInfo = (): PackageInfo => {
	const packageJsonPath = path.join(process.cwd(), 'package.json');
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8')) as PackageJson;

	const packagePattern = /^@public-ui\//;
	const packagesInfo: PackageInfo = {};

	const allDependencies = { ...packageJson?.dependencies, ...packageJson?.devDependencies };

	Object.keys(allDependencies).forEach((pkg) => {
		if (packagePattern.test(pkg)) {
			packagesInfo[pkg] = allDependencies?.[pkg];
		}
	});

	// Add specific packages not matching the pattern
	const additionalPackages = ['react', 'react-dom', 'typescript'];

	additionalPackages.forEach((pkg) => {
		packagesInfo[pkg] = allDependencies?.[pkg] || 'N/A';
	});

	return packagesInfo;
};

/**
 * This function is used to register the migrate command.
 * @param {Command} program The program object to register the command
 */
export default function (program: Command): void {
	program
		.command('info')
		.description('This command returns information about your system.')
		.action(() => {
			// Gather all information
			const systemInfo = {
				'Operating System': getOsInfo(),
				Binaries: getBinariesInfo(),
				'Relevant Packages': getRelevantPackagesInfo(),
			};
			console.log(JSON.stringify(systemInfo, null, 2));
		});
}
