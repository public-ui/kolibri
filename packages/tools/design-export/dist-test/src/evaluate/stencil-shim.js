const utils = {
	forEach: (children, callback) => children.forEach(callback),
	map: (children, callback) => children.map(callback),
};
export const Env = {};
export const Fragment = (_props, children) => children;
/** The host element renders as its children: the root of the design tree is the component's block. */
export const Host = (_props, children) => children;
/** Rendering runs once per variant; nothing schedules a second pass. */
export function forceUpdate() {}
export function setMode() {}
export function h(tag, attrs, ...children) {
	const flat = normalize(children);
	if (typeof tag === 'function') {
		const result = tag(attrs ?? {}, flat, utils);
		const roots = normalize(result).filter((child) => 'tag' in child);
		// An FC that yields one element marks it as its root; the outer FC is called last and comes first.
		if (roots.length === 1 && tag.name) roots[0].fcs = [tag.name, ...(roots[0].fcs ?? [])];
		return result;
	}
	return { tag, attrs: attrs ?? {}, children: flat };
}
/** Flattens nested arrays and drops what renders nothing (`null`, booleans, empty strings). */
export function normalize(children) {
	const list = Array.isArray(children) ? children.flat(Infinity) : [children];
	return list
		.filter((child) => child !== null && child !== undefined && typeof child !== 'boolean' && child !== '')
		.map((child) => (typeof child === 'object' ? child : { text: String(child) }));
}
