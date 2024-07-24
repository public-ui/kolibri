import React, { FC, useState } from 'react';

import { KolHeading, KolInputCheckbox, KolTable } from '@public-ui/react';
import { KoliBriTableHeaders } from '@public-ui/components/src';
import { SampleDescription } from '../SampleDescription';

const DATA = [{ small: 'Small Example', large: 'Larger Example' }];
const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Large Column', key: 'large', textAlign: 'left', width: '400px' },
			{ label: 'Small Column', key: 'small', textAlign: 'left', width: '200px' },
		],
	],
};

export const TableHorizontalScrollbar: FC = () => {
	const [hasWidthRestriction, setHasWidthRestriction] = useState(true);

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows KolTable with and without horizontal scrollbars. When a scrollbar is present, it should be possible to focus the table container and
					to scroll it using arrow keys.
				</p>
			</SampleDescription>
			<KolHeading _label="Table with scrollbar" _level={2} />

			<KolTable
				_label="Table for demonstration purposes with horizontal scrollbar."
				_minWidth={hasWidthRestriction ? '600px' : 'auto'}
				_headers={HEADERS}
				_data={DATA}
				className="block"
				style={{ width: '400px' }}
			/>

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

			<KolTable _label="Table for demonstration purposes without horizontal scrollbar" _minWidth="600px" _headers={HEADERS} _data={DATA} className="block" />
		</>
	);
};
