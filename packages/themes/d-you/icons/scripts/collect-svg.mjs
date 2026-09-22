/**
 * Collects the Carbon SVGs the d-you theme needs and names them after KoliBri's own icons.
 *
 * `icons.json` is the whole mapping: KoliBri icon name → Carbon icon name. Copying under the
 * KoliBri name is what makes the rest of the pipeline trivial — svgtofont derives its class names
 * from the file names, so the generated font speaks `kolicon-*` and the theme mixin next to it
 * needs no second translation table.
 *
 * Only the mapped icons are copied: `@carbon/icons` ships 2620 of them, and a font carrying all of
 * them would be two orders of magnitude larger than the ~30 KoliBri actually asks for.
 */
import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const resolveFrom = createRequire(import.meta.url);
const PACKAGE_ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));

/* The 32px grid is the only complete set in the package; the 16/20/24px folders hold a handful of
   hand-optimised exceptions. A font glyph is scaled by the font size anyway, so the grid the
   outlines were drawn on is what matters, not the pixel size of the source. */
const CARBON_SVG_DIR = path.join(path.dirname(resolveFrom.resolve('@carbon/icons/package.json')), 'svg', '32');

const mapping = JSON.parse(fs.readFileSync(path.join(PACKAGE_ROOT, 'icons.json'), 'utf8'));
const svgDir = path.join(PACKAGE_ROOT, 'svg');
/* oslllo-svg-fixer refuses to run when its destination does not exist, so both folders are created
   here rather than by a shell `mkdir` the build would have to repeat per platform. */
const fixedDir = path.join(PACKAGE_ROOT, 'svg-fixed');

for (const dir of [svgDir, fixedDir]) {
	fs.rmSync(dir, { recursive: true, force: true });
	fs.mkdirSync(dir, { recursive: true });
}

const missing = [];
for (const [kolibriName, carbonName] of Object.entries(mapping)) {
	const source = path.join(CARBON_SVG_DIR, `${carbonName}.svg`);
	if (!fs.existsSync(source)) {
		missing.push(`${kolibriName} → ${carbonName}`);
		continue;
	}
	fs.copyFileSync(source, path.join(svgDir, `${kolibriName}.svg`));
}

if (missing.length > 0) {
	console.error(`icons.json names ${missing.length} icon(s) that @carbon/icons does not ship:\n- ${missing.join('\n- ')}`);
	process.exit(1);
}

console.log(`Collected ${Object.keys(mapping).length} Carbon icons into ${path.relative(PACKAGE_ROOT, svgDir)}.`);
