import type { Command } from 'commander';
import os from 'os';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

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
	const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

	const relevantPackages = [
		'@public-ui/core',
		'@public-ui/angular-v17',
		'@public-ui/angular-v16',
		'@public-ui/angular-v15',
		'@public-ui/angular-v14',
		'@public-ui/angular-v13',
		'@public-ui/angular-v12',
		'@public-ui/angular-v11',
		'@public-ui/react',
		'@public-ui/preact',
		'@public-ui/react-standalone',
		'@public-ui/sample-react',
		'@public-ui/hydrate',
		'@public-ui/vue',
		'@public-ui/components',
		'@public-ui/themes',
		'@public-ui/solid',
		'@public-ui/schema',
		'react',
		'react-dom',
		'typescript',
	];
	const packagesInfo: PackageInfo = {};

	relevantPackages.forEach((pkg) => {
		packagesInfo[pkg] = packageJson?.dependencies?.[pkg] || packageJson?.devDependencies?.[pkg] || 'N/A';
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
		.description('This command returns informations about your system.')
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
