import React, { FC } from 'react';

import { KolTable } from '@public-ui/react';
import { KoliBriTableHeaders } from '@public-ui/components';
import { KoliBriTablePaginationProps } from '@public-ui/components/src';
import { DATA } from './test-data';

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Order', key: 'order' },
			{ label: 'Date', key: 'date' },
		],
	],
};
const PAGINATION: KoliBriTablePaginationProps = { _page: 2, _total: 1 };

export const TableWithPagination: FC = () => (
	<div>
		<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION}></KolTable>
	</div>
);
