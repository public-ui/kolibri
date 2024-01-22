import React, { FC } from 'react';

import { KolTable } from '@public-ui/react';
import { KoliBriTableHeaders, KoliBriTablePaginationProps } from '@public-ui/components';
import { Data, DATA } from './test-data';
import { DATE_FORMATTER } from './formatter';
import { SampleDescription } from '../SampleDescription';
const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Order', key: 'order' },
			{ label: 'Date', key: 'date', render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as unknown as Data).date) },
		],
	],
};
const PAGINATION: KoliBriTablePaginationProps = { _page: 2 };

export const PaginationPosition: FC = () => (
	<div className="grid gap-14">
		<SampleDescription>Tables with different pagination positions.</SampleDescription>
		<div>
			<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION} _paginationPosition="bottom"></KolTable>
		</div>
		<div>
			<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION} _paginationPosition="top"></KolTable>
		</div>
		<div>
			<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION} _paginationPosition="both"></KolTable>
		</div>
	</div>
);
