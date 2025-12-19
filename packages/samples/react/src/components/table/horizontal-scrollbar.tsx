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
			{ label: 'Small Column', key: 'small', textAlign: 'left', width: '200px' },
			{ label: 'Large Column', key: 'large', textAlign: 'left', width: '300px' },
			{ label: 'Larger Column', key: 'large', textAlign: 'left', width: '400px' },
			{ label: 'Larger Column', key: 'large', textAlign: 'left', width: '400px' },
		],
	],
};
const genericNonSorter = () => 0;

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

			<section className="w-full flex flex-col gap-4">
				<div className="w-[400px] flex flex-col gap-4">
					<KolTableStateful
						_label="Table for demonstration purposes with horizontal scrollbar."
						_minWidth={hasWidthRestriction ? '600px' : '300px'}
						_headers={HEADERS}
						_data={DATA}
						className="block"
					/>
					<KolTableStateful
						_label="Table for demonstration horizontal scrolling with pagination."
						_minWidth={hasWidthRestriction ? '600px' : '300px'}
						_headers={{
							horizontal: [
								[
									{ label: 'Order', key: 'order' },
									{
										label: 'Date',
										key: 'date',
										compareFn: genericNonSorter,
										render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as unknown as Data).date),
									},
								],
							],
						}}
						_data={tableData}
						_pagination
					/>
					<KolTableStateful
						_label="Table for demonstration purposes with horizontal scrollbar with auto minWidth."
						_minWidth={hasWidthRestriction ? '600px' : '300px'}
						_headers={HEADERS}
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
					_minWidth="600px"
					_headers={HEADERS}
					_data={DATA}
					className="block"
					_pagination
				/>
			</section>
		</>
	);
};
