/**
 * Stands in for `@stencil/core` while the functional components of `@public-ui/components` run in
 * Node. They import `h`, `Fragment` and `Env` only. `h` calls a functional component at once, as
 * Stencil's own `h` does, so one call yields the complete element tree without a DOM.
 */
export interface VNode {
	tag: string;
	attrs: Record<string, unknown>;
	children: VChild[];
	/** Functional components whose root this element is, outermost first. */
	fcs?: string[];
}

export type VChild = VNode | { text: string };

type FunctionalComponent = (props: Record<string, unknown>, children: VChild[], utils: unknown) => unknown;

const utils = {
	forEach: (children: VChild[], callback: (child: VChild, index: number) => void) => children.forEach(callback),
	map: (children: VChild[], callback: (child: VChild, index: number) => VChild) => children.map(callback),
};

export const Env = {};

export const Fragment = (_props: unknown, children: VChild[]): VChild[] => children;

/** The host element renders as its children: the root of the design tree is the component's block. */
export const Host = (_props: unknown, children: VChild[]): VChild[] => children;

/** Rendering runs once per variant; nothing schedules a second pass. */
export function forceUpdate(): void {}

export function setMode(): void {}

export function h(tag: FunctionalComponent | string, attrs: Record<string, unknown> | null, ...children: unknown[]): unknown {
	const flat = normalize(children);
	if (typeof tag === 'function') {
		const result = tag(attrs ?? {}, flat, utils);
		const roots = normalize(result).filter((child): child is VNode => 'tag' in child);
		// An FC that yields one element marks it as its root; the outer FC is called last and comes first.
		if (roots.length === 1 && tag.name) roots[0].fcs = [tag.name, ...(roots[0].fcs ?? [])];
		return result;
	}
	return { tag, attrs: attrs ?? {}, children: flat };
}

/** Flattens nested arrays and drops what renders nothing (`null`, booleans, empty strings). */
export function normalize(children: unknown): VChild[] {
	const list = Array.isArray(children) ? children.flat(Infinity) : [children];
	return list
		.filter((child) => child !== null && child !== undefined && typeof child !== 'boolean' && child !== '')
		.map((child) => (typeof child === 'object' ? (child as VChild) : { text: String(child) }));
}
