// Compiles the four style sources of the spike into CSS strings.
//
// The a11y preset and the base component layer come from the components package sources, the
// theme layers from the default theme sources — the same files the Stencil build and the theme
// build consume. The default theme imports `~@public-ui/components/index` (webpack-style tilde
// convention); the custom importer strips the tilde and resolves against the components package.
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'sass';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '../../../..');
const componentsDir = path.join(repoRoot, 'packages/components');
const themesDir = path.join(repoRoot, 'packages/themes/default');
const outDir = path.join(here, '../src/styles');

const tildeImporter = {
	findFileUrl(url) {
		if (url.startsWith('~')) {
			// `~@public-ui/components/index` refers to the components package's own `index.scss`.
			const withoutTilde = url.slice(1).replace(/^@public-ui\/components/, componentsDir);
			return new URL(`file://${withoutTilde}.scss`);
		}
		return null;
	},
};

const jobs = [
	{ source: path.join(componentsDir, 'src/components/a11y.scss'), output: 'a11y.css', loadPaths: [path.join(componentsDir, 'src/components')] },
	{
		source: path.join(componentsDir, 'src/components/button/style.scss'),
		output: 'button-base.css',
		loadPaths: [path.join(componentsDir, 'src/components')],
	},
	{ source: path.join(themesDir, 'src/global.scss'), output: 'theme-global.css', loadPaths: [themesDir] },
	{ source: path.join(themesDir, 'src/components/button.scss'), output: 'theme-button.css', loadPaths: [themesDir] },
];

mkdirSync(outDir, { recursive: true });
for (const job of jobs) {
	const result = compile(job.source, {
		loadPaths: job.loadPaths,
		importers: [tildeImporter],
		silenceDeprecations: ['legacy-js-api', 'import', 'global-builtin', 'mixed-decls', 'color-functions'],
	});
	writeFileSync(path.join(outDir, job.output), result.css);
	console.log(`${job.output}: ${result.css.length} bytes`);
}
