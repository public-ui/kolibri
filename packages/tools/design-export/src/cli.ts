import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildIr } from './build-ir.js';
import { buildPenpotBundle } from './dtcg.js';
import { extractApi } from './extract-api.js';
import { extractBem } from './extract-bem.js';
import { extractTokens, loadThemeStyles } from './extract-tokens.js';
import type { Scenario } from './render/render-svg.js';
import { renderScenarios } from './render/render-svg.js';
import { DEFAULT_SCENARIOS } from './scenarios.js';
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
	const scenarios = filterScenarios(DEFAULT_SCENARIOS, options.components);

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

	let dom: Record<string, DomNode> = {};
	let svgs: Record<string, { scheme: 'light' | 'dark'; state: string; file: string }[]> = {};
	if (options.render !== false) {
		console.log(`Rendere ${scenarios.length} Szenarien (Playwright) …`);
		const result = await renderScenarios(repoRoot, scenarios, penpotDir, await resolveHarnessPath());
		dom = result.dom;
		svgs = result.svgs;
		console.log(`${Object.values(svgs).flat().length} SVG-Exporte erzeugt.`);
	}

	const states = Object.fromEntries(scenarios.map((scenario) => [scenario.tag, scenario.states]));
	const ir = buildIr({
		componentsVersion: await readPackageVersion(componentsRoot),
		themeVersion: await readPackageVersion(themeRoot),
		themeName: styles.name,
		tokens,
		apis,
		bems,
		doms: dom,
		states,
		svgs,
	});
	await writeFile(join(outDir, 'ir.json'), JSON.stringify(ir, null, '\t'), 'utf-8');
	console.log(`IR (Schema ${ir.schema}) geschrieben: ${join(outDir, 'ir.json')} — ${ir.components.length} Komponenten.`);
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
