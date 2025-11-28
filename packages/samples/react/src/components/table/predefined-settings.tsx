import { KolTableStateful } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

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
				_hasSettingsMenu
				_headers={{
					horizontal: [
						[
							{ label: 'column A', key: 'columnA' },
							{ label: 'column B', key: 'columnB' },
							{ label: 'column C', key: 'columnC' },
						],
					],
				}}
				_tableSettings={{
					columns: [
						{ key: 'columnC', visible: true, label: 'Column C', width: 45 },
						{ key: 'columnB', visible: true, label: 'Column B', width: 20 },
						{ key: 'columnA', visible: false, label: 'Column A' },
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
