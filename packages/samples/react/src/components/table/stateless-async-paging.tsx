import type { KoliBriTableHeaders } from '@public-ui/components';
import { KolPagination, KolTableStateless } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

import type { KoliBriSortDirection, SortEventPayload } from '../../../../../components/dist/types/schema';
import type { ComplexData } from './test-complex-data';
import { COMPLEX_DATA } from './test-complex-data';

export const TableStatelessAsync: FC = () => {
	const [sortID, setSortID] = useState<KoliBriSortDirection>('NOS');
	const [sortName, setSortName] = useState<KoliBriSortDirection>('NOS');

	const HEADERS_HORIZONTAL: KoliBriTableHeaders = {
		horizontal: [
			[
				{ label: 'ID', key: 'id', textAlign: 'right', width: 160, sortDirection: sortID },
				{ label: 'Common name', key: 'common_name', textAlign: 'left', width: 160, sortDirection: sortName },
			],
		],
	};

	const getAsyncData = () => new Promise<{ COMPLEX_DATA: ComplexData[] }>((resolve) => setTimeout(() => resolve({ COMPLEX_DATA }), 500));
	const loadData = (event?: MouseEvent, sortEvent?: SortEventPayload) => {
		setLoading(true);
		getAsyncData().then((result: Awaited<ReturnType<typeof getAsyncData>>) => {
			setComplexData(result.COMPLEX_DATA.slice(0, 15));

			if (sortEvent?.key === 'id') {
				if (sortID === 'NOS') {
					setSortID('ASC');
					//ID sortiert Name nicht mit (multisort) -> NVDA liest jede sortierung vor
					//setSortName('NOS');
				} else {
					setSortID('NOS');
				}
			} else if (sortEvent?.key === 'common_name') {
				if (sortName === 'NOS') {
					//Name sortiert ID mit (single sort) -> NVDA liest nicht vor
					setSortID('NOS');
					setSortName('ASC');
				} else {
					//Name sortiert ID nicht mit -> NVDA liest  vor
					setSortName('NOS');
				}
			}

			setLoading(false);
		});
	};

	const [complexData, setComplexData] = useState<ComplexData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => loadData(), []);

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows how KolTableStateless can be used async and with KolPagination. Paging and sorting are not functional here, because a backend would
					offer this in real life.
				</p>
			</SampleDescription>

			<SampleBlock id="async" className="w-full relative">
				<KolTableStateless
					_label="Table for demonstration purposes"
					_loading={loading}
					_headers={HEADERS_HORIZONTAL}
					_data={complexData}
					_on={{
						onSort: (event: MouseEvent, sortEvent: SortEventPayload) => loadData(event, sortEvent),
					}}
				/>
				<KolPagination
					_max={200}
					_page={1}
					_siblingCount={0}
					_boundaryCount={2}
					_pageSize={15}
					_on={{
						onChangePage: () => loadData(),
					}}
				/>
			</SampleBlock>
		</>
	);
};
