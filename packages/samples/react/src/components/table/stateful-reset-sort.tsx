import type { FC } from 'react';
import React, { useRef } from 'react';

import type { KoliBriTableDataType, KoliBriTableHeaders } from '@public-ui/components';
import { KolButton, KolTableStateful } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

type Item = { name: string; score: number };

const DATA: Item[] = [
	{ name: 'Charlie', score: 72 },
	{ name: 'Alice', score: 95 },
	{ name: 'Bob', score: 88 },
	{ name: 'Diana', score: 61 },
	{ name: 'Eve', score: 84 },
];

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{
				key: 'name',
				label: 'Name',
				sortDirection: 'ASC',
				compareFn: (a: KoliBriTableDataType, b: KoliBriTableDataType) => (a as Item).name.localeCompare((b as Item).name),
			},
			{
				key: 'score',
				label: 'Score',
				textAlign: 'right',
				compareFn: (a: KoliBriTableDataType, b: KoliBriTableDataType) => (a as Item).score - (b as Item).score,
			},
		],
	],
};

type KolTableStatefulElement = {
	resetSort?: () => Promise<void>;
};

export const TableStatefulResetSort: FC = () => {
	const tableRef = useRef<HTMLKolTableStatefulElement>(null);

	const handleResetSort = () => {
		const tableElement = tableRef.current as unknown as KolTableStatefulElement | null;
		void tableElement?.resetSort?.();
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates the <code>resetSort()</code> method on <code>KolTableStateful</code>. Sort the table manually by clicking on a column header,
					then press &ldquo;Reset Sort&rdquo; to restore the default sort order defined in <code>_headers</code>.
				</p>
			</SampleDescription>

			<section className="w-full grid gap-4">
				<KolButton _label="Reset Sort" _on={{ onClick: handleResetSort }} />
				<KolTableStateful ref={tableRef} _label="Table with resettable sort" _data={DATA} _headers={HEADERS} className="block" />
			</section>
		</>
	);
};
