import type { FC } from 'react';
import React from 'react';

import type { KoliBriTableHeaders } from '@public-ui/components';
import { KolHeading, KolTableStateful } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';
import { COMPLEX_DATA } from './test-complex-data';

const HEADERS_HORIZONTAL: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'ID', key: 'id', textAlign: 'right', width: 160 },
			{ label: 'Common name', key: 'common_name', textAlign: 'left', width: 160 },
			{ label: 'Scientific name', key: 'scientific_name', textAlign: 'left', width: 160 },
			{ label: 'Conservation status', key: 'conservation_status', textAlign: 'left', width: 160 },
			{ label: 'Habitat', key: 'habitat', textAlign: 'left', width: 160 },
			{ label: 'Diet', key: 'diet', textAlign: 'left', width: 160 },
			{ label: 'Geographic range', key: 'geographic_range', textAlign: 'left', width: 160 },
		],
	],
};

export const TableStickyHeader: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolTableStateful with horizontal and vertical scrollbars. It should be focusable and scrollable with the keyboard. The table headline
				should be sticky at the top of the table. The data now lists animal species with conservation-focused details.
			</p>
		</SampleDescription>

		<KolHeading _level={2} _label="Sticky headers" />
		<KolTableStateful _label="Animal species overview" _data={COMPLEX_DATA} _headers={HEADERS_HORIZONTAL} className="block" />
	</>
);
