import { penpotTokenName } from '../dtcg.js';
import { createBaseRegistry, extractBaseComponents } from './base-components.js';
import { buildShapes, buildShapesFromRendered } from './build-tree.js';
/**
 * Every combination of the prop axes, each in the default state and once per interaction state
 * axis (`Hover` or `Focus`, never both). A disabled variant and a variant with an `inert` axis value
 * have no interaction states: the interactive element ignores pointer and focus, or the state is
 * shown on the default variant only. Order follows the axis order of the spec, so the
 * output order is stable.
 */
export function combinations(spec) {
	const propAxes = spec.axes.filter((axis) => axis.kind === 'prop');
	const stateAxes = spec.axes.filter((axis) => axis.kind === 'state');
	let rows = [{ props: { ...spec.sample }, properties: [] }];
	for (const axis of propAxes) {
		rows = rows.flatMap((row) =>
			axis.values.map((value) => ({
				props: { ...row.props, [axis.prop]: value },
				properties: [...row.properties, [axis.name, String(value)]],
			})),
		);
	}
	const result = [];
	for (const row of rows) {
		const inert = row.props._disabled === true || propAxes.some((axis) => axis.inert?.includes(row.props[axis.prop]));
		const states = ['default', ...(inert ? [] : stateAxes.map((axis) => axis.state))];
		for (const state of states) {
			const switches = stateAxes.map((axis) => [axis.name, String(axis.state === state)]);
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
/**
 * The deterministic transformation `design specification + CSS + tokens → Penpot and Figma`. Runs without a
 * browser; the same input gives byte-identical files (`stableStringify`).
 */
export function transform(input) {
	const specs = new Map(input.specs.map((spec) => [spec.block, spec]));
	const reports = {};
	const components = [];
	const sets = {};
	const figmaSets = [];
	const bases = createBaseRegistry();
	for (const block of [...input.library].sort()) {
		const spec = specs.get(block);
		const rules = input.rules.get(block);
		if (!spec || !rules) continue;
		const report = { missingEmbeds: [], unresolvedValues: [], untokenizedColors: [] };
		const variants = combinations(spec);
		const variantSet = spec.axes.length > 0;
		const figmaComponents = [];
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
	const baseComponents = [];
	const baseSets = [];
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
const PRIMARY = { center: 'CENTER', end: 'MAX', 'flex-end': 'MAX', 'space-between': 'SPACE_BETWEEN' };
const COUNTER = { center: 'CENTER', end: 'MAX', 'flex-end': 'MAX' };
/** Converts a shape tree into Figma nodes with positions relative to the parent frame. */
function toFigmaNode(shape, parent) {
	const variable = (token) => (token ? token.replace(/\./g, '/') : undefined);
	const node = {
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
function round2(value) {
	return Math.round(value * 100) / 100;
}
/** Theme tokens as Figma variables: colors with a Light and a Dark value, lengths as numbers in px. */
function figmaVariables(tokens, themeName) {
	const variables = [];
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
