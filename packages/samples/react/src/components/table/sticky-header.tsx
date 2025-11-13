import type { FC } from 'react';
import React from 'react';

import type { KoliBriTableHeaders } from '@public-ui/components';
import { KolHeading, KolTableStateful } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';
import { COMPLEX_DATA } from './test-complex-data';

const HEADERS_HORIZONTAL: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'ID', key: 'id', textAlign: 'right' },
			{ label: 'Common Name', key: 'common_name', textAlign: 'left' },
			{ label: 'Scientific Name', key: 'scientific_name', textAlign: 'left' },
			{ label: 'EMail', key: 'email', textAlign: 'left' },
			{ label: 'IP Address', key: 'ip_address', textAlign: 'center' },
			{ label: 'User Name', key: 'user_name', textAlign: 'left' },
			{ label: 'Bitcoin Address', key: 'bitcoin_address', textAlign: 'center' },
			{ label: 'Street Address', key: 'street_address', textAlign: 'center' },
			{ label: 'IBAN', key: 'iban', textAlign: 'left' },
		],
	],
};

export const TableStickyHeader: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolTableStateful with horizontal and vertical scrollbars. It should be focusable and scrollable with the keyboard. The table headline
				should be sticky at the top of the table.
			</p>
		</SampleDescription>

		<KolHeading _level={2} _label="Sticky headers" />
		<KolTableStateful _label="Sort a date column" _minWidth="1800px" _data={COMPLEX_DATA} _headers={HEADERS_HORIZONTAL} className="block" />
	</>
);
