import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-pagination` (11 props, 0 methods), extracted from the legacy `shadow.tsx`
 * before its skeleton migration (#9590); the pin checks `component.tsx` against `PaginationProps`.
 */
const KOL_PAGINATION_PUBLIC_API: PublicApiContract = {
	_boundaryCount: {
		kind: 'prop',
		type: 'BoundaryCountPropType',
		required: false,
		doc: 'Defines the amount of pages to show next to the outer arrow buttons.',
		default: '1',
	},
	_customClass: {
		kind: 'prop',
		type: 'CustomClassPropType',
		required: false,
		doc: 'Defines the custom class attribute if _variant="custom" is set.',
	},
	_hasButtons: {
		kind: 'prop',
		type: 'boolean | Stringified<PaginationHasButton>',
		required: false,
		doc: 'Defines which navigation buttons to render (first, last, next, previous buttons).',
		default: 'true',
	},
	_label: {
		kind: 'prop',
		type: 'LabelPropType',
		required: false,
		doc: 'Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).',
	},
	_max: {
		kind: 'prop',
		type: 'MaxPropType',
		required: true,
		doc: 'Defines the maximum value of the element.',
	},
	_on: {
		kind: 'prop',
		type: 'KoliBriPaginationButtonCallbacks',
		required: true,
		doc: 'Gibt an, auf welche Callback-Events reagiert werden.',
	},
	_page: {
		kind: 'prop',
		type: 'PagePropType',
		required: true,
		doc: 'Defines the current page.',
	},
	_pageSize: {
		kind: 'prop',
		type: '',
		required: false,
		doc: 'Defines the amount of entries to show per page.',
		default: '1',
	},
	_pageSizeOptions: {
		kind: 'prop',
		type: 'Stringified<number[]>',
		required: false,
		doc: 'Defines the options for the page-size-select.',
		default: '[]',
	},
	_siblingCount: {
		kind: 'prop',
		type: 'SiblingCountPropType',
		required: false,
		doc: 'Defines the amount of pages to show next to the current page.',
		default: '1',
	},
	_tooltipAlign: {
		kind: 'prop',
		type: 'TooltipAlignPropType',
		required: false,
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
		default: "'top'",
	},
};

describePublicApiContract({ tag: 'kol-pagination', component: 'pagination', pinnedApi: KOL_PAGINATION_PUBLIC_API, schemaInterface: 'PaginationProps' });
