import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-tree-item` — byte-identical to the predecessor `shadow.tsx` on the
 * develop branch (4 props + focus, expand, collapse, isOpen), including the `OpenPropType`
 * alias on `_active`.
 */
const KOL_TREE_ITEM_PUBLIC_API: PublicApiContract = {
	focus: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Focuses the link element.',
	},
	expand: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Expands the tree item.',
	},
	collapse: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Collapses the tree item.',
	},
	isOpen: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Returns whether the tree item is expanded.',
	},
	_active: {
		kind: 'prop',
		type: 'OpenPropType',
		required: false,
		doc: 'If set (to true) the tree item is the active one.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_open: {
		kind: 'prop',
		type: 'OpenPropType',
		required: false,
		doc: 'Opens/expands the element when truthy, closes/collapses when falsy.',
	},
	_href: {
		kind: 'prop',
		type: 'HrefPropType',
		required: true,
		doc: 'Defines the target URI of the link.',
	},
};

describePublicApiContract({ tag: 'kol-tree-item', component: 'tree-item', pinnedApi: KOL_TREE_ITEM_PUBLIC_API, schemaInterface: 'TreeItemProps' });
