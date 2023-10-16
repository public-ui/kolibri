import React from 'react';
import { KolPagination } from '@public-ui/react';

import { FC } from 'react';

export const PaginationBasic: FC = () => (
	<div className="grid gap-4">
		<KolPagination _max={10} _page={6} _siblingCount={0} _label="Test Paginierung 1" />
		<KolPagination _max={10} _page={6} _siblingCount={2} _variant="danger" _label="Test Paginierung 2" />
		<KolPagination _max={10} _page={6} _siblingCount={0} _boundaryCount={2} _variant="ghost" _label="Test Paginierung 3" />
		<KolPagination _max={6} _page={6} _siblingCount={0} _boundaryCount={2} _variant="ghost" _label="Test Paginierung 3" />
	</div>
);
