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
				_hasSettingsMenu
				_headers={{
					horizontal: [
						[
							{ key: 'columnC', visible: true, label: 'Column C', width: 450 },
							{ key: 'columnB', visible: true, label: 'Column B', width: 200 },
							{ key: 'columnA', visible: false, label: 'Column A', width: 160 },
						],
					],
				}}
				_data={DATA}
				className="block"
				style={{ maxWidth: '600px' }}
			/>
		</>
	);
};
