import { penpotTokenName } from '../dtcg.js';
import type { ThemeToken } from '../extract-tokens.js';
import type { PenpotComponent, PenpotImport } from '../penpot-import.js';
import type { ShapeNode } from '../render/dom-to-shapes.js';
import type { BuildReport, InstanceProps } from './build-tree.js';
import { buildShapes } from './build-tree.js';
import type { CssRule } from './cascade.js';
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
 * axis (`Hover` or `Focus`, never both). A disabled variant has no interaction states: the
 * interactive element ignores pointer and focus. Order follows the axis order of the spec, so the
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
		const states: (InteractionState | 'default')[] = ['default', ...(row.props._disabled === true ? [] : stateAxes.map((axis) => axis.state))];
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
	for (const block of [...input.library].sort()) {
		const spec = specs.get(block);
		const rules = input.rules.get(block);
		if (!spec || !rules) continue;
		const report: BuildReport = { missingEmbeds: [], unresolvedValues: [], untokenizedColors: [] };
		const variants = combinations(spec);
		const variantSet = spec.axes.length > 0;
		const figmaComponents: FigmaComponent[] = [];
		for (const variant of variants) {
			const shapes = buildShapes(spec, specs, variant.props, variant.state, rules, input.tokens, report);
			components.push({
				id: variant.id,
				tag: block,
				...(variantSet ? { set: block } : {}),
				properties: variant.properties,
				shapes,
			});
			figmaComponents.push({
				key: variant.id,
				name: variantSet ? variant.properties.map(([name, value]) => `${name}=${value}`).join(', ') : block,
				tree: toFigmaNode(shapes),
			});
		}
		if (variantSet) sets[block] = { properties: variants[0].properties.map(([name]) => name), variantSource: 'bem-dialect' };
		figmaSets.push({ name: block, properties: variantSet ? variants[0].properties.map(([name]) => name) : [], components: figmaComponents });
		reports[block] = {
			missingEmbeds: [...new Set(report.missingEmbeds)].sort(),
			unresolvedValues: [...new Set(report.unresolvedValues)].sort(),
			untokenizedColors: [...new Set(report.untokenizedColors)].sort(),
		};
	}
	return {
		penpot: { schema: '2.0', themeName: input.themeName, version: input.version, sets, components },
		figma: {
			schema: 'kolibri-figma/1.0',
			themeName: input.themeName,
			version: input.version,
			variables: figmaVariables(input.tokens, input.themeName),
			componentSets: figmaSets,
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
	type: 'FRAME' | 'TEXT';
	name: string;
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
	};
	if (shape.kind === 'text') {
		Object.assign(node, {
			characters: shape.characters,
			fontFamily: shape.fontFamily,
			fontSize: shape.fontSize,
			fontWeight: shape.fontWeight,
			lineHeight: shape.lineHeight,
			fill: shape.fill ? { color: shape.fill, variable: variable(shape.fillToken) } : undefined,
		});
		return node;
	}
	if (shape.layout) {
		node.layoutMode = shape.layout.direction === 'row' ? 'HORIZONTAL' : 'VERTICAL';
		node.itemSpacing = shape.layout.gap;
		node.primaryAxisAlignItems = PRIMARY[shape.layout.justifyContent] ?? 'MIN';
		node.counterAxisAlignItems = COUNTER[shape.layout.alignItems] ?? 'MIN';
		node.sizing = { horizontal: shape.inline || !parent ? 'HUG' : 'FILL', vertical: 'HUG' };
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
