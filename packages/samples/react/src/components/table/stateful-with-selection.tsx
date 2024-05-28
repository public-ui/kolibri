import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import { KolTableStateful } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import type { KoliBriTableSelection } from '@public-ui/components';

const DATA = [
	{ id: '1001', name: 'Foo Bar' },
	{ id: '1002', name: 'Foo Baz' },
];
type Data = (typeof DATA)[0];

export const TableStatefulWithSelection: FC = () => {
	const selection: KoliBriTableSelection = {
		label: (row: Data) => `Selection for ${row.name}`,
		selectedKeys: ['1002'],
		keyPropertyName: 'id',
	};

	const kolTableStatefulRef = useRef<HTMLKolTableStatefulElement>();

	const handleSelectionChangeEvent = ({ detail: selection }) => {
		console.log('Selection change via event', selection);
	};
	const handleSelectionChangeCallback = (_event, selection) => {
		console.log('Selection change via callback', selection);
	};

	useEffect(() => {
		kolTableStatefulRef.current?.addEventListener('kol-selection-change', handleSelectionChangeEvent);

		return () => {
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
		</>
	);
};
