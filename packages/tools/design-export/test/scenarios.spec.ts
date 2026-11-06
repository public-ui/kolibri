import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { DEFAULT_SCENARIOS } from '../src/scenarios.js';

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

	it('uses unique scenario ids', () => {
		const ids = DEFAULT_SCENARIOS.map((scenario) => scenario.id);
		assert.equal(new Set(ids).size, ids.length, 'Szenario-IDs sind nicht eindeutig');
	});
});
