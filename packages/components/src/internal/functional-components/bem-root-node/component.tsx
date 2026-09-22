import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';

import type { KoliBriComponentsBemSchema } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import type { BlockModifiers } from './block-bem';
import { getBlockBem } from './block-bem';

type FCChildren = Parameters<FC>[1];

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
} & Partial<Omit<JSXBase.HTMLAttributes<HTMLDivElement>, 'class'>>;

/**
 * Single-Root BEM wrapper for all Skeleton Functional Components.
 *
 * Responsibilities:
 * - Renders exactly one `<div>` root node — enforcing the Single-Root FC rule.
 * - Accepts a `block` name and typed `modifiers` from `KoliBriComponentsBemSchema`.
 * - Calls `bem.forBlock(block)(modifiers)` internally to generate the class string.
 * - Merges the result with the optional `class` prop.
 * - Forwards all remaining HTML attributes (`id`, `role`, `aria-*`, `ref`, …) onto the root
 *   `<div>` — legacy functional components spread these onto their root, and internal
 *   consumers (form, form-field-msg, toast-item) rely on that passthrough.
 *
 * Usage:
 * ```tsx
 * export const LinkFC: FC<LinkFCProps> = ({ ..., class: hostClass, disabled }, children) => (
 *   <BemRootNodeFC
 *     block="kol-link"
 *     modifiers={{ disabled, 'external-link': isExternal }}
 *     class={hostClass}
 *   >
 *     <a class={linkBem('interactive-element')}>…</a>
 *   </BemRootNodeFC>
 * );
 * ```
 */
export const BemRootNodeFC = <TBlock extends keyof KoliBriComponentsBemSchema>(
	{ block, modifiers, class: hostClass, ...rest }: BemRootNodeFCProps<TBlock>,
	children: FCChildren,
) => {
	const blockBem = getBlockBem(block);
	return (
		<div class={clsx(blockBem(modifiers), hostClass)} {...rest}>
			{children}
		</div>
	);
};
