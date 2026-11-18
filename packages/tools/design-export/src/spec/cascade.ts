import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';

import type { InteractionState } from './types.js';

/**
 * Static CSS cascade for the element trees of the design specification: the compiled base and theme CSS
 * of a component are matched against a virtual tree instead of a rendered DOM.
 *
 * It works because the theming contract keeps selectors flat (BEM classes, a few attributes,
 * interaction pseudo-classes). Every rule the matcher cannot evaluate statically — structural
 * pseudo-classes, sibling combinators, `:has()`, pseudo-elements — is reported per block instead
 * of being guessed, so the gap report shows exactly where the static path ends.
 */

/** Cascade layers in priority order, as declared in `packages/components/src/components/_layer-order.scss`. */
const LAYER_ORDER = [
	'kol-a11y',
	'kol-global',
	'kol-component',
	'kol-theme-global',
	'kol-theme-component',
	'kol-forced-colors',
	'kol-theme-forced-colors',
] as const;

/** Layers that only apply in forced-colors mode; a design library shows the regular look. */
const FORCED_COLOR_LAYERS = new Set(['kol-forced-colors', 'kol-theme-forced-colors']);

export interface CssRule {
	selector: selectorParser.Selector;
	selectorText: string;
	specificity: [number, number, number];
	declarations: { property: string; value: string; important: boolean }[];
	/** Index in `LAYER_ORDER`, `LAYER_ORDER.length` for unlayered rules. */
	layer: number;
	order: number;
}

export interface UnsupportedRule {
	selector: string;
	reason: string;
}

/** A node of the virtual tree the cascade runs on. */
export interface CascadeNode {
	tag: string;
	classes: string[];
	attributes: Record<string, string>;
	/** The host element of the shadow root (`:host`). */
	host?: boolean;
	parent?: CascadeNode;
	/** Interaction states the node is in: `hover` also holds for the ancestors of the hovered node. */
	states: Set<InteractionState | 'focus-within'>;
}

const SUPPORTED_PSEUDOS = new Set([':active', ':disabled', ':focus', ':focus-visible', ':focus-within', ':host', ':hover', ':is', ':not', ':where']);

/**
 * Parses compiled CSS into flat rules with layer and specificity. Rules inside `@media` and
 * `@supports` are skipped (a library shows the default viewport); `@layer` blocks are unwrapped.
 */
export function parseRules(css: string, unsupported: UnsupportedRule[], startOrder = 0): CssRule[] {
	const rules: CssRule[] = [];
	let order = startOrder;
	postcss.parse(css).walkRules((rule) => {
		let layer: number = LAYER_ORDER.length;
		for (let parent = rule.parent; parent && parent.type !== 'root'; parent = parent.parent) {
			if (parent.type === 'atrule') {
				const atRule = parent as postcss.AtRule;
				if (atRule.name === 'layer') {
					const index = LAYER_ORDER.indexOf(atRule.params.trim() as (typeof LAYER_ORDER)[number]);
					layer = index === -1 ? LAYER_ORDER.length : index;
				} else if (atRule.name !== 'layer') {
					return;
				}
			}
		}
		if (layer < LAYER_ORDER.length && FORCED_COLOR_LAYERS.has(LAYER_ORDER[layer])) return;
		const declarations = rule.nodes
			.filter((node): node is postcss.Declaration => node.type === 'decl')
			.map((decl) => ({
				property: decl.prop.toLowerCase().startsWith('--') ? decl.prop : decl.prop.toLowerCase(),
				value: decl.value.trim(),
				important: decl.important,
			}));
		if (declarations.length === 0) return;
		selectorParser((root) => {
			root.each((selector) => {
				const reason = unsupportedReason(selector);
				if (reason) {
					unsupported.push({ selector: selector.toString().trim(), reason });
					return;
				}
				rules.push({ selector, selectorText: selector.toString().trim(), specificity: specificity(selector), declarations, layer, order: order++ });
			});
		}).processSync(rule.selector);
	});
	return rules;
}

function unsupportedReason(selector: selectorParser.Selector): string | undefined {
	let reason: string | undefined;
	selector.walk((node) => {
		if (reason) return;
		if (node.type === 'combinator' && !['', ' ', '>'].includes(node.value.trim()) && node.value.trim() !== '') {
			reason = `combinator ${node.value.trim()}`;
		} else if (node.type === 'pseudo') {
			if (node.value.startsWith('::') || ['::before', '::after', ':before', ':after'].includes(node.value)) {
				reason = `pseudo-element ${node.value}`;
			} else if (!SUPPORTED_PSEUDOS.has(node.value)) {
				reason = `pseudo-class ${node.value}`;
			} else if (node.value === ':host' && node.nodes.length > 0) {
				reason = ':host() with argument';
			}
		} else if (node.type === 'id' || node.type === 'nesting') {
			reason = node.type;
		}
	});
	return reason;
}

function specificity(selector: selectorParser.Selector): [number, number, number] {
	const result: [number, number, number] = [0, 0, 0];
	for (const node of selector.nodes) {
		if (node.type === 'id') result[0]++;
		else if (node.type === 'class' || node.type === 'attribute') result[1]++;
		else if (node.type === 'tag') result[2]++;
		else if (node.type === 'pseudo') {
			if (node.value === ':where') continue;
			if (node.value === ':is' || node.value === ':not') {
				const max = node.nodes
					.map((inner) => specificity(inner))
					.sort(compareSpecificity)
					.pop() ?? [0, 0, 0];
				result[0] += max[0];
				result[1] += max[1];
				result[2] += max[2];
			} else {
				result[1]++;
			}
		}
	}
	return result;
}

function compareSpecificity(a: [number, number, number], b: [number, number, number]): number {
	return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
}

/** Whether the selector matches the node as its subject (right-most compound). */
function matches(selector: selectorParser.Selector, node: CascadeNode): boolean {
	const compounds: { combinator: string; parts: selectorParser.Node[] }[] = [{ combinator: '', parts: [] }];
	for (const part of selector.nodes) {
		if (part.type === 'combinator') {
			compounds.push({ combinator: part.value.trim() === '>' ? '>' : ' ', parts: [] });
		} else if (part.type !== 'comment') {
			compounds[compounds.length - 1].parts.push(part);
		}
	}
	return matchFrom(compounds, compounds.length - 1, node);
}

function matchFrom(compounds: { combinator: string; parts: selectorParser.Node[] }[], index: number, node: CascadeNode): boolean {
	if (!matchCompound(compounds[index].parts, node)) return false;
	if (index === 0) return true;
	const combinator = compounds[index].combinator;
	if (combinator === '>') {
		return node.parent !== undefined && matchFrom(compounds, index - 1, node.parent);
	}
	for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
		if (matchFrom(compounds, index - 1, ancestor)) return true;
	}
	return false;
}

function matchCompound(parts: selectorParser.Node[], node: CascadeNode): boolean {
	return parts.every((part) => {
		switch (part.type) {
			case 'universal':
				return !node.host;
			case 'tag':
				return !node.host && node.tag === part.value.toLowerCase();
			case 'class':
				return !node.host && node.classes.includes(part.value);
			case 'attribute': {
				const value = node.attributes[part.attribute];
				if (value === undefined) return false;
				return part.value === undefined || value === part.value.replace(/^['"]|['"]$/g, '');
			}
			case 'pseudo':
				return matchPseudo(part, node);
			default:
				return false;
		}
	});
}

function matchPseudo(part: selectorParser.Pseudo, node: CascadeNode): boolean {
	switch (part.value) {
		case ':host':
			return node.host === true;
		case ':hover':
			return node.states.has('hover');
		case ':active':
			return node.states.has('active');
		case ':focus':
		case ':focus-visible':
			return node.states.has('focus');
		case ':focus-within':
			return node.states.has('focus') || node.states.has('focus-within');
		case ':disabled':
			return ['button', 'fieldset', 'input', 'optgroup', 'option', 'select', 'textarea'].includes(node.tag) && node.attributes.disabled !== undefined;
		case ':is':
		case ':where':
			return part.nodes.some((inner) => matches(inner, node));
		case ':not':
			return !part.nodes.some((inner) => matches(inner, node));
		default:
			return false;
	}
}

/** Properties inherited by default (CSS Inheritance), custom properties included. */
const INHERITED = new Set(['color', 'font-family', 'font-size', 'font-weight', 'line-height', 'text-align', 'visibility']);

export type ComputedStyle = Record<string, string>;

/**
 * Computes the cascaded values of a node: the winning declaration per property after layers,
 * `!important`, specificity and source order, expanded shorthands and inherited values from the
 * parent. `var()` references stay unresolved here; `resolveValue` follows them.
 */
export function computeStyle(node: CascadeNode, rules: CssRule[], parent: ComputedStyle | undefined): ComputedStyle {
	const winners = new Map<string, { rank: number[]; value: string }>();
	for (const rule of rules) {
		if (!matches(rule.selector, node)) continue;
		for (const declaration of rule.declarations) {
			for (const [property, value] of expandShorthand(declaration.property, declaration.value)) {
				const layerRank = declaration.important ? LAYER_ORDER.length * 2 - rule.layer : rule.layer;
				const rank = [declaration.important ? 1 : 0, layerRank, ...rule.specificity, rule.order];
				const current = winners.get(property);
				if (!current || compareRank(rank, current.rank) >= 0) winners.set(property, { rank, value });
			}
		}
	}
	const style: ComputedStyle = {};
	if (parent) {
		for (const [property, value] of Object.entries(parent)) {
			if (property.startsWith('--') || INHERITED.has(property)) style[property] = value;
		}
	}
	for (const [property, { value }] of winners) {
		if (value === 'inherit') {
			if (parent?.[property] !== undefined) style[property] = parent[property];
		} else if (value === 'unset' || value === 'initial' || value === 'revert' || value === 'revert-layer') {
			if (!(property.startsWith('--') || INHERITED.has(property))) delete style[property];
		} else {
			style[property] = value;
		}
	}
	return style;
}

function compareRank(a: number[], b: number[]): number {
	for (let index = 0; index < a.length; index++) {
		if (a[index] !== b[index]) return a[index] - b[index];
	}
	return 0;
}

const SIDES = ['top', 'right', 'bottom', 'left'];
const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];

/** Splits a value at top-level whitespace, keeping function arguments together. */
export function splitValue(value: string, separator = /\s/): string[] {
	const parts: string[] = [];
	let depth = 0;
	let current = '';
	for (const char of value) {
		if (char === '(') depth++;
		if (char === ')') depth--;
		if (depth === 0 && separator.test(char)) {
			if (current) parts.push(current);
			current = '';
		} else {
			current += char;
		}
	}
	if (current) parts.push(current);
	return parts;
}

function boxSides(values: string[]): string[] {
	const [top, right = top, bottom = top, left = right] = values;
	return [top, right, bottom, left];
}

const BORDER_STYLES = new Set(['dashed', 'dotted', 'double', 'groove', 'hidden', 'inset', 'none', 'outset', 'ridge', 'solid']);

const LENGTH_PART = /^(-?[\d.]+[a-z%]*|thin|medium|thick|(calc|max|min|clamp)\(.*\))$/;

/**
 * Splits the parts of a `border` or `outline` shorthand into width, style and color. A `var()`
 * part has no type before substitution: it takes the slot the other parts leave free, in the
 * CSS order width, style, color.
 */
function lineParts(parts: string[]): { color?: string; style?: string; width?: string } {
	const style = parts.find((part) => BORDER_STYLES.has(part));
	let width = parts.find((part) => LENGTH_PART.test(part));
	let color = parts.find((part) => part !== style && part !== width && !part.startsWith('var('));
	const vars = parts.filter((part) => part.startsWith('var('));
	if (width === undefined && color === undefined && vars.length >= 2) {
		width = vars[0];
		color = vars[vars.length - 1];
	} else if (width === undefined && vars.length > 0 && color !== undefined) {
		width = vars[0];
	} else if (color === undefined && vars.length > 0) {
		color = vars[vars.length - 1];
	}
	return { color, style, width };
}

function expandShorthand(property: string, value: string): [string, string][] {
	const parts = splitValue(value);
	switch (property) {
		case 'padding':
		case 'margin':
			return boxSides(parts).map((part, index) => [`${property}-${SIDES[index]}`, part]);
		case 'border-width':
		case 'border-color':
		case 'border-style': {
			const kind = property.split('-')[1];
			return boxSides(parts).map((part, index) => [`border-${SIDES[index]}-${kind}`, part]);
		}
		case 'border-radius':
			return boxSides(splitValue(value.split('/')[0])).map((part, index) => [`border-${CORNERS[index]}-radius`, part]);
		case 'border':
		case 'border-top':
		case 'border-right':
		case 'border-bottom':
		case 'border-left': {
			if (value === 'none' || value === '0') {
				const sides = property === 'border' ? SIDES : [property.split('-')[1]];
				return sides.map((side) => [`border-${side}-width`, '0']);
			}
			const { color, style, width } = lineParts(parts);
			const sides = property === 'border' ? SIDES : [property.split('-')[1]];
			return sides.flatMap((side) => [
				...(width ? [[`border-${side}-width`, width] as [string, string]] : []),
				...(style ? [[`border-${side}-style`, style] as [string, string]] : []),
				...(color ? [[`border-${side}-color`, color] as [string, string]] : []),
			]);
		}
		case 'outline': {
			if (value === 'none' || value === '0') return [['outline-style', 'none']];
			const { color, style, width } = lineParts(parts);
			return [
				...(width ? [['outline-width', width] as [string, string]] : []),
				...(style ? [['outline-style', style] as [string, string]] : []),
				...(color ? [['outline-color', color] as [string, string]] : []),
			];
		}
		case 'gap':
			return [
				['row-gap', parts[0]],
				['column-gap', parts[1] ?? parts[0]],
			];
		case 'flex-flow':
			return parts.map((part) => [/wrap/.test(part) ? 'flex-wrap' : 'flex-direction', part]);
		case 'background':
			return parts.length === 1 ? [['background-color', value]] : [[property, value]];
		default:
			return [[property, value]];
	}
}
