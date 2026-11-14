/**
 * Keyed items (e.g. `createButtonItem`) of a component that renders a variable number of embedded
 * elements, such as one action button per table row. Each render pass takes the items it renders
 * by key; the pool keeps them across renders, so their tooltip behaviors, refs and description ids
 * survive, and tears down the items the last render pass no longer used.
 */
export type ItemPool<Item> = {
	/** Starts a render pass. Call before the first `get` of the pass. */
	beginRender(): void;
	/** The item for `key`, created on first use. */
	get(key: string): Item;
	/**
	 * Ends a render pass: calls `sync` for every item of the pass and destroys the others. Call from
	 * `componentDidRender`.
	 */
	endRender(): void;
	/** Destroys every item. Call from `disconnectedCallback`. */
	destroy(): void;
};

export const createItemPool = <Item>(create: () => Item, sync: (item: Item) => void, destroy: (item: Item) => void): ItemPool<Item> => {
	const items = new Map<string, Item>();
	const used = new Set<string>();

	return {
		beginRender: (): void => {
			used.clear();
		},
		get: (key: string): Item => {
			used.add(key);
			let item = items.get(key);
			if (item === undefined) {
				item = create();
				items.set(key, item);
			}
			return item;
		},
		endRender: (): void => {
			for (const [key, item] of items) {
				if (used.has(key)) {
					sync(item);
				} else {
					destroy(item);
					items.delete(key);
				}
			}
		},
		destroy: (): void => {
			for (const item of items.values()) {
				destroy(item);
			}
			items.clear();
			used.clear();
		},
	};
};
