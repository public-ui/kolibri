import type { FC } from 'react';
import React from 'react';

import { KolTableStateful } from '@public-ui/react-v19';

import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';
import { DATE_FORMATTER } from './formatter';
import type { Data } from './test-data';
import { DATA } from './test-data';

import type { KoliBriTableHeaders, KoliBriTablePaginationProps } from '@public-ui/components';

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Order', key: 'order', width: 160 },
			{ label: 'Date', key: 'date', width: 160, render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as unknown as Data).date) },
		],
	],
};
const PAGINATION: KoliBriTablePaginationProps = { _page: 2 };

export const TableWithPagination: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows how KolTableStateful can be navigated using a pagination.</p>
		</SampleDescription>
		<SampleBlock id="with-pagination" className="w-full">
			<KolTableStateful _label="Table description" _data={DATA} _headers={HEADERS} _pagination={PAGINATION}></KolTableStateful>
		</SampleBlock>
	</>
);
