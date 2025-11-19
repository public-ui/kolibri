import type { FC } from 'react';
import React from 'react';

import { KolTableStateful } from '@public-ui/react-v19';

import { SampleDescription } from '../SampleDescription';

import type { KoliBriTableHeaders } from '@public-ui/components';
import { COMPLEX_DATA as DATA } from './test-complex-data';

const HEADERS: KoliBriTableHeaders = {
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

export const TableStickyColumns: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>
					This sample shows KolTableStateful with and without horizontal scrollbars. When a scrollbar is present, it should be possible to focus the table
					container and to scroll it using arrow keys.
				</p>
			</SampleDescription>

			<section className="w-full flex flex-col gap-4">
				<KolTableStateful
					_fixedCols={[1, 1]}
					_label="Table for demonstration purposes with horizontal scrollbar."
					_headers={HEADERS}
					_minWidth="1800px"
					_data={DATA}
					className="block"
				/>
			</section>
		</>
	);
};
