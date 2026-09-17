import type { KoliBriComponentsBemSchema } from '../../../schema/bem-registry';
import { bem } from '../../../schema/bem-registry';

type KeysOfSet<T> = T extends Set<infer U> ? U : never;

/**
 * Extracts the valid block modifier keys for a given registered BEM block.
 * Mirrors the conditional type used by typed-bem so that the types align exactly.
 */
export type BlockModifiers<TBlock extends keyof KoliBriComponentsBemSchema> =
	KeysOfSet<KoliBriComponentsBemSchema[TBlock]['modifiers']> extends never
		? undefined
		: Partial<Record<KeysOfSet<KoliBriComponentsBemSchema[TBlock]['modifiers']>, boolean>>;

/**
 * `bem.forBlock(block)` allocates a fresh generator closure on every call — cheap, but callers
 * (e.g. `ButtonFC`, `LinkFC`) already hoist their own block-bound `bem.forBlock(...)` at module
 * scope for element-class lookups. Callers that only learn their block at render time (because the
 * block is a prop, as in `BemRootNodeFC` and `CollapsibleFC`) go through this cache instead, so
 * they reuse one generator per block rather than allocating on every render.
 */
const blockBemCache = new Map<keyof KoliBriComponentsBemSchema, ReturnType<typeof bem.forBlock>>();

export function getBlockBem<TBlock extends keyof KoliBriComponentsBemSchema>(block: TBlock): ReturnType<typeof bem.forBlock<TBlock>> {
	let blockBem = blockBemCache.get(block);
	if (!blockBem) {
		blockBem = bem.forBlock(block) as ReturnType<typeof bem.forBlock>;
		blockBemCache.set(block, blockBem);
	}
	return blockBem as ReturnType<typeof bem.forBlock<TBlock>>;
}
