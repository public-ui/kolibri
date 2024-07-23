import type { FC } from 'react';
import React from 'react';

import { KolTable } from '@public-ui/react';

import { DATE_FORMATTER } from './formatter';
import { SampleDescription } from '../SampleDescription';
import type { Data } from './test-data';
import { DATA } from './test-data';

import type { KoliBriTableHeaders, KoliBriTablePaginationProps } from '@public-ui/components';

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Order', key: 'order' },
			{ label: 'Date', key: 'date', render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as unknown as Data).date) },
		],
	],
};
const PAGINATION: KoliBriTablePaginationProps = { _page: 2 };

export const TableWithPagination: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows how KolTable can be navigated using a pagination.</p>
		</SampleDescription>
		<div>
			<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION}></KolTable>
		</div>
	</>
);
