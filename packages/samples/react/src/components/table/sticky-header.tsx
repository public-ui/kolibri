import type { FC } from 'react';
import React from 'react';

import type { KoliBriTableHeaders } from '@public-ui/components';
import { KolHeading, KolTableStateful } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';
import { COMPLEX_DATA } from './test-complex-data';
import { ensureHeaderWidths } from './utils';

const HEADERS_HORIZONTAL: KoliBriTableHeaders = ensureHeaderWidths({
	horizontal: [
		[
			{ label: 'ID', key: 'id', textAlign: 'right' },
			{ label: 'Common name', key: 'common_name', textAlign: 'left' },
			{ label: 'Scientific name', key: 'scientific_name', textAlign: 'left' },
			{ label: 'Conservation status', key: 'conservation_status', textAlign: 'left' },
			{ label: 'Habitat', key: 'habitat', textAlign: 'left' },
			{ label: 'Diet', key: 'diet', textAlign: 'left' },
			{ label: 'Geographic range', key: 'geographic_range', textAlign: 'left' },
		],
	],
});

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
