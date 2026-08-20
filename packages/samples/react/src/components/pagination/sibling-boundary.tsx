import React from 'react';

import { KolPagination } from '@public-ui/react-v19';

import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const PaginationSiblingBoundary: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample demonstrates how _siblingCount and _boundaryCount affect the number of page buttons shown. All examples use the same dataset configuration
				(_max=20, _page=5, _pageSize=1) to clearly show the effect of these settings. _siblingCount controls how many page buttons appear next to the current
				page, while _boundaryCount controls how many buttons appear at the beginning and end of the pagination.
			</p>
		</SampleDescription>

		<div className="grid gap-4" data-visual-block="sibling-boundary">
			{/* Default: siblingCount=1, boundaryCount=1 */}
			<KolPagination _max={20} _page={5} _pageSize={1} _label="Default: siblingCount=1, boundaryCount=1 (shows pages 1, 4, 5, 6, 20)" _on={{}} />

			{/* More siblings: siblingCount=2, boundaryCount=1 */}
			<KolPagination
				_max={20}
				_page={5}
				_pageSize={1}
				_siblingCount={2}
				_boundaryCount={1}
				_label="siblingCount=2, boundaryCount=1 (shows pages 1, 3, 4, 5, 6, 7, 20)"
				_on={{}}
			/>

			{/* Many siblings: siblingCount=3, boundaryCount=1 */}
			<KolPagination
				_max={20}
				_page={5}
				_pageSize={1}
				_siblingCount={3}
				_boundaryCount={1}
				_label="siblingCount=3, boundaryCount=1 (shows pages 1, 2, 3, 4, 5, 6, 7, 8, 20)"
				_on={{}}
			/>

			{/* No siblings: siblingCount=0, boundaryCount=1 */}
			<KolPagination
				_max={20}
				_page={5}
				_pageSize={1}
				_siblingCount={0}
				_boundaryCount={1}
				_label="siblingCount=0, boundaryCount=1 (shows pages 1, 5, 20 only)"
				_on={{}}
			/>

			{/* More boundaries: siblingCount=1, boundaryCount=2 */}
			<KolPagination
				_max={20}
				_page={5}
				_pageSize={1}
				_siblingCount={1}
				_boundaryCount={2}
				_label="siblingCount=1, boundaryCount=2 (shows pages 1, 2, 4, 5, 6, 19, 20)"
				_on={{}}
			/>

			{/* Many boundaries: siblingCount=1, boundaryCount=3 */}
			<KolPagination
				_max={20}
				_page={5}
				_pageSize={1}
				_siblingCount={1}
				_boundaryCount={3}
				_label="siblingCount=1, boundaryCount=3 (shows pages 1, 2, 3, 4, 5, 6, 18, 19, 20)"
				_on={{}}
			/>

			{/* No boundaries: siblingCount=1, boundaryCount=0 */}
			<KolPagination
				_max={20}
				_page={5}
				_pageSize={1}
				_siblingCount={1}
				_boundaryCount={0}
				_label="siblingCount=1, boundaryCount=0 (shows pages 4, 5, 6 only, with ellipsis)"
				_on={{}}
			/>

			{/* No siblings, no boundaries: siblingCount=0, boundaryCount=0 */}
			<KolPagination
				_max={20}
				_page={5}
				_pageSize={1}
				_siblingCount={0}
				_boundaryCount={0}
				_label="siblingCount=0, boundaryCount=0 (shows page 5 only, with ellipsis on both sides)"
				_on={{}}
			/>

			{/* High values: siblingCount=5, boundaryCount=2 */}
			<KolPagination
				_max={20}
				_page={5}
				_pageSize={1}
				_siblingCount={5}
				_boundaryCount={2}
				_label="siblingCount=5, boundaryCount=2 (shows almost all pages)"
				_on={{}}
			/>

			{/* Middle page with high sibling count: shows clipping */}
			<KolPagination
				_max={100}
				_page={50}
				_pageSize={1}
				_siblingCount={3}
				_boundaryCount={2}
				_label="Larger dataset: _max=100, _page=50, siblingCount=3, boundaryCount=2"
				_on={{}}
			/>
		</div>
	</>
);
