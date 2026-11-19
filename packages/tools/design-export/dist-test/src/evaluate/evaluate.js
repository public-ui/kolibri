import { literalValues, propertyName } from '../dialect/bem-dialect.js';
import { installDomGlobals } from './dom-globals.js';
import { importCollectionModule } from './load-collection.js';
import { normalize } from './stencil-shim.js';
/** Value of a message axis without a message. */
const NO_MESSAGE = 'none';
const MESSAGE_TEXT = 'Meldungstext';
/** Instance prop of the `State` axis; its value names the prop that is `true`. */
const STATE_PROP = '@state';
const STATE_DEFAULT = 'default';
const INTERACTIVE_TAGS = new Set(['a', 'button', 'input', 'select', 'summary', 'textarea']);
/**
 * Design specification of a web component whose props carry `@design` tags. Each variant
 * instantiates the component class with the props of the variant and calls `componentWillLoad()`
 * and `render()`: normalized props, tags, BEM classes, attributes, inline styles and conditional
 * elements come out exactly as the component renders them.
 */
export async function evaluateWebComponent(componentsRoot, source, apis) {
	const api = apis.find((entry) => entry.tag === source.tag);
	if (!api) throw new Error(`${source.tag}: no entry in custom-elements.json`);
	installDomGlobals();
	const module = await importCollectionModule(componentsRoot, `components/${source.tag.replace(/^kol-/, '')}/component`);
	const Component = module[source.className];
	if (typeof Component !== 'function') throw new Error(`${source.tag}: the collection exports no class ${source.className}`);
	const axes = [];
	const sample = { ...source.defaults };
	const toPropValue = new Map();
	const stateProps = new Map();
	// Hover and Focus are shown in the state `default` only.
	const stateAxis = { kind: 'prop', name: 'State', prop: STATE_PROP, values: [STATE_DEFAULT], inert: [] };
	for (const [prop, annotation] of Object.entries(source.annotations).sort(([a], [b]) => a.localeCompare(b))) {
		if (annotation.kind === 'state') {
			if (stateProps.size === 0) axes.push(stateAxis);
			stateProps.set(annotation.value, prop);
			stateAxis.values.push(annotation.value);
			stateAxis.inert?.push(annotation.value);
			continue;
		}
		const type = attributeType(api, prop);
		const axis = axisOf(prop, annotation, type, apis);
		if (axis) {
			axes.push(axis.axis);
			toPropValue.set(prop, axis.toFc);
		} else if (annotation.kind === 'content') sample[prop] = annotation.text;
		else if (annotation.kind === 'sample') sample[prop] = annotation.value;
	}
	if (sample._label === undefined && api.attributes.includes('_label')) sample._label = propertyName(source.tag.replace(/^kol-/, ''));
	// Web components inside the render tree (`kol-link` in `kol-quote`) render their shadow tree as well.
	const embedded = new Map();
	const missing = new Set();
	const toTree = (node) =>
		toRendered(node, source.slot, (tag, attrs) => {
			const Embedded = embedded.get(tag);
			if (!Embedded) {
				missing.add(tag);
				return undefined;
			}
			const roots = renderComponent(Embedded, attrs);
			return roots.length === 1 ? toTree(roots[0]) : undefined;
		});
	const render = (props) => {
		const values = {};
		for (const [prop, value] of Object.entries(props)) {
			if (prop === STATE_PROP) {
				const target = stateProps.get(String(value));
				if (target) values[target] = true;
				continue;
			}
			const convert = toPropValue.get(prop);
			values[prop] = convert ? convert(value) : value;
		}
		const nodes = renderComponent(Component, values).map(toTree);
		if (nodes.length !== 1) throw new Error(`${source.tag}: render() yields ${nodes.length} root elements, expected one`);
		return nodes[0];
	};
	for (let round = 0; round < 4; round++) {
		render(sample);
		if (missing.size === 0) break;
		for (const tag of missing) {
			const Embedded = await loadComponentClass(componentsRoot, tag);
			if (Embedded) embedded.set(tag, Embedded);
		}
		missing.clear();
	}
	const probe = render(sample);
	if (containsInteractive(probe)) {
		axes.push({ kind: 'state', name: 'Hover', state: 'hover' }, { kind: 'state', name: 'Focus', state: 'focus' });
	}
	return { block: source.tag, axes, modifiers: {}, sample, tree: { tag: source.tag, kind: 'frame' }, render };
}
function axisOf(prop, annotation, type, apis) {
	const name = propertyName(
		prop
			.replace(/^_/, '')
			.replace(/([a-z])([A-Z])/g, '$1-$2')
			.toLowerCase(),
	);
	if (annotation.kind === 'toggle') {
		return { axis: { kind: 'prop', name, prop, values: [false, true] }, toFc: (value) => (value === true ? annotation.text : undefined) };
	}
	if (annotation.kind !== 'variant') return undefined;
	if (annotation.values) {
		const values = new Map(annotation.values);
		return { axis: { kind: 'prop', name, prop, values: [...values.keys()] }, toFc: (value) => values.get(String(value)) ?? value };
	}
	if (/\bAlertProps\b/.test(type)) {
		// A message is an alert: its axis takes the alert types, `none` renders no message.
		const alertTypes = literalValues(
			attributeType(
				apis.find((api) => api.tag === 'kol-alert'),
				'_type',
			),
		);
		return {
			axis: { kind: 'prop', name: 'Message', prop, values: [NO_MESSAGE, ...alertTypes] },
			toFc: (value) => (value === NO_MESSAGE || value === undefined ? undefined : { _description: MESSAGE_TEXT, _type: value }),
		};
	}
	const literals = literalValues(type);
	if (literals.length > 0) {
		const numeric = literals.every((value) => /^-?\d+(\.\d+)?$/.test(value));
		return { axis: { kind: 'prop', name, prop, values: literals }, toFc: (value) => (numeric && typeof value === 'string' ? Number(value) : value) };
	}
	if (/\bboolean\b/.test(type)) return { axis: { kind: 'prop', name, prop, values: [false, true] }, toFc: (value) => value };
	throw new Error(`@design variant at ${prop}: the type "${type}" has no enumerable values`);
}
function attributeType(api, prop) {
	const kebab = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	return api?.attributeTypes?.[kebab] ?? api?.attributeTypes?.[prop] ?? '';
}
function toRendered(node, slot, shadowOf) {
	if (node.tag === 'slot' && slot !== undefined && node.attrs.name === undefined) return { tag: 'span', classes: [], attributes: {}, text: slot, children: [] };
	const classes = classList(node.attrs.class ?? node.attrs.className);
	const attributes = {};
	for (const [name, value] of Object.entries(node.attrs).sort(([a], [b]) => a.localeCompare(b))) {
		if (name === 'class' || name === 'className' || name === 'innerHTML' || name === 'key' || name === 'ref' || /^on[A-Z]/.test(name)) continue;
		if (value === true) attributes[name] = '';
		else if (name === 'style' && value && typeof value === 'object') attributes.style = inlineStyle(value);
		else if (typeof value === 'string' || typeof value === 'number') attributes[name] = String(value);
	}
	// `innerHTML` (rendered markdown) counts with its text content.
	const html = typeof node.attrs.innerHTML === 'string' ? node.attrs.innerHTML.replace(/<[^>]*>/g, '') : '';
	const text =
		html +
		node.children
			.filter((child) => 'text' in child)
			.map((child) => child.text)
			.join('');
	const shadow = /^kol-[a-z-]+$/.test(node.tag) ? shadowOf(node.tag, node.attrs) : undefined;
	return {
		tag: node.tag,
		classes,
		attributes,
		...(text ? { text } : {}),
		children: node.children.filter((child) => 'tag' in child).map((child) => toRendered(child, slot, shadowOf)),
		...(node.fcs ? { fcs: node.fcs } : {}),
		...(shadow ? { shadow } : {}),
	};
}
function renderComponent(Component, props) {
	const element = new Component();
	for (const [prop, value] of Object.entries(props)) element[prop] = value;
	element.componentWillLoad?.();
	return normalize(element.render()).filter((child) => 'tag' in child);
}
/** The class of a web component of the collection, found by its tag (`static get is()`). */
async function loadComponentClass(componentsRoot, tag) {
	try {
		const module = await importCollectionModule(componentsRoot, `components/${tag.replace(/^kol-/, '')}/component`);
		return Object.values(module).find((value) => typeof value === 'function' && value.is === tag);
	} catch {
		return undefined;
	}
}
/** Stencil's style object (`{ backgroundColor: '#000' }`) as declarations (`background-color: #000`). */
function inlineStyle(style) {
	return Object.entries(style)
		.filter(([, value]) => typeof value === 'string' || typeof value === 'number')
		.map(
			([property, value]) => `${property.startsWith('--') ? property : property.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}: ${String(value)}`,
		)
		.join('; ');
}
function classList(value) {
	if (typeof value === 'string') return value.split(/\s+/).filter(Boolean);
	if (value && typeof value === 'object') {
		return Object.entries(value)
			.filter(([, enabled]) => Boolean(enabled))
			.map(([name]) => name);
	}
	return [];
}
function containsInteractive(node) {
	return INTERACTIVE_TAGS.has(node.tag) || node.children.some(containsInteractive);
}
