import selectorParser from 'postcss-selector-parser';

import type { ComponentApi, ComponentBem } from '../types.js';
import type { BuildReport } from './build-tree.js';
import type { CssRule, UnsupportedRule } from './cascade.js';
import type { BlockDesignSpec, DesignNode } from './types.js';

/**
 * Per block: which facts the deterministic transformation needs, where each comes from today and
 * what is missing. The report is the measurable form of the gap analysis in
 * `docs/design-export/BEM-SPEC-DESIGN-FACET.md`.
 */
export interface BlockCoverage {
	block: string;
	/** Present in `custom-elements.json` (public web component) or only an embedded block. */
	publicComponent: boolean;
	/** A design facet exists (tree, node kinds, bindings, axes, sample). */
	designFacet: boolean;
	/** Registry modifiers (block and element) without a prop binding in the facet. */
	unboundModifiers: string[];
	/** Registry elements the facet tree does not place. */
	unplacedElements: string[];
	/** Facet elements that are not in the registry: a contract violation, the transformation refuses them. */
	unregisteredElements: string[];
	/** Classes of this block the CSS styles but the registry does not name, e.g. open variant values (`kol-button--primary`). */
	classesOutsideRegistry: string[];
	/** Classes of other namespaces the CSS of this block styles (`kol-close-button`, `kol-headline`). */
	foreignClasses: string[];
	/** Rules the static cascade cannot evaluate, grouped by reason. */
	unsupportedRules: Record<string, number>;
	build?: BuildReport;
}

export interface CoverageInput {
	bems: ComponentBem[];
	apis: ComponentApi[];
	specs: BlockDesignSpec[];
	rules: Map<string, CssRule[]>;
	unsupported: Map<string, UnsupportedRule[]>;
	reports: Record<string, BuildReport>;
	/** Modifier names per block and element, from the registry: `kol-alert__heading` → `h0 … h6`. */
	elementModifiers: Map<string, string[]>;
}

export function buildCoverage(input: CoverageInput): BlockCoverage[] {
	const registered = registeredClasses(input.bems, input.elementModifiers);
	const blocks = new Set(input.bems.map((bem) => bem.block));
	return input.bems.map((bem) => {
		const spec = input.specs.find((candidate) => candidate.block === bem.block);
		const placed = new Map<string, Set<string>>();
		if (spec) collectPlaced(spec.tree, placed);
		const elementBindings = placed.get('') ?? new Set<string>();
		const unboundModifiers = spec
			? [
					...bem.modifiers.filter((modifier) => !(modifier in spec.modifiers) && !axisCovers(spec, modifier)),
					...bem.elements.flatMap((element) =>
						(input.elementModifiers.get(`${bem.block}__${element}`) ?? [])
							.filter((modifier) => !elementBindings.has(`${element}--${modifier}`))
							.map((modifier) => `${element}--${modifier}`),
					),
				].sort()
			: [];
		const specElements = [...(placed.get('elements') ?? new Set<string>())];
		const classes = styledClasses(input.rules.get(bem.block) ?? []);
		return {
			block: bem.block,
			publicComponent: input.apis.some((api) => api.tag === bem.block),
			designFacet: spec !== undefined,
			unboundModifiers,
			unplacedElements: spec ? bem.elements.filter((element) => !specElements.includes(element)).sort() : [],
			unregisteredElements: specElements.filter((element) => !bem.elements.includes(element)).sort(),
			classesOutsideRegistry: classes.filter((name) => blockOf(name) === bem.block && !registered.has(name)).sort(),
			foreignClasses: classes.filter((name) => !blocks.has(blockOf(name)) && !registered.has(name)).sort(),
			unsupportedRules: groupReasons(bem.block, input.unsupported.get(bem.block) ?? []),
			...(input.reports[bem.block] ? { build: input.reports[bem.block] } : {}),
		};
	});
}

function axisCovers(spec: BlockDesignSpec, modifier: string): boolean {
	return spec.axes.some((axis) => {
		if (axis.kind !== 'prop' || axis.modifier === undefined) return false;
		return axis.values.some((value) => axis.modifier?.replace('{value}', String(value)) === modifier);
	});
}

/** Collects the elements a facet tree places (`elements`) and the element modifiers it binds (`''`). */
function collectPlaced(node: DesignNode, placed: Map<string, Set<string>>): void {
	const add = (key: string, value: string) => {
		if (!placed.has(key)) placed.set(key, new Set());
		placed.get(key)?.add(value);
	};
	if (node.element) {
		add('elements', node.element);
		for (const modifier of Object.keys(node.modifiers ?? {})) add('', `${node.element}--${modifier}`);
	}
	for (const child of node.children ?? []) collectPlaced(child, placed);
}

function registeredClasses(bems: ComponentBem[], elementModifiers: Map<string, string[]>): Set<string> {
	const names = new Set<string>();
	for (const bem of bems) {
		names.add(bem.block);
		for (const modifier of bem.modifiers) names.add(`${bem.block}--${modifier}`);
		for (const element of bem.elements) {
			names.add(`${bem.block}__${element}`);
			for (const modifier of elementModifiers.get(`${bem.block}__${element}`) ?? []) names.add(`${bem.block}__${element}--${modifier}`);
		}
	}
	return names;
}

/** The block a BEM class belongs to: `kol-button__text--x` → `kol-button`. */
function blockOf(name: string): string {
	return name.split('__')[0].split('--')[0];
}

function styledClasses(rules: CssRule[]): string[] {
	const names = new Set<string>();
	for (const rule of rules) {
		rule.selector.walk((node: selectorParser.Node) => {
			if (node.type === 'class' && node.value.startsWith('kol-')) names.add(node.value);
		});
	}
	return [...names].sort();
}

/** Counts the rules that address the block itself; shared sheets (icon font, embedded items) are counted at their own block. */
function groupReasons(block: string, unsupported: UnsupportedRule[]): Record<string, number> {
	const groups: Record<string, number> = {};
	const own = new RegExp(`\\.${block}(?![\\w-])|\\.${block}(__|--)`);
	for (const entry of unsupported) {
		if (!own.test(entry.selector)) continue;
		groups[entry.reason] = (groups[entry.reason] ?? 0) + 1;
	}
	return Object.fromEntries(Object.entries(groups).sort(([a], [b]) => a.localeCompare(b)));
}

/** Markdown summary of the coverage, for the pull request and the docs. */
export function renderCoverage(coverage: BlockCoverage[], apis: ComponentApi[]): string {
	const withoutBlock = apis.map((api) => api.tag).filter((tag) => !coverage.some((entry) => entry.block === tag));
	const withFacet = coverage.filter((entry) => entry.designFacet);
	const outside = coverage.filter((entry) => entry.classesOutsideRegistry.length > 0);
	const lines = [
		'# Abdeckung der BEM-Spezifikation für die Design-Transformation',
		'',
		'Generiert von `pnpm --filter @public-ui/design-export start:spec`. Gleiche Quellen ergeben dieselbe Datei.',
		'',
		`- Blöcke in der BEM-Registry: ${coverage.length} (davon ${coverage.filter((entry) => entry.publicComponent).length} öffentliche Komponenten)`,
		`- Öffentliche Komponenten ohne eigenen Block in der Registry: ${withoutBlock.length}${withoutBlock.length > 0 ? ` (${withoutBlock.map((tag) => `\`${tag}\``).join(', ')})` : ''}`,
		`- Blöcke mit Design-Facette: ${withFacet.length} (${withFacet.map((entry) => `\`${entry.block}\``).join(', ')})`,
		`- Blöcke, deren CSS Klassen außerhalb der Registry stylt: ${outside.length}`,
		`- Nicht statisch auswertbare Regeln: ${sum(coverage.map((entry) => sum(Object.values(entry.unsupportedRules))))}`,
		'',
		'| Block | Facette | ungebundene Modifier | Klassen außerhalb der Registry | fremde Klassen | nicht statisch auswertbar | Farben ohne Token |',
		'| --- | --- | --- | --- | --- | --- | --- |',
		...coverage.map((entry) =>
			[
				`\`${entry.block}\``,
				entry.designFacet ? 'ja' : '–',
				list(entry.unboundModifiers),
				list(
					entry.classesOutsideRegistry.map((name) => name.replace(entry.block, '')),
					6,
				),
				list(entry.foreignClasses, 4),
				Object.entries(entry.unsupportedRules)
					.map(([reason, count]) => `${reason} (${count})`)
					.join(', ') || '–',
				entry.build ? String(entry.build.untokenizedColors.length) : '–',
			]
				.join(' | ')
				.replace(/^/, '| ')
				.replace(/$/, ' |'),
		),
		'',
	];
	return `${lines.join('\n')}\n`;
}

function list(values: string[], limit = 8): string {
	if (values.length === 0) return '–';
	const shown = values.slice(0, limit).map((value) => `\`${value}\``);
	return values.length > limit ? `${shown.join(', ')} … (+${values.length - limit})` : shown.join(', ');
}

function sum(values: number[]): number {
	return values.reduce((total, value) => total + value, 0);
}
