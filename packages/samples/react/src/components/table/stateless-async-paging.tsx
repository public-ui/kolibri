import type { KoliBriTableHeaders } from '@public-ui/components';
import { KolPagination, KolSpin, KolTableStateless } from '@public-ui/react-v19';
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

const HEADERS_HORIZONTAL_SORT: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'ID', key: 'id', textAlign: 'right', width: 160, sortDirection: 'ASC' },
			{ label: 'Common name', key: 'common_name', textAlign: 'left', width: 160, sortDirection: 'NOS' },
			{ label: 'Scientific name', key: 'scientific_name', textAlign: 'left', width: 160, sortDirection: 'NOS' },
			{ label: 'Conservation status', key: 'conservation_status', textAlign: 'left', width: 160, sortDirection: 'NOS' },
			{ label: 'Habitat', key: 'habitat', textAlign: 'left', width: 160, sortDirection: 'NOS' },
			{ label: 'Diet', key: 'diet', textAlign: 'left', width: 160, sortDirection: 'NOS' },
			{ label: 'Geographic range', key: 'geographic_range', textAlign: 'left', width: 160, sortDirection: 'NOS' },
		],
	],
};

const LoadingOverlayFC: FC<{
	label: string;
	show: boolean;
}> = ({ label, show }) => {
	if (show) {
		return (
			<div className="loading-overlay">
				<KolSpin
					_label={label}
					_show={show}
					_variant="cycle"
					style={{
						backgroundColor: 'transparent',
					}}
				/>
			</div>
		);
	} else {
		return null;
	}
};

export const TableStatelessAsync: FC = () => {
	const getAsyncData = () => new Promise<{ COMPLEX_DATA: ComplexData[] }>((resolve) => setTimeout(() => resolve({ COMPLEX_DATA }), 5000));
	const loadData = (action: 'sort' | 'paginate') => {
		setLoading(true);
		setCurrentAction(action);
		getAsyncData().then((result: Awaited<ReturnType<typeof getAsyncData>>) => {
			setComplexData(result.COMPLEX_DATA.slice(0, 15));
			setLoading(false);
		});
	};

	const [complexData, setComplexData] = useState<ComplexData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [currentAction, setCurrentAction] = useState<'sort' | 'paginate'>('sort');
	const [header, setHeader] = useState<KoliBriTableHeaders>(HEADERS_HORIZONTAL);

	useEffect(() => loadData('sort'), []);

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows how KolTableStateless can be used async and with KolPagination. Paging and sorting are not functional here, because a backend would
					offer this in real life. The sort button demonstrates the screen-reader announcement when the sort order changes.
				</p>
			</SampleDescription>

			<section className="w-full relative">
				<KolTableStateless
					_label="Table for demonstration purposes"
					_headerCells={header}
					_data={complexData}
					_on={{
						onSort: () => {
							setHeader((prev) => (prev === HEADERS_HORIZONTAL ? HEADERS_HORIZONTAL_SORT : HEADERS_HORIZONTAL));
							loadData('sort');
						},
					}}
				/>
				<KolPagination
					_max={200}
					_page={1}
					_siblingCount={0}
					_boundaryCount={2}
					_pageSize={15}
					_on={{
						onChangePage: () => loadData('paginate'),
					}}
				/>
				<LoadingOverlayFC label={currentAction === 'sort' ? 'Table is being sorted...' : 'Page is loading...'} show={loading} />
			</section>
		</>
	);
};
