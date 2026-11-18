import type { ComponentBem } from '../types.js';
import type { BlockDesignSpec, DesignNode } from './types.js';

/**
 * Validates design specifications against the BEM registry: every block, element and modifier a specification
 * names must be registered, and every embedded block must be a registered block. Fails loudly,
 * because a layer name outside the registry would break the theming contract in the design tool.
 */
export function checkSpecs(specs: BlockDesignSpec[], bems: ComponentBem[]): void {
	const errors: string[] = [];
	const byBlock = new Map(bems.map((bem) => [bem.block, bem]));
	for (const spec of specs) {
		const bem = byBlock.get(spec.block);
		if (!bem) {
			errors.push(`${spec.block}: not a block of the BEM registry`);
			continue;
		}
		for (const modifier of Object.keys(spec.modifiers)) {
			if (!bem.modifiers.includes(modifier)) errors.push(`${spec.block}: modifier ${modifier} is not registered`);
		}
		for (const axis of spec.axes) {
			if (axis.kind !== 'prop' || axis.modifier === undefined) continue;
			for (const value of axis.values) {
				const modifier = axis.modifier.replace('{value}', String(value));
				// `{value}` alone is the open variant class (`kol-button--primary`), which the registry does not list yet.
				if (axis.modifier !== '{value}' && !bem.modifiers.includes(modifier)) errors.push(`${spec.block}: axis modifier ${modifier} is not registered`);
			}
		}
		if (spec.tree.element !== undefined) errors.push(`${spec.block}: the tree root is the block and has no element`);
		walk(spec.tree, (node) => {
			if (node.element !== undefined && !bem.elements.includes(node.element)) errors.push(`${spec.block}: element ${node.element} is not registered`);
			for (const modifier of Object.keys(node.modifiers ?? {})) {
				if (node.element && !(bem.elementModifiers?.[node.element] ?? []).includes(modifier)) {
					errors.push(`${spec.block}: modifier ${node.element}--${modifier} is not registered`);
				}
			}
			if (node.embeds && !byBlock.has(node.embeds)) errors.push(`${spec.block}: embedded block ${node.embeds} is not registered`);
		});
	}
	if (errors.length > 0) throw new Error(`Design specifications do not match the BEM registry:\n- ${errors.join('\n- ')}`);
}

function walk(node: DesignNode, visit: (node: DesignNode) => void): void {
	visit(node);
	for (const child of node.children ?? []) walk(child, visit);
}
