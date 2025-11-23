import { KolPaginationTag } from '../../../core/component-names';
import type { PaginationProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import KolCollapsibleFc from '../../../functional-components/Collapsible';
import { KolPaginationWc } from '../component';
import { KolPagination } from '../shadow';

executeSnapshotTests<PaginationProps>(
	KolPaginationTag,
	[KolPagination, KolPaginationWc, KolCollapsibleFc],
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
	],
);
