import type { FC } from 'react';
import React from 'react';
import { KolTableStateless } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

const DATA = [{ left: 'Left Example', center: 'Center Example', right: 'Right Example' }, {}, {}, {}];

export const TableStateless: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows how KolTableStateless can be used directly, with the KolTableStateful wrapper.</p>
		</SampleDescription>

		<section className="w-full">
			<KolTableStateless
				_label="Table for demonstration purposes"
				_minWidth="auto"
				_headerCells={{
					horizontal: [
						[
							{ key: 'left', label: 'left', textAlign: 'left', sortDirection: 'ASC', minWidth: 'auto' },
							{ key: 'center', label: 'center', textAlign: 'center', sortDirection: 'DESC', minWidth: 'auto' },
							{ key: 'right', label: 'right', textAlign: 'right', sortDirection: 'NOS', minWidth: 'auto' },
							{ key: 'nosort', label: 'no sort option', minWidth: 'auto' },
						],
					],
					vertical: [
						[
							{ key: 'vertical-left', label: 'left', textAlign: 'left', sortDirection: 'ASC', minWidth: 'auto' },
							{ key: 'vertical-center', label: 'center', textAlign: 'center', sortDirection: 'DESC', minWidth: 'auto' },
							{ key: 'vertical-right', label: 'right', textAlign: 'right', sortDirection: 'NOS', minWidth: 'auto' },
							{ key: 'vertical-nosort', label: 'no sort option', minWidth: 'auto' },
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
