import { toHex } from '../bind-tokens.js';
import { penpotTokenName } from '../dtcg.js';
import { computeStyle } from './cascade.js';
import { isPainted, resolveValue, round, toPx } from './values.js';
import { verdanaWidth } from './verdana-metrics.js';
/** `line-height: normal` of Verdana. */
const NORMAL_LINE_HEIGHT = 1.215;
/** Whether a modifier binding holds for the props; an unset prop counts as `false`. */
function isBound(binding, props) {
	const value = props[binding.prop];
	if (binding.value === undefined) return value !== undefined && value !== false && value !== '';
	return (value ?? false) === binding.value;
}
function valueOf(source, props) {
	if (!source) return undefined;
	if ('literal' in source) return source.literal;
	const value = props[source.prop];
	return source.map && typeof value === 'string' ? source.map[value] : value;
}
/** Block modifier classes of a spec for the props: bound modifiers plus the axis modifiers. */
function blockClasses(spec, props) {
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
export function buildShapes(spec, specs, props, state, rules, tokens, report, icons = new Map()) {
	const host = { tag: spec.block, classes: [], attributes: {}, host: true, states: new Set() };
	const root = instantiate(spec.tree, spec, specs, props, host, report, blockClasses(spec, props));
	if (!root) throw new Error(`${spec.block}: the root node has a condition that does not hold.`);
	applyState(root, state);
	const tokenMap = new Map(tokens.map((token) => [token.name, token]));
	const hostStyle = computeStyle(host, rules, undefined);
	const shape = toShape(root, hostStyle, rules, tokenMap, report, icons) ?? emptyShape(spec.block);
	measure(shape);
	place(shape, 0, 0);
	return shape;
}
const INTERACTIVE_TAGS = new Set(['a', 'button', 'input', 'select', 'summary', 'textarea']);
/** Glyph classes of the icon fonts; an element with one of them is an icon layer. */
const GLYPH_CLASS = /^(codicon|fa|kolicon)-/;
/**
 * Builds the shape tree of one variant from the element tree its functional components render
 * (`BlockDesignSpec.render`). Elements without a box in the design (the hidden expert slot,
 * `hidden`, `.visually-hidden`) stay out.
 */
export function buildShapesFromRendered(block, rendered, state, rules, tokens, report, icons = new Map(), rulesOf = () => undefined) {
	const host = { tag: block, classes: [], attributes: {}, host: true, states: new Set() };
	const interactive = { found: false };
	const root = fromRendered(rendered, block, host, interactive);
	if (!root) throw new Error(`${block}: the rendered root is hidden.`);
	applyState(root, state);
	const tokenMap = new Map(tokens.map((token) => [token.name, token]));
	const hostStyle = computeStyle(host, rules, undefined);
	if (/size/.test(hostStyle['container-type'] ?? '')) {
		const width = toPx(resolveValue(hostStyle.width, hostStyle, tokenMap)?.value, 16);
		containerOf(
			hostStyle,
			width,
			toPx(resolveValue(hostStyle.height, hostStyle, tokenMap)?.value, 16) ?? heightFromAspectRatio(width, hostStyle['aspect-ratio']),
		);
	}
	const shape = toShape(root, hostStyle, rules, tokenMap, report, icons, rulesOf) ?? emptyShape(block);
	measure(shape);
	place(shape, 0, 0);
	return shape;
}
function fromRendered(rendered, block, parent, interactive) {
	if (rendered.attributes.hidden !== undefined || rendered.classes.includes('visually-hidden')) return undefined;
	if (rendered.tag === 'slot' && rendered.attributes.name === 'expert') return undefined;
	const glyph = rendered.classes.find((name) => GLYPH_CLASS.test(name));
	// Only the first interactive element carries the interaction states, as in `applyState`.
	const isInteractive = INTERACTIVE_TAGS.has(rendered.tag) && !interactive.found;
	if (isInteractive) interactive.found = true;
	const node = {
		tag: rendered.tag,
		kind: glyph ? 'icon' : rendered.tag === 'slot' ? 'slot' : rendered.text !== undefined ? 'text' : 'frame',
		...(isInteractive ? { interactive: true } : {}),
	};
	const cascade = { tag: rendered.tag, classes: [...rendered.classes], attributes: { ...rendered.attributes }, parent, states: new Set() };
	(parent.children ??= []).push(cascade);
	const instance = { node, cascade, block, name: layerName(rendered, block), classes: rendered.classes, children: [] };
	if (glyph) instance.glyph = glyph;
	if (rendered.text !== undefined) instance.text = rendered.text;
	const base = baseOf(rendered);
	if (base) instance.base = base;
	if (rendered.tag === 'svg') {
		const cascades = new Map();
		const link = (element, parentCascade) => {
			for (const child of element.children) {
				const childCascade = {
					tag: child.tag,
					classes: [...child.classes],
					attributes: { ...child.attributes },
					parent: parentCascade,
					states: new Set(),
				};
				(parentCascade.children ??= []).push(childCascade);
				cascades.set(child, childCascade);
				link(child, childCascade);
			}
		};
		link(rendered, cascade);
		instance.svg = { rendered, cascades };
		return instance;
	}
	if (rendered.shadow) {
		const host = { tag: rendered.tag, classes: [], attributes: { ...rendered.attributes }, host: true, states: new Set() };
		instance.embed = { host, tag: rendered.tag };
		const root = fromRendered(rendered.shadow, rendered.tag, host, interactive);
		if (root) instance.children.push(root);
		return instance;
	}
	for (const child of rendered.children) {
		const childInstance = fromRendered(child, block, cascade, interactive);
		if (childInstance) instance.children.push(childInstance);
	}
	return instance;
}
/** The innermost functional component of an element that opens a BEM block of its own. */
function baseOf(rendered) {
	if (!rendered.classes.some((name) => /^kol-[a-z0-9-]+$/.test(name))) return undefined;
	return [...(rendered.fcs ?? [])].reverse().find((name) => name.endsWith('FC'));
}
/**
 * The BEM element class names the layer, else the block class, else the tag. The root of an
 * embedded functional component carries its own element class and, after it, the one its parent
 * gives it (`kol-icon__icon kol-alert__icon`): the parent's names the place in the component.
 */
function layerName(rendered, block) {
	const bem = rendered.classes.filter((name) => /^kol-[a-z0-9-]+(__[a-z0-9-]+)?$/.test(name) && !name.includes('--'));
	return bem.findLast((name) => name.includes('__')) ?? bem.find((name) => name === block) ?? bem[0] ?? rendered.tag;
}
function instantiate(node, spec, specs, props, parent, report, rootClasses) {
	if (node.when && !isBound(node.when, props)) return undefined;
	const block = spec.block;
	const classes = rootClasses ? [...rootClasses] : [];
	if (node.element) {
		classes.push(`${block}__${node.element}`);
		for (const [modifier, binding] of Object.entries(node.modifiers ?? {})) {
			if (isBound(binding, props)) classes.push(`${block}__${node.element}--${modifier}`);
		}
	}
	const attributes = {};
	if (node.interactive && props._disabled === true) attributes.disabled = '';
	if (node.hidden) attributes.hidden = '';
	const cascade = { tag: node.tag, classes, attributes, parent, states: new Set() };
	(parent.children ??= []).push(cascade);
	const name = node.element ? `${block}__${node.element}` : block;
	const instance = { node, cascade, block, name, classes, children: [] };
	if (node.embeds) {
		const embedded = specs.get(node.embeds);
		const embeddedProps = Object.fromEntries(Object.entries(node.embedProps ?? {}).map(([key, source]) => [key, valueOf(source, props)]));
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
function applyState(root, state) {
	if (state === 'default') return;
	const carrier = findInteractive(root);
	if (!carrier || carrier.cascade.attributes.disabled !== undefined) return;
	carrier.cascade.states.add(state);
	for (let ancestor = carrier.cascade.parent; ancestor; ancestor = ancestor.parent) {
		ancestor.states.add(state === 'focus' ? 'focus-within' : state);
	}
}
function findInteractive(instance) {
	if (instance.node.interactive) return instance;
	for (const child of instance.children) {
		const found = findInteractive(child);
		if (found) return found;
	}
	return undefined;
}
function emptyShape(name) {
	return { name, classes: [], kind: 'box', x: 0, y: 0, width: 0, height: 0, children: [] };
}
function toShape(instance, parentStyle, rules, tokens, report, icons, rulesOf = () => undefined) {
	// An embedded web component: its `:host` rules apply below the declarations of the outer tree.
	const innerRules = instance.embed ? (rulesOf(instance.embed.tag) ?? []) : rules;
	const style = instance.embed
		? { ...computeStyle(instance.embed.host, innerRules, parentStyle), ...computeStyle(instance.cascade, rules, undefined) }
		: computeStyle(instance.cascade, rules, parentStyle, instance.pseudo);
	if (style.display === 'none' || style.visibility === 'hidden') return undefined;
	// The user agent underlines a link with `href`.
	if (instance.cascade.tag === 'a' && instance.cascade.attributes.href !== undefined && style['text-decoration-line'] === parentStyle['text-decoration-line']) {
		style['text-decoration-line'] = 'underline';
	}
	const fontSize =
		toPx(fontSizeKeyword(withContainerUnits(resolveValue(style['font-size'], style, tokens)?.value, style)), toPx(parentStyle['font-size'], 16) ?? 16) ?? 16;
	style['font-size'] = `${fontSize}px`;
	const px = (property) => {
		const resolved = resolveValue(style[property], style, tokens);
		if (resolved === undefined || resolved.value === 'auto' || resolved.value === 'none' || resolved.value === 'normal') return undefined;
		const value = toPx(withContainerUnits(resolved.value, style), fontSize);
		// Percentages size against the parent: the design tool expresses them as fill sizing.
		if (value === undefined && !resolved.value.endsWith('%')) report.unresolvedValues.push(`${instance.name} ${property}: ${style[property]}`);
		return value;
	};
	const color = (property) => {
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
	const tokenName = (resolved) => (resolved?.token ? penpotTokenName(resolved.token) : undefined);
	if (instance.svg) return svgShape(instance, instance.svg, style, parentStyle, innerRules, tokens);
	// Percentages and opposite offsets size against the parent, when the parent has a size of its own.
	const percentOf = (property, base) => {
		const raw = resolveValue(style[property], style, tokens)?.value;
		const total = toPx(parentStyle[base], 16);
		return raw?.endsWith('%') && total !== undefined && Number.isFinite(Number(raw.slice(0, -1))) ? round((Number(raw.slice(0, -1)) / 100) * total) : undefined;
	};
	const between = (start, end, base) => {
		const total = toPx(parentStyle[base], 16);
		const [a, b] = [px(start), px(end)];
		return style.position === 'absolute' && total !== undefined && a !== undefined && b !== undefined ? round(total - a - b) : undefined;
	};
	const width = px('width') ?? percentOf('width', PARENT_WIDTH) ?? between('left', 'right', PARENT_WIDTH);
	const height =
		px('height') ?? percentOf('height', PARENT_HEIGHT) ?? between('top', 'bottom', PARENT_HEIGHT) ?? heightFromAspectRatio(width, style['aspect-ratio']);
	if (width === undefined) delete style[PARENT_WIDTH];
	else style[PARENT_WIDTH] = `${width}px`;
	if (height === undefined) delete style[PARENT_HEIGHT];
	else style[PARENT_HEIGHT] = `${height}px`;
	// A size container gives its descendants the size behind `cqw` and `cqh`.
	if (/size/.test(style['container-type'] ?? '')) containerOf(style, width, height);
	const children = [];
	const generated = (pseudo) => {
		if (instance.pseudo) return undefined;
		const pseudoStyle = computeStyle(instance.cascade, innerRules, style, pseudo);
		if (pseudoStyle.content === undefined || pseudoStyle.display === 'none') return undefined;
		const text = contentText(pseudoStyle.content);
		// Empty content generates a box: a ring, a bar or a marker drawn by its border and background.
		if (text === undefined && /^(""|'')$/.test(pseudoStyle.content.trim())) {
			const box = {
				node: instance.node,
				cascade: instance.cascade,
				block: instance.block,
				name: `${instance.name}::${pseudo}`,
				classes: [],
				pseudo,
				children: [],
			};
			return toShape(box, style, innerRules, tokens, report, icons, rulesOf);
		}
		if (text === undefined) return undefined;
		const pseudoSize = toPx(withContainerUnits(resolveValue(pseudoStyle['font-size'], pseudoStyle, tokens)?.value, pseudoStyle), fontSize) ?? fontSize;
		let ink = resolveValue(pseudoStyle.color, pseudoStyle, tokens);
		if (ink && toHex(ink.value) === undefined) ink = undefined;
		return textShape({ ...instance, name: `${instance.name}::${pseudo}`, text }, pseudoStyle, pseudoSize, ink, tokenName);
	};
	const before = generated('before');
	if (before) children.push(before);
	if (instance.text !== undefined) children.push(textShape(instance, style, fontSize, color('color'), tokenName));
	if (instance.glyph !== undefined && instance.node.kind === 'icon') {
		const ink = color('color');
		const vector = icons.get(instance.glyph);
		// An icon of another font (Codicons, Font Awesome) has no vector here: the box keeps its size.
		if (vector)
			children.push({
				name: `${instance.name}::icon`,
				classes: [],
				kind: 'vector',
				x: 0,
				y: 0,
				width: fontSize,
				height: fontSize,
				vector,
				fill: ink ? toHex(ink.value) : undefined,
				fillToken: tokenName(ink),
				children: [],
			});
		else report.unresolvedValues.push(`${instance.name} icon: ${instance.glyph}`);
	}
	const placed = [];
	for (const child of instance.children) {
		const shape = toShape(child, style, innerRules, tokens, report, icons, rulesOf);
		if (!shape) continue;
		children.push(shape);
		placed.push({ area: computeStyle(child.cascade, innerRules, style)['grid-area']?.split('/')[0].trim(), shape });
	}
	const after = generated('after');
	if (after) children.push(after);
	const fill = color('background-color');
	const sides = ['top', 'right', 'bottom', 'left'];
	const strokeWidths = sides.map((side) => (style[`border-${side}-style`] && style[`border-${side}-style`] !== 'none' ? (px(`border-${side}-width`) ?? 3) : 0));
	// One stroke color per layer: the first side with a border gives it.
	const strokeSide = sides.find((_, index) => strokeWidths[index] > 0);
	const stroke = strokeSide ? color(`border-${strokeSide}-color`) : undefined;
	// A percentage radius refers to the box: `50%` rounds a square into a circle.
	const corner = (name) => {
		const raw = resolveValue(style[`border-${name}-radius`], style, tokens)?.value;
		const percent = raw?.endsWith('%') ? Number(raw.slice(0, -1)) : Number.NaN;
		return Number.isFinite(percent) ? round((percent / 100) * Math.min(width ?? 0, height ?? 0)) : (px(`border-${name}-radius`) ?? 0);
	};
	const radius = ['top-left', 'top-right', 'bottom-right', 'bottom-left'].map(corner);
	const padding = sides.map((side) => px(`padding-${side}`) ?? 0);
	const outlineColor = style['outline-style'] && style['outline-style'] !== 'none' ? color('outline-color') : undefined;
	const outlineWidth = outlineColor ? (px('outline-width') ?? 3) : 0;
	let display = style.display ?? (['a', 'button', 'i', 'kbd', 'span', 'strong', 'u'].includes(instance.node.tag) ? 'inline' : 'block');
	const areaRows = display.includes('grid') ? gridAreaRows(style['grid-template-areas']) : undefined;
	if (areaRows && placed.length === children.length) {
		// Template areas become nested auto layouts: one row per template row, the rows stacked.
		const gap = (property) => toPx(resolveValue(style[property], style, tokens)?.value, fontSize) ?? 0;
		const rows = gridRows(instance.name, areaRows, placed, gap('column-gap'), style['align-items']);
		children.splice(0, children.length, ...rows);
		display = 'flex';
		style['flex-direction'] = 'column';
		style['row-gap'] = `${gap('row-gap')}px`;
		style['align-items'] = 'stretch';
	} else if (display.includes('grid') && children.length > 0) {
		report.unresolvedValues.push(`${instance.name} display: ${display} (grid areas have no auto layout counterpart)`);
	}
	return {
		name: instance.name,
		classes: instance.classes.filter((name) => name.startsWith('kol-')),
		kind: 'box',
		x: 0,
		y: 0,
		width: width ?? 0,
		height: height ?? 0,
		...(width !== undefined ? { fixedWidth: true } : {}),
		...(height !== undefined ? { fixedHeight: true } : {}),
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
					color: toHex(outlineColor.value),
					offset: px('outline-offset') ?? 0,
					radius: radius.some((value) => value > 0) ? radius : undefined,
					token: tokenName(outlineColor),
					width: outlineWidth,
				}
			: undefined,
		...(style.position === 'absolute' ? { absolute: insetOf(px) } : {}),
		minWidth: px('min-width'),
		minHeight: px('min-height'),
		layout: centerAutoMargins(layoutOf(display, style, fontSize, children, tokens), instance, style, rules),
		opacity: style.opacity !== undefined && Number(style.opacity) < 1 ? Number(style.opacity) : undefined,
		...(instance.base ? { base: instance.base } : {}),
		children,
	};
}
function insetOf(px) {
	const inset = {};
	for (const side of ['bottom', 'left', 'right', 'top']) {
		const value = px(side);
		if (value !== undefined) inset[side] = value;
	}
	return inset;
}
/** The browser sizes of the absolute font size keywords. */
const FONT_SIZE_KEYWORDS = {
	large: '18px',
	medium: '16px',
	small: '13px',
	'x-large': '24px',
	'x-small': '10px',
	'xx-large': '32px',
	'xx-small': '9px',
};
function fontSizeKeyword(value) {
	return value === undefined ? undefined : (FONT_SIZE_KEYWORDS[value] ?? value);
}
/** The rows of `grid-template-areas: "LABEL LABEL" "BAR VALUE"`, each a list of area names. */
function gridAreaRows(value) {
	const rows = [...(value ?? '').matchAll(/"([^"]*)"|'([^']*)'/g)].map(([, double, single]) => (double ?? single ?? '').trim().split(/\s+/));
	return rows.length > 0 ? rows : undefined;
}
/** A row box per template row; an area spanning several rows sits in its first row. */
function gridRows(name, rows, placed, columnGap, alignItems) {
	const used = new Set();
	const result = [];
	rows.forEach((areas, index) => {
		const members = [...new Set(areas)].flatMap((area) => placed.filter((entry) => entry.area === area && !used.has(entry.shape)).map((entry) => entry.shape));
		members.forEach((shape) => used.add(shape));
		if (members.length === 0) return;
		if (members.length === 1) {
			result.push(members[0]);
			return;
		}
		// Several children in one area lie on top of each other, centered: the first stays in the flow.
		if (new Set(areas).size === 1) {
			for (const member of members.slice(1)) member.absolute = {};
			result.push({
				name: `${name}::area-${areas[0].toLowerCase()}`,
				classes: [],
				kind: 'box',
				x: 0,
				y: 0,
				width: 0,
				height: 0,
				layout: { alignItems: 'center', direction: 'column', gap: 0, justifyContent: 'center', wrap: false },
				children: members,
			});
			return;
		}
		result.push({
			name: `${name}::row-${index + 1}`,
			classes: [],
			kind: 'box',
			x: 0,
			y: 0,
			width: 0,
			height: 0,
			layout: { alignItems: alignItems ?? 'stretch', direction: 'row', gap: columnGap, justifyContent: 'start', wrap: false },
			children: members,
		});
	});
	// Children without an area follow in source order.
	for (const { shape } of placed) if (!used.has(shape)) result.push(shape);
	return result;
}
/** An inline `<svg>` as one vector: its elements with the fills and strokes the cascade gives them. */
function svgShape(instance, svg, style, parentStyle, rules, tokens) {
	const attributes = svg.rendered.attributes;
	const length = (value, base, nominal) => {
		if (value === undefined) return nominal;
		if (value.endsWith('%')) {
			const total = toPx(parentStyle[base], 16);
			return total === undefined ? nominal : round((Number(value.slice(0, -1)) / 100) * total);
		}
		return toPx(value, 16) ?? nominal;
	};
	const [, , boxWidth, boxHeight] = (attributes.viewBox ?? '').split(/[\s,]+/).map(Number);
	const width = length(attributes.width, PARENT_WIDTH, boxWidth || SVG_NOMINAL_WIDTH);
	const height = length(attributes.height, PARENT_HEIGHT, boxHeight ? (boxHeight * width) / (boxWidth || width) : width);
	const viewBox = attributes.viewBox ?? `0 0 ${width} ${height}`;
	const [, , viewWidth, viewHeight] = viewBox.split(/[\s,]+/).map(Number);
	const paint = (value, elementStyle) => {
		if (value === undefined) return 'none';
		const resolved = resolveValue(value.toLowerCase() === 'currentcolor' ? elementStyle.color : value, elementStyle, tokens)?.value;
		if (!resolved || resolved === 'none' || resolved === 'transparent') return 'none';
		return toHex(resolved) ?? 'none';
	};
	const percent = (value, total) =>
		value.replace(/calc\(([^)]*)\)|(-?[\d.]+)%/g, (match, inner, amount) =>
			inner !== undefined ? String(toPx(`calc(${percent(inner, total)})`, 16) ?? match) : String(round((Number(amount) / 100) * total)),
		);
	const elements = (node, nodeStyle) =>
		node.children
			.map((child) => {
				const cascade = svg.cascades.get(child);
				const childStyle = cascade ? computeStyle(cascade, rules, nodeStyle) : nodeStyle;
				const own = { ...child.attributes };
				delete own.class;
				delete own.style;
				for (const property of ['height', 'width', 'x', 'y']) {
					const value = childStyle[property] ?? own[property];
					if (value !== undefined) own[property] = percent(value, property === 'width' || property === 'x' ? viewWidth : viewHeight);
				}
				own.fill = paint(childStyle.fill ?? child.attributes.fill, childStyle);
				own.stroke = paint(childStyle.stroke ?? child.attributes.stroke, childStyle);
				const rotate = /^rotate\((-?[\d.]+)deg\)$/.exec(childStyle.transform ?? '');
				if (rotate) own.transform = `rotate(${rotate[1]} ${viewWidth / 2} ${viewHeight / 2})`;
				const attributeText = Object.entries(own)
					.sort(([a], [b]) => a.localeCompare(b))
					.map(([name, value]) => `${name}="${value}"`)
					.join(' ');
				return `<${child.tag} ${attributeText}>${elements(child, childStyle)}</${child.tag}>`;
			})
			.join('');
	const markup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}">${elements(svg.rendered, style)}</svg>`;
	return {
		name: instance.name,
		classes: instance.classes.filter((name) => name.startsWith('kol-')),
		kind: 'vector',
		x: 0,
		y: 0,
		width,
		height,
		vector: { viewBox, paths: [], markup },
		children: [],
	};
}
/** Width of an inline `<svg>` that fills its parent (`width="100%"`) in a parent without a size of its own. */
const SVG_NOMINAL_WIDTH = 240;
/** The text of `content`: a string, `open-quote` or `close-quote`; anything else generates no text here. */
function contentText(content) {
	if (content === undefined) return undefined;
	const parts = [...content.matchAll(/"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)'|(open-quote|close-quote)/g)];
	if (parts.length === 0) return undefined;
	const text = parts
		.map(([, double, single, quote]) => (quote ? (quote === 'open-quote' ? '\u201C' : '\u201D') : (double ?? single ?? '')))
		.join('')
		.replace(/\\([0-9a-f]{1,6})\s?/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
	// Private use characters are glyphs of an icon font: the icon is drawn as a vector instead.
	return text.length > 0 && !/^[\uE000-\uF8FF\s]+$/u.test(text) ? text : undefined;
}
/** A single flex child with `margin: auto` sits in the center: the design tool aligns it through the layout. */
function centerAutoMargins(layout, instance, style, rules) {
	if (!layout || instance.children.length !== 1) return layout;
	const child = computeStyle(instance.children[0].cascade, rules, style);
	const horizontal = child['margin-left'] === 'auto' && child['margin-right'] === 'auto';
	const vertical = child['margin-top'] === 'auto' && child['margin-bottom'] === 'auto';
	if (!horizontal && !vertical) return layout;
	const row = layout.direction === 'row';
	return {
		...layout,
		...((row ? horizontal : vertical) ? { justifyContent: 'center' } : {}),
		...((row ? vertical : horizontal) ? { alignItems: 'center' } : {}),
	};
}
/** The size of the parent box, when it has one of its own: the base of percentages. */
const PARENT_WIDTH = '--kolibri-design-parent-width';
const PARENT_HEIGHT = '--kolibri-design-parent-height';
const CONTAINER_WIDTH = '--kolibri-design-container-width';
const CONTAINER_HEIGHT = '--kolibri-design-container-height';
/** Records the size of a size container as custom properties, which its descendants inherit. */
function containerOf(style, width, height) {
	if (width !== undefined) style[CONTAINER_WIDTH] = `${width}px`;
	if (height !== undefined) style[CONTAINER_HEIGHT] = `${height}px`;
}
/** `40cqh` → `40px` in a container 100px high; units without a known container stay. */
function withContainerUnits(value, style) {
	if (value === undefined || !/cq[a-z]+/.test(value)) return value;
	const width = toPx(style[CONTAINER_WIDTH], 16);
	const height = toPx(style[CONTAINER_HEIGHT], 16);
	return value.replace(/(-?[\d.]+)cq(w|h|i|b|min|max)\b/g, (match, amount, unit) => {
		const sizes = { b: height, h: height, i: width, max: Math.max(width ?? 0, height ?? 0), min: Math.min(width ?? 0, height ?? 0), w: width };
		const size = sizes[unit];
		return size === undefined ? match : `${round((Number(amount) * size) / 100)}px`;
	});
}
/** `aspect-ratio: 1` or `16 / 9` gives the height of a box with a known width. */
function heightFromAspectRatio(width, ratio) {
	if (width === undefined || ratio === undefined) return undefined;
	const [w, h = '1'] = ratio.split('/').map((part) => part.trim());
	const value = Number(w) / Number(h);
	return Number.isFinite(value) && value > 0 ? round(width / value) : undefined;
}
function textShape(instance, style, fontSize, ink, tokenName) {
	const characters = instance.text;
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
		width: round(verdanaWidth(characters, fontSize, weight)),
		height: lineHeight,
		characters,
		fill: ink ? toHex(ink.value) : undefined,
		fillToken: tokenName(ink),
		fontSize,
		fontWeight: weight,
		fontFamily: 'Verdana',
		lineHeight,
		textAlign: style['text-align'],
		...(/underline|line-through/.test(style['text-decoration-line'] ?? '')
			? { textDecoration: /underline/.test(style['text-decoration-line']) ? 'underline' : 'line-through' }
			: {}),
		children: [],
	};
}
const ALIGN_DEFAULT = 'normal';
/**
 * The auto layout of a box. A block whose children are all inline (text, inline elements,
 * generated content) flows them in a row, as one line of text does.
 */
function layoutOf(display, style, fontSize, children, tokens) {
	if (children.length === 0) return undefined;
	const inlineContent = children.length > 1 && children.every((child) => child.kind === 'text' || child.inline === true);
	const flex = display === 'flex' || display === 'inline-flex';
	const grid = display === 'grid' || display === 'inline-grid';
	const direction = flex
		? style['flex-direction']?.startsWith('column')
			? 'column'
			: 'row'
		: display.startsWith('inline') || inlineContent
			? 'row'
			: 'column';
	const gap = flex || grid ? (toPx(resolveValue(direction === 'row' ? style['column-gap'] : style['row-gap'], style, tokens)?.value, fontSize) ?? 0) : 0;
	return {
		alignItems: flex ? (style['align-items'] ?? ALIGN_DEFAULT) : direction === 'row' ? 'center' : 'stretch',
		direction,
		gap,
		justifyContent: flex ? (style['justify-content'] ?? ALIGN_DEFAULT) : 'start',
		wrap: style['flex-wrap'] === 'wrap',
	};
}
/** Content size bottom-up: auto-layout frames hug their children, plus padding, border and minimum size. */
function measure(shape) {
	for (const child of shape.children) measure(child);
	if (shape.kind === 'text' || shape.kind === 'vector') return;
	const [pt, pr, pb, pl] = shape.padding ?? [0, 0, 0, 0];
	const [bt, br, bb, bl] = shape.strokeWidths ?? [0, 0, 0, 0];
	const row = shape.layout?.direction === 'row';
	const gap = shape.layout?.gap ?? 0;
	const flow = shape.children.filter((child) => !child.absolute);
	const widths = flow.map((child) => child.width);
	const heights = flow.map((child) => child.height);
	const gaps = Math.max(0, flow.length - 1) * gap;
	const contentWidth = row ? sum(widths) + gaps : Math.max(0, ...widths);
	const contentHeight = row ? Math.max(0, ...heights) : sum(heights) + gaps;
	shape.width = round(Math.max(shape.width || contentWidth + pl + pr + bl + br, shape.minWidth ?? 0));
	shape.height = round(Math.max(shape.height || contentHeight + pt + pb + bt + bb, shape.minHeight ?? 0));
	// An absolute box between two opposite offsets spans the padding box of its parent.
	for (const child of shape.children) {
		const inset = child.absolute;
		if (!inset) continue;
		if (inset.left !== undefined && inset.right !== undefined) child.width = round(shape.width - bl - br - inset.left - inset.right);
		if (inset.top !== undefined && inset.bottom !== undefined) child.height = round(shape.height - bt - bb - inset.top - inset.bottom);
	}
}
/** Positions top-down relative to the component origin, stretching children along the cross axis. */
function place(shape, x, y) {
	shape.x = round(x);
	shape.y = round(y);
	if (shape.kind !== 'box' || shape.children.length === 0) return;
	const [pt, pr, pb, pl] = shape.padding ?? [0, 0, 0, 0];
	const [bt, br, bb, bl] = shape.strokeWidths ?? [0, 0, 0, 0];
	const innerWidth = shape.width - pl - pr - bl - br;
	const innerHeight = shape.height - pt - pb - bt - bb;
	const layout = shape.layout ?? { alignItems: 'stretch', direction: 'column', gap: 0, justifyContent: 'start', wrap: false };
	const row = layout.direction === 'row';
	const stretch = ['normal', 'stretch'].includes(layout.alignItems);
	const flow = shape.children.filter((child) => !child.absolute);
	const main = sum(flow.map((child) => (row ? child.width : child.height))) + Math.max(0, flow.length - 1) * layout.gap;
	const free = (row ? innerWidth : innerHeight) - main;
	let offset = ['center'].includes(layout.justifyContent) ? free / 2 : ['end', 'flex-end'].includes(layout.justifyContent) ? free : 0;
	const between = layout.justifyContent === 'space-between' && flow.length > 1 ? free / (flow.length - 1) : 0;
	for (const child of shape.children) {
		const inset = child.absolute;
		if (inset) {
			// Without offsets an absolute box keeps its static position: centered where the layout centers.
			const centerX = (row ? layout.justifyContent : layout.alignItems) === 'center' ? (innerWidth - child.width) / 2 : 0;
			const centerY = (row ? layout.alignItems : layout.justifyContent) === 'center' ? (innerHeight - child.height) / 2 : 0;
			const left = inset.left ?? (inset.right !== undefined ? shape.width - bl - br - inset.right - child.width : pl + centerX);
			const top = inset.top ?? (inset.bottom !== undefined ? shape.height - bt - bb - inset.bottom - child.height : pt + centerY);
			place(child, x + bl + left, y + bt + top);
			continue;
		}
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
function sum(values) {
	return values.reduce((total, value) => total + value, 0);
}
