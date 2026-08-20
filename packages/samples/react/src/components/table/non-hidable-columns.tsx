import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

const DATA = [
	{ id: '1001', name: 'John', age: 30 },
	{ id: '1002', name: 'Jane', age: 25 },
];

export const TableNonHidableColumns: FC = () => (
	<>
		<SampleDescription>
			<p>This example demonstrates a column that cannot be hidden in the settings.</p>
		</SampleDescription>

		<SampleBlock id="non-hidable">
			<KolTableStateful
				_label="Table with a non-hidable column"
				_hasSettingsMenu
				_headers={{
					horizontal: [
						[
							{ key: 'id', label: 'ID', hidable: false, width: 160 },
							{ key: 'name', label: 'Name', width: 160 },
							{ key: 'age', label: 'Age', width: 160 },
						],
					],
				}}
				_data={DATA}
				className="block"
				style={{ maxWidth: '600px' }}
			/>
		</SampleBlock>
	</>
);
