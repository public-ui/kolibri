import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
/** Copies the plugin sources next to the import data, so one server hosts both. */
export async function copyPenpotPlugin(outDir) {
	const sourceDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'penpot-plugin');
	const targetDir = join(outDir, 'penpot-plugin');
	await mkdir(targetDir, { recursive: true });
	for (const name of ['manifest.json', 'index.js', 'index.html']) {
		const body = await readFile(join(sourceDir, name)).catch(() => null);
		if (body) {
			await writeFile(join(targetDir, name), body);
		}
	}
}
