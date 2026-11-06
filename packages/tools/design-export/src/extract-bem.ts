import { readFile } from 'node:fs/promises';
import type { ComponentBem } from './types.js';

const BEM_CONST_START = /^const BEM.*= \{\s*$/;
const COMPONENT_LINE = /^\s*'(?<tag>kol-[\w-]+)': \{\s*$/;
const ELEMENT_MULTILINE = /^\s*'?(?<name>[\w-]+)'?: \{\s*$/;
const ELEMENT_INLINE = /^\s*'?(?<name>[\w-]+)'?: \{ modifiers: (?:null|Set<[^>]*>|new Set\([^)]*\)) \},?\s*$/;
const BLOCK_MODIFIERS_LINE = /^\s*modifiers: new Set\(\[(?<values>'[\w-]+'(?:\s*,\s*'[\w-]+')*)\]\),?\s*$/;

/**
 * Parses the runtime BEM constant of the central registry
 * (`packages/components/src/schema/bem-registry.ts`).
 *
 * The file carries the same schema twice: a verbose type declaration and the
 * exported `BEM` constant that the themes use to generate SCSS. The constant is
 * the canonical source, so the parser reads only that section. It tracks brace
 * depth line by line and accepts both element spellings (multi-line and the
 * compact `{ modifiers: … }` form) and fails loudly when the section is missing.
 */
export async function extractBem(registryPath: string): Promise<ComponentBem[]> {
	const source = await readFile(registryPath, 'utf-8');
	const start = source.split('\n').findIndex((line) => BEM_CONST_START.test(line));
	if (start === -1) {
		throw new Error(`No BEM constant found in ${registryPath}.`);
	}
	const components: ComponentBem[] = [];
	let current: { bem: ComponentBem; depth: number } | undefined;
	for (const line of source.split('\n').slice(start)) {
		const opens = (line.match(/\{/g) ?? []).length;
		const closes = (line.match(/\}/g) ?? []).length;
		const componentMatch = line.match(COMPONENT_LINE);
		if (current === undefined && componentMatch) {
			current = { bem: { block: componentMatch.groups?.tag ?? '', elements: [], modifiers: [] }, depth: opens };
			continue;
		}
		if (current) {
			// Tiefe 1 = Blockebene (modifiers), Tiefe 2 = Elemente in der elements-Map;
			// tiefe modifier-Sets gehören zum jeweiligen Element und nicht zum Block.
			const elementName = matchElement(line, current.depth);
			if (elementName && !current.bem.elements.includes(elementName)) {
				current.bem.elements.push(elementName);
			}
			const modifiersMatch = current.depth === 1 ? line.match(BLOCK_MODIFIERS_LINE) : null;
			if (modifiersMatch) {
				current.bem.modifiers = parseModifierSet(modifiersMatch.groups?.values);
			}
			current.depth += opens - closes;
			if (current.depth <= 0) {
				current.bem.elements.sort();
				current.bem.modifiers.sort();
				components.push(current.bem);
				current = undefined;
			}
		}
	}
	if (components.length === 0) {
		throw new Error(`No component blocks found in the BEM constant of ${registryPath}.`);
	}
	const blocks = components.map((component) => component.block);
	if (new Set(blocks).size !== blocks.length) {
		throw new Error(`Duplicate component blocks in ${registryPath}.`);
	}
	return components.sort((a, b) => a.block.localeCompare(b.block));
}

function matchElement(line: string, depth: number): string | null {
	if (depth !== 2) {
		return null;
	}
	const inline = line.match(ELEMENT_INLINE);
	if (inline?.groups?.name && !['elements', 'modifiers'].includes(inline.groups.name)) {
		return inline.groups.name;
	}
	const multiline = line.match(ELEMENT_MULTILINE);
	if (multiline?.groups?.name && !['elements', 'modifiers'].includes(multiline.groups.name)) {
		return multiline.groups.name;
	}
	return null;
}

function parseModifierSet(values: string | undefined): string[] {
	if (!values) {
		return [];
	}
	return values
		.split(',')
		.map((value) => value.trim().replace(/^'|'$/g, ''))
		.sort();
}
