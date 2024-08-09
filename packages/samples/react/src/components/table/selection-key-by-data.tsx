import type { FC } from 'react';
import React, { useEffect, useState, useRef } from 'react';
import { KolTableStateless } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import type { KoliBriTableSelection } from '@public-ui/components';

const DATA = [
	{ a: 'bar', name: 'Foo Bar', value: 1001, keyPropertyName: 'a' },
	{ b: 'baz', name: 'Foo Baz', value: 1002, keyPropertyName: 'b' },
	{ a: 'boa', name: 'Foo Boa', value: 1003, keyPropertyName: 'a' },
];
type Data = (typeof DATA)[0];

export const TableSelectionKeyByData: FC = () => {
	const [selectedKeys, setSelectedKeys] = useState(['bar']);

	const selection: KoliBriTableSelection = {
		label: (row) => `Selection for ${(row as Data).name}`,
		selectedKeys,
	};

	const kolTableStatelessRef = useRef<HTMLKolTableStatelessElement>(null);

	const handleSelectionChangeEvent = ({ detail: selection }: { detail: string[] }) => {
		console.log('Selection change via event', selection);
		setSelectedKeys(selection);
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
							{ key: 'name', label: 'Name', textAlign: 'left' },
							{ key: 'value', label: 'Value', textAlign: 'left' },
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
