import type { FC } from 'react';
import React, { useState } from 'react';

import { KolHeading, KolInputCheckbox, KolTableStateful } from '@public-ui/react-v19';

import { SampleDescription } from '../SampleDescription';
import { DATE_FORMATTER } from './formatter';
import type { Data } from './test-data';
import { DATA as tableData } from './test-data';

import type { KoliBriTableHeaders } from '@public-ui/components';

const DATA = [{ small: 'Small Example', large: 'Larger Example' }];
const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Small Column', key: 'small', textAlign: 'left', width: 200 },
			{ label: 'Large Column', key: 'large', textAlign: 'left', width: 300 },
			{ label: 'Larger Column', key: 'large', textAlign: 'left', width: 400 },
			{ label: 'Larger Column', key: 'large', textAlign: 'left', width: 400 },
		],
	],
};
const COMPACT_HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Small Column', key: 'small', textAlign: 'left', width: 160 },
			{ label: 'Large Column', key: 'large', textAlign: 'left', width: 160 },
			{ label: 'Larger Column', key: 'large', textAlign: 'left', width: 160 },
		],
	],
};
const genericNonSorter = () => 0;
const ORDER_HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Order', key: 'order', width: 160 },
			{
				label: 'Date',
				key: 'date',
				width: 160,
				compareFn: genericNonSorter,
				render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as unknown as Data).date),
			},
		],
	],
};

export const TableHorizontalScrollbar: FC = () => {
	const [hasWidthRestriction, setHasWidthRestriction] = useState(true);

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows KolTableStateful with and without horizontal scrollbars. When a scrollbar is present, it should be possible to focus the table
					container and to scroll it using arrow keys.
				</p>
			</SampleDescription>

			<section className="w-full flex flex-col gap-4" data-visual-block="scrollbar">
				<div className="w-[400px] flex flex-col gap-4">
					<KolTableStateful
						_label="Table for demonstration purposes with horizontal scrollbar."
						_headers={hasWidthRestriction ? HEADERS : COMPACT_HEADERS}
						_data={DATA}
						className="block"
					/>
					<KolTableStateful _label="Table for demonstration horizontal scrolling with pagination." _headers={ORDER_HEADERS} _data={tableData} _pagination />
					<KolTableStateful
						_label="Table for demonstration purposes with horizontal scrollbar with auto width calculation."
						_headers={hasWidthRestriction ? HEADERS : COMPACT_HEADERS}
						_data={[]}
						className="block"
					/>
				</div>

				<KolInputCheckbox
					_checked={hasWidthRestriction}
					_label="Toggle width restriction"
					_variant="switch"
					_on={{
						onChange: (_event, value) => {
							setHasWidthRestriction(Boolean(value));
						},
					}}
				></KolInputCheckbox>

				<KolHeading _label="Same table without scrollbar" _level={2} className="block mt-4" />
				<p className="mt-0">
					<i>Scrollbar appears on very small viewport sizes</i>
				</p>

				<KolTableStateful
					_label="Table for demonstration purposes without horizontal scrollbar"
					_headers={HEADERS}
					_data={DATA}
					className="block"
					_pagination
				/>
			</section>
		</>
	);
};
