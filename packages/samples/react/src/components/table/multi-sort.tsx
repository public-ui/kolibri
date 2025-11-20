import type { FC } from 'react';
import React, { useState } from 'react';

import type { KoliBriTableDataType, KoliBriTableHeaderCellWithLogic, KoliBriTableHeaders } from '@public-ui/components';
import { KolButtonLink, KolHeading, KolTableStateful } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';
import type { MultiSortData as Data } from './test-data';
import { MULTI_SORT_DATA as DATA } from './test-data';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

const TABLE_HEADER_CELLS: KoliBriTableHeaderCellWithLogic[] = [
	{
		label: 'Order',
		key: 'order',
		sortDirection: 'ASC',
		textAlign: 'center',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
			if ((data0 as Data).order < (data1 as Data).order) return -1;
			else if ((data1 as Data).order < (data0 as Data).order) return 1;
			else return 0;
		},
	},
	{
		label: 'Name',
		key: 'name',
		sortDirection: 'ASC',
		textAlign: 'left',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
			return (data0 as Data).name.localeCompare((data1 as Data).name, 'de');
		},
	},
	{
		label: 'Vorname',
		key: 'vorname',
		sortDirection: 'DESC',
		textAlign: 'left',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
			return (data0 as Data).vorname.localeCompare((data1 as Data).vorname, 'de');
		},
	},
	{
		label: 'Geburtsdatum',
		key: 'geburtsdatum',
		textAlign: 'center',
		render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as Data).geburtsdatum),
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
			if ((data0 as Data).geburtsdatum < (data1 as Data).geburtsdatum) return -1;
			else if ((data1 as Data).geburtsdatum < (data0 as Data).geburtsdatum) return 1;
			else return 0;
		},
	},
	{
		label: 'Straße',
		key: 'strasse',
		textAlign: 'left',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
			return (data0 as Data).strasse.localeCompare((data1 as Data).strasse, 'de');
		},
	},
	{
		label: 'Haus-Nr.',
		key: 'hausNr',
		textAlign: 'center',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
			return (data0 as Data).hausNr.localeCompare((data1 as Data).hausNr, 'de', { numeric: true });
		},
	},
	{
		label: 'PLZ',
		key: 'plz',
		textAlign: 'center',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
			return (data0 as Data).plz.localeCompare((data1 as Data).plz);
		},
	},
	{
		label: 'Ort',
		key: 'ort',
		textAlign: 'left',
		compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
			return (data0 as Data).ort.localeCompare((data1 as Data).ort, 'de');
		},
	},
];

const HEADERS_HORIZONTAL: KoliBriTableHeaders = {
	horizontal: [TABLE_HEADER_CELLS],
};

const HEADERS_VERTICAL: KoliBriTableHeaders = {
	vertical: [TABLE_HEADER_CELLS],
};

export const MultiSortTable: FC = () => {
	const [verticalHeader, setVerticalHeader] = useState(HEADERS_VERTICAL);
	const [horizontalHeader, setHorizontalHeader] = useState(HEADERS_HORIZONTAL);
	const resetVerticalHeaders = () => {
		setVerticalHeader({ vertical: [TABLE_HEADER_CELLS] });
	};

	const resetHorizontalHeaders = () => {
		setHorizontalHeader({ horizontal: [TABLE_HEADER_CELLS] });
	};
	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTableStateful with multi-sort functionality, allowing sorting all columns.</p>
			</SampleDescription>

			<section className="w-full grid gap-4">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Vertical" />
					<KolButtonLink _label="Reset Table" _on={{ onClick: resetVerticalHeaders }}></KolButtonLink>
					<KolTableStateful
						_label="Sortable Table with vertical headers"
						_minWidth="auto"
						_data={DATA}
						_headers={verticalHeader}
						className="block"
						_allowMultiSort={true}
					/>
				</section>
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Horizontal" />
					<KolButtonLink _label="Reset Table" _on={{ onClick: resetHorizontalHeaders }}></KolButtonLink>
					<KolTableStateful
						_label="Sortable Table with horizontal headers"
						_minWidth="auto"
						_data={DATA}
						_headers={horizontalHeader}
						className="block"
						_allowMultiSort={true}
					/>
				</section>
			</section>
		</>
	);
};
