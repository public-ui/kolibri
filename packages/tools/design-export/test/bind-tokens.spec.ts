import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { bindTokens, toHex } from '../src/bind-tokens.js';
import type { ShapeNode } from '../src/render/dom-to-shapes.js';

const TOKENS = [
	{ name: '--color-primary', value: 'light-dark(#003a5c, #86c5ea)', light: '#003a5c', dark: '#86c5ea' },
	{ name: '--color-surface', value: 'light-dark(#ffffff, #1e2a30)', light: '#ffffff', dark: '#1e2a30' },
	{ name: '--color-light', value: 'light-dark(#ffffff, #ffffff)', light: '#ffffff', dark: '#ffffff' },
];

function button(fill: string, text: string): ShapeNode {
	return {
		name: 'kol-button__text',
		classes: [],
		kind: 'box',
		x: 0,
		y: 0,
		width: 100,
		height: 44,
		fill,
		children: [{ name: 'kol-span__label', classes: [], kind: 'text', x: 0, y: 0, width: 80, height: 19, fill: text, children: [] }],
	};
}

describe('bindTokens', () => {
	it('tells tokens with the same light value apart by their dark value', () => {
		const light = button('rgb(0, 58, 92)', 'rgb(255, 255, 255)');
		const dark = button('rgb(134, 197, 234)', 'rgb(255, 255, 255)');
		const binding = bindTokens(light, dark, TOKENS);
		assert.equal(light.fillToken, 'color.primary');
		assert.equal(light.children[0].fillToken, 'color.light');
		assert.deepEqual(binding, { ambiguous: [], unbound: [] });
	});

	it('reports a color without token and leaves it unbound', () => {
		const light = button('rgb(1, 2, 3)', 'rgb(255, 255, 255)');
		const binding = bindTokens(light, undefined, TOKENS);
		assert.equal(light.fillToken, undefined);
		assert.deepEqual(binding.unbound, ['kol-button__text Fläche #010203']);
		assert.equal(binding.ambiguous.length, 1);
	});

	it('normalizes the CSS color notations', () => {
		assert.equal(toHex('#FFF'), '#ffffff');
		assert.equal(toHex('rgba(8, 35, 48, 0.24)'), '#082330');
		assert.equal(toHex('transparent'), undefined);
	});
});
