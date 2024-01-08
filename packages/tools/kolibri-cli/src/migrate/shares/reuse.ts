import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

import { FileExtension, PackageJson } from '../../types';
import { RemoveMode } from '../types';

/**
 * This function is used to exit the process with an error message.
 * @param {string} msg The error message
 * @param {string} hint The hint message
 * @returns {Error} The error object
 */
export function logAndCreateError(msg: string, hint?: string) {
	const hintText = hint
		? chalk.yellow(
				`
ℹ️ `,
				chalk.underline.bold(`Hinweis:`),
				hint,
				`
`,
			)
		: '';
	console.log(
		chalk.red(
			chalk.underline.bold(`
Error:`),
			`${msg}
`,
		),
		hintText,
		`
  👉 You can report this error to`,
		chalk.blue(`https://github.com/public-ui/kolibri/issues/new?title=CLI:+`),
		`
`,
	);
	// @todo process.exit(1); // makes `hint` undefined - ?!
	return new Error();
}

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
 * This function is used to get the version of the package.json as string.
 * @param {string} offsetPath The offset path to the package.json
 * @returns {string} The package.json as string
 */
function readPackageString(offsetPath: string): string {
	offsetPath = path.resolve(offsetPath, 'package.json');
	if (!fs.existsSync(offsetPath)) {
		throw logAndCreateError(`The following "package.json" does not exists: ${offsetPath}`);
	}
	return fs.readFileSync(offsetPath, 'utf8');
}

/**
 * This function is used to get the version of the package.json.
 * @param {string} offsetPath The offset path to the package.json
 * @returns {PackageJson} The package.json as object
 */
function readPackageJson(offsetPath: string): PackageJson {
	const content = readPackageString(offsetPath);
	let json: Record<string, unknown>;
	try {
		json = JSON.parse(content) as Record<string, unknown>;
	} catch (err) {
		throw logAndCreateError(`The following "package.json" content could not parse: ${content}`);
	}
	return json as PackageJson;
}

export type PackageManagerCommand = 'add' | 'install' | 'remove';

/**
 * This function is used to get the package manager install command.
 * @param {PackageManagerCommand} command The package manager command
 * @param {string} baseDir The base directory to start searching for the package manager
 * @returns {string} The package manager install command
 */
export function getPackageManagerCommand(command: PackageManagerCommand, baseDir: string = process.cwd()) {
	if (fs.existsSync(path.resolve(baseDir, 'pnpm-lock.yaml'))) return `pnpm ${command}`;
	if (fs.existsSync(path.resolve(baseDir, 'yarn.lock'))) return `yarn ${command}`;
	if (fs.existsSync(path.resolve(baseDir, 'package-lock.json'))) return `npm ${command}`;
	baseDir = path.resolve(baseDir, '..');
	if (baseDir === '/') {
		throw logAndCreateError('Package manager could not detected.');
	}
	return getPackageManagerCommand(command, baseDir);
}

export const isKebabCaseRegExp = /^((data-removed-)?[a-z]+(-[a-z]+)*)?$/;
export const isTagKebabCaseRegExp = /^kol-[a-z]+(-[a-z]+)*$/;
export const isPropertyKebabCaseRegExp = /^(data-removed-)?_[a-z]+(-[a-z]+)*$/;

/**
 * Converts a kebab case string to a capital case string.
 * @param {string} str The kebab case string
 * @returns {string} The capital case string
 */
export function kebabToCapitalCase(str: string) {
	return str
		.split('-') // Split on hyphen
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
		.join(''); // Join without space
}

/**
 * Converts a kebab case string to a camel case string.
 * @param {string} str The kebab case string
 * @returns {string} The camel case string
 */
export function kebabToCamelCase(str: string) {
	return str
		.split('-') // Split on hyphen
		.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())) // Capitalize each word
		.join(''); // Join without space
}

export const MODIFIED_FILES = new Set<string>();

let REMOVE_MODE: RemoveMode = 'prefix';

/**
 * Sets the remove mode.
 * @param {RemoveMode} mode The remove mode
 */
export function setRemoveMode(mode: RemoveMode): void {
	REMOVE_MODE = mode;
}

/**
 * Gets the remove mode.
 * @returns {RemoveMode} The remove mode
 */
export function getRemoveMode(): RemoveMode {
	return REMOVE_MODE;
}

export const getContentOfProjectPkgJson = (): string => {
	try {
		return readPackageString(path.resolve(process.cwd()));
	} catch (err) {
		throw logAndCreateError('Could not read content of project "package.json"!');
	}
};
export const getVersionOfPublicUiComponents = (): string => {
	try {
		return readPackageJson(path.resolve(process.cwd(), 'node_modules/@public-ui/components')).version;
	} catch (err) {
		throw logAndCreateError(
			'Could not get version of installed "@public-ui/components" package!',
			'Check that you are in the root directory of your project and that the package "@public-ui/components" is installed.',
		);
	}
};
export const getVersionOfPublicUiKoliBriCli = (): string => {
	try {
		return readPackageJson(path.resolve(__dirname, '..', '..', '..')).version;
	} catch (err) {
		throw logAndCreateError(
			'Could not get version of global installed "@public-ui/kolibri-cli" package!',
			'Install the package with: npm i -g @public-ui/kolibri-cli',
		);
	}
};

const INDEX_HTML_LOCATIONS = ['./', 'public'];

const resolvePath = (paths: string[], offset = process.cwd()) => path.resolve(offset, ...paths);

export const resolveIndexHtmlPath = (paths: string[]) => resolvePath([...paths, 'index.html']);

const existsIndexHtml = (location: string) => fs.existsSync(resolveIndexHtmlPath([location]));

export const findIndexHtml = (baseDir: string) => {
	if (existsIndexHtml(baseDir)) {
		return baseDir;
	}
	return INDEX_HTML_LOCATIONS.find(existsIndexHtml);
};

type PostMessage = {
	message: string;
	type: 'log' | 'warn' | 'error';
};
export const POST_MESSAGES = new Set<PostMessage>();
