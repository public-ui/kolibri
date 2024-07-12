import React from 'react';

import { KolPagination } from '@public-ui/react';

import type { FC } from 'react';
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
			<KolPagination _max={316514} _page={15475} _siblingCount={3} _label="Test pagination 1" _on={{}} />
			<KolPagination _max={14} _page={14} _siblingCount={1} _boundaryCount={2} _label="Test pagination 2" _on={{}} />
			<KolPagination _max={4} _page={1} _siblingCount={0} _boundaryCount={2} _label="Test pagination 3" _on={{}} />
			<KolPagination _max={4} _page={6} _siblingCount={0} _boundaryCount={2} _hasButtons={false} _label="Test pagination 4" _on={{}} />
			<KolPagination
				_max={4}
				_page={6}
				_siblingCount={0}
				_boundaryCount={2}
				_hasButtons={false}
				_label="Test pagination 4"
				_on={{}}
				_pageSizeOptions={[10, 100]}
			/>
		</div>
	</>
);
