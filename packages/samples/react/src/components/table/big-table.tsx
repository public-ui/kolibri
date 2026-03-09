import type { FC } from 'react';
import React, { useEffect, useState } from 'react';

import type { KoliBriTableHeaderCellWithLogic, KoliBriTableHeaders, KoliBriTableSelection } from '@public-ui/components';
import { KolHeading, KolTableStateful } from '@public-ui/react-v19';
import { useSearchParams } from 'react-router';
import { SampleDescription } from '../SampleDescription';
import { COMPLEX_DATA, configurableData } from './test-complex-data';

type Data = (typeof COMPLEX_DATA)[0];

const selection: KoliBriTableSelection = {
	label: (row) => `Selection for ${(row as Data).common_name}`,
	multiple: true,
	keyPropertyName: 'id',
};

const defaultHeaders: KoliBriTableHeaderCellWithLogic[] = [
	{ label: 'ID', key: 'id', textAlign: 'right', width: 60 },
	{ label: 'Common name', key: 'common_name', textAlign: 'left', width: 250 },
	{ label: 'Scientific name', key: 'scientific_name', textAlign: 'left', width: 400 },
	{ label: 'Conservation status', key: 'conservation_status', textAlign: 'left', width: 250 },
	{ label: 'Habitat', key: 'habitat', textAlign: 'left', width: 400 },
	{ label: 'Diet', key: 'diet', textAlign: 'left', width: 200 },
	{ label: 'Geographic range', key: 'geographic_range', textAlign: 'left', width: 300 },
];

var headers: KoliBriTableHeaderCellWithLogic[] = defaultHeaders;

const HEADERS_HORIZONTAL: KoliBriTableHeaders = {
	horizontal: [headers],
};

export const TableBig: FC = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [rows, setRows] = useState<number>(50);
	const [fixedCols, setFixedCols] = useState<[number, number]>([0, 0]);
	var loaded = false;

	function defineTable() {
		if (loaded) {
			return;
		}

		const rows = searchParams.get('rows');
		if (rows) {
			setRows(+rows);
		} else {
			setSearchParams((searchParams) => {
				searchParams.append('rows', '50');
				return searchParams;
			});
		}

		const addCols = searchParams.get('addCols');
		if (addCols) {
			headers = defaultHeaders;
			for (let index = 0; index < +addCols; index++) {
				headers.push({ label: 'rnd' + index, key: 'rnd' + index, textAlign: 'left', width: 100 });
			}
		} else {
			setSearchParams((searchParams) => {
				searchParams.append('addCols', '0');
				return searchParams;
			});
		}

		const fixedCols = searchParams.get('fixedCols');
		if (fixedCols) {
			const strings = fixedCols.split('.');
			setFixedCols([+strings[0], +strings[1]]);
		} else {
			setSearchParams((searchParams) => {
				searchParams.append('fixedCols', '0.0');
				return searchParams;
			});
		}

		loaded = true;
	}

	useEffect(() => defineTable(), [searchParams]);

	return (
		<>
			<SampleDescription>
				<p>You can change what this examples shows with query parameters. Change the values as you like:</p>
				<ul>
					<li>rows=400 - loads 400 rows</li>
					<li>addCols=10 - adds 10 empty columns to the end</li>
					<li>fixedCols=2.1 - makes the first two and last columns sticky</li>
				</ul>
			</SampleDescription>

			<KolHeading _level={2} _label="Sticky columns" />
			<KolTableStateful
				_label="Animal species overview"
				_data={configurableData(rows)}
				_headers={HEADERS_HORIZONTAL}
				className="block"
				_selection={selection}
				_fixedCols={fixedCols}
			/>
		</>
	);
};
