import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-drawer`: 6 props plus the four open/close methods — identical to the
 * predecessor `shadow.tsx` on the develop branch.
 */
const KOL_DRAWER_PUBLIC_API: PublicApiContract = {
	show: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the drawer. Pass true to open as a modal drawer.',
	},
	showModal: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the drawer as a modal.',
	},
	open: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Opens the drawer. @deprecated Use show() or showModal() instead.',
	},
	close: {
		kind: 'method',
		type: '',
		required: false,
		doc: 'Closes the drawer.',
	},
	_align: {
		kind: 'prop',
		type: 'AlignPropType',
		required: false,
		doc: 'Defines the visual orientation of the component.',
	},
	_hasCloser: {
		kind: 'prop',
		type: 'boolean',
		required: false,
		default: 'false',
		doc: 'Defines whether the element can be closed. @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: true,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_level: {
		kind: 'prop',
		type: 'HeadingLevel',
		required: false,
		default: '0',
		doc: 'Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriModalEventCallbacks',
		required: false,
		doc: 'Specifies the EventCallback function to be called when the drawer is closing.',
	},
	_open: {
		kind: 'prop',
		type: 'OpenPropType',
		required: false,
		doc: 'Opens/expands the element when truthy, closes/collapses when falsy.',
	},
};

describePublicApiContract({ tag: 'kol-drawer', component: 'drawer', pinnedApi: KOL_DRAWER_PUBLIC_API, schemaInterface: 'DrawerProps' });
