import type { FC } from 'react';
import React, { useState } from 'react';

import type { KoliBriTableDataType, KoliBriTableHeaders } from '@public-ui/components';
import { KolHeading, KolInputCheckbox, KolTableStateful } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';
import type { Data } from './test-data';
import { DATA } from './test-data';

const DATE_FORMATTER = Intl.DateTimeFormat('de-DE', {
	day: '2-digit',
	month: '2-digit',
	year: 'numeric',
});

const HEADERS_HORIZONTAL: KoliBriTableHeaders = {
	horizontal: [
		[
			{
				label: 'Order',
				key: 'order',
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
				textAlign: 'left',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
					return (data0 as Data).name.localeCompare((data1 as Data).name, 'de');
				},
			},
			{
				label: 'Vorname',
				key: 'vorname',
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
		],
	],
};

const HEADERS_VERTICAL: KoliBriTableHeaders = {
	vertical: [
		[
			{
				label: 'Order',
				key: 'order',
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
				textAlign: 'left',
				compareFn: (data0: KoliBriTableDataType, data1: KoliBriTableDataType) => {
					return (data0 as Data).name.localeCompare((data1 as Data).name, 'de');
				},
			},
			{
				label: 'Vorname',
				key: 'vorname',
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
		],
	],
};
export const MultiSortTable: FC = () => {
	const [allowMultiSortVertical, setAllowMultiSortVertical] = useState(false);
	const [allowMultiSortHorizontal, setAllowMultiSortHorizontal] = useState(true);
	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTableStateful with multi-sort functionality, allowing sorting by both &quot;order&quot; and &quot;date&quot; columns.</p>
			</SampleDescription>

			<section className="w-full grid gap-4">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Vertical" />
					<KolInputCheckbox
						_checked={allowMultiSortVertical}
						_label="Allow Multi-Sort"
						_variant="switch"
						_on={{ onChange: (_, value) => setAllowMultiSortVertical(Boolean(value)) }}
					></KolInputCheckbox>
					<KolTableStateful
						_label="Sort Table with Order and Date"
						_minWidth="auto"
						_data={DATA.slice(0, 10)}
						_headers={HEADERS_VERTICAL}
						className="block"
						_allowMultiSort={allowMultiSortVertical}
					/>
				</section>
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Horizontal" />
					<KolInputCheckbox
						_checked={allowMultiSortHorizontal}
						_label="Allow Multi-Sort"
						_variant="switch"
						_on={{ onChange: (_, value) => setAllowMultiSortHorizontal(Boolean(value)) }}
					></KolInputCheckbox>
					<KolTableStateful
						_label="Sort Table with Order and Date"
						_minWidth="auto"
						_data={DATA}
						_headers={HEADERS_HORIZONTAL}
						className="block"
						_allowMultiSort={allowMultiSortHorizontal}
					/>
				</section>
			</section>
		</>
	);
};
