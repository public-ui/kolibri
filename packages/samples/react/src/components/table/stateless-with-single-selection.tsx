import type { KoliBriTableCell, KoliBriTableSelection, KoliBriTableSelectionKeys } from '@public-ui/components';
import { KolEvent } from '@public-ui/components';
import { createReactRenderElement, KolButton, KolTableStateless } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { getRoot } from '../../shares/react-roots';
import { SampleDescription } from '../SampleDescription';

type SelectionValue = string | number;

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

	type TableStatelessHandle = HTMLElement & {
		addEventListener: HTMLElement['addEventListener'];
		getSelection: () => Promise<KoliBriTableDataType[] | null>;
		removeEventListener: HTMLElement['removeEventListener'];
	};
	const isTableStatelessHandle = (element: unknown): element is TableStatelessHandle => typeof (element as TableStatelessHandle)?.getSelection === 'function';

	const kolTableStatelessRef = useRef<unknown>(null);
	const selectionChangeEvent = (KolEvent as { selectionChange: string }).selectionChange;

	const handleSelectionChangeEvent = ({ detail: selection }: { detail: string[] }) => {
		console.log('Selection change via event', selection);
	};
	const handleSelectionChangeCallback = (_event: Event, selection: SelectionValue[]) => {
		console.log('Selection change via callback', selection);
		setSelectedKeys(selection);
	};

	useEffect(() => {
		if (isTableStatelessHandle(kolTableStatelessRef.current)) {
			kolTableStatelessRef.current.addEventListener(selectionChangeEvent, handleSelectionChangeEvent as EventListener);
		}

		return () => {
			if (isTableStatelessHandle(kolTableStatelessRef.current)) {
				kolTableStatelessRef.current.removeEventListener(selectionChangeEvent, handleSelectionChangeEvent as EventListener);
			}
		};
	}, [kolTableStatelessRef]);

	const renderButton = (element: HTMLElement, cell: KoliBriTableCell) => {
		const id = (cell as { data?: { id?: unknown } }).data?.id;
		getRoot(createReactRenderElement(element)).render(<KolButtonWrapper label={`Click ${String(id)}`} />);
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTableStateless with checkboxes for selection enabled.</p>
			</SampleDescription>

			<section className="w-full">
				<KolTableStateless
					_label="Table with selection checkboxes"
					_minWidth="auto"
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
					ref={(element) => (kolTableStatelessRef.current = element)}
				/>
			</section>
		</>
	);
};
