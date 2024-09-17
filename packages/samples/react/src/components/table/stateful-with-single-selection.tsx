import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { KolButton, KolTableStateful, createReactRenderElement } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import type { KoliBriTableDataType, KoliBriTableSelection } from '@public-ui/components';
import { getRoot } from '../../shares/react-roots';
import type { KoliBriTableCell } from '@public-ui/components/src/schema';

const DATA = [
	{ id: '1001', name: 'Foo Bar', internalIdentifier: `AAA1001` },
	{ id: '1002', name: 'Foo Baz', internalIdentifier: `AAA1002` },
];

type Data = (typeof DATA)[0];

export const TableStatefulWithSingleSelection: FC = () => {
	const [selectedValue, setSelectedValue] = useState<Data | null>();

	const selection: KoliBriTableSelection = {
		label: (row) => `Selection for ${(row as Data).name}`,
		multiple: false,
		selectedKeys: selectedValue ? [selectedValue.internalIdentifier] : [],
		keyPropertyName: 'internalIdentifier',
	};

	const kolTableStatefulRef = useRef<HTMLKolTableStatefulElement>(null);

	const handleSelectionChangeEvent = ({ detail: selection }: { detail: Data[] }) => {
		console.log('Selection change via event', selection);
	};
	const handleSelectionChangeCallback = (_event: Event, selection: KoliBriTableDataType[] | KoliBriTableDataType | string | null) => {
		console.log('Selection change via callback', selection);
	};

	const handleButtonClick = async () => {
		const selection = await kolTableStatefulRef.current?.getSelection();
		setSelectedValue(selection as Data | null);
	};

	useEffect(() => {
		// @ts-expect-error https://github.com/Microsoft/TypeScript/issues/28357
		kolTableStatefulRef.current?.addEventListener('kol-selection-change', handleSelectionChangeEvent);

		return () => {
			// @ts-expect-error https://github.com/Microsoft/TypeScript/issues/28357
			kolTableStatefulRef.current?.removeEventListener('kol-selection-change', handleSelectionChangeEvent);
		};
	}, [kolTableStatefulRef]);

	const renderButton = (element: HTMLElement, cell: KoliBriTableCell) => {
		getRoot(createReactRenderElement(element)).render(<KolButton _label={`Click ${cell.data?.id}`}></KolButton>);
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTableStateful with radio buttons for selection enabled.</p>
			</SampleDescription>

			<section className="w-full">	
			<KolTableStateful
				_label="Table with selection radio"
				_headers={{
					horizontal: [
						[
							{ key: 'id', label: '#ID', textAlign: 'left' },
							{ key: 'name', label: 'Name', textAlign: 'left' },
							{ key: 'action', label: 'Action', textAlign: 'left', render: renderButton },
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
			</section>
		</>
	);
};
