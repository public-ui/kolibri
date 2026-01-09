import { KoliBriTableHeaders } from '@public-ui/components';
import { KolSpin, KolTableStateless } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { SampleDescription } from '../SampleDescription';

import { COMPLEX_DATA, ComplexData } from './test-complex-data';

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

function LoadingOverlay({ show }) {
	if (show) {
		return (
			<div className="loading-overlay">
				<KolSpin _show _variant="cycle" />
			</div>
		);
	}
}

export const TableStatelessAsync: FC = () => {
	const getAsyncData = () => new Promise((resolve) => setTimeout(() => resolve({ COMPLEX_DATA }), 5000));

	const [complexData, setComplexData] = useState<ComplexData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getAsyncData().then((result: any) => {
			setComplexData(result.COMPLEX_DATA);
			setLoading(false);
		});
	}, []);

	return (
		<>
			<SampleDescription>
				<p>This sample shows how KolTableStateless can used async and with KolPagination.</p>
			</SampleDescription>

			<section className="w-full">
				<KolTableStateless
					_label="Table for demonstration purposes"
					_headerCells={HEADERS_HORIZONTAL}
					_data={complexData}
					_on={{
						onSort: (_event, payload) => {
							console.log(payload);
						},
					}}
				/>
				<LoadingOverlay show={loading}></LoadingOverlay>
			</section>
		</>
	);
};
