import { SampleDescription } from '../SampleDescription';
import { KolTableStateful } from '@public-ui/react-v19';
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
							// Columns arranged in the desired order with visibility and width settings
							{ label: 'column C', key: 'columnC', visible: true, width: '45ch' },
							{ label: 'column B', key: 'columnB', visible: true, width: '20ch' },
							{ label: 'column A', key: 'columnA', visible: false },
						],
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
