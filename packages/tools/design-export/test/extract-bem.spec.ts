import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { extractBem } from '../src/extract-bem.js';

/** Der mocha-Lauf startet im Paketverzeichnis; node_modules enthält die Workspace-Symlinks. */
const REGISTRY_FIXTURE = `import { generateBemClassNames } from 'typed-bem';

export type KoliBriComponentsBemSchema = {
	'kol-button': {
		elements: {
			text: {
				modifiers: null;
			};
		};
		modifiers: Set<'disabled'>;
	};
};

const BEM: KoliBriComponentsBemSchema = {
	'kol-abbr': {
		modifiers: null,
	},
	'kol-button': {
		elements: {
			'interactive-element': {
				modifiers: null,
			},
			text: { modifiers: null },
			tooltip: { modifiers: new Set(['visible']) },
		},
		modifiers: new Set(['disabled', 'hide-label']),
	},
	'kol-nav': {
		elements: {
			entry: {
				modifiers: Set<'button' | 'link'>,
			},
		},
		modifiers: null,
	},
};

export { BEM };
`;

describe('extractBem', () => {
	it('reads only the BEM constant, both element spellings and block modifiers', async () => {
		const path = join(tmpdir(), `bem-registry-${Date.now()}.ts`);
		await writeFile(path, REGISTRY_FIXTURE, 'utf-8');
		const bems = await extractBem(path);
		assert.equal(bems.length, 3);
		const button = bems.find((bem) => bem.block === 'kol-button');
		assert.deepEqual(button, { block: 'kol-button', elements: ['interactive-element', 'text', 'tooltip'], modifiers: ['disabled', 'hide-label'] });
		assert.deepEqual(
			bems.find((bem) => bem.block === 'kol-abbr'),
			{ block: 'kol-abbr', elements: [], modifiers: [] },
		);
		const nav = bems.find((bem) => bem.block === 'kol-nav');
		assert.deepEqual(nav?.elements, ['entry']);
		assert.deepEqual(nav?.modifiers, []);
	});

	it('fails loudly when the BEM constant is missing', async () => {
		const path = join(tmpdir(), `bem-empty-${Date.now()}.ts`);
		await writeFile(path, 'export const bem = generateBemClassNames();\n', 'utf-8');
		await assert.rejects(extractBem(path), /No BEM constant/);
	});

	it('parses the real registry of the workspace exactly once per component', async () => {
		const bems = await extractBem(join(process.cwd(), 'node_modules', '@public-ui', 'components', 'src', 'schema', 'bem-registry.ts'));
		const blocks = bems.map((bem) => bem.block);
		assert.equal(new Set(blocks).size, blocks.length, 'keine doppelten Blöcke');
		assert.ok(bems.length >= 50, `unerwartet wenige Komponenten: ${bems.length}`);
		const button = bems.find((bem) => bem.block === 'kol-button');
		assert.ok(button?.elements.includes('text'));
		assert.ok(button?.modifiers.includes('disabled'));
	});
});
