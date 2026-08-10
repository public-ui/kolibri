import type { KoliBriTableCell, KoliBriTableSelection, KoliBriTableSelectionKeys } from '@public-ui/components';
import { createReactRenderElement, KolButton, KolTableStateless } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { getRoot } from '../../shares/react-roots';
import { SampleDescription } from '../SampleDescription';

type SelectionValue = string | number;
type KolTableStatelessElement = {
	addEventListener: (type: string, listener: (event: CustomEvent<SelectionValue[]>) => void) => void;
	removeEventListener: (type: string, listener: (event: CustomEvent<SelectionValue[]>) => void) => void;
};

const DATA = [
	{ id: '1001', name: 'Foo Bar', internalIdentifier: `AAA1001` },
	{ id: '1002', name: 'Foo Baz', internalIdentifier: `AAA1002` },
	{ id: '1003', name: 'Foo Disabled', internalIdentifier: `AAA1003` },
];
type Data = (typeof DATA)[0];

function KolButtonWrapper({ label }: { label: string }) {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return <KolButton _label={label} _on={dummyEventHandler} />;
}

export const TableStatelessWithSingleSelection: FC = () => {
	const [selectedKeys, setSelectedKeys] = useState<KoliBriTableSelectionKeys>(['1002']);

	const selection: KoliBriTableSelection = {
		label: (row) => `Selection for ${(row as Data).name}`,
		multiple: false,
		selectedKeys,
		disabledKeys: ['AAA1003'],
		keyPropertyName: 'internalIdentifier',
	};

	const kolTableStatelessRef = useRef<HTMLKolTableStatelessElement>(null);

	const handleSelectionChangeEvent = useCallback(({ detail: selection }: CustomEvent<SelectionValue[]>) => {
		console.log('Selection change via event', selection);
	}, []);
	const handleSelectionChangeCallback = useCallback((_event: Event, selection: SelectionValue[]) => {
		console.log('Selection change via callback', selection);
		setSelectedKeys(selection);
	}, []);

	useEffect(() => {
		const tableElement = kolTableStatelessRef.current as unknown as KolTableStatelessElement | null;
		const selectionChangeEvent = 'kolSelectionChange';
		tableElement?.addEventListener(selectionChangeEvent, handleSelectionChangeEvent);

		return () => {
			tableElement?.removeEventListener(selectionChangeEvent, handleSelectionChangeEvent);
		};
	}, [kolTableStatelessRef, handleSelectionChangeEvent]);

	const renderButton = useCallback((element: HTMLElement, cell: KoliBriTableCell) => {
		const data = (cell as { data?: Data }).data;
		const id = data?.id;
		getRoot(createReactRenderElement(element)).render(<KolButtonWrapper label={`Click ${id}`} />);
	}, []);

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTableStateless with checkboxes for selection enabled.</p>
			</SampleDescription>

			<section className="w-full">
				<KolTableStateless
					_label="Table with selection checkboxes"
					_headerCells={{
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
					ref={kolTableStatelessRef}
				/>
			</section>
		</>
	);
};
