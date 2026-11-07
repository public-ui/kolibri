import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Runs the design export twice into separate directories and compares the Penpot plugin payload
 * byte for byte. Exits with 1 when the two runs differ. Further arguments go to the CLI, e.g.
 * `--components kol-button` for a quick check. Plain Node built-ins, no dependencies.
 */
const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const cli = join(packageRoot, 'dist', 'cli.js');
const passThrough = process.argv.slice(2);

async function exportOnce(label) {
	const out = await mkdtemp(join(tmpdir(), `design-export-${label}-`));
	const result = spawnSync(process.execPath, [cli, '--out', out, ...passThrough], { cwd: packageRoot, encoding: 'utf-8' });
	if (result.status !== 0) {
		process.stderr.write(result.stdout + result.stderr);
		throw new Error(`Export ${label} failed with exit code ${result.status}.`);
	}
	const body = await readFile(join(out, 'penpot', 'penpot-import.json'));
	await rm(out, { force: true, recursive: true });
	return { body, hash: createHash('sha256').update(body).digest('hex') };
}

const first = await exportOnce('a');
const second = await exportOnce('b');
if (first.hash !== second.hash) {
	const a = first.body.toString('utf-8').split('\n');
	const b = second.body.toString('utf-8').split('\n');
	const line = a.findIndex((text, index) => text !== b[index]);
	console.error(`Nicht deterministisch: Läufe unterscheiden sich ab Zeile ${line + 1}:\n  - ${a[line]}\n  + ${b[line]}`);
	process.exit(1);
}
console.log(`Deterministisch: zwei Läufe, identisches penpot-import.json (sha256 ${first.hash.slice(0, 16)}…, ${first.body.length} Bytes).`);
