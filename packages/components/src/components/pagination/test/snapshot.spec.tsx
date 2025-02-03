import { KolPaginationTag } from '../../../core/component-names';
import type { PaginationProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolPagination } from '../shadow';

executeSnapshotTests<PaginationProps>(
	KolPaginationTag,
	[KolPagination],
	[
		{ _label: 'Label', _on: {}, _max: 2, _page: 1 },
		{ _label: 'Label', _on: {}, _max: 0, _page: 4, _hasButtons: false, _siblingCount: 0 },
	],
);
