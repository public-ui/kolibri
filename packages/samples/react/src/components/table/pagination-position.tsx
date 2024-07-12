import type { FC } from 'react';
import React from 'react';

import { KolTable } from '@public-ui/react';

import { SampleDescription } from '../SampleDescription';
import { DATE_FORMATTER } from './formatter';
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

export const PaginationPosition: FC = () => (
	<div className="grid gap-14">
		<SampleDescription>This sample shows KolTable with different pagination positions.</SampleDescription>

		<section>
			<h2>Table with pagination at the bottom.</h2>
			<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION} _paginationPosition="bottom"></KolTable>
		</section>
		<section>
			<h2>Table with pagination at the top.</h2>
			<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION} _paginationPosition="top"></KolTable>
		</section>
		<section>
			<h2>Table with pagination at both top and bottom.</h2>
			<KolTable _label="Tabellenbeschreibung" _data={DATA} _headers={HEADERS} _pagination={PAGINATION} _paginationPosition="both"></KolTable>
		</section>
	</div>
);
