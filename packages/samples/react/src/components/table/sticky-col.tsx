import type { FC } from 'react';
import React from 'react';

import type { KoliBriTableHeaders, KoliBriTableSelection } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';
import { COMPLEX_DATA } from './test-complex-data';

type Data = (typeof COMPLEX_DATA)[0];

const selection: KoliBriTableSelection = {
	label: (row) => `Selection for ${(row as Data).common_name}`,
	multiple: false,
	keyPropertyName: 'internalIdentifier',
};

const HEADERS_HORIZONTAL: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'ID', key: 'id', textAlign: 'right', width: 60 },
			{ label: 'Common name', key: 'common_name', textAlign: 'left', width: 250 },
			{ label: 'Scientific name', key: 'scientific_name', textAlign: 'left', width: 400 },
			{ label: 'Conservation status', key: 'conservation_status', textAlign: 'left', width: 250 },
			{ label: 'Habitat', key: 'habitat', textAlign: 'left', width: 400 },
			{ label: 'Diet', key: 'diet', textAlign: 'left', width: 200 },
			{ label: 'Geographic range', key: 'geographic_range', textAlign: 'left', width: 300 },
		],
	],
};

export const TableStickyCol: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows KolTableStateful with the first three and last columns sticky. It should be focusable and scrollable with the keyboard. The table
				headline should be sticky at the top of the table. The data lists animal species with conservation-focused details.
			</p>
		</SampleDescription>

		<SampleBlock id="sticky-cols" heading="Sticky columns">
			<KolTableStateful
				_label="Animal species overview"
				_data={COMPLEX_DATA}
				_headers={HEADERS_HORIZONTAL}
				className="block"
				_selection={selection}
				_fixedCols={[2, 1]}
			/>
		</SampleBlock>
	</>
);
