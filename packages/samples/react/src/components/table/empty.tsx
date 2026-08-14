import type { KoliBriTableHeaders } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

const HEADERS_HORIZONTAL: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'ID', key: 'id', textAlign: 'right', width: 160, sortDirection: 'NOS' },
			{ label: 'Common name', key: 'common_name', textAlign: 'left', width: 160, sortDirection: 'NOS' },
			{ label: 'Scientific name', key: 'scientific_name', textAlign: 'left', width: 160, sortDirection: 'NOS' },
			{ label: 'Conservation status', key: 'conservation_status', textAlign: 'left', width: 160, sortDirection: 'NOS' },
			{ label: 'Habitat', key: 'habitat', textAlign: 'left', width: 160, sortDirection: 'NOS' },
			{ label: 'Diet', key: 'diet', textAlign: 'left', width: 160, sortDirection: 'NOS' },
			{ label: 'Geographic range', key: 'geographic_range', textAlign: 'left', width: 160, sortDirection: 'NOS' },
		],
	],
};

export const TableEmpty: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>This sample shows an empty KolTableStateful.</p>
			</SampleDescription>

			<KolTableStateful _label="Table for demonstration purposes" _headers={HEADERS_HORIZONTAL} _data={[]} />
		</>
	);
};
