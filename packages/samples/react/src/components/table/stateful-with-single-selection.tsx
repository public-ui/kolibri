import type { KoliBriTableCell, KoliBriTableDataType, KoliBriTableSelection } from '@public-ui/components';
import { createReactRenderElement, KolButton, KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { getRoot } from '../../shares/react-roots';
import { SampleDescription } from '../SampleDescription';
import { ensureHeaderWidths } from './utils';

const DATA = [
	{ id: '1001', name: 'Foo Bar', internalIdentifier: `AAA1001` },
	{ id: '1002', name: 'Foo Baz', internalIdentifier: `AAA1002` },
];

type Data = (typeof DATA)[0];
type KolTableStatefulElement = {
	addEventListener: (type: string, listener: (event: CustomEvent<Data[]>) => void) => void;
	removeEventListener: (type: string, listener: (event: CustomEvent<Data[]>) => void) => void;
	getSelection?: () => Promise<KoliBriTableDataType[] | null>;
};

function KolButtonWrapper({ label }: { label: string }) {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return <KolButton _label={label} _on={dummyEventHandler} />;
}

export const TableStatefulWithSingleSelection: FC = () => {
	const [selectedValue, setSelectedValue] = useState<Data | null>();

	const selection: KoliBriTableSelection = {
		label: (row) => `Selection for ${(row as Data).name}`,
		multiple: false,
		selectedKeys: selectedValue ? [selectedValue.internalIdentifier] : [],
		keyPropertyName: 'internalIdentifier',
	};

	const kolTableStatefulRef = useRef<HTMLKolTableStatefulElement>(null);

	const handleSelectionChangeEvent = ({ detail: selection }: CustomEvent<Data[]>) => {
		console.log('Selection change via event', selection);
	};
	const handleSelectionChangeCallback = (_event: Event, selection: KoliBriTableDataType[] | null) => {
		console.log('Selection change via callback', selection);
	};

	const handleButtonClick = async () => {
		const tableElement = kolTableStatefulRef.current as unknown as KolTableStatefulElement | null;
		const selection = await tableElement?.getSelection?.();
		setSelectedValue(selection as Data | null);
	};

	useEffect(() => {
		const tableElement = kolTableStatefulRef.current as unknown as KolTableStatefulElement | null;
		const selectionChangeEvent = 'kolSelectionChange';
		tableElement?.addEventListener(selectionChangeEvent, handleSelectionChangeEvent);

		return () => {
			tableElement?.removeEventListener(selectionChangeEvent, handleSelectionChangeEvent);
		};
	}, [kolTableStatefulRef]);

	const renderButton = (element: HTMLElement, cell: KoliBriTableCell) => {
		const data = (cell as { data?: Data }).data;
		const id = data?.id;
		getRoot(createReactRenderElement(element)).render(<KolButtonWrapper label={`Click ${id}`} />);
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTableStateful with radio buttons for selection enabled.</p>
			</SampleDescription>

			<section className="w-full">
				<KolTableStateful
					_label="Table with selection radio"
					_headers={ensureHeaderWidths({
						horizontal: [
							[
								{ key: 'id', label: '#ID', textAlign: 'left' },
								{ key: 'name', label: 'Name', textAlign: 'left' },
								{ key: 'action', label: 'Action', textAlign: 'left', render: renderButton },
							],
						],
					})}
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
					<pre className="text-base">{JSON.stringify(selectedValue, null, 2)}</pre>
				</div>
			</section>
		</>
	);
};
