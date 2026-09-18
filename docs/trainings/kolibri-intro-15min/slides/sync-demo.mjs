#!/usr/bin/env node
/**
 * Legt public/demo/ an und spiegelt die Schulungsdemo hinein, damit die
 * Slidev-Folien die Original-Seiten als iframe einbetten koennen.
 *
 * Die HTML/CSS-Dateien werden bei jedem Lauf aktualisiert, der 26-MB-vendor/
 * Ordner nur, wenn er (nach fetch-vendor.mjs) fehlt. Das haelt den Start schnell.
 */
import { access, cp, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const DEMO = join(HERE, '..', 'demo');
const PUBLIC = join(HERE, 'public', 'demo');

const exists = (p) =>
	access(p).then(
		() => true,
		() => false,
	);

await mkdir(PUBLIC, { recursive: true });
// Alles ausser vendor immer frisch spiegeln (Billig-Kopien, wenige KB).
for (const entry of await (await import('node:fs/promises')).readdir(DEMO)) {
	if (entry === 'vendor') continue;
	await cp(join(DEMO, entry), join(PUBLIC, entry), { recursive: true });
}
// vendor nur einmal holen - ist teuer und aendert sich nur per fetch-vendor.mjs.
if (!(await exists(join(PUBLIC, 'vendor')))) {
	const vendor = join(DEMO, 'vendor');
	if (!(await exists(vendor))) {
		console.error('FEHLT: demo/vendor/ - bitte zuerst im Ordner kolibri-intro-15min ausfuehren: node fetch-vendor.mjs');
		process.exit(1);
	}
	console.log('Spiegele demo/vendor/ nach public/demo/vendor/ (einmalig, 26 MB) ...');
	await cp(vendor, join(PUBLIC, 'vendor'), { recursive: true });
}
console.log('public/demo/ ist aktuell.');
