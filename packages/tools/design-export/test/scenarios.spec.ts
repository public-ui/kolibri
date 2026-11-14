import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { buildScenarios, SEED_TAGS } from '../src/scenarios.js';

describe('buildScenarios', () => {
	it('gives every component of the library a seed', async () => {
		const customElements = JSON.parse(await readFile(join(process.cwd(), 'node_modules', '@public-ui', 'components', 'custom-elements.json'), 'utf-8')) as {
			tags: { name: string }[];
		};
		const missing = customElements.tags.map((tag) => tag.name).filter((tag) => !SEED_TAGS.includes(tag));
		assert.deepEqual(missing, [], `Komponenten ohne Szenario: ${missing.join(', ')}`);
	});

	it('expands a seed to the matrix of its derived axes, _variant × _disabled', () => {
		const scenarios = buildScenarios({ 'kol-button': { disabled: true, variants: ['none', 'primary'], variantSource: 'theme-modifier' } }).filter(
			(scenario) => scenario.tag === 'kol-button',
		);
		assert.deepEqual(
			scenarios.map((scenario) => [scenario.id, scenario.props._variant, scenario.props._disabled, scenario.axes]),
			[
				[
					'kol-button.none',
					undefined,
					undefined,
					[
						['Variant', 'none'],
						['Disabled', 'false'],
					],
				],
				[
					'kol-button.none.disabled',
					undefined,
					true,
					[
						['Variant', 'none'],
						['Disabled', 'true'],
					],
				],
				[
					'kol-button.primary',
					'primary',
					undefined,
					[
						['Variant', 'primary'],
						['Disabled', 'false'],
					],
				],
				[
					'kol-button.primary.disabled',
					'primary',
					true,
					[
						['Variant', 'primary'],
						['Disabled', 'true'],
					],
				],
			],
		);
		assert.equal(scenarios[0].states, undefined, 'states are derived while rendering');
	});

	it('keeps a seed with fixed states a single component', () => {
		const skipNav = buildScenarios({ 'kol-skip-nav': { disabled: true } }).filter((scenario) => scenario.tag === 'kol-skip-nav');
		assert.deepEqual(
			skipNav.map((scenario) => [scenario.id, scenario.states, scenario.axes]),
			[['kol-skip-nav.focused', ['focus'], undefined]],
		);
	});

	it('uses unique scenario ids', () => {
		const ids = buildScenarios({}).map((scenario) => scenario.id);
		assert.equal(new Set(ids).size, ids.length, 'Szenario-IDs sind nicht eindeutig');
	});
});
