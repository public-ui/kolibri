import React, { FC } from 'react';

import { KolTable } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const TableColumnAlignment: FC = () => (
	<>
		<SampleDescription>Table with columns headers and data in different text alignments.</SampleDescription>
		<KolTable
			_label="Table with different text align properties"
			_headers={{
				horizontal: [
					[
						{ label: 'left', key: 'left', textAlign: 'left' },
						{ label: 'center', key: 'center', textAlign: 'center' },
						{ label: 'right', key: 'right', textAlign: 'right' },
					],
				],
			}}
			_data={[{ left: 'Left Example', center: 'Center Example', right: 'Right Example' }]}
			className="block"
		/>
	</>
);
