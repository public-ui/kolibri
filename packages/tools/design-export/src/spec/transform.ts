import { penpotTokenName } from '../dtcg.js';
import type { ThemeToken } from '../extract-tokens.js';
import type { PenpotComponent, PenpotImport } from '../penpot-import.js';
import type { ShapeNode } from '../render/dom-to-shapes.js';
import type { BaseRegistry } from './base-components.js';
import { createBaseRegistry, extractBaseComponents } from './base-components.js';
import type { BuildReport, InstanceProps } from './build-tree.js';
import { buildShapes, buildShapesFromRendered } from './build-tree.js';
import type { CssRule } from './cascade.js';
import type { IconVector } from './icons.js';
import type { BlockDesignSpec, DesignAxis, InteractionState } from './types.js';

/** One variant of a component: its axis values, the props they set and the interaction state. */
export interface VariantCombination {
	id: string;
	properties: [string, string][];
	props: InstanceProps;
	state: InteractionState | 'default';
}

/**
 * Every combination of the prop axes, each in the default state and once per interaction state
 * axis (`Hover` or `Focus`, never both). A disabled variant and a variant with an `inert` axis value
 * have no interaction states: the interactive element ignores pointer and focus, or the state is
 * shown on the default variant only. Order follows the axis order of the spec, so the
 * output order is stable.
 */
export function combinations(spec: BlockDesignSpec): VariantCombination[] {
	const propAxes = spec.axes.filter((axis): axis is Extract<DesignAxis, { kind: 'prop' }> => axis.kind === 'prop');
	const stateAxes = spec.axes.filter((axis): axis is Extract<DesignAxis, { kind: 'state' }> => axis.kind === 'state');
	let rows: { props: InstanceProps; properties: [string, string][] }[] = [{ props: { ...spec.sample }, properties: [] }];
	for (const axis of propAxes) {
		rows = rows.flatMap((row) =>
			axis.values.map((value) => ({
				props: { ...row.props, [axis.prop]: value },
				properties: [...row.properties, [axis.name, String(value)] as [string, string]],
			})),
		);
	}
	const result: VariantCombination[] = [];
	for (const row of rows) {
		const inert = row.props._disabled === true || propAxes.some((axis) => axis.inert?.includes(row.props[axis.prop] as boolean | string));
		const states: (InteractionState | 'default')[] = ['default', ...(inert ? [] : stateAxes.map((axis) => axis.state))];
		for (const state of states) {
			const switches = stateAxes.map((axis) => [axis.name, String(axis.state === state)] as [string, string]);
			const properties = [...row.properties, ...switches];
			result.push({
				id: [spec.block, ...properties.map(([, value]) => value)].join('.'),
				properties,
				props: row.props,
				state,
			});
		}
	}
	return result;
}

export interface TransformInput {
	specs: BlockDesignSpec[];
	/** Blocks that become library components; the others are only embedded. */
	library: string[];
	rules: Map<string, CssRule[]>;
	tokens: ThemeToken[];
	/** Vector paths of the KoliBri icons by class (`kolicon-house`). */
	icons?: Map<string, IconVector>;
	themeName: string;
	version: { components: string; theme: string };
}

export interface TransformResult {
	penpot: PenpotImport;
	figma: FigmaImport;
	reports: Record<string, BuildReport>;
}

/**
 * The deterministic transformation `design specification + CSS + tokens → Penpot and Figma`. Runs without a
 * browser; the same input gives byte-identical files (`stableStringify`).
 */
export function transform(input: TransformInput): TransformResult {
	const specs = new Map(input.specs.map((spec) => [spec.block, spec]));
	const reports: Record<string, BuildReport> = {};
	const components: PenpotComponent[] = [];
	const sets: PenpotImport['sets'] = {};
	const figmaSets: FigmaComponentSet[] = [];
	const bases: BaseRegistry = createBaseRegistry();
	for (const block of [...input.library].sort()) {
		const spec = specs.get(block);
		const rules = input.rules.get(block);
		if (!spec || !rules) continue;
		const report: BuildReport = { missingEmbeds: [], unresolvedValues: [], untokenizedColors: [] };
		const variants = combinations(spec);
		const variantSet = spec.axes.length > 0;
		const figmaComponents: FigmaComponent[] = [];
		const built = variants.map((variant) => ({
			properties: variant.properties,
			shapes: spec.render
				? buildShapesFromRendered(block, spec.render(variant.props), variant.state, rules, input.tokens, report, input.icons, (tag) => input.rules.get(tag))
				: buildShapes(spec, specs, variant.props, variant.state, rules, input.tokens, report, input.icons),
		}));
		// Only the functional components carry their boundaries; the BEM path stays one tree per variant.
		const shapes = spec.render ? extractBaseComponents(built, bases) : built.map((entry) => entry.shapes);
		variants.forEach((variant, index) => {
			components.push({
				id: variant.id,
				tag: block,
				...(variantSet ? { set: block } : {}),
				properties: variant.properties,
				shapes: shapes[index],
			});
			figmaComponents.push({
				key: variant.id,
				name: variantSet ? variant.properties.map(([name, value]) => `${name}=${value}`).join(', ') : block,
				tree: toFigmaNode(shapes[index]),
			});
		});
		if (variantSet)
			sets[block] = { properties: variants[0].properties.map(([name]) => name), variantSource: spec.render ? 'functional-components' : 'bem-dialect' };
		figmaSets.push({ name: block, properties: variantSet ? variants[0].properties.map(([name]) => name) : [], components: figmaComponents });
		reports[block] = {
			missingEmbeds: [...new Set(report.missingEmbeds)].sort(),
			unresolvedValues: [...new Set(report.unresolvedValues)].sort(),
			untokenizedColors: [...new Set(report.untokenizedColors)].sort(),
		};
	}
	// Base components come first: the plugins build them before the web components that show instances of them.
	const baseComponents: PenpotComponent[] = [];
	const baseSets: FigmaComponentSet[] = [];
	for (const { base } of bases.components.values()) {
		const variantSet = base.properties.length > 0;
		baseComponents.push({ id: base.id, tag: base.set, ...(variantSet ? { set: base.set } : {}), base: true, properties: base.properties, shapes: base.shapes });
		if (variantSet) sets[base.set] = { properties: base.properties.map(([name]) => name), variantSource: 'base-component' };
		const figmaSet = baseSets.find((entry) => entry.name === base.set) ?? {
			name: base.set,
			base: true,
			properties: base.properties.map(([name]) => name),
			components: [],
		};
		if (!baseSets.includes(figmaSet)) baseSets.push(figmaSet);
		figmaSet.components.push({
			key: base.id,
			name: variantSet ? base.properties.map(([name, value]) => `${name}=${value}`).join(', ') : base.set,
			tree: toFigmaNode(base.shapes),
		});
	}
	return {
		penpot: { schema: '2.0', themeName: input.themeName, version: input.version, sets, components: [...baseComponents, ...components] },
		figma: {
			schema: 'kolibri-figma/1.0',
			themeName: input.themeName,
			version: input.version,
			variables: figmaVariables(input.tokens, input.themeName),
			componentSets: [...baseSets, ...figmaSets],
		},
		reports,
	};
}

// ------------------------------------------------------------------------------------------------
// Figma target

/**
 * Payload of the Figma plugin (`figma-plugin/`): one variable collection with the modes Light and
 * Dark (scheme switch per frame, Figma concept #11379) and one component set per block. Node
 * properties use the Figma Plugin API names, so the plugin assigns them without translation.
 */
interface FigmaImport {
	schema: 'kolibri-figma/1.0';
	themeName: string;
	version: { components: string; theme: string };
	variables: { collection: string; modes: ['Light', 'Dark']; variables: FigmaVariable[] };
	componentSets: FigmaComponentSet[];
}

interface FigmaVariable {
	name: string;
	type: 'COLOR' | 'FLOAT' | 'STRING';
	values: { Dark: number | string; Light: number | string };
}

interface FigmaComponentSet {
	name: string;
	/** A base component (`spec/base-components.ts`): built before the sets that show instances of it. */
	base?: boolean;
	properties: string[];
	components: FigmaComponent[];
}

interface FigmaComponent {
	/** Stable key, stored as plugin data `kolibri-key`; a re-import updates the component in place. */
	key: string;
	/** Variant name in Figma notation: `Variant=primary, Disabled=false`. */
	name: string;
	tree: FigmaNode;
}

interface FigmaNode {
	type: 'FRAME' | 'INSTANCE' | 'TEXT' | 'VECTOR';
	/** SVG markup of a `VECTOR`, for `figma.createNodeFromSvg`. */
	svg?: string;
	name: string;
	/** Key of the component an `INSTANCE` shows. */
	component?: string;
	/** Out of the auto layout (`layoutPositioning: 'ABSOLUTE'`), at `x`/`y`. */
	absolute?: true;
	x: number;
	y: number;
	width: number;
	height: number;
	layoutMode?: 'HORIZONTAL' | 'NONE' | 'VERTICAL';
	itemSpacing?: number;
	padding?: [number, number, number, number];
	primaryAxisAlignItems?: 'CENTER' | 'MAX' | 'MIN' | 'SPACE_BETWEEN';
	counterAxisAlignItems?: 'CENTER' | 'MAX' | 'MIN';
	/** `layoutSizingHorizontal`/`Vertical` of the Plugin API. */
	sizing?: { horizontal: 'FILL' | 'FIXED' | 'HUG'; vertical: 'FILL' | 'FIXED' | 'HUG' };
	minWidth?: number;
	minHeight?: number;
	fill?: FigmaPaint;
	stroke?: FigmaPaint & { weights: [number, number, number, number] };
	/** Corner radii: top-left, top-right, bottom-right, bottom-left. */
	radius?: [number, number, number, number];
	/** Focus ring as a hard drop shadow (spread = offset + width), the usual Figma idiom for CSS outlines. */
	focusRing?: FigmaPaint & { spread: number };
	opacity?: number;
	characters?: string;
	fontSize?: number;
	fontWeight?: number;
	fontFamily?: string;
	lineHeight?: number;
	textDecoration?: 'line-through' | 'underline';
	children: FigmaNode[];
}

interface FigmaPaint {
	color: string;
	/** Name of the bound variable in the collection (`color/primary`). */
	variable?: string;
}

const PRIMARY: Record<string, FigmaNode['primaryAxisAlignItems']> = { center: 'CENTER', end: 'MAX', 'flex-end': 'MAX', 'space-between': 'SPACE_BETWEEN' };
const COUNTER: Record<string, FigmaNode['counterAxisAlignItems']> = { center: 'CENTER', end: 'MAX', 'flex-end': 'MAX' };

/** Converts a shape tree into Figma nodes with positions relative to the parent frame. */
function toFigmaNode(shape: ShapeNode, parent?: ShapeNode): FigmaNode {
	const variable = (token: string | undefined) => (token ? token.replace(/\./g, '/') : undefined);
	const node: FigmaNode = {
		type: shape.kind === 'text' ? 'TEXT' : 'FRAME',
		name: shape.name,
		x: parent ? round2(shape.x - parent.x) : 0,
		y: parent ? round2(shape.y - parent.y) : 0,
		width: shape.width,
		height: shape.height,
		children: shape.children.map((child) => toFigmaNode(child, shape)),
		...(shape.absolute ? { absolute: true } : {}),
	};
	if (shape.kind === 'vector' && shape.vector) {
		node.type = 'VECTOR';
		node.svg =
			shape.vector.markup ??
			`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${shape.vector.viewBox}" width="${shape.width}" height="${shape.height}">${shape.vector.paths.map((d) => `<path d="${d}" fill="${shape.fill ?? '#000000'}"/>`).join('')}</svg>`;
		if (shape.fill) node.fill = { color: shape.fill, variable: variable(shape.fillToken) };
		return node;
	}
	if (shape.kind === 'instance') {
		node.type = 'INSTANCE';
		node.component = shape.component;
		node.sizing = { horizontal: shape.inline || !parent ? 'HUG' : 'FILL', vertical: 'HUG' };
		return node;
	}
	if (shape.kind === 'text') {
		Object.assign(node, {
			characters: shape.characters,
			fontFamily: shape.fontFamily,
			fontSize: shape.fontSize,
			fontWeight: shape.fontWeight,
			lineHeight: shape.lineHeight,
			...(shape.textDecoration ? { textDecoration: shape.textDecoration } : {}),
			fill: shape.fill ? { color: shape.fill, variable: variable(shape.fillToken) } : undefined,
		});
		return node;
	}
	if (shape.layout) {
		node.layoutMode = shape.layout.direction === 'row' ? 'HORIZONTAL' : 'VERTICAL';
		node.itemSpacing = shape.layout.gap;
		node.primaryAxisAlignItems = PRIMARY[shape.layout.justifyContent] ?? 'MIN';
		node.counterAxisAlignItems = COUNTER[shape.layout.alignItems] ?? 'MIN';
		node.sizing = {
			horizontal: shape.fixedWidth ? 'FIXED' : shape.inline || !parent ? 'HUG' : 'FILL',
			vertical: shape.fixedHeight ? 'FIXED' : 'HUG',
		};
	} else {
		node.layoutMode = 'NONE';
	}
	if (shape.padding) node.padding = shape.padding;
	if (shape.minWidth) node.minWidth = shape.minWidth;
	if (shape.minHeight) node.minHeight = shape.minHeight;
	if (shape.fill) node.fill = { color: shape.fill, variable: variable(shape.fillToken) };
	if (shape.stroke && shape.strokeWidths) node.stroke = { color: shape.stroke, variable: variable(shape.strokeToken), weights: shape.strokeWidths };
	if (shape.radius) node.radius = shape.radius;
	if (shape.outline)
		node.focusRing = { color: shape.outline.color, variable: variable(shape.outline.token), spread: shape.outline.offset + shape.outline.width };
	if (shape.opacity !== undefined) node.opacity = shape.opacity;
	return node;
}

function round2(value: number): number {
	return Math.round(value * 100) / 100;
}

/** Theme tokens as Figma variables: colors with a Light and a Dark value, lengths as numbers in px. */
function figmaVariables(tokens: ThemeToken[], themeName: string): FigmaImport['variables'] {
	const variables: FigmaVariable[] = [];
	for (const token of tokens) {
		const name = penpotTokenName(token.name).replace('.', '/');
		if (token.light !== undefined && token.dark !== undefined) {
			variables.push({ name, type: 'COLOR', values: { Dark: token.dark, Light: token.light } });
			continue;
		}
		const px = /^(-?[\d.]+)(px|rem)$/.exec(token.value);
		if (px) {
			const value = px[2] === 'rem' ? Number(px[1]) * 16 : Number(px[1]);
			variables.push({ name, type: 'FLOAT', values: { Dark: value, Light: value } });
		} else if (/^(#|rgb)/.test(token.value)) {
			variables.push({ name, type: 'COLOR', values: { Dark: token.value, Light: token.value } });
		} else {
			variables.push({ name, type: 'STRING', values: { Dark: token.value, Light: token.value } });
		}
	}
	return { collection: `KoliBri ${themeName}`, modes: ['Light', 'Dark'], variables: variables.sort((a, b) => a.name.localeCompare(b.name)) };
}
