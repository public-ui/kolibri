import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import type { PenpotImportInput } from '../src/penpot-import.js';
import { buildPenpotImport, stableStringify } from '../src/penpot-import.js';
import type { ShapeNode } from '../src/render/dom-to-shapes.js';

function button(fill: string, classes: string[] = ['kol-button__text']): ShapeNode {
	return {
		name: 'kol-button__text',
		classes,
		kind: 'box',
		x: 0,
		y: 0,
		width: 100,
		height: 44,
		fill,
		children: [
			{ name: 'kol-span__label', classes: [], kind: 'text', x: 14, y: 12, width: 72, height: 19, fill: '#ffffff', characters: 'Anmelden', children: [] },
		],
	};
}

function input(): PenpotImportInput {
	const shapes: Record<string, ShapeNode> = {};
	for (const [id, light, dark] of [
		['kol-button.none', '#ffffff', '#1e2a30'],
		['kol-button.normal', '#ffffff', '#1e2a30'],
		['kol-button.primary', '#003a5c', '#86c5ea'],
	]) {
		for (const state of ['default', 'hover']) {
			shapes[`${id}#light#${state}`] = button(light, ['kol-button__text', `kol-button--${id.split('.')[1]}`]);
			shapes[`${id}#dark#${state}`] = button(dark);
		}
	}
	const scenario = (variant: string) => ({ id: `kol-button.${variant}`, tag: 'kol-button', props: {}, axes: [['Variant', variant]] as [string, string][] });
	return {
		axes: { 'kol-button': { disabled: false, variants: ['none', 'normal', 'primary'], variantSource: 'theme-modifier' } },
		bems: [
			{ block: 'kol-button', elements: ['text'], modifiers: [] },
			{ block: 'kol-span', elements: ['label'], modifiers: [] },
		],
		scenarios: [scenario('none'), scenario('normal'), scenario('primary')],
		shapes,
		states: { 'kol-button.none': ['default', 'hover'], 'kol-button.normal': ['default', 'hover'], 'kol-button.primary': ['default', 'hover'] },
		themeName: 'default',
		tokens: [
			{ name: '--color-primary', value: 'light-dark(#003a5c, #86c5ea)', light: '#003a5c', dark: '#86c5ea' },
			{ name: '--color-surface', value: 'light-dark(#ffffff, #1e2a30)', light: '#ffffff', dark: '#1e2a30' },
			{ name: '--color-light', value: 'light-dark(#ffffff, #ffffff)', light: '#ffffff', dark: '#ffffff' },
		],
		version: { components: '4.5.0', theme: '4.5.0' },
	};
}

describe('buildPenpotImport', () => {
	it('is deterministic: the same input gives the same bytes', () => {
		assert.equal(stableStringify(buildPenpotImport(input()).payload), stableStringify(buildPenpotImport(input()).payload));
	});

	it('drops the unset _variant where it renders like one of its values', () => {
		const { payload, report } = buildPenpotImport(input());
		assert.deepEqual(report.droppedUnset, ['kol-button.none = kol-button.normal']);
		assert.deepEqual(
			payload.components.map((component) => component.id),
			['kol-button.normal.default', 'kol-button.normal.hover', 'kol-button.primary.default', 'kol-button.primary.hover'],
		);
	});

	it('orders the properties Variant, then the switches Hover and Focus, and records the source of the values', () => {
		const { payload } = buildPenpotImport(input());
		assert.deepEqual(payload.components[1].properties, [
			['Variant', 'normal'],
			['Hover', 'true'],
			['Focus', 'false'],
		]);
		assert.deepEqual(payload.sets['kol-button'], { properties: ['Variant', 'Hover', 'Focus'], variantSource: 'theme-modifier' });
	});

	it('binds colors to tokens and reports layer names missing from the BEM registry', () => {
		const data = input();
		data.bems = [{ block: 'kol-button', elements: [], modifiers: [] }];
		const { payload, report } = buildPenpotImport(data);
		assert.equal(payload.components[2].shapes.fillToken, 'color.primary');
		assert.deepEqual(report.unregisteredLayers, ['kol-button__text', 'kol-span__label']);
	});
});

describe('stableStringify', () => {
	it('sorts object keys at every level and leaves array order alone', () => {
		assert.equal(stableStringify({ b: 1, a: [{ d: 1, c: 2 }] }), '{\n\t"a": [\n\t\t{\n\t\t\t"c": 2,\n\t\t\t"d": 1\n\t\t}\n\t],\n\t"b": 1\n}\n');
	});
});
