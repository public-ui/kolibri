import type { FC } from 'react';
import React from 'react';

import { KolHeading, KolTableStateful } from '@public-ui/react-v19';

import { SampleDescription } from '../SampleDescription';

const DATA = [{ left: 'Left Example', center: 'Center Example', right: 'Right Example' }];
const genericNonSorter = () => 0;

export const TableColumnAlignment: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows KolTableStateful with columns headers and data in different text alignments.</p>
		</SampleDescription>

		<section className="w-full flex flex-col">
			<KolHeading _label="Simple table" _level={3}></KolHeading>
			<KolTableStateful
				_label="Table for demonstration purposes with different text align properties"
				_headers={{
					horizontal: [
						[
							{ label: 'left', key: 'left', textAlign: 'left', width: 160 },
							{ label: 'center', key: 'center', textAlign: 'center', width: 160 },
							{ label: 'right', key: 'right', textAlign: 'right', width: 160 },
						],
					],
				}}
				_data={DATA}
				className="block"
				style={{ maxWidth: '600px' }}
			/>

			<KolHeading _label="Table with sortable columns" _level={3} className="block mt-6"></KolHeading>
			<KolTableStateful
				_label="Table for demonstration purposes with sortable columns"
				_headers={{
					horizontal: [
						[
							{ label: 'left', key: 'left', textAlign: 'left', compareFn: genericNonSorter, width: 160 },
							{ label: 'center', key: 'center', textAlign: 'center', compareFn: genericNonSorter, width: 160 },
							{ label: 'right', key: 'right', textAlign: 'right', compareFn: genericNonSorter, width: 160 },
						],
					],
				}}
				_data={DATA}
				className="block"
				style={{ maxWidth: '600px' }}
			/>

			<KolHeading _label="Table some sortable columns" _level={3} className="block mt-6"></KolHeading>
			<KolTableStateful
				_label="Table for demonstration purposes with some but not all columns sortable"
				_headers={{
					horizontal: [
						[
							{ label: 'left', key: 'left', textAlign: 'left', compareFn: genericNonSorter, width: 160 },
							{ label: 'center', key: 'center', textAlign: 'center', compareFn: genericNonSorter, width: 160 },
							{ label: 'right', key: 'right', textAlign: 'right', width: 160 },
						],
					],
				}}
				_data={DATA}
				className="block"
				style={{ maxWidth: '600px' }}
			/>

			<KolHeading _label="Table with vertical heading" _level={3} className="block mt-6"></KolHeading>
			<KolTableStateful
				_label="Table for demonstration purposes with vertical heading"
				_headers={{
					horizontal: [
						[
							{ label: 'left', key: 'left', textAlign: 'left', width: 160 },
							{ label: 'center', key: 'center', textAlign: 'center', width: 160 },
							{ label: 'right', key: 'right', textAlign: 'right', width: 160 },
						],
					],
					vertical: [[{ label: 'Vertical', width: 160 }]],
				}}
				_data={DATA}
				className="block"
				style={{ maxWidth: '600px' }}
			/>
		</section>
	</>
);
