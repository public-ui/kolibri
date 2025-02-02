import { KolTableStatelessWcTag } from '../../../core/component-names';
import type { TableStatelessProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolTableStateless } from '../component';

executeSnapshotTests<TableStatelessProps>(
	KolTableStatelessWcTag,
	[KolTableStateless],
	[
		{
			_label: 'Table with horizontal and vertical headers',
			_headerCells: {
				horizontal: [
					[
						{ key: 'header1', label: 'Header1', textAlign: 'left', width: 'auto' },
						{ key: 'header2', label: 'Header2', textAlign: 'center', width: 'auto' },
						{ key: 'header3', label: 'Header3', textAlign: 'right', width: 'auto' },
					],
				],
				vertical: [
					[
						{ key: 'row1', label: 'Row 1', textAlign: 'left', width: 'auto' },
						{ key: 'row2', label: 'Row 2', textAlign: 'center', width: 'auto' },
						{ key: 'row3', label: 'Row 3', textAlign: 'right', width: 'auto' },
					],
				],
			},
			_data: [
				{ header1: 'Cell 1.1', header2: 'Cell 1.2', header3: 'Cell 1.3', width: 'auto' },
				{ header1: 'Cell 2.1', header2: 'Cell 2.2', header3: 'Cell 2.3', width: 'auto' },
				{ header1: 'Cell 3.1', header2: 'Cell 3.2', header3: 'Cell 3.3', width: 'auto' },
			],
		},
		{
			_label: 'Table with only horizontal headers',
			_headerCells: {
				horizontal: [
					[
						{ key: 'header1', label: 'Header 1', textAlign: 'left', width: 'auto' },
						{ key: 'header2', label: 'Header 2', textAlign: 'center', width: 'auto' },
					],
				],
				vertical: [],
			},
			_data: [
				{ header1: 'Cell 1.1', header2: 'Cell 1.2', width: 'auto' },
				{ header1: 'Cell 2.1', header2: 'Cell 2.2', width: 'auto' },
			],
		},
		{
			_label: 'Table with two horizontal header rows',
			_headerCells: {
				horizontal: [
					[
						{ label: 'Header 1', textAlign: 'left', width: 'auto' },
						{ label: 'Header 2', textAlign: 'center', width: 'auto' },
					],
					[
						{ key: 'header1', label: 'Sub Header 1', textAlign: 'left', width: 'auto' },
						{ key: 'header2', label: 'Sub Header 2', textAlign: 'center', width: 'auto' },
					],
				],
				vertical: [
					[
						{ key: 'row-1', label: 'Row 1', textAlign: 'left', width: 'auto' },
						{ key: 'row-2', label: 'Row 2', textAlign: 'center', width: 'auto' },
					],
				],
			},
			_data: [
				{ header1: 'Cell 1.1', header2: 'Cell 1.2', width: 'auto' },
				{ header1: 'Cell 2.1', header2: 'Cell 2.2', width: 'auto' },
			],
		},
		{
			_label: 'Table with two spanned horizontal and vertical headers',
			_headerCells: {
				horizontal: [
					[{ label: 'H-Header', colSpan: 2, width: 'auto' }],
					[
						{ key: 'header1', label: 'Sub H-Header 1', width: 'auto' },
						{ key: 'header2', label: 'Sub H-Header 2', width: 'auto' },
					],
				],
				vertical: [
					[{ label: 'V-Header', rowSpan: 2, width: 'auto' }],
					[
						{ label: 'Sub V-Header 1', width: 'auto' },
						{ label: 'Sub V-Header 2', width: 'auto' },
					],
				],
			},
			_data: [
				{ header1: 'Cell 1.1', header2: 'Cell 1.2', width: 'auto' },
				{ header1: 'Cell 2.1', header2: 'Cell 2.2', width: 'auto' },
			],
		},
	],
);
