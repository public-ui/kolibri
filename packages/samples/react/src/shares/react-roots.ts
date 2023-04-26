import { createRoot, Root } from 'react-dom/client';

const REACT18_ROOTS = new WeakMap<Element | DocumentFragment, Root>();

export const getRoot = (el: Element | DocumentFragment): Root => {
	if (REACT18_ROOTS.has(el) === false) {
		REACT18_ROOTS.set(el, createRoot(el));
	}
	return REACT18_ROOTS.get(el) as Root;
};
