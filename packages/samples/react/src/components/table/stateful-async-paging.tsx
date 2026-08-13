import type { KoliBriTableHeaders } from '@public-ui/components';
import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { SampleDescription } from '../SampleDescription';

import type { ComplexData } from './test-complex-data';
import { COMPLEX_DATA } from './test-complex-data';

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

export const TableStatefulAsync: FC = () => {
	const getAsyncData = () => new Promise<{ COMPLEX_DATA: ComplexData[] }>((resolve) => setTimeout(() => resolve({ COMPLEX_DATA }), 5000));
	const loadData = () => {
		setLoading(true);
		getAsyncData().then((result: Awaited<ReturnType<typeof getAsyncData>>) => {
			setComplexData(result.COMPLEX_DATA.slice(0, 15));
			setLoading(false);
		});
	};

	const [complexData, setComplexData] = useState<ComplexData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => loadData(), []);

	return (
		<>
			<SampleDescription>
				<p>This sample shows how KolTableStateful can load data async.</p>
			</SampleDescription>

			<section className="w-full relative">
				<KolTableStateful
					_label="Table for demonstration purposes"
					_loading={loading ? 'Data is loading...' : ''}
					_headers={HEADERS_HORIZONTAL}
					_data={complexData}
				/>
			</section>
		</>
	);
};
