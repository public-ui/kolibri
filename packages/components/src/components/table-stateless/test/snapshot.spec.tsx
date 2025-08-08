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
			_minWidth: '400px',
			_headerCells: {
				horizontal: [
					[
						{ key: 'header1', label: 'Header1', minWidth: 'auto', textAlign: 'left' },
						{ key: 'header2', label: 'Header2', minWidth: 'auto', textAlign: 'center' },
						{ key: 'header3', label: 'Header3', minWidth: 'auto', textAlign: 'right' },
					],
				],
				vertical: [
					[
						{ key: 'row1', label: 'Row 1', minWidth: 'auto', textAlign: 'left' },
						{ key: 'row2', label: 'Row 2', minWidth: 'auto', textAlign: 'center' },
						{ key: 'row3', label: 'Row 3', minWidth: 'auto', textAlign: 'right' },
					],
				],
			},
			_data: [
				{ header1: 'Cell 1.1', header2: 'Cell 1.2', header3: 'Cell 1.3' },
				{ header1: 'Cell 2.1', header2: 'Cell 2.2', header3: 'Cell 2.3' },
				{ header1: 'Cell 3.1', header2: 'Cell 3.2', header3: 'Cell 3.3' },
			],
		},
		{
			_label: 'Table with only horizontal headers',
			_minWidth: '400px',
			_headerCells: {
				horizontal: [
					[
						{ key: 'header1', label: 'Header 1', minWidth: 'auto', textAlign: 'left' },
						{ key: 'header2', label: 'Header 2', minWidth: 'auto', textAlign: 'center' },
					],
				],
				vertical: [],
			},
			_data: [
				{ header1: 'Cell 1.1', header2: 'Cell 1.2' },
				{ header1: 'Cell 2.1', header2: 'Cell 2.2' },
			],
		},
		{
			_label: 'Table with two horizontal header rows',
			_minWidth: '400px',
			_headerCells: {
				horizontal: [
					[
						{ label: 'Header 1', minWidth: 'auto', textAlign: 'left' },
						{ label: 'Header 2', minWidth: 'auto', textAlign: 'center' },
					],
					[
						{ key: 'header1', label: 'Sub Header 1', minWidth: 'auto', textAlign: 'left' },
						{ key: 'header2', label: 'Sub Header 2', minWidth: 'auto', textAlign: 'center' },
					],
				],
				vertical: [
					[
						{ key: 'row-1', label: 'Row 1', minWidth: 'auto', textAlign: 'left' },
						{ key: 'row-2', label: 'Row 2', minWidth: 'auto', textAlign: 'center' },
					],
				],
			},
			_data: [
				{ header1: 'Cell 1.1', header2: 'Cell 1.2' },
				{ header1: 'Cell 2.1', header2: 'Cell 2.2' },
			],
		},
		{
			_label: 'Table with two spanned horizontal and vertical headers',
			_minWidth: '400px',
			_headerCells: {
				horizontal: [
					[{ label: 'H-Header', colSpan: 2, minWidth: 'auto' }],
					[
						{ key: 'header1', label: 'Sub H-Header 1', minWidth: 'auto' },
						{ key: 'header2', label: 'Sub H-Header 2', minWidth: 'auto' },
					],
				],
				vertical: [
					[{ label: 'V-Header', rowSpan: 2, minWidth: 'auto' }],
					[
						{ label: 'Sub V-Header 1', minWidth: 'auto' },
						{ label: 'Sub V-Header 2', minWidth: 'auto' },
					],
				],
			},
			_data: [
				{ header1: 'Cell 1.1', header2: 'Cell 1.2' },
				{ header1: 'Cell 2.1', header2: 'Cell 2.2' },
			],
		},
	],
);
