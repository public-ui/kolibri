import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';

import type { KoliBriComponentsBemSchema } from '../../../schema/bem-registry';
import { bem } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';

type FCChildren = Parameters<FC>[1];

type KeysOfSet<T> = T extends Set<infer U> ? U : never;

/**
 * Extracts the valid block modifier keys for a given registered BEM block.
 * Mirrors the conditional type used by typed-bem so that the types align exactly.
 */
export type BlockModifiers<TBlock extends keyof KoliBriComponentsBemSchema> =
	KeysOfSet<KoliBriComponentsBemSchema[TBlock]['modifiers']> extends never
		? undefined
		: Partial<Record<KeysOfSet<KoliBriComponentsBemSchema[TBlock]['modifiers']>, boolean>>;

type BemRootNodeFCProps<TBlock extends keyof KoliBriComponentsBemSchema> = {
	/**
	 * BEM block name — must be a key registered in `KoliBriComponentsBemSchema`.
	 * Constrains `modifiers` to the exact modifier set defined in `bem-registry.ts`.
	 */
	block: TBlock;
	/**
	 * BEM block modifiers. Keys are validated against the schema (e.g. `'disabled'`, `'inline'`).
	 * No `kol-link--` prefix needed — typed-bem adds it automatically.
	 */
	modifiers?: BlockModifiers<TBlock>;
	/**
	 * Additional classes forwarded 1:1 from the FC tag onto the root `<div>`.
	 * Typically the `class` prop received by the surrounding Functional Component
	 * (i.e. the `class` attribute set by a parent component).
	 */
	class?: JSXBase.HTMLAttributes<HTMLElement>['class'];
	/** Optional test id forwarded onto the root node. */
	'data-testid'?: string;
	/** Optional hidden attribute forwarded onto the root node. */
	hidden?: boolean;
};

/**
 * Single-Root BEM wrapper for all Skeleton Functional Components.
 *
 * Responsibilities:
 * - Renders exactly one `<div>` root node — enforcing the Single-Root FC rule.
 * - Accepts a `block` name and typed `modifiers` from `KoliBriComponentsBemSchema`.
 * - Calls `bem.forBlock(block)(modifiers)` internally to generate the class string.
 * - Merges the result with the optional `class` prop.
 *
 * Usage:
 * ```tsx
 * export const LinkFC: FC<LinkFCProps> = ({ ..., class: hostClass, disabled }, children) => (
 *   <BemRootNodeFC
 *     block="kol-link"
 *     modifiers={{ disabled, 'external-link': isExternal }}
 *     class={hostClass}
 *   >
 *     <a class="kol-link__anchor">…</a>
 *   </BemRootNodeFC>
 * );
 * ```
 */
export const BemRootNodeFC = <TBlock extends keyof KoliBriComponentsBemSchema>(
	{ block, modifiers, class: hostClass, 'data-testid': dataTestId, hidden }: BemRootNodeFCProps<TBlock>,
	children: FCChildren,
) => {
	const blockBem = bem.forBlock(block);
	return (
		<div class={clsx(blockBem(modifiers as BlockModifiers<TBlock>), hostClass)} data-testid={dataTestId} hidden={hidden}>
			{children}
		</div>
	);
};
