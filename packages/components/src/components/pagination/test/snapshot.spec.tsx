import { KolPaginationTag } from '../../../core/component-names';
import type { PaginationProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolPagination } from '../component';
import { KolPaginationWc } from '../wc';

executeSnapshotTests<PaginationProps>(
	KolPaginationTag,
	[KolPagination, KolPaginationWc],
	[
		{ _label: 'Label', _on: {}, _max: 2, _page: 1 },
		{ _label: 'Label', _on: {}, _max: 0, _page: 4, _hasButtons: false, _siblingCount: 0 },
		{ _label: 'Label', _on: {}, _max: 10, _page: 10, _boundaryCount: 2, _siblingCount: 2 },
		{
			_label: 'Label',
			_on: {},
			_max: 12,
			_page: 6,
			_hasButtons: { first: false, last: false, next: true, previous: true },
			_boundaryCount: 0,
			_siblingCount: 1,
		},
		{
			_label: 'Label',
			_on: {},
			_max: 25,
			_page: 3,
			_pageSizeOptions: [5, 10, 20],
			_pageSize: 5,
			_siblingCount: 3,
		},
		{ _label: 'Label', _on: {}, _max: 10, _page: 20 },
		{ _label: 'Label', _on: {}, _max: 10, _page: 0, _boundaryCount: -1, _siblingCount: -1 },
		{ _label: 'Label', _on: {}, _max: 100, _page: 50, _customClass: 'custom', _tooltipAlign: 'bottom' },
		{ _label: 'Label', _on: {}, _max: 12, _page: 2, _hasButtons: '{"first":false,"next":false}' },
		{ _label: 'Label', _on: {}, _max: 40, _page: 1, _pageSize: 15, _pageSizeOptions: [10, 20] },
		{ _label: 'Label', _on: {}, _max: 40, _page: 1, _pageSize: 10, _pageSizeOptions: '[10, 20, 50]' },
	],
);
