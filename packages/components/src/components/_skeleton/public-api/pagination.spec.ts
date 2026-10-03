import type { PublicApiContract } from './contract';
import { describePublicApiContract } from './contract';

/**
 * Pinned public API of `kol-pagination` (11 props, 0 methods), extracted from the legacy `shadow.tsx`
 * ahead of its skeleton migration (#9590). The migration points the pin to `component.tsx` and adds the
 * schema interface check; the pinned contract stays unchanged.
 */
const KOL_PAGINATION_PUBLIC_API: PublicApiContract = {
	_boundaryCount: {
		kind: 'prop',
		type: 'number',
		required: false,
		default: '1',
		doc: 'Defines the amount of pages to show next to the outer arrow buttons.',
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
		default: 'true',
		doc: 'Defines which navigation buttons to render (first, last, next, previous buttons).',
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
		type: 'number',
		required: true,
		doc: 'Defines the current page.',
	},
	_pageSize: {
		kind: 'prop',
		type: '',
		required: false,
		default: '1',
		doc: 'Defines the amount of entries to show per page.',
	},
	_pageSizeOptions: {
		kind: 'prop',
		type: 'Stringified<number[]>',
		required: false,
		default: '[]',
		doc: 'Defines the options for the page-size-select.',
	},
	_siblingCount: {
		kind: 'prop',
		type: 'number',
		required: false,
		default: '1',
		doc: 'Defines the amount of pages to show next to the current page.',
	},
	_tooltipAlign: {
		kind: 'prop',
		type: 'TooltipAlignPropType',
		required: false,
		default: "'top'",
		doc: 'Defines where to show the Tooltip preferably: top, right, bottom or left.',
	},
};

describePublicApiContract({ tag: 'kol-pagination', component: 'pagination', file: 'shadow.tsx', pinnedApi: KOL_PAGINATION_PUBLIC_API });

/**
 * Pinned surface of `kol-pagination-wc` (11 props, 0 methods): internal contract for `kol-table-stateful`,
 * which renders the tag directly. It stays pinned until `kol-table-stateful` renders the pagination itself.
 */
describePublicApiContract({ tag: 'kol-pagination-wc', component: 'pagination', file: 'component.tsx', pinnedApi: KOL_PAGINATION_PUBLIC_API });
