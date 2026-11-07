import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildIr } from './build-ir.js';
import type { StyleAxes } from './derive-axes.js';
import { deriveAxes, readVariantTypes } from './derive-axes.js';
import { buildPenpotBundle } from './dtcg.js';
import { extractApi } from './extract-api.js';
import { extractBem } from './extract-bem.js';
import { extractTokens, loadThemeStyles } from './extract-tokens.js';
import { buildPenpotImport, stableStringify } from './penpot-import.js';
import type { ShapeNode } from './render/dom-to-shapes.js';
import type { Scenario } from './render/render-svg.js';
import { renderScenarios } from './render/render-svg.js';
import { buildScenarios } from './scenarios.js';
import type { DomNode } from './types.js';
import { createZip } from './zip.js';

const REQUIRE = createRequire(import.meta.url);

interface CliOptions {
	out?: string;
	components?: string;
	render?: boolean;
}

/**
 * Pipeline entry point: web components in, design tool files out.
 *
 * 1. Theme tokens (compiled global CSS) -> Penpot token bundle (W3C DTCG, ZIP)
 * 2. API metadata (custom-elements.json) + BEM registry -> IR
 * 3. Rendered scenarios -> DOM structure + layered SVG per scheme and state
 *
 * The IR is tool-neutral; the Penpot bundle is the first target adapter.
 */
export async function run(options: CliOptions = {}): Promise<void> {
	// Paket-Root über den Haupteinstieg auflösen: theme-default exportiert package.json nicht.
	const componentsRoot = dirname(dirname(REQUIRE.resolve('@public-ui/components')));
	const themeRoot = dirname(dirname(REQUIRE.resolve('@public-ui/theme-default')));
	const repoRoot = join(componentsRoot, '..', '..');
	const outDir = options.out ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'dist-export');

	console.log('Lade Theme …');
	const styles = await loadThemeStyles(join(themeRoot, 'dist', 'index.mjs'));
	const tokens = extractTokens(styles.globalCss);
	console.log(
		`${tokens.length} Tokens aus Layer kol-theme-global extrahiert (${tokens.filter((token) => token.dark !== undefined).length} mit Light/Dark-Paar).`,
	);

	const penpotDir = join(outDir, 'penpot');
	await mkdir(penpotDir, { recursive: true });
	await mkdir(join(penpotDir, 'svg'), { recursive: true });
	const bundle = buildPenpotBundle(tokens, styles.name);
	for (const [name, content] of Object.entries(bundle.files)) {
		await writeFile(join(penpotDir, name), content, 'utf-8');
	}
	await writeFile(join(penpotDir, 'kolibri-design-tokens.zip'), createZip(bundle.files));
	console.log(`Penpot-Token-Bundle geschrieben: ${penpotDir} (${Object.keys(bundle.files).length + 1} Dateien inkl. ZIP).`);

	console.log('Lese API-Metadaten und BEM-Registry …');
	const apis = await extractApi(join(componentsRoot, 'custom-elements.json'));
	const bems = await extractBem(join(componentsRoot, 'src', 'schema', 'bem-registry.ts'));

	// Stilachsen aus Implementierung (Prop-Typen), BEM-Registry und Theme-CSS, nicht von Hand gepflegt.
	const variantTypes = readVariantTypes(join(componentsRoot, 'src', 'components.d.ts'));
	const axes: Record<string, StyleAxes> = Object.fromEntries(
		apis.map((api) => [
			api.tag,
			deriveAxes(
				api,
				bems.find((bem) => bem.block === api.tag),
				styles.componentCss[api.tag],
				variantTypes[api.tag],
			),
		]),
	);
	const scenarios = filterScenarios(buildScenarios(axes), options.components);

	let dom: Record<string, DomNode> = {};
	let svgs: Record<string, { scheme: 'light' | 'dark'; state: string; file: string }[]> = {};
	let shapes: Record<string, ShapeNode> = {};
	let states: Record<string, string[]> = {};
	if (options.render !== false) {
		console.log(`Rendere ${scenarios.length} Szenarien (Playwright) …`);
		const result = await renderScenarios(repoRoot, scenarios, penpotDir, await resolveHarnessPath());
		dom = result.dom;
		svgs = result.svgs;
		shapes = result.shapes;
		states = result.states;
		console.log(`${Object.values(svgs).flat().length} SVG-Exporte erzeugt.`);
	}

	const statesByTag: Record<string, string[]> = {};
	for (const scenario of scenarios) {
		statesByTag[scenario.tag] = [...new Set([...(statesByTag[scenario.tag] ?? []), ...(states[scenario.id] ?? scenario.states ?? ['default'])])];
	}
	const ir = buildIr({
		componentsVersion: await readPackageVersion(componentsRoot),
		themeVersion: await readPackageVersion(themeRoot),
		themeName: styles.name,
		tokens,
		apis,
		bems,
		doms: dom,
		states: statesByTag,
		svgs,
	});
	await writeFile(join(outDir, 'ir.json'), JSON.stringify(ir, null, '\t'), 'utf-8');
	console.log(`IR (Schema ${ir.schema}) geschrieben: ${join(outDir, 'ir.json')} — ${ir.components.length} Komponenten.`);

	const { payload, report } = buildPenpotImport({
		axes,
		bems,
		scenarios,
		shapes,
		states,
		themeName: styles.name,
		tokens,
		version: { components: ir.sources.components, theme: ir.sources.theme },
	});
	await writeFile(join(penpotDir, 'penpot-import.json'), stableStringify(payload), 'utf-8');
	const unbound = [...new Set(report.binding.unbound.map((entry) => entry.slice(entry.lastIndexOf(' ') + 1)))];
	console.log(
		`Penpot-Plugin-Import (penpot-import.json): ${payload.components.length} Komponenten in ${Object.keys(payload.sets).length} Variant-Sets; Token-Bindung: ${unbound.length === 0 ? 'alle Farben gebunden' : `${unbound.length} Farben ohne Token (${unbound.join(', ')})`}, ${report.binding.ambiguous.length} mehrdeutig.`,
	);
	if (report.droppedUnset.length > 0) console.log(`Ungesetztes _variant wie ein Wert gerendert, entfallen: ${report.droppedUnset.join(', ')}`);
	if (report.unregisteredLayers.length > 0) console.warn(`Ebenen ohne Eintrag in der BEM-Registry: ${report.unregisteredLayers.join(', ')}`);
	await copyPenpotPlugin(outDir);
}

/** Copies the plugin sources next to the import data, so one server hosts both. */
async function copyPenpotPlugin(outDir: string): Promise<void> {
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

/** The harness ships next to the compiled code; during development the source copy is the fallback. */
async function resolveHarnessPath(): Promise<string> {
	const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
	const candidates = [join(packageRoot, 'dist', 'render', 'harness.html'), join(packageRoot, 'src', 'render', 'harness.html')];
	for (const candidate of candidates) {
		if (
			await readFile(candidate).then(
				() => true,
				() => false,
			)
		) {
			return candidate;
		}
	}
	throw new Error(`harness.html nicht gefunden: ${candidates.join(' oder ')}`);
}

function filterScenarios(scenarios: Scenario[], components?: string): Scenario[] {
	if (!components) {
		return scenarios;
	}
	const wanted = components.split(',').map((tag) => tag.trim());
	return scenarios.filter((scenario) => wanted.includes(scenario.tag));
}

/** Bin entry: parses `--out`, `--components` and `--no-render` from argv. */
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
	const args = process.argv.slice(2);
	const valueOf = (name: string): string | undefined => {
		const index = args.indexOf(`--${name}`);
		return index >= 0 ? args[index + 1] : undefined;
	};
	run({
		out: valueOf('out'),
		components: valueOf('components'),
		render: !args.includes('--no-render'),
	}).catch((error: unknown) => {
		console.error(error);
		process.exitCode = 1;
	});
}

async function readPackageVersion(root: string): Promise<string> {
	const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf-8')) as { version: string };
	return pkg.version;
}
