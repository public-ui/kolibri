import { existsSync, readFileSync } from 'node:fs';
import { attributeBytes } from './attribute.mjs';

const SOURCE_MAPPING_URL = /\n?\/\/# sourceMappingURL=[^\n]*\s*$/;

/**
 * Reads a generated file without its trailing `sourceMappingURL` comment, so the measured size does not
 * depend on whether the build wrote source maps.
 */
export function readGenerated(path) {
	return readFileSync(path, 'utf8').replace(SOURCE_MAPPING_URL, '');
}

/**
 * Returns the bytes per source of a generated file, or `null` if no `<file>.map` exists.
 */
export async function attributeFile(path, code) {
	const mapPath = `${path}.map`;
	if (!existsSync(mapPath)) {
		return null;
	}
	return attributeBytes(code, JSON.parse(readFileSync(mapPath, 'utf8')));
}
