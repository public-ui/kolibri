/**
 * Moves the source maps of a build with `KOLIBRI_SOURCE_MAP=true` out of `dist` and `www` into
 * `source-maps/<output>/` and removes the `sourceMappingURL` comments from the generated files.
 *
 * Bundlers resolve the lazy loader's dynamic import `./${bundleId}.entry.js…` with the glob
 * `./*.entry.js*`, which also matches `*.entry.js.map` next to the chunks and fails on it. Outside
 * the outputs the maps stay available to the size gate (`kolibri-size-gate components`), while `dist`
 * matches a build without source maps. Without source maps in the outputs this script does nothing.
 */
import { mkdirSync, readdirSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const OUTPUTS = ['dist', 'www'];
const TARGET = 'source-maps';
const SOURCE_MAPPING_URL = /^\/\/# sourceMappingURL=\S+\.map\s*$/gm;

function* walk(dir) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) {
			yield* walk(path);
		} else {
			yield path;
		}
	}
}

const maps = OUTPUTS.flatMap((output) => {
	try {
		return [...walk(output)].filter((path) => path.endsWith('.map'));
	} catch {
		return [];
	}
});

if (maps.length > 0) {
	rmSync(TARGET, { force: true, recursive: true });
	for (const map of maps) {
		const target = join(TARGET, relative('dist', map).startsWith('..') ? map : relative('dist', map));
		mkdirSync(dirname(target), { recursive: true });
		renameSync(map, target);
		const generated = map.slice(0, -'.map'.length);
		try {
			const code = readFileSync(generated, 'utf8');
			writeFileSync(generated, code.replace(SOURCE_MAPPING_URL, '').replace(/\n+$/, '\n'));
		} catch {
			// A map without its generated file has no comment to remove.
		}
	}
	console.log(`Moved ${maps.length} source maps to ${TARGET}/.`);
}
