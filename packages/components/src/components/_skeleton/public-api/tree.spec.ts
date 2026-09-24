import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-tree` — byte-identical to the predecessor `shadow.tsx` on the develop
 * branch (1 required prop + focus). The cache reset the tree items call lives in
 * `tree/open-items-cache.ts`, not on the element: the predecessor's `invalidateOpenItemsCache()`
 * method sat on the internal `kol-tree-wc`, which is gone.
 */
const KOL_TREE_PUBLIC_API: PublicApiContract = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Sets focus on the first focusable tree item.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
};

describePublicApiContract({ tag: 'kol-tree', component: 'tree', pinnedApi: KOL_TREE_PUBLIC_API, schemaInterface: 'TreeProps' });
