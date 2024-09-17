import type { FC } from 'react';
import React, { useEffect, useState, useRef } from 'react';
import { KolButton, KolTableStateless, createReactRenderElement } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import type { KoliBriTableSelection } from '@public-ui/components';
import { getRoot } from '../../shares/react-roots';

const DATA = [
	{ id: '1001', name: 'Foo Bar', internalIdentifier: `AAA1001` },
	{ id: '1002', name: 'Foo Baz', internalIdentifier: `AAA1002` },
];
type Data = (typeof DATA)[0];

export const TableStatelessWithSingleSelection: FC = () => {
	const [selectedKeys, setSelectedKeys] = useState(['1002']);

	const selection: KoliBriTableSelection = {
		label: (row) => `Selection for ${(row as Data).name}`,
		multiple: false,
		selectedKeys,
		keyPropertyName: 'internalIdentifier',
	};

	const kolTableStatelessRef = useRef<HTMLKolTableStatelessElement>(null);

	const handleSelectionChangeEvent = ({ detail: selection }: { detail: string[] }) => {
		console.log('Selection change via event', selection);
	};
	const handleSelectionChangeCallback = (_event: Event, selection: string[] | string) => {
		console.log('Selection change via callback', selection);
		setSelectedKeys(typeof selection === 'string' ? [selection] : selection);
	};

	useEffect(() => {
		// @ts-expect-error https://github.com/Microsoft/TypeScript/issues/28357
		kolTableStatelessRef.current?.addEventListener('kol-selection-change', handleSelectionChangeEvent);

		return () => {
			// @ts-expect-error https://github.com/Microsoft/TypeScript/issues/28357
			kolTableStatelessRef.current?.removeEventListener('kol-selection-change', handleSelectionChangeEvent);
		};
	}, [kolTableStatelessRef]);

	const renderButton = (element: HTMLElement) => {
		getRoot(createReactRenderElement(element)).render(<KolButton _label={`Button`}></KolButton>);
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolTableStateless with checkboxes for selection enabled.</p>
			</SampleDescription>

			<KolTableStateless
				_label="Table with selection checkboxes"
				_headerCells={{
					horizontal: [
						[
							{ key: 'id', label: '#ID', textAlign: 'left' },
							{ key: 'name', label: 'Name', textAlign: 'left' },
							{ key: 'action', label: 'Action', textAlign: 'left', render: (element) => renderButton(element) },
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
		</>
	);
};
