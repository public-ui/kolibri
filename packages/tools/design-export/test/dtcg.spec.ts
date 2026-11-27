import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { buildPenpotBundle, buildTokenSets } from '../src/dtcg.js';

describe('buildTokenSets', () => {
	it('splits tokens into core and scheme sets with identical names', () => {
		const sets = buildTokenSets([
			{ name: '--color-primary', value: 'light-dark(#111111, #222222)', light: '#111111', dark: '#222222' },
			{ name: '--spacing', value: '0.5rem' },
		]);
		assert.deepEqual((sets.light.color as Record<string, { $value: string }>)['primary'], { $type: 'color', $value: '#111111' });
		assert.deepEqual((sets.dark.color as Record<string, { $value: string }>)['primary'], { $type: 'color', $value: '#222222' });
		assert.deepEqual(sets.core.spacing as { $value: string }, { $type: 'dimension', $value: '0.5rem' });
	});

	it('groups by first name segment and keeps compound names readable', () => {
		const sets = buildTokenSets([{ name: '--color-primary-variant', value: 'light-dark(#1, #2)', light: '#1', dark: '#2' }]);
		assert.ok((sets.light.color as Record<string, unknown>)['primary-variant'], 'compound name should stay one token');
	});

	it('fails loudly on group/token name collisions within one set', () => {
		assert.throws(
			() =>
				buildTokenSets([
					{ name: '--color', value: 'light-dark(#3, #4)', light: '#3', dark: '#4' },
					{ name: '--color-primary', value: 'light-dark(#1, #2)', light: '#1', dark: '#2' },
				]),
			/collision/,
		);
	});
});

describe('buildPenpotBundle', () => {
	it('writes the multifile import format with a Scheme theme group', () => {
		const bundle = buildPenpotBundle([{ name: '--color-primary', value: 'light-dark(#1, #2)', light: '#1', dark: '#2' }], 'default');
		assert.deepEqual(Object.keys(bundle.files).sort(), ['$metadata.json', '$themes.json', 'core.json', 'dark.json', 'light.json']);
		const themes = JSON.parse(bundle.files['$themes.json']) as { name: string; group: string; selectedTokenSets: Record<string, string> }[];
		assert.equal(themes.length, 2);
		assert.ok(themes.every((theme) => theme.group === 'Scheme'));
		assert.deepEqual(themes.find((theme) => theme.name === 'Dark')?.selectedTokenSets, { core: 'enabled', dark: 'enabled' });
		assert.deepEqual(JSON.parse(bundle.files['$metadata.json']), { tokenSetOrder: ['core', 'light', 'dark'], themeName: 'default' });
	});
});
