import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { buildIr } from '../src/build-ir.js';

describe('buildIr', () => {
	it('merges the three sources into a schema-1.0 IR with token references only', () => {
		const ir = buildIr({
			componentsVersion: '4.5.0',
			themeVersion: '4.5.0',
			themeName: 'default',
			tokens: [{ name: '--color-primary', value: 'light-dark(#1, #2)', light: '#1', dark: '#2' }],
			apis: [{ tag: 'kol-button', attributes: ['_disabled', '_variant'], events: [], slots: [{ name: 'expert' }] }],
			bems: [{ block: 'kol-button', elements: ['text'], modifiers: ['disabled'] }],
			doms: { 'kol-button': { name: 'kol-button', tag: 'kol-button', children: [] } },
			states: { 'kol-button': ['default', 'focus'] },
			svgs: { 'kol-button': [{ scheme: 'light', state: 'default', file: 'svg/kol-button.light.default.svg' }] },
		});
		assert.equal(ir.schema, '1.0');
		assert.equal(ir.components.length, 1);
		const button = ir.components[0];
		assert.deepEqual(button.api.attributes, ['_disabled', '_variant']);
		assert.deepEqual(button.bem?.elements, ['text']);
		assert.deepEqual(button.states, ['default', 'focus']);
		assert.deepEqual(button.svg, [{ scheme: 'light', state: 'default', file: 'svg/kol-button.light.default.svg' }]);
	});
});
