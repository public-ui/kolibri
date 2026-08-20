import React from 'react';

import { KolPagination } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const PaginationBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolPagination renders a pagination for datasets. The sample shows the different states and variations of a pagination and the option to change the page
				size.
			</p>
		</SampleDescription>

		<SampleBlock id="basic">
			<KolPagination
				_max={316514}
				_page={15475}
				_pageSize={20}
				_siblingCount={3}
				_boundaryCount={1}
				_label="Large dataset, page in the middle (Entries 309481 to 309500 of 316514)"
				_on={{}}
			/>
			<KolPagination
				_max={316514}
				_page={1}
				_pageSize={50}
				_siblingCount={2}
				_boundaryCount={1}
				_label="Large dataset, first page (Entries 1 to 50 of 316514)"
				_on={{}}
			/>
			<KolPagination
				_max={316514}
				_page={6331}
				_pageSize={50}
				_siblingCount={2}
				_boundaryCount={1}
				_label="Large dataset, last page (Entries 316501 to 316514 of 316514)"
				_on={{}}
			/>
			<KolPagination
				_max={14}
				_page={14}
				_pageSize={1}
				_siblingCount={1}
				_boundaryCount={2}
				_label="Small dataset, last page (Entries 14 to 14 of 14)"
				_on={{}}
			/>
			<KolPagination _max={4} _page={1} _pageSize={4} _siblingCount={0} _boundaryCount={2} _label="Tiny dataset, first page (Entries 1 to 4 of 4)" _on={{}} />
			<KolPagination
				_max={10}
				_page={15}
				_pageSize={5}
				_siblingCount={0}
				_boundaryCount={2}
				_hasButtons={false}
				_label="Edge case: page exceeds max (corrected to page 2, Entries 6 to 10 of 10)"
				_on={{}}
			/>
			<KolPagination
				_max={1000}
				_page={10}
				_pageSize={25}
				_siblingCount={0}
				_boundaryCount={2}
				_hasButtons={false}
				_label="Medium dataset with boundary buttons only (Entries 226 to 250 of 1000)"
				_on={{}}
			/>
			<KolPagination
				_max={379}
				_page={6}
				_pageSize={10}
				_siblingCount={0}
				_boundaryCount={2}
				_hasButtons={false}
				_label="With page size options"
				_on={{}}
				_pageSizeOptions={[10, 25, 50, 100]}
			/>
			<KolPagination
				_max={100}
				_page={5}
				_pageSize={10}
				_siblingCount={1}
				_boundaryCount={1}
				_label="Page size 10, sibling count 1 (Entries 41 to 50 of 100)"
				_on={{}}
			/>
			<KolPagination
				_max={250}
				_page={3}
				_pageSize={30}
				_siblingCount={2}
				_boundaryCount={0}
				_label="No boundary buttons, sibling count 2 (Entries 61 to 90 of 250)"
				_on={{}}
			/>
		</SampleBlock>
	</>
);
