#!/usr/bin/env node
/**
 * Holt die KoliBri-Pakete aus der npm-Registry und legt sie unter demo/vendor/ ab,
 * damit die Schulungsdemo ohne Netz und ohne Build laeuft.
 *
 *   node fetch-vendor.mjs            # Version 4.4.0
 *   node fetch-vendor.mjs 4.5.0      # andere Version
 *
 * Braucht Node 18+ (global fetch) und das Kommando `tar`. Keine npm-Abhaengigkeiten.
 */
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const HERE = dirname(fileURLToPath(import.meta.url));
const VENDOR = join(HERE, 'demo', 'vendor');
const VERSION = process.argv[2] ?? '4.4.0';

/** Was aus welchem Paket in den vendor-Ordner wandert. */
const PLAN = [
	{
		pkg: 'components',
		copy: [
			['dist/esm', 'components/dist/esm'],
			['dist/kolibri', 'components/dist/kolibri'],
			// Datei-Ebene statt Ordner: eine leere loader/-Quelle wuerde still
			// durchlaufen und die Demo mit "KoliBri wurde nicht geladen" brechen.
			['loader/index.mjs', 'components/loader/index.mjs'],
			['loader/index.d.ts', 'components/loader/index.d.ts'],
			['assets/kolicons', 'components/assets/kolicons'],
		],
	},
	{ pkg: 'theme-default', copy: [['dist/index.mjs', 'theme-default/dist/index.mjs']] },
	{
		pkg: 'theme-kern',
		copy: [
			['dist/index.mjs', 'theme-kern/dist/index.mjs'],
			['assets/fira-sans-v17-latin', 'theme-kern/assets/fira-sans-v17-latin'],
			['assets/material-symbols-subset', 'theme-kern/assets/material-symbols-subset'],
		],
	},
];

async function fetchPackage(pkg, workdir) {
	const url = `https://registry.npmjs.org/@public-ui/${pkg}/-/${pkg}-${VERSION}.tgz`;
	process.stdout.write(`  ${pkg}@${VERSION} … `);
	const res = await fetch(url);
	if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
	const tgz = join(workdir, `${pkg}.tgz`);
	await writeFile(tgz, Buffer.from(await res.arrayBuffer()));
	const out = join(workdir, pkg);
	await mkdir(out, { recursive: true });
	await run('tar', ['xzf', tgz, '-C', out, '--strip-components=1']);
	console.log('ok');
	return out;
}

async function main() {
	const workdir = join(tmpdir(), `kolibri-vendor-${Date.now()}`);
	await mkdir(workdir, { recursive: true });
	console.log(`KoliBri ${VERSION} → ${VENDOR}\n`);

	try {
		await rm(VENDOR, { recursive: true, force: true });
		for (const { pkg, copy } of PLAN) {
			const root = await fetchPackage(pkg, workdir);
			for (const [from, to] of copy) {
				const src = join(root, from);
				if (!existsSync(src)) throw new Error(`${pkg}: ${from} fehlt im Paket`);
				const dest = join(VENDOR, to);
				await mkdir(dirname(dest), { recursive: true });
				await cp(src, dest, { recursive: true });
			}
		}
		console.log('\nFertig. Demo starten:\n  npx http-server -p 8080 demo\n  → http://127.0.0.1:8080/index.html');
	} finally {
		await rm(workdir, { recursive: true, force: true });
	}
}

main().catch((error) => {
	console.error('\nFehlgeschlagen:', error.message);
	process.exit(1);
});
