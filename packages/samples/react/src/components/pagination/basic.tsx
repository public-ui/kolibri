import React from 'react';
import { KolPagination } from '@public-ui/react';

import { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const PaginationBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolPagination renders a pagination for datasets. The sample shows the different states and variations of a pagination and the option to change the page
				size.
			</p>
		</SampleDescription>
		<div className="grid gap-4">
			<KolPagination _max={10} _page={6} _siblingCount={0} _label="Test Paginierung 1" />
			<KolPagination _max={10} _page={6} _siblingCount={2} _variant="danger" _label="Test Paginierung 2" />
			<KolPagination _max={10} _page={6} _siblingCount={0} _boundaryCount={2} _variant="ghost" _label="Test Paginierung 3" />
			<KolPagination _max={6} _page={6} _siblingCount={0} _boundaryCount={2} _variant="ghost" _label="Test Paginierung 3" />
		</div>
	</>
);
