import React from 'react';

import { KolPagination } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const PaginationButtonVisibility: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates how to show or hide the navigation buttons (first, previous, next, last) in a pagination. All examples use the same dataset
				configuration (_max=100, _page=5, _pageSize=10) to show the effect of different button visibility settings.
			</p>
		</SampleDescription>

		<div className="grid gap-4" data-visual-block="button-visibility">
			{/* Default: All buttons visible */}
			<KolPagination
				_max={100}
				_page={5}
				_pageSize={10}
				_siblingCount={2}
				_boundaryCount={1}
				_label="Default: All buttons visible (first, previous, next, last)"
				_on={{}}
			/>

			{/* Only first and last buttons */}
			<KolPagination
				_max={100}
				_page={5}
				_pageSize={10}
				_siblingCount={2}
				_boundaryCount={1}
				_label="Only first and last buttons"
				_on={{}}
				_hasButtons={{ first: true, last: true, next: false, previous: false }}
			/>

			{/* Only previous and next buttons */}
			<KolPagination
				_max={100}
				_page={5}
				_pageSize={10}
				_siblingCount={2}
				_boundaryCount={1}
				_label="Only previous and next buttons"
				_on={{}}
				_hasButtons={{ first: false, last: false, next: true, previous: true }}
			/>

			{/* No navigation buttons, only page numbers */}
			<KolPagination
				_max={100}
				_page={5}
				_pageSize={10}
				_siblingCount={2}
				_boundaryCount={1}
				_label="No navigation buttons, only page numbers"
				_on={{}}
				_hasButtons={false}
			/>

			{/* All buttons except first */}
			<KolPagination
				_max={100}
				_page={5}
				_pageSize={10}
				_siblingCount={2}
				_boundaryCount={1}
				_label="All buttons except first"
				_on={{}}
				_hasButtons={{ first: false, last: true, next: true, previous: true }}
			/>

			{/* All buttons except last */}
			<KolPagination
				_max={100}
				_page={5}
				_pageSize={10}
				_siblingCount={2}
				_boundaryCount={1}
				_label="All buttons except last"
				_on={{}}
				_hasButtons={{ first: true, last: false, next: true, previous: true }}
			/>

			{/* All buttons except previous */}
			<KolPagination
				_max={100}
				_page={5}
				_pageSize={10}
				_siblingCount={2}
				_boundaryCount={1}
				_label="All buttons except previous"
				_on={{}}
				_hasButtons={{ first: true, last: true, next: true, previous: false }}
			/>

			{/* All buttons except next */}
			<KolPagination
				_max={100}
				_page={5}
				_pageSize={10}
				_siblingCount={2}
				_boundaryCount={1}
				_label="All buttons except next"
				_on={{}}
				_hasButtons={{ first: true, last: true, next: false, previous: true }}
			/>
		</div>
	</>
);
