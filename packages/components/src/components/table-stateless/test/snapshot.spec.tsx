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
						{ key: 'header1', label: 'Header1', textAlign: 'left' },
						{ key: 'header2', label: 'Header2', textAlign: 'center' },
						{ key: 'header3', label: 'Header3', textAlign: 'right' },
					],
				],
				vertical: [
					[
						{ key: 'row1', label: 'Row 1', textAlign: 'left' },
						{ key: 'row2', label: 'Row 2', textAlign: 'center' },
						{ key: 'row3', label: 'Row 3', textAlign: 'right' },
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
			_headerCells: {
				horizontal: [
					[
						{ key: 'header1', label: 'Header 1', textAlign: 'left' },
						{ key: 'header2', label: 'Header 2', textAlign: 'center' },
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
			_headerCells: {
				horizontal: [
					[
						{ label: 'Header 1', textAlign: 'left' },
						{ label: 'Header 2', textAlign: 'center' },
					],
					[
						{ key: 'header1', label: 'Sub Header 1', textAlign: 'left' },
						{ key: 'header2', label: 'Sub Header 2', textAlign: 'center' },
					],
				],
				vertical: [
					[
						{ key: 'row-1', label: 'Row 1', textAlign: 'left' },
						{ key: 'row-2', label: 'Row 2', textAlign: 'center' },
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
			_headerCells: {
				horizontal: [
					[{ label: 'H-Header', colSpan: 2 }],
					[
						{ key: 'header1', label: 'Sub H-Header 1' },
						{ key: 'header2', label: 'Sub H-Header 2' },
					],
				],
				vertical: [[{ label: 'V-Header', rowSpan: 2 }], [{ label: 'Sub V-Header 1' }, { label: 'Sub V-Header 2' }]],
			},
			_data: [
				{ header1: 'Cell 1.1', header2: 'Cell 1.2' },
				{ header1: 'Cell 2.1', header2: 'Cell 2.2' },
			],
		},
	],
);
