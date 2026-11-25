/**
 * Lets a tree item reset the open-items cache of the tree it belongs to without a public method
 * on `kol-tree`: the tree registers its reset under its host element, an item that expands or
 * collapses looks the tree up and calls it.
 */
const invalidators = new WeakMap<Element, () => void>();

export const registerOpenItemsCache = (tree: Element, invalidate: () => void): void => {
	invalidators.set(tree, invalidate);
};

export const unregisterOpenItemsCache = (tree: Element): void => {
	invalidators.delete(tree);
};

export const invalidateOpenItemsCache = (tree?: Element | null): void => {
	if (tree) {
		invalidators.get(tree)?.();
	}
};
