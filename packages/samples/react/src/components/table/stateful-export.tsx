import type { FC } from 'react';
import React, { useCallback, useMemo, useState } from 'react';

import { KolButton, KolInputText, KolTableStateful } from '@public-ui/react-v19';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';

import { SampleDescription } from '../SampleDescription';
import { DATE_FORMATTER } from './formatter';
import type { Data } from './test-data';
import { DATA } from './test-data';

import type { KoliBriTableHeaders } from '@public-ui/components';

type ExportRow = {
	Date: string;
	Order: number;
};

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ label: 'Order', key: 'order', width: 160 },
			{ label: 'Date', key: 'date', width: 160, render: (_el, _cell, tupel) => DATE_FORMATTER.format((tupel as unknown as Data).date) },
		],
	],
};

const triggerBlobDownload = (blob: Blob, fileName: string): void => {
	const downloadUrl = URL.createObjectURL(blob);
	const anchor = document.createElement('a');
	anchor.href = downloadUrl;
	anchor.download = fileName;
	document.body.append(anchor);
	anchor.click();
	anchor.remove();
	URL.revokeObjectURL(downloadUrl);
};

export const TableStatefulExport: FC = () => {
	const [filename, setFilename] = useState('table-export');

	const exportRows = useMemo<ExportRow[]>(() => DATA.map((row) => ({ Date: DATE_FORMATTER.format(row.date), Order: row.order })), []);

	const handleFileName = useCallback((event: Event, value: unknown): void => {
		if (event.target) {
			setFilename(typeof value === 'string' ? value : String(value ?? ''));
		}
	}, []);

	const safeFileName = useMemo(() => {
		const trimmed = filename.trim();
		return trimmed.length > 0 ? trimmed : 'table-export';
	}, [filename]);

	const handleCsvExport = useCallback(() => {
		const csvString = Papa.unparse(exportRows, { delimiter: ',', newline: '\r\n' });
		const csvBlob = new Blob(['\uFEFF', csvString], { type: 'text/csv;charset=utf-8;' });
		triggerBlobDownload(csvBlob, `${safeFileName}.csv`);
	}, [exportRows, safeFileName]);

	const handleExcelExport = useCallback(() => {
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(exportRows);
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Export');
		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		const excelBlob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		});
		triggerBlobDownload(excelBlob, `${safeFileName}.xlsx`);
	}, [exportRows, safeFileName]);

	return (
		<>
			<SampleDescription>
				<p>This sample shows CSV and Excel export for KolTableStateful data, using browser Blob downloads and a configurable file name.</p>
			</SampleDescription>
			<div className="grid gap-4">
				<KolInputText
					_label="Export file name"
					_value={filename}
					_hint="The entered value is used for CSV and XLSX export."
					_on={{
						onChange: handleFileName,
						onInput: handleFileName,
					}}
				/>
				<div className="flex gap-4">
					<KolButton _label="Export CSV" _on={{ onClick: handleCsvExport }} />
					<KolButton _label="Export Excel" _on={{ onClick: handleExcelExport }} />
				</div>
				<KolTableStateful _label="Table with export actions" _data={DATA} _headers={HEADERS} className="block" />
			</div>
		</>
	);
};
