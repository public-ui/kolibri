import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { evaluateWebComponent } from '../src/evaluate/evaluate.js';
import { readWebComponent } from '../src/evaluate/read-design.js';
import { extractApi } from '../src/extract-api.js';
import { createBaseRegistry, extractBaseComponents } from '../src/spec/base-components.js';
import { buildShapesFromRendered } from '../src/spec/build-tree.js';
import { computeStyle, parseRules } from '../src/spec/cascade.js';
import { loadIcons } from '../src/spec/icons.js';
import { combinations } from '../src/spec/transform.js';
const COMPONENTS_ROOT = dirname(dirname(createRequire(import.meta.url).resolve('@public-ui/components')));
async function evaluate(tag) {
	const source = readWebComponent(COMPONENTS_ROOT, tag);
	assert.ok(source, `${tag} carries @design tags`);
	return evaluateWebComponent(COMPONENTS_ROOT, source, await extractApi(join(COMPONENTS_ROOT, 'custom-elements.json')));
}
function find(node, className) {
	if (node.classes.includes(className)) return node;
	for (const child of node.children) {
		const found = find(child, className);
		if (found) return found;
	}
	return undefined;
}
describe('evaluateWebComponent', function () {
	this.timeout(20000);
	it('reads the component class and the @design tags of the props', () => {
		const source = readWebComponent(COMPONENTS_ROOT, 'kol-heading');
		assert.equal(source?.className, 'KolHeading');
		assert.deepEqual(source?.annotations, {
			_label: { kind: 'content', text: 'Überschrift' },
			_level: { kind: 'variant' },
			_secondaryHeadline: { kind: 'toggle', text: 'Unterzeile' },
		});
	});
	it('leaves a component without @design tags on the BEM path', () => {
		assert.equal(readWebComponent(COMPONENTS_ROOT, 'kol-card'), undefined);
	});
	it('renders the component class itself: normalized props, inline styles and markdown labels', async () => {
		const spec = await evaluate('kol-badge');
		const color = spec.axes.find((axis) => axis.name === 'Color');
		assert.deepEqual(color?.kind === 'prop' ? color.values : [], ['black', 'blue', 'red']);
		const render = spec.render;
		const badge = render({ ...spec.sample, _color: 'blue', _icons: false });
		assert.match(badge.attributes.style, /^background-color: #06539e; color: #[0-9a-f]{6}$/);
		assert.equal(find(badge, 'kol-span__label')?.text, 'Badge');
	});
	it('renders an embedded web component as its shadow tree and fills the default slot', async () => {
		const quote = await evaluate('kol-quote');
		const link = (node) => (node.tag === 'kol-link' ? node : node.children.map(link).find(Boolean));
		const embedded = link(quote.render(quote.sample));
		assert.ok(embedded?.shadow?.classes.includes('kol-link'));
		const abbr = await evaluate('kol-abbr');
		const root = abbr.render(abbr.sample);
		assert.equal(root.children[0].text, 'z. B.');
	});
	it('takes the heading levels 0 to 6 from the prop type and renders each level as its tag', async () => {
		const spec = await evaluate('kol-heading');
		assert.deepEqual(
			spec.axes.map((axis) => (axis.kind === 'prop' ? [axis.name, axis.values] : [axis.name])),
			[
				['Level', ['0', '1', '2', '3', '4', '5', '6']],
				['Secondary Headline', [false, true]],
			],
		);
		const render = spec.render;
		const h3 = render({ ...spec.sample, _level: '3', _secondaryHeadline: false });
		assert.equal(h3.tag, 'h3');
		assert.ok(h3.classes.includes('kol-headline--h3'));
		assert.equal(h3.text, 'Überschrift');
		assert.equal(render({ ...spec.sample, _level: '0', _secondaryHeadline: false }).tag, 'strong');
		const group = render({ ...spec.sample, _level: '2', _secondaryHeadline: true });
		assert.equal(group.tag, 'hgroup');
		assert.equal(group.children[1].text, 'Unterzeile');
	});
	it('turns the message into an axis of the alert types and shows it on the touched field', async () => {
		const spec = await evaluate('kol-input-text');
		const message = spec.axes.find((axis) => axis.kind === 'prop' && axis.name === 'Message');
		assert.deepEqual(message?.kind === 'prop' && message.values, ['none', 'default', 'error', 'info', 'success', 'warning']);
		assert.deepEqual(
			spec.axes.map((axis) => axis.name),
			['State', 'Message', 'Hover', 'Focus'],
		);
		const state = spec.axes[0];
		assert.deepEqual(state.kind === 'prop' && state.values, ['default', 'disabled', 'readonly', 'required']);
		// Hover and Focus only in the state default: 6 messages × (3 + 3 states).
		assert.equal(combinations(spec).length, 36);
		const render = spec.render;
		const none = render({ ...spec.sample, _msg: 'none' });
		assert.equal(find(none, 'kol-form-field__msg'), undefined);
		assert.equal(find(none, 'kol-form-field__hint')?.text, 'Hinweistext');
		const error = render({ ...spec.sample, _msg: 'error' });
		assert.ok(error.classes.includes('kol-form-field--error'));
		assert.ok(find(error, 'kol-form-field__msg'));
		assert.deepEqual(find(error, 'kol-form-field__msg')?.fcs, ['FormFieldMsgFC', 'AlertFC', 'renderBemRootNode']);
		const disabled = render({ ...spec.sample, '@state': 'disabled', _msg: 'none' });
		assert.ok(JSON.stringify(disabled).includes('"disabled":""'), 'State=disabled sets _disabled');
	});
});
describe('static cascade', () => {
	const node = (tag, classes, parent) => {
		const created = { tag, classes, attributes: {}, parent, states: new Set() };
		if (parent) (parent.children ??= []).push(created);
		return created;
	};
	it('matches :has() against descendants and, with a leading >, against children only', () => {
		const rules = parseRules('.box:has(.field:focus) { outline: red solid 3px; } .box:has(> .field) { color: blue; }', []);
		const box = node('div', ['box']);
		const wrapper = node('div', ['wrapper'], box);
		const field = node('input', ['field'], wrapper);
		assert.equal(computeStyle(box, rules, undefined)['outline-color'], undefined);
		field.states.add('focus');
		const style = computeStyle(box, rules, undefined);
		assert.equal(style['outline-color'], 'red');
		assert.equal(style.color, undefined);
	});
	it('paints a border on one side only with that side’s color', () => {
		const rules = parseRules('.field { border-left: 3px solid #ad003a; }', []);
		const rendered = { tag: 'div', classes: ['field'], attributes: {}, children: [] };
		const shape = buildShapesFromRendered('kol-field', rendered, 'default', rules, [], { missingEmbeds: [], unresolvedValues: [], untokenizedColors: [] });
		assert.equal(shape.stroke, '#ad003a');
		assert.deepEqual(shape.strokeWidths, [0, 0, 0, 3]);
	});
	const report = () => ({ missingEmbeds: [], unresolvedValues: [], untokenizedColors: [] });
	it('draws generated content: quotes as text, an empty content as a box', () => {
		const rules = parseRules(
			".quote::before { content: open-quote; } .quote::after { content: close-quote; } .ring { width: 40px; height: 40px; } .ring::before { content: ''; position: absolute; inset: 0; border: 4px solid #333; border-radius: 50%; }",
			[],
		);
		const quote = buildShapesFromRendered(
			'kol-quote',
			{ tag: 'blockquote', classes: ['quote'], attributes: {}, text: 'Zitat', children: [] },
			'default',
			rules,
			[],
			report(),
		);
		assert.deepEqual(
			quote.children.map((child) => child.characters),
			['\u201C', 'Zitat', '\u201D'],
		);
		assert.equal(quote.layout?.direction, 'row');
		const ring = buildShapesFromRendered('kol-spin', { tag: 'span', classes: ['ring'], attributes: {}, children: [] }, 'default', rules, [], report());
		const [before] = ring.children;
		assert.deepEqual(before.absolute, { bottom: 0, left: 0, right: 0, top: 0 });
		assert.deepEqual([before.width, before.height, before.radius?.[0]], [40, 40, 20]);
	});
	it('resolves container query units and the aspect ratio of the host', () => {
		const rules = parseRules(
			':host { width: 100px; aspect-ratio: 1; container-type: size; } .avatar { width: max(100cqw, 100cqh); height: 100cqh; font-size: 40cqh; }',
			[],
		);
		const shape = buildShapesFromRendered(
			'kol-avatar',
			{ tag: 'div', classes: ['avatar'], attributes: {}, text: 'MM', children: [] },
			'default',
			rules,
			[],
			report(),
		);
		assert.deepEqual([shape.width, shape.height, shape.children[0].fontSize], [100, 100, 40]);
	});
	it('lays out grid template areas as rows and keeps the inline style of an element', () => {
		const rules = parseRules(
			'.bar { display: grid; grid-template-areas: "LABEL LABEL" "BAR VALUE"; } .label { grid-area: LABEL; } .track { grid-area: BAR; width: 50px; height: 8px; } .value { grid-area: VALUE; }',
			[],
		);
		const rendered = {
			tag: 'div',
			classes: ['bar'],
			attributes: {},
			children: [
				{ tag: 'div', classes: ['label'], attributes: {}, text: 'Fortschritt', children: [] },
				{ tag: 'div', classes: ['track'], attributes: { style: 'background-color: #ff0000' }, children: [] },
				{ tag: 'div', classes: ['value'], attributes: {}, text: '40', children: [] },
			],
		};
		const shape = buildShapesFromRendered('kol-progress', rendered, 'default', rules, [], report());
		assert.equal(shape.layout?.direction, 'column');
		assert.equal(shape.children[0].children[0].characters, 'Fortschritt');
		assert.deepEqual(
			shape.children[1].children.map((child) => child.fill ?? child.children[0]?.characters),
			['#ff0000', '40'],
		);
	});
});
describe('base components', () => {
	const box = (name, fill, children = [], base) => ({
		name,
		classes: [name],
		kind: 'box',
		x: 0,
		y: 0,
		width: 100,
		height: 20,
		fill,
		children,
		...(base ? { base } : {}),
	});
	const variant = (message, hover, fill, width = 100) => ({
		properties: [
			['Message', message],
			['Hover', hover],
		],
		shapes: box('kol-field', '#fff', [{ ...box('kol-input-container', fill, [box('kol-input', '#eee', [], 'InputFC')], 'InputContainerFC'), width }]),
	});
	it('turns each functional component with a block into instances and keeps only the axes that change it, merging alike values', () => {
		const registry = createBaseRegistry();
		const shapes = extractBaseComponents(
			[
				variant('none', 'false', '#000'),
				variant('none', 'true', '#00f'),
				variant('info', 'false', '#000', 140),
				variant('info', 'true', '#00f'),
				variant('error', 'false', '#f00'),
				variant('error', 'true', '#f0f'),
			],
			registry,
		);
		assert.deepEqual(
			[...registry.components.keys()],
			['InputFC', 'InputContainerFC.none.false', 'InputContainerFC.none.true', 'InputContainerFC.error.false', 'InputContainerFC.error.true'],
		);
		assert.deepEqual(shapes[2].children[0], {
			name: 'kol-input-container',
			classes: ['kol-input-container'],
			kind: 'instance',
			component: 'InputContainerFC.none.false',
			x: 0,
			y: 0,
			width: 140,
			height: 20,
			children: [],
		});
		const container = registry.components.get('InputContainerFC.error.true')?.base;
		assert.equal(container?.shapes.children[0].kind, 'instance');
		assert.equal(container?.shapes.children[0].component, 'InputFC');
	});
});
describe('icons', () => {
	it('reads the KoliBri icons from the shipped SVG font, flipped into SVG coordinates', () => {
		const icons = loadIcons(COMPONENTS_ROOT);
		const house = icons.get('kolicon-house');
		assert.equal(house?.viewBox, '0 0 10000 10000');
		const ys = (house?.paths[0].match(/-?[\d.]+/g) ?? []).map(Number).filter((_, index) => index % 2 === 1);
		assert.ok(Math.min(...ys) >= 0 && Math.max(...ys) <= 10000, 'every y lies inside the icon box');
		assert.ok(icons.has('kolicon-alert-error'));
	});
	it('draws an icon as a vector layer in the color of the text', () => {
		const rules = parseRules('.kol-icon { color: #ad003a; }', []);
		const rendered = { tag: 'i', classes: ['kol-icon', 'kolicon-house'], attributes: {}, children: [] };
		const report = { missingEmbeds: [], unresolvedValues: [], untokenizedColors: [] };
		const shape = buildShapesFromRendered('kol-icon', rendered, 'default', rules, [], report, loadIcons(COMPONENTS_ROOT));
		const vector = shape.children[0];
		assert.equal(vector.kind, 'vector');
		assert.equal(vector.fill, '#ad003a');
		assert.equal(vector.width, 16);
	});
});
