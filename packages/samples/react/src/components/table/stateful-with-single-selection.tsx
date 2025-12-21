import type { KoliBriTableCell, KoliBriTableDataType, KoliBriTableSelection } from '@public-ui/components';
import { KolEvent } from '@public-ui/components';
import { createReactRenderElement, KolButton, KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { getRoot } from '../../shares/react-roots';
import { SampleDescription } from '../SampleDescription';

const DATA = [
	{ id: '1001', name: 'Foo Bar', internalIdentifier: `AAA1001` },
	{ id: '1002', name: 'Foo Baz', internalIdentifier: `AAA1002` },
];

type Data = (typeof DATA)[0];

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

	type TableStatefulHandle = HTMLElement & {
		addEventListener: HTMLElement['addEventListener'];
		getSelection: () => Promise<KoliBriTableDataType[] | null>;
		removeEventListener: HTMLElement['removeEventListener'];
	};
	const isTableStatefulHandle = (element: unknown): element is TableStatefulHandle => typeof (element as TableStatefulHandle)?.getSelection === 'function';

	const kolTableStatefulRef = useRef<unknown>(null);
	const selectionChangeEvent = (KolEvent as { selectionChange: string }).selectionChange;

	const handleSelectionChangeEvent = ({ detail: selection }: { detail: Data[] }) => {
		console.log('Selection change via event', selection);
	};
	const handleSelectionChangeCallback = (_event: Event, selection: KoliBriTableDataType[] | null) => {
		console.log('Selection change via callback', selection);
	};

	const handleButtonClick = async () => {
		if (isTableStatefulHandle(kolTableStatefulRef.current)) {
			const selection = await kolTableStatefulRef.current.getSelection();
			setSelectedValue(selection as Data | null);
		}
	};

	useEffect(() => {
		if (isTableStatefulHandle(kolTableStatefulRef.current)) {
			kolTableStatefulRef.current.addEventListener(selectionChangeEvent, handleSelectionChangeEvent as EventListener);
		}

		return () => {
			if (isTableStatefulHandle(kolTableStatefulRef.current)) {
				kolTableStatefulRef.current.removeEventListener(selectionChangeEvent, handleSelectionChangeEvent as EventListener);
			}
		};
	}, [kolTableStatefulRef]);

	const renderButton = (element: HTMLElement, cell: KoliBriTableCell) => {
		const id = (cell as { data?: { id?: unknown } }).data?.id;
		getRoot(createReactRenderElement(element)).render(<KolButtonWrapper label={`Click ${String(id)}`} />);
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTableStateful with radio buttons for selection enabled.</p>
			</SampleDescription>

			<section className="w-full">
				<KolTableStateful
					_label="Table with selection radio"
					_minWidth="auto"
					_headers={{
						horizontal: [
							[
								{ key: 'id', label: '#ID', textAlign: 'left' },
								{ key: 'name', label: 'Name', textAlign: 'left' },
								{ key: 'action', label: 'Action', textAlign: 'left', render: renderButton },
							],
						],
					}}
					_data={DATA}
					_selection={selection}
					_on={{ onSelectionChange: handleSelectionChangeCallback }}
					className="block"
					style={{ maxWidth: '600px' }}
					ref={(element) => (kolTableStatefulRef.current = element)}
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
