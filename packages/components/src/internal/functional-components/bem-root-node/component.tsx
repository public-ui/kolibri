import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { JSXBase } from '@stencil/core/internal';

import type { KoliBriComponentsBemSchema } from '../../../schema/bem-registry';
import clsx from '../../../utils/clsx';
import type { BlockModifiers } from './block-bem';
import { getBlockBem } from './block-bem';

type FCChildren = Parameters<FC>[1];

/** The attributes each root element accepts, so a `component` only takes the attributes of its element. */
type RootElementAttributes = {
	abbr: JSXBase.HTMLAttributes<HTMLElement>;
	article: JSXBase.HTMLAttributes<HTMLElement>;
	button: JSXBase.ButtonHTMLAttributes<HTMLButtonElement>;
	details: JSXBase.DetailsHTMLAttributes<HTMLElement>;
	dialog: JSXBase.DialogHTMLAttributes<HTMLDialogElement>;
	div: JSXBase.HTMLAttributes<HTMLDivElement>;
	fieldset: JSXBase.FieldsetHTMLAttributes<HTMLFieldSetElement>;
	figure: JSXBase.HTMLAttributes<HTMLElement>;
	h1: JSXBase.HTMLAttributes<HTMLHeadingElement>;
	h2: JSXBase.HTMLAttributes<HTMLHeadingElement>;
	h3: JSXBase.HTMLAttributes<HTMLHeadingElement>;
	h4: JSXBase.HTMLAttributes<HTMLHeadingElement>;
	h5: JSXBase.HTMLAttributes<HTMLHeadingElement>;
	h6: JSXBase.HTMLAttributes<HTMLHeadingElement>;
	hgroup: JSXBase.HTMLAttributes<HTMLElement>;
	i: JSXBase.HTMLAttributes<HTMLElement>;
	img: JSXBase.ImgHTMLAttributes<HTMLImageElement>;
	label: JSXBase.LabelHTMLAttributes<HTMLLabelElement>;
	li: JSXBase.LiHTMLAttributes<HTMLLIElement>;
	nav: JSXBase.HTMLAttributes<HTMLElement>;
	span: JSXBase.HTMLAttributes<HTMLSpanElement>;
	strong: JSXBase.HTMLAttributes<HTMLElement>;
	svg: JSXBase.SVGAttributes<SVGSVGElement>;
};

export type BemRootNodeComponent = keyof RootElementAttributes;

/** Distributes over a union of elements, so an attribute of any of them is accepted. */
type RootAttributes<TComponent extends BemRootNodeComponent> = TComponent extends BemRootNodeComponent
	? Partial<Omit<RootElementAttributes[TComponent], 'class'>>
	: never;

type BemRootNodeFCProps<TBlock extends keyof KoliBriComponentsBemSchema, TComponent extends BemRootNodeComponent = 'div'> = {
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
	 * checkbox, `nav` for a navigation or `svg` for a graphic. The remaining attributes are typed for
	 * that element.
	 */
	component?: TComponent;
} & RootAttributes<TComponent>;

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
export const BemRootNodeFC = <TBlock extends keyof KoliBriComponentsBemSchema, TComponent extends BemRootNodeComponent = 'div'>(
	props: BemRootNodeFCProps<TBlock, TComponent>,
	children: FCChildren,
) => {
	const className = clsx(getBlockBem(props.block)(props.modifiers), props.class);
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
