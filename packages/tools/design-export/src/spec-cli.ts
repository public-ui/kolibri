import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { copyPenpotPlugin } from './copy-penpot-plugin.js';
import type { DialectFinding } from './dialect/bem-dialect.js';
import { renderDialect } from './dialect/dialect-report.js';
import { extractFcTree, indexFunctionalComponents } from './dialect/extract-fc-tree.js';
import { toSpec } from './dialect/to-spec.js';
import { buildPenpotBundle } from './dtcg.js';
import { evaluateWebComponent } from './evaluate/evaluate.js';
import { readWebComponent } from './evaluate/read-design.js';
import { extractApi } from './extract-api.js';
import { extractBem } from './extract-bem.js';
import { extractTokens, loadThemeStyles } from './extract-tokens.js';
import { stableStringify } from './penpot-import.js';
import type { CssRule, UnsupportedRule } from './spec/cascade.js';
import { checkSpecs } from './spec/check-spec.js';
import { buildCoverage, renderCoverage } from './spec/coverage.js';
import { loadComponentRules } from './spec/css-sources.js';
import { loadIcons } from './spec/icons.js';
import { combinations, transform } from './spec/transform.js';
import type { BlockDesignSpec } from './spec/types.js';
import { createZip } from './zip.js';

const REQUIRE = createRequire(import.meta.url);

/** A component with more variant combinations stays out of the library until its axes are curated. */
const MAX_VARIANTS = 96;

/**
 * Deterministic transformation without a browser: BEM registry (dialect) + functional components + compiled CSS +
 * theme tokens → Penpot plugin payload, Figma plugin payload, token bundle and gap report.
 *
 * Output in `<out>/spec/`:
 * - `penpot-import.json` – same format as the rendering pipeline, for `penpot-plugin/`
 * - `figma-import.json` – variables and component sets, for `figma-plugin/`
 * - `kolibri-design-tokens.zip` – DTCG token bundle (Penpot, Tokens Studio)
 * - `bem-dialect.md` – design properties per component and the BEM changes the dialect asks for
 * - `spec-coverage.json`, `spec-coverage.md` – what the static path covers per block
 */
export async function runSpec(options: { out?: string } = {}): Promise<void> {
	const componentsRoot = dirname(dirname(REQUIRE.resolve('@public-ui/components')));
	const themeRoot = dirname(dirname(REQUIRE.resolve('@public-ui/theme-default')));
	const outDir = join(options.out ?? join(dirname(fileURLToPath(import.meta.url)), '..', 'dist-export'), 'spec');
	await mkdir(outDir, { recursive: true });

	const theme = await loadThemeStyles(join(themeRoot, 'dist', 'index.mjs'));
	const tokens = extractTokens(theme.globalCss);
	const apis = await extractApi(join(componentsRoot, 'custom-elements.json'));
	const bems = await extractBem(join(componentsRoot, 'src', 'schema', 'bem-registry.ts'));

	// Spezifikation je Block aus Dialekt (BEM-Modifier) und Elementbaum (Functional Component).
	const fcIndex = indexFunctionalComponents(join(componentsRoot, 'src', 'internal', 'functional-components'));
	const specs: BlockDesignSpec[] = [];
	const findings: DialectFinding[] = [];
	const unread: Record<string, string[]> = {};
	for (const bem of bems) {
		const file = fcIndex.get(bem.block);
		if (!file) continue;
		const fc = extractFcTree(file, bem.block, fcIndex);
		const { spec, dialect } = toSpec(
			bem,
			apis.find((api) => api.tag === bem.block),
			fc,
			theme.componentCss[bem.block],
		);
		specs.push(spec);
		findings.push(...dialect.findings);
		if (fc.unread.length > 0) unread[bem.block] = fc.unread;
	}
	checkSpecs(specs, bems);

	// Web components with `@design` tags at their props: the variants come from running their functional components.
	const evaluated: BlockDesignSpec[] = [];
	for (const api of [...apis].sort((a, b) => a.tag.localeCompare(b.tag))) {
		const source = readWebComponent(componentsRoot, api.tag);
		if (source) evaluated.push(await evaluateWebComponent(componentsRoot, source, apis));
	}
	const transformSpecs = [...specs.filter((spec) => !evaluated.some((entry) => entry.block === spec.block)), ...evaluated];

	const rules = new Map<string, CssRule[]>();
	const unsupported = new Map<string, UnsupportedRule[]>();
	for (const bem of bems) {
		const entries: UnsupportedRule[] = [];
		rules.set(bem.block, (await loadComponentRules(componentsRoot, theme, bem.block, entries)).rules);
		unsupported.set(bem.block, entries);
	}
	for (const spec of evaluated) {
		if (!rules.has(spec.block)) rules.set(spec.block, (await loadComponentRules(componentsRoot, theme, spec.block, [])).rules);
	}

	const version = { components: await readVersion(componentsRoot), theme: await readVersion(themeRoot) };
	const library = transformSpecs
		.filter((spec) => apis.some((api) => api.tag === spec.block) && combinations(spec).length <= MAX_VARIANTS)
		.map((spec) => spec.block);
	const result = transform({ icons: loadIcons(componentsRoot), library, rules, specs: transformSpecs, themeName: theme.name, tokens, version });
	const coverage = buildCoverage({
		apis,
		bems,
		elementModifiers: new Map(
			bems.flatMap((bem) => Object.entries(bem.elementModifiers ?? {}).map(([element, values]) => [`${bem.block}__${element}`, values])),
		),
		reports: result.reports,
		rules,
		specs,
		unsupported,
	});

	const bundle = buildPenpotBundle(tokens, theme.name);
	await writeFile(join(outDir, 'kolibri-design-tokens.zip'), createZip(bundle.files));
	await writeFile(join(outDir, 'penpot-import.json'), stableStringify(result.penpot), 'utf-8');
	await writeFile(join(outDir, 'figma-import.json'), stableStringify(result.figma), 'utf-8');
	await writeFile(join(outDir, 'spec-coverage.json'), stableStringify(coverage), 'utf-8');
	await writeFile(join(outDir, 'spec-coverage.md'), renderCoverage(coverage, apis), 'utf-8');
	await writeFile(
		join(outDir, 'bem-dialect.md'),
		renderDialect(
			specs,
			findings,
			unread,
			apis.map((api) => api.tag).filter((tag) => !fcIndex.has(tag)),
		),
		'utf-8',
	);

	console.log(
		`Spezifikationen aus BEM + Functional Components: ${specs.length}; ausgewertet über @design: ${evaluated.map((spec) => `${spec.block} (${combinations(spec).length} Varianten)`).join(', ') || '–'}; Bibliothek: ${library.length} Komponenten; Dialekt-Abweichungen: ${findings.length}`,
	);
	console.log(`Penpot: ${result.penpot.components.length} Varianten in ${Object.keys(result.penpot.sets).length} Sets → ${join(outDir, 'penpot-import.json')}`);
	console.log(
		`Figma: ${result.figma.componentSets.length} Component Sets, ${result.figma.variables.variables.length} Variablen (Light/Dark) → ${join(outDir, 'figma-import.json')}`,
	);
	for (const [block, report] of Object.entries(result.reports)) {
		if (report.untokenizedColors.length + report.unresolvedValues.length + report.missingEmbeds.length === 0) continue;
		console.log(
			`${block}: ${report.untokenizedColors.length} Farben ohne Token, ${report.unresolvedValues.length} nicht auflösbare Werte, eingebettete Blöcke ohne Baum: ${report.missingEmbeds.join(', ') || '–'}`,
		);
	}
	await copyPenpotPlugin(dirname(outDir));
	console.log(`Abdeckungsbericht: ${join(outDir, 'spec-coverage.md')}`);
	console.log(`Dialekt-Bericht (nötige BEM-Änderungen): ${join(outDir, 'bem-dialect.md')}`);
}

async function readVersion(root: string): Promise<string> {
	return (JSON.parse(await readFile(join(root, 'package.json'), 'utf-8')) as { version: string }).version;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
	const args = process.argv.slice(2);
	const index = args.indexOf('--out');
	runSpec({ out: index >= 0 ? args[index + 1] : undefined }).catch((error: unknown) => {
		console.error(error);
		process.exitCode = 1;
	});
}
