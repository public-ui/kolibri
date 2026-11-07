import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';

import type { KoliBriComponentsBemSchema } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import type { BlockModifiers } from './block-bem';
import { getBlockBem } from './block-bem';

type FCChildren = Parameters<FC>[1];

/** The elements a component FC can render as its root. */
export type BemRootNodeComponent =
	| 'abbr'
	| 'article'
	| 'button'
	| 'details'
	| 'dialog'
	| 'div'
	| 'fieldset'
	| 'figure'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'hgroup'
	| 'i'
	| 'img'
	| 'label'
	| 'li'
	| 'nav'
	| 'span'
	| 'strong'
	| 'svg';

/**
 * The global HTML attributes plus the element attributes the roots of the component FCs use, as one
 * type for all elements: TypeScript cannot resolve a union of per-element attribute types at every
 * call site within its union limit.
 */
type BemRootNodeAttributes = Partial<Omit<JSXBase.HTMLAttributes<HTMLElement>, 'class' | 'ref'>> &
	Partial<Pick<JSXBase.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'type'>> &
	Partial<Pick<JSXBase.DetailsHTMLAttributes<HTMLElement>, 'open'>> &
	Partial<Pick<JSXBase.DialogHTMLAttributes<HTMLDialogElement>, 'onCancel' | 'onClose'>> &
	Partial<Pick<JSXBase.ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'loading' | 'sizes' | 'src' | 'srcset'>> &
	Partial<Omit<JSXBase.SVGAttributes<SVGSVGElement>, 'class' | 'ref' | keyof JSXBase.HTMLAttributes<HTMLElement>>> & {
		/** Receives the root element, whichever element `component` names. */
		ref?: (element?: never) => void;
	};

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
	 * Additional classes forwarded 1:1 from the FC tag onto the root node.
	 * Typically the `class` prop received by the surrounding Functional Component
	 * (i.e. the `class` attribute set by a parent component).
	 */
	class?: JSXBase.HTMLAttributes<HTMLElement>['class'];
	/**
	 * Element of the root node, `div` by default: the semantic element of the component, e.g.
	 * `article` for a card, `button` for a component that is a single button, `dialog` for a dialog,
	 * `h1`–`h6` or `strong` for a heading, `img` for an image, `label` around the native control of a
	 * checkbox, `nav` for a navigation or `svg` for a graphic.
	 */
	component?: BemRootNodeComponent;
} & BemRootNodeAttributes;

/** The props as the implementation reads them, independent of the element. */
type BemRootNodeImplementationProps = {
	block: keyof KoliBriComponentsBemSchema;
	modifiers?: Record<string, boolean | undefined>;
	class?: JSXBase.HTMLAttributes<HTMLElement>['class'];
	component?: BemRootNodeComponent;
	[attribute: string]: unknown;
};

const renderBemRootNode = (props: BemRootNodeImplementationProps, children: FCChildren): ReturnType<typeof h> => {
	const blockBem = getBlockBem(props.block) as unknown as (modifiers?: BemRootNodeImplementationProps['modifiers']) => string;
	const className = clsx(blockBem(props.modifiers), props.class);
	// The class takes the position of `block`, so the root keeps the attribute order of the call site.
	const attributes: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(props)) {
		if (key === 'block') {
			attributes.class = className;
		} else if (key !== 'class' && key !== 'component' && key !== 'modifiers') {
			attributes[key] = value;
		}
	}
	const Root = (props.component ?? 'div') as 'div';
	return <Root {...attributes}>{children}</Root>;
};

/**
 * Single-Root BEM wrapper for all Skeleton Functional Components.
 *
 * Responsibilities:
 * - Renders exactly one root node — a `<div>` unless `component` names another element —
 *   enforcing the Single-Root FC rule.
 * - Accepts a `block` name and typed `modifiers` from `KoliBriComponentsBemSchema`.
 * - Calls `bem.forBlock(block)(modifiers)` internally to generate the class string.
 * - Merges the result with the optional `class` prop.
 * - Forwards all remaining HTML attributes (`id`, `role`, `aria-*`, `ref`, …) onto the root
 *   node — legacy functional components spread these onto their root, and internal
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
export const BemRootNodeFC = renderBemRootNode as unknown as <TBlock extends keyof KoliBriComponentsBemSchema>(
	props: BemRootNodeFCProps<TBlock>,
	children: FCChildren,
) => ReturnType<typeof h>;
