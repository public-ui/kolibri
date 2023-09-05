import fs from 'fs';
import path from 'path';
import { FileExtension, PackageJson } from '../../types';

/**
 * Recursively searches for files with the specified extension in the specified directory.
 * @param {string} dir The directory to search in
 * @param {FileExtension | FileExtension[]} ext The extension to search for
 * @returns {string[]} The found files
 */
export function filterFilesByExt(dir: string, ext: FileExtension | FileExtension[]): string[] {
	ext = Array.isArray(ext) ? ext : [ext];
	let files: string[] = [];
	const dirPath = path.resolve(process.cwd(), dir);
	fs.readdirSync(dirPath).forEach((file) => {
		const fullPath = path.resolve(dir, file);
		if (fs.lstatSync(fullPath).isDirectory()) {
			files = files.concat(filterFilesByExt(fullPath, ext));
		} else if (ext.includes(path.extname(fullPath).replace('.', '') as FileExtension)) {
			files.push(fullPath);
		}
	});
	return files;
}

/**
 * This function is used to get the versions of @public-ui in the package.json.
 * @param {Record<string, unknown>} packageJson The package.json as object
 * @returns {Map<string, string>} The versions of @public-ui packages
 */
export function getPublicUiVersions(packageJson: Record<string, unknown>): Map<string, string> {
	const publicUiVersions = new Map<string, string>();
	const dependencies = packageJson.dependencies ?? {};
	const devDependencies = packageJson.devDependencies ?? {};
	for (const [name, version] of Object.entries({
		...dependencies,
		...devDependencies,
	})) {
		if (name.startsWith('@public-ui/')) {
			publicUiVersions.set(name, version as string);
		}
	}
	return publicUiVersions;
}

/**
 * This function is used to get the version of the package.json as string.
 * @param {string} offsetPath The offset path to the package.json
 * @returns {string} The package.json as string
 */
export function readPackageString(offsetPath: string): string {
	offsetPath = path.resolve(offsetPath, 'package.json');
	if (!fs.existsSync(offsetPath)) {
		throw new Error(`${offsetPath} not found`);
	}
	return fs.readFileSync(offsetPath, 'utf8');
}

/**
 * This function is used to get the version of the package.json.
 * @param {string} offsetPath The offset path to the package.json
 * @returns {PackageJson} The package.json as object
 */
export function readPackageJson(offsetPath: string): PackageJson {
	const content = readPackageString(offsetPath);
	let json: Record<string, unknown>;
	try {
		json = JSON.parse(content) as Record<string, unknown>;
	} catch (err) {
		throw new Error(`Error reading package.json: ${(err as Error).message}`);
	}
	return json as PackageJson;
}

/**
 * This function is used to get the package manager install command.
 * @param {string} baseDir The base directory to start searching for the package manager
 * @returns {string} The package manager install command
 */
export function getPackageManagerInstallCommand(baseDir: string = process.cwd()) {
	if (fs.existsSync(path.resolve(baseDir, 'pnpm-lock.yaml'))) return 'pnpm i';
	if (fs.existsSync(path.resolve(baseDir, 'yarn.lock'))) return 'yarn';
	if (fs.existsSync(path.resolve(baseDir, 'package-lock.json'))) return 'npm i';
	baseDir = path.resolve(baseDir, '..');
	if (baseDir === '/') {
		throw new Error('Package manager could not detected.');
	}
	return getPackageManagerInstallCommand(baseDir);
}
