import fs from 'fs';
import path from 'path';
import { FileExtension } from '../types';

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
 * This function is used to get the version of the package.json.
 * @param {string} path The path to the package.json
 * @returns {string} The version of the package.json
 */
export function getPackageJsonVersion(path: string): string {
	if (!fs.existsSync(path)) {
		throw new Error(`${path} not found`);
	}
	const content = fs.readFileSync(path, 'utf8');
	let json: Record<string, unknown>;
	try {
		json = JSON.parse(content) as Record<string, unknown>;
	} catch (err) {
		throw new Error(`Error reading package.json: ${(err as Error).message}`);
	}
	const version = json.version as string;
	return version;
}
