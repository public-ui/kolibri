import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { KolButton, KolTableStateful } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import type { KoliBriTableDataType } from '@public-ui/components';

const DATA = [
	{ id: '1001', name: 'Foo Bar' },
	{ id: '1002', name: 'Foo Baz' },
];
type Data = (typeof DATA)[0];

export const TableStatefulWithSelection: FC = () => {
	const [selectedValue, setSelectedValue] = useState<Data[]>();

	const selection = {
		label: (row: any) => `Selection for ${(row as Data).name}`,
		selectedKeys: selectedValue ? selectedValue.map((element) => element.id) : [],
		keyPropertyName: 'id',
	};

	const kolTableStatefulRef = useRef<HTMLKolTableStatefulElement>(null);

	const handleSelectionChangeEvent = ({ detail: selection }: { detail: Data[] }) => {
		console.log('Selection change via event', selection);
	};
	const handleSelectionChangeCallback = (_event: Event, selection: KoliBriTableDataType[]) => {
		console.log('Selection change via callback', selection);
	};

	const handleButtonClick = async () => {
		const selection = await kolTableStatefulRef.current?.getSelection();
		setSelectedValue(selection as Data[]);
	};

	useEffect(() => {
		// @ts-expect-error https://github.com/Microsoft/TypeScript/issues/28357
		kolTableStatefulRef.current?.addEventListener('kol-selection-change', handleSelectionChangeEvent);

		return () => {
			// @ts-expect-error https://github.com/Microsoft/TypeScript/issues/28357
			kolTableStatefulRef.current?.removeEventListener('kol-selection-change', handleSelectionChangeEvent);
		};
	}, [kolTableStatefulRef]);

	return (
		<>
			<SampleDescription>KolTableStateful with selection</SampleDescription>

			<KolTableStateful
				_label="Table with selection checkboxes"
				_headers={{
					horizontal: [
						[
							{ key: 'id', label: '#ID', textAlign: 'left' },
							{ key: 'name', label: 'Name', textAlign: 'left' },
						],
					],
				}}
				_data={DATA}
				_selection={selection}
				_on={{ onSelectionChange: handleSelectionChangeCallback }}
				className="block"
				style={{ maxWidth: '600px' }}
				ref={kolTableStatefulRef}
			/>
			<div className="grid grid-cols-3 items-end gap-4 mt-4">
				<KolButton
					_label="getSelection()"
					_on={{
						onClick: () => {
							void handleButtonClick();
						},
					}}
				></KolButton>
				<pre>{JSON.stringify(selectedValue, null, 2)}</pre>
			</div>
		</>
	);
};
