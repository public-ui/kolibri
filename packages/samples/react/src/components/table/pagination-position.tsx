import type { FC } from 'react';
import React from 'react';

import { KolHeading, KolTableStateful } from '@public-ui/react-v19';

import { SampleDescription } from '../SampleDescription';
import { DATE_FORMATTER } from './formatter';
import type { Data } from './test-data';
import { DATA } from './test-data';

import type { KoliBriTableHeaders } from '@public-ui/components';

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Order', key: 'order', width: 160 },
			{ label: 'Date', key: 'date', width: 160, render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as unknown as Data).date) },
		],
	],
};

export const PaginationPosition: FC = () => (
	<div className="w-full grid gap-14">
		<SampleDescription>
			<p>This sample shows KolTableStateful with different pagination positions. All paginations hide the first and last buttons.</p>
		</SampleDescription>

		<section className="w-full flex flex-col gap-14">
			<section className="grid gap-4" data-visual-block="bottom">
				<KolHeading _level={2} _label="Table with pagination at the bottom."></KolHeading>
				<KolTableStateful
					_label="Sample table with pagination at the bottom"
					_data={DATA}
					_headers={HEADERS}
					_pagination={{
						_page: 1,
						_hasButtons: {
							first: false,
							next: true,
							last: false,
							previous: true,
						},
					}}
					_paginationPosition="bottom"
					_variant="small"
				></KolTableStateful>
			</section>
			<section className="grid gap-4" data-visual-block="top">
				<KolHeading _level={2} _label="Table with pagination at the top."></KolHeading>
				<KolTableStateful
					_label="Sample table with pagination at the top"
					_data={DATA}
					_headers={HEADERS}
					_pagination={{
						_page: 2,
						_hasButtons: {
							first: true,
							next: false,
							last: true,
							previous: false,
						},
					}}
					_paginationPosition="top"
				></KolTableStateful>
			</section>
			<section className="grid gap-4" data-visual-block="both">
				<KolHeading _level={2} _label="Table with pagination at both top and bottom."></KolHeading>
				<KolTableStateful
					_label="Sample table with pagination at both top and bottom"
					_data={DATA}
					_headers={HEADERS}
					_pagination={{
						_page: 3,
						_hasButtons: {
							first: false,
							next: false,
							last: false,
							previous: false,
						},
					}}
					_paginationPosition="both"
				></KolTableStateful>
			</section>
		</section>
	</div>
);
