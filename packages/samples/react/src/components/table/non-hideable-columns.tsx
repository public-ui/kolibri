import { SampleDescription } from '../SampleDescription';
import { KolTableStateful } from '@public-ui/react';
import type { FC } from 'react';
import React from 'react';

const DATA = [
	{ id: '1001', name: 'John', age: 30 },
	{ id: '1002', name: 'Jane', age: 25 },
];

export const TableNonHideableColumns: FC = () => (
	<>
		<SampleDescription>
			<p>This example demonstrates a column that cannot be hidden in the settings.</p>
		</SampleDescription>

		<KolTableStateful
			_label="Table with a non-hideable column"
			_minWidth="auto"
			_headers={{
				horizontal: [
					[
						{ key: 'id', label: 'ID', hideable: false },
						{ key: 'name', label: 'Name' },
						{ key: 'age', label: 'Age' },
					],
				],
			}}
			_data={DATA}
			className="block"
			style={{ maxWidth: '600px' }}
		/>
	</>
);
