import { SampleDescription } from '../SampleDescription';
import { KolTableStateful } from '@public-ui/react';
import type { FC } from 'react';
import React from 'react';

const DATA = [{ columnA: 'Column A', columnB: 'Column B', columnC: 'Column C' }];

export const PredefinedSettings: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>This example shows the table with predefined settings.</p>
			</SampleDescription>

			<KolTableStateful
				_label="Table for demonstration purposes with predefined settings"
				_minWidth="auto"
				_headers={{
					horizontal: [
						[
							{ label: 'column A', key: 'columnA', minWidth: 'auto' },
							{ label: 'column B', key: 'columnB', minWidth: 'auto' },
							{ label: 'column C', key: 'columnC', minWidth: 'auto' },
						],
					],
				}}
				_tableSettings={{
					columns: [
						{ key: 'columnA', visible: false, label: 'Column A', position: 2, minWidth: 'auto' },
						{ key: 'columnB', visible: true, label: 'Column B', position: 1, minWidth: 'auto' },
						{ key: 'columnC', visible: true, label: 'Column C', position: 0, minWidth: 'auto' },
					],
				}}
				_data={DATA}
				_min-width="500px"
				className="block"
				style={{ maxWidth: '600px' }}
			/>
		</>
	);
};
