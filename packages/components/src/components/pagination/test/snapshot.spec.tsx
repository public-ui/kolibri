import { KolPaginationTag } from '@component-names';
import type { PaginationProps } from '@schema';
import { executeSnapshotTests } from '@testing';

import { KolPagination } from '../shadow';

// _label: ['Label'],
// _page: [4, 1],
// _max: [0, 2],
// _on: [{}],
// _siblingCount: [0],
// _hasButtons: [false],

executeSnapshotTests<PaginationProps>(
	KolPaginationTag,
	[KolPagination],
	[
		{ _label: 'Label', _on: {}, _max: 2, _page: 1 },
		{ _label: 'Label', _on: {}, _max: 0, _page: 4, _hasButtons: false, _siblingCount: 0 },
	],
);
