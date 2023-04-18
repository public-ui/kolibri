import React from 'react';
import { KolPagination } from '@public-ui/react';

import { FC } from 'react';

export const PaginationBasic: FC = () => (
	<div className="grid gap-4">
		<KolPagination _total={10} _page={6} _siblingCount={0} />
		<KolPagination _total={10} _page={6} _siblingCount={2} _variant="danger" />
		<KolPagination _total={10} _page={6} _siblingCount={0} _boundaryCount={2} _variant="ghost" />
	</div>
);
