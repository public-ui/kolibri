import { existsSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { attributeBytes } from './attribute.mjs';

const SOURCE_MAPPING_URL = /^\/\/# sourceMappingURL=\S+\.map\s*$/gm;

/**
 * Reads a generated file without its `sourceMappingURL` comments, so the measured size does not
 * depend on whether the build wrote source maps. `packages/components/scripts/stash-source-maps.mjs`
 * applies the same transformation to the build output.
 */
export function readGenerated(path) {
	return readFileSync(path, 'utf8').replace(SOURCE_MAPPING_URL, '').replace(/\n+$/, '\n');
}

/**
 * Returns the bytes per source of a generated file, or `null` if no source map exists. The map is
 * looked up as `<mapDir>/<file>.map` first, then next to the file.
 */
export async function attributeFile(path, code, mapDir) {
	const candidates = [mapDir ? join(mapDir, `${basename(path)}.map`) : null, `${path}.map`].filter(Boolean);
	const mapPath = candidates.find((candidate) => existsSync(candidate));
	if (!mapPath) {
		return null;
	}
	return attributeBytes(code, JSON.parse(readFileSync(mapPath, 'utf8')));
}
