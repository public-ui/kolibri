import type { FC } from 'react';
import React from 'react';
import { KolTableStateless } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

const DATA = [{ left: 'Left Example', center: 'Center Example', right: 'Right Example' }];

export const TableStateless: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows how KolTableStateless can be used directly, with the KolTableStateful wrapper.</p>
		</SampleDescription>

		<section className="w-full">
			<KolTableStateless
				_label="Table for demonstration purposes"
				_headerCells={{
					horizontal: [
						[
							{ key: 'left', label: 'left', textAlign: 'left', sortDirection: 'ASC' },
							{ key: 'center', label: 'center', textAlign: 'center', sortDirection: 'DESC' },
							{ key: 'right', label: 'right', textAlign: 'right', sortDirection: 'NOS' },
							{ key: 'nosort', label: 'no sort option' },
						],
					],
					vertical: [
						[
							{ key: 'vertical-left', label: 'left', textAlign: 'left', sortDirection: 'ASC' },
							{ key: 'vertical-center', label: 'center', textAlign: 'center', sortDirection: 'DESC' },
							{ key: 'vertical-right', label: 'right', textAlign: 'right', sortDirection: 'NOS' },
							{ key: 'vertical-nosort', label: 'no sort option' },
						],
					],
				}}
				_data={DATA}
				className="block"
				style={{ maxWidth: '600px' }}
				_on={{
					onSort: (_event, payload) => {
						console.log(payload);
					},
				}}
			/>
		</section>
	</>
);
