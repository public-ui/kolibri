import React, { FC } from 'react';

import { KolTable } from '@public-ui/react';

const DATA = [{ small: 'Small Example', large: 'Larger Example' }];

export const TableHorizontalScrollbar: FC = () => (
	<>
		<KolTable
			_label="Table for demonstration purposes with horizontal scrollbar"
			_minWidth="600px"
			_headers={{
				horizontal: [
					[
						{ label: 'Large Column', key: 'large', textAlign: 'left', width: '400px' },
						{ label: 'Small Column', key: 'small', textAlign: 'left', width: '200px' },
					],
				],
			}}
			_data={DATA}
			className="block"
			style={{ width: '400px' }}
		/>
	</>
);
