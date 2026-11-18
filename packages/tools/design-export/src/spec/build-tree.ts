import { toHex } from '../bind-tokens.js';
import { penpotTokenName } from '../dtcg.js';
import type { ThemeToken } from '../extract-tokens.js';
import type { ShapeLayout, ShapeNode } from '../render/dom-to-shapes.js';
import type { CascadeNode, ComputedStyle, CssRule } from './cascade.js';
import { computeStyle } from './cascade.js';
import type { BlockDesignSpec, DesignNode, InteractionState, ModifierBinding, ValueSource } from './types.js';
import type { ResolvedValue } from './values.js';
import { isPainted, resolveValue, round, toPx } from './values.js';

/** Props of one library instance: the sample content plus the axis values. */
export type InstanceProps = Record<string, boolean | string | undefined>;

/** Facts the static path could not settle for one block; collected for the gap report. */
export interface BuildReport {
	/** `<layer> <property>: <value>` that did not resolve to a px length or a color. */
	unresolvedValues: string[];
	/** Colors painted without a theme token: they do not follow the scheme in the design tool. */
	untokenizedColors: string[];
	/** Embedded blocks without a design specification; rendered as an empty frame. */
	missingEmbeds: string[];
}

interface Instance {
	node: DesignNode;
	cascade: CascadeNode;
	block: string;
	name: string;
	classes: string[];
	text?: string;
	glyph?: string;
	children: Instance[];
}

/**
 * Average advance width of Verdana relative to the font size. Text boxes are estimates: both
 * design tools measure text in their own font engine and re-flow auto-layout frames on import.
 */
const CHAR_WIDTH = { bold: 0.64, regular: 0.58 };
/** `line-height: normal` of Verdana. */
const NORMAL_LINE_HEIGHT = 1.215;

/** Whether a modifier binding holds for the props; an unset prop counts as `false`. */
function isBound(binding: ModifierBinding, props: InstanceProps): boolean {
	const value = props[binding.prop];
	if (binding.value === undefined) return value !== undefined && value !== false && value !== '';
	return (value ?? false) === binding.value;
}

function valueOf(source: ValueSource | undefined, props: InstanceProps): boolean | string | undefined {
	if (!source) return undefined;
	if ('literal' in source) return source.literal;
	const value = props[source.prop];
	return source.map && typeof value === 'string' ? source.map[value] : value;
}

/** Block modifier classes of a spec for the props: bound modifiers plus the axis modifiers. */
function blockClasses(spec: BlockDesignSpec, props: InstanceProps): string[] {
	const classes = [spec.block];
	for (const [modifier, binding] of Object.entries(spec.modifiers)) {
		if (isBound(binding, props)) classes.push(`${spec.block}--${modifier}`);
	}
	for (const axis of spec.axes) {
		if (axis.kind !== 'prop' || axis.modifier === undefined) continue;
		const value = props[axis.prop];
		if (value !== undefined && value !== false) classes.push(`${spec.block}--${axis.modifier.replace('{value}', String(value))}`);
	}
	return classes;
}

/**
 * Builds the shape tree of one library instance from the design specification, the compiled CSS and the
 * theme tokens. Pure: the same spec, props, state, CSS and tokens give the same tree.
 */
export function buildShapes(
	spec: BlockDesignSpec,
	specs: Map<string, BlockDesignSpec>,
	props: InstanceProps,
	state: InteractionState | 'default',
	rules: CssRule[],
	tokens: ThemeToken[],
	report: BuildReport,
): ShapeNode {
	const host: CascadeNode = { tag: spec.block, classes: [], attributes: {}, host: true, states: new Set() };
	const root = instantiate(spec.tree, spec, specs, props, host, report, blockClasses(spec, props));
	if (!root) throw new Error(`${spec.block}: the root node has a condition that does not hold.`);
	applyState(root, state);
	const tokenMap = new Map(tokens.map((token) => [token.name, token]));
	const hostStyle = computeStyle(host, rules, undefined);
	const shape = toShape(root, hostStyle, rules, tokenMap, report) ?? emptyShape(spec.block);
	measure(shape);
	place(shape, 0, 0);
	return shape;
}

function instantiate(
	node: DesignNode,
	spec: BlockDesignSpec,
	specs: Map<string, BlockDesignSpec>,
	props: InstanceProps,
	parent: CascadeNode,
	report: BuildReport,
	rootClasses?: string[],
): Instance | undefined {
	if (node.when && !isBound(node.when, props)) return undefined;
	const block = spec.block;
	const classes = rootClasses ? [...rootClasses] : [];
	if (node.element) {
		classes.push(`${block}__${node.element}`);
		for (const [modifier, binding] of Object.entries(node.modifiers ?? {})) {
			if (isBound(binding, props)) classes.push(`${block}__${node.element}--${modifier}`);
		}
	}
	const attributes: Record<string, string> = {};
	if (node.interactive && props._disabled === true) attributes.disabled = '';
	if (node.hidden) attributes.hidden = '';
	const cascade: CascadeNode = { tag: node.tag, classes, attributes, parent, states: new Set() };
	const name = node.element ? `${block}__${node.element}` : block;
	const instance: Instance = { node, cascade, block, name, classes, children: [] };

	if (node.embeds) {
		const embedded = specs.get(node.embeds);
		const embeddedProps: InstanceProps = Object.fromEntries(Object.entries(node.embedProps ?? {}).map(([key, source]) => [key, valueOf(source, props)]));
		if (node.embeds === 'kol-icon') {
			instance.glyph = String(valueOf(node.glyph, props) ?? '');
			classes.push('kol-icon', instance.glyph);
		} else if (embedded) {
			classes.push(...blockClasses(embedded, embeddedProps));
			if (embedded.tree.interactive && embeddedProps._disabled === true) attributes.disabled = '';
			for (const child of embedded.tree.children ?? []) {
				const childInstance = instantiate(child, embedded, specs, embeddedProps, cascade, report);
				if (childInstance) instance.children.push(childInstance);
			}
			return instance;
		} else {
			report.missingEmbeds.push(node.embeds);
		}
	}
	if (node.kind === 'icon' && instance.glyph === undefined) instance.glyph = String(valueOf(node.glyph, props) ?? '');
	if (node.kind === 'text' || node.kind === 'slot') {
		const text = valueOf(node.text, props);
		if (typeof text === 'string' && text.length > 0) instance.text = text;
	}
	for (const child of node.children ?? []) {
		const childInstance = instantiate(child, spec, specs, props, cascade, report);
		if (childInstance) instance.children.push(childInstance);
	}
	return instance;
}

/** Puts the interaction state on the first interactive node: `hover` holds for its ancestors as well. */
function applyState(root: Instance, state: InteractionState | 'default'): void {
	if (state === 'default') return;
	const carrier = findInteractive(root);
	if (!carrier || carrier.cascade.attributes.disabled !== undefined) return;
	carrier.cascade.states.add(state);
	for (let ancestor = carrier.cascade.parent; ancestor; ancestor = ancestor.parent) {
		ancestor.states.add(state === 'focus' ? 'focus-within' : state);
	}
}

function findInteractive(instance: Instance): Instance | undefined {
	if (instance.node.interactive) return instance;
	for (const child of instance.children) {
		const found = findInteractive(child);
		if (found) return found;
	}
	return undefined;
}

function emptyShape(name: string): ShapeNode {
	return { name, classes: [], kind: 'box', x: 0, y: 0, width: 0, height: 0, children: [] };
}

function toShape(
	instance: Instance,
	parentStyle: ComputedStyle,
	rules: CssRule[],
	tokens: Map<string, ThemeToken>,
	report: BuildReport,
): ShapeNode | undefined {
	const style = computeStyle(instance.cascade, rules, parentStyle);
	if (style.display === 'none' || style.visibility === 'hidden') return undefined;
	const fontSize = toPx(resolveValue(style['font-size'], style, tokens)?.value, toPx(parentStyle['font-size'], 16) ?? 16) ?? 16;
	style['font-size'] = `${fontSize}px`;
	const px = (property: string): number | undefined => {
		const resolved = resolveValue(style[property], style, tokens);
		if (resolved === undefined || resolved.value === 'auto' || resolved.value === 'none' || resolved.value === 'normal') return undefined;
		const value = toPx(resolved.value, fontSize);
		// Percentages size against the parent: the design tool expresses them as fill sizing.
		if (value === undefined && !resolved.value.endsWith('%')) report.unresolvedValues.push(`${instance.name} ${property}: ${style[property]}`);
		return value;
	};
	const color = (property: string): ResolvedValue | undefined => {
		let resolved = resolveValue(style[property], style, tokens);
		if (resolved?.value.toLowerCase() === 'currentcolor') resolved = resolveValue(style.color, style, tokens);
		if (!resolved || !isPainted(resolved.value)) return undefined;
		if (toHex(resolved.value) === undefined) {
			report.unresolvedValues.push(`${instance.name} ${property}: ${style[property]}`);
			return undefined;
		}
		if (!resolved.token) report.untokenizedColors.push(`${instance.name} ${property}: ${resolved.value}`);
		return resolved;
	};
	const tokenName = (resolved: ResolvedValue | undefined) => (resolved?.token ? penpotTokenName(resolved.token) : undefined);

	const children: ShapeNode[] = [];
	if (instance.text !== undefined) children.push(textShape(instance, style, fontSize, color('color'), tokenName));
	if (instance.glyph !== undefined && instance.node.kind === 'icon') {
		const ink = color('color');
		children.push({
			name: `${instance.name}::text`,
			classes: [],
			kind: 'text',
			x: 0,
			y: 0,
			width: fontSize,
			height: fontSize,
			characters: instance.glyph,
			fill: ink ? toHex(ink.value) : undefined,
			fillToken: tokenName(ink),
			fontSize,
			fontFamily: 'kolicons',
			fontWeight: 400,
			lineHeight: fontSize,
			children: [],
		});
	}
	for (const child of instance.children) {
		const shape = toShape(child, style, rules, tokens, report);
		if (shape) children.push(shape);
	}

	const fill = color('background-color');
	const sides = ['top', 'right', 'bottom', 'left'];
	const strokeWidths = sides.map((side) =>
		style[`border-${side}-style`] && style[`border-${side}-style`] !== 'none' ? (px(`border-${side}-width`) ?? 3) : 0,
	) as [number, number, number, number];
	const stroke = strokeWidths.some((width) => width > 0) ? color('border-top-color') : undefined;
	const radius = ['top-left', 'top-right', 'bottom-right', 'bottom-left'].map((corner) => px(`border-${corner}-radius`) ?? 0) as [
		number,
		number,
		number,
		number,
	];
	const padding = sides.map((side) => px(`padding-${side}`) ?? 0) as [number, number, number, number];
	const outlineColor = style['outline-style'] && style['outline-style'] !== 'none' ? color('outline-color') : undefined;
	const outlineWidth = outlineColor ? (px('outline-width') ?? 3) : 0;
	const display = style.display ?? (['a', 'button', 'i', 'kbd', 'span', 'strong', 'u'].includes(instance.node.tag) ? 'inline' : 'block');
	if (display.includes('grid') && children.length > 0) {
		report.unresolvedValues.push(`${instance.name} display: ${display} (grid areas have no auto layout counterpart)`);
	}

	return {
		name: instance.name,
		classes: instance.classes.filter((name) => name.startsWith('kol-')),
		kind: 'box',
		x: 0,
		y: 0,
		width: px('width') ?? 0,
		height: px('height') ?? 0,
		inline: display.startsWith('inline') || undefined,
		interactive: instance.node.interactive || undefined,
		fill: fill ? toHex(fill.value) : undefined,
		fillToken: tokenName(fill),
		stroke: stroke ? toHex(stroke.value) : undefined,
		strokeToken: tokenName(stroke),
		strokeWidths: stroke ? strokeWidths : undefined,
		radius: radius.some((value) => value > 0) ? radius : undefined,
		padding: padding.some((value) => value > 0) ? padding : undefined,
		outline: outlineColor
			? {
					color: toHex(outlineColor.value) as string,
					offset: px('outline-offset') ?? 0,
					radius: radius.some((value) => value > 0) ? radius : undefined,
					token: tokenName(outlineColor),
					width: outlineWidth,
				}
			: undefined,
		minWidth: px('min-width'),
		minHeight: px('min-height'),
		layout: layoutOf(display, style, fontSize, children.length),
		opacity: style.opacity !== undefined && Number(style.opacity) < 1 ? Number(style.opacity) : undefined,
		children,
	};
}

function textShape(
	instance: Instance,
	style: ComputedStyle,
	fontSize: number,
	ink: ResolvedValue | undefined,
	tokenName: (resolved: ResolvedValue | undefined) => string | undefined,
): ShapeNode {
	const characters = instance.text as string;
	const weight = Number(style['font-weight'] === 'bold' ? 700 : (style['font-weight'] ?? 400)) || 400;
	const lineHeightRaw = style['line-height'];
	const lineHeight =
		lineHeightRaw === undefined || lineHeightRaw === 'normal'
			? round(fontSize * NORMAL_LINE_HEIGHT)
			: /^[\d.]+$/.test(lineHeightRaw)
				? round(Number(lineHeightRaw) * fontSize)
				: (toPx(lineHeightRaw, fontSize) ?? round(fontSize * NORMAL_LINE_HEIGHT));
	return {
		name: `${instance.name}::text`,
		classes: [],
		kind: 'text',
		x: 0,
		y: 0,
		width: round(characters.length * fontSize * (weight >= 600 ? CHAR_WIDTH.bold : CHAR_WIDTH.regular)),
		height: lineHeight,
		characters,
		fill: ink ? toHex(ink.value) : undefined,
		fillToken: tokenName(ink),
		fontSize,
		fontWeight: weight,
		fontFamily: 'Verdana',
		lineHeight,
		textAlign: style['text-align'],
		children: [],
	};
}

const ALIGN_DEFAULT = 'normal';

function layoutOf(display: string, style: ComputedStyle, fontSize: number, childCount: number): ShapeLayout | undefined {
	if (childCount === 0) return undefined;
	const flex = display === 'flex' || display === 'inline-flex';
	const grid = display === 'grid' || display === 'inline-grid';
	const direction: ShapeLayout['direction'] = flex
		? style['flex-direction']?.startsWith('column')
			? 'column'
			: 'row'
		: display.startsWith('inline')
			? 'row'
			: 'column';
	const gap = flex || grid ? (toPx(direction === 'row' ? style['column-gap'] : style['row-gap'], fontSize) ?? 0) : 0;
	return {
		alignItems: flex ? (style['align-items'] ?? ALIGN_DEFAULT) : direction === 'row' ? 'center' : 'stretch',
		direction,
		gap,
		justifyContent: flex ? (style['justify-content'] ?? ALIGN_DEFAULT) : 'start',
		wrap: style['flex-wrap'] === 'wrap',
	};
}

/** Content size bottom-up: auto-layout frames hug their children, plus padding, border and minimum size. */
function measure(shape: ShapeNode): void {
	for (const child of shape.children) measure(child);
	if (shape.kind === 'text') return;
	const [pt, pr, pb, pl] = shape.padding ?? [0, 0, 0, 0];
	const [bt, br, bb, bl] = shape.strokeWidths ?? [0, 0, 0, 0];
	const row = shape.layout?.direction === 'row';
	const gap = shape.layout?.gap ?? 0;
	const widths = shape.children.map((child) => child.width);
	const heights = shape.children.map((child) => child.height);
	const gaps = Math.max(0, shape.children.length - 1) * gap;
	const contentWidth = row ? sum(widths) + gaps : Math.max(0, ...widths);
	const contentHeight = row ? Math.max(0, ...heights) : sum(heights) + gaps;
	shape.width = round(Math.max(shape.width || contentWidth + pl + pr + bl + br, shape.minWidth ?? 0));
	shape.height = round(Math.max(shape.height || contentHeight + pt + pb + bt + bb, shape.minHeight ?? 0));
}

/** Positions top-down relative to the component origin, stretching children along the cross axis. */
function place(shape: ShapeNode, x: number, y: number): void {
	shape.x = round(x);
	shape.y = round(y);
	if (shape.kind === 'text' || shape.children.length === 0) return;
	const [pt, pr, pb, pl] = shape.padding ?? [0, 0, 0, 0];
	const [bt, br, bb, bl] = shape.strokeWidths ?? [0, 0, 0, 0];
	const innerWidth = shape.width - pl - pr - bl - br;
	const innerHeight = shape.height - pt - pb - bt - bb;
	const layout = shape.layout ?? { alignItems: 'stretch', direction: 'column', gap: 0, justifyContent: 'start', wrap: false };
	const row = layout.direction === 'row';
	const stretch = ['normal', 'stretch'].includes(layout.alignItems);
	const main = sum(shape.children.map((child) => (row ? child.width : child.height))) + Math.max(0, shape.children.length - 1) * layout.gap;
	const free = (row ? innerWidth : innerHeight) - main;
	let offset = ['center'].includes(layout.justifyContent) ? free / 2 : ['end', 'flex-end'].includes(layout.justifyContent) ? free : 0;
	const between = layout.justifyContent === 'space-between' && shape.children.length > 1 ? free / (shape.children.length - 1) : 0;
	for (const child of shape.children) {
		if (stretch && child.kind === 'box') {
			if (row) child.height = Math.max(child.height, round(innerHeight));
			else child.width = Math.max(child.width, round(innerWidth));
		}
		const cross = row ? innerHeight - child.height : innerWidth - child.width;
		const crossOffset = layout.alignItems === 'center' ? cross / 2 : ['end', 'flex-end'].includes(layout.alignItems) ? cross : 0;
		const childX = x + bl + pl + (row ? offset : crossOffset);
		const childY = y + bt + pt + (row ? crossOffset : offset);
		place(child, childX, childY);
		offset += (row ? child.width : child.height) + layout.gap + between;
	}
}

function sum(values: number[]): number {
	return values.reduce((total, value) => total + value, 0);
}
