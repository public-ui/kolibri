import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { BUTTON_VARIANTS, DEFAULT_SCENARIOS } from '../src/scenarios.js';

describe('DEFAULT_SCENARIOS', () => {
	it('gives every component of the library at least one scenario', async () => {
		const customElements = JSON.parse(await readFile(join(process.cwd(), 'node_modules', '@public-ui', 'components', 'custom-elements.json'), 'utf-8')) as {
			tags: { name: string }[];
		};
		const tags = customElements.tags.map((tag) => tag.name);
		const covered = new Set(DEFAULT_SCENARIOS.map((scenario) => scenario.tag));
		const missing = tags.filter((tag) => !covered.has(tag));
		assert.deepEqual(missing, [], `Komponenten ohne Szenario: ${missing.join(', ')}`);
	});

	it('covers every styled _variant of kol-button, as the schema defines them', async () => {
		const schema = await readFile(join(process.cwd(), '..', '..', 'components', 'src', 'schema', 'props', 'button-variant.ts'), 'utf-8');
		const options = /buttonVariantPropTypeOptions = \[([^\]]+)\]/.exec(schema)?.[1] ?? '';
		const values = [...options.matchAll(/'([^']+)'/g)].map((match) => match[1]).filter((value) => value !== 'custom');
		assert.deepEqual([...BUTTON_VARIANTS], values);
	});

	it('expands kol-button to the complete matrix _variant × _disabled × states', () => {
		const buttons = DEFAULT_SCENARIOS.filter((scenario) => scenario.tag === 'kol-button');
		assert.equal(buttons.length, BUTTON_VARIANTS.length * 2);
		const ghostDisabled = buttons.find((scenario) => scenario.id === 'kol-button.ghost.disabled');
		assert.deepEqual(ghostDisabled?.axes, [
			['Variant', 'ghost'],
			['Disabled', 'true'],
		]);
		assert.deepEqual(ghostDisabled?.states, ['default', 'hover', 'focus', 'hover-focus']);
		assert.deepEqual(buttons.find((scenario) => scenario.id === 'kol-button.ghost')?.states, ['default', 'hover', 'focus', 'hover-focus']);
	});

	it('uses unique scenario ids', () => {
		const ids = DEFAULT_SCENARIOS.map((scenario) => scenario.id);
		assert.equal(new Set(ids).size, ids.length, 'Szenario-IDs sind nicht eindeutig');
	});
});
