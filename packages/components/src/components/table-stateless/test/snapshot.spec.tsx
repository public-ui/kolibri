import { KolTableStatelessWcTag } from '../../../core/component-names';
import type { TableStatelessProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolTableStatelessWc } from '../component';

executeSnapshotTests<TableStatelessProps>(
	KolTableStatelessWcTag,
	[KolTableStatelessWc],
	[
		{
			_label: 'Table with horizontal and vertical headers',
			_hasSettingsMenu: true,
			_headerCells: {
				horizontal: [
					[
						{ key: 'header1', label: 'Header1', textAlign: 'left', width: 140 },
						{ key: 'header2', label: 'Header2', textAlign: 'center', width: 130 },
						{ key: 'header3', label: 'Header3', textAlign: 'right', width: 120 },
					],
				],
				vertical: [
					[
						{ key: 'row1', label: 'Row 1', textAlign: 'left', width: 80 },
						{ key: 'row2', label: 'Row 2', textAlign: 'center', width: 80 },
						{ key: 'row3', label: 'Row 3', textAlign: 'right', width: 80 },
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
						{ key: 'header1', label: 'Header 1', textAlign: 'left', width: 150 },
						{ key: 'header2', label: 'Header 2', textAlign: 'center', width: 180 },
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
						{ key: 'header1', label: 'Sub Header 1', textAlign: 'left', width: 120 },
						{ key: 'header2', label: 'Sub Header 2', textAlign: 'center', width: 190 },
					],
				],
				vertical: [
					[
						{ key: 'row-1', label: 'Row 1', textAlign: 'left', width: 90 },
						{ key: 'row-2', label: 'Row 2', textAlign: 'center', width: 90 },
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
						{ key: 'header1', label: 'Sub H-Header 1', width: 130 },
						{ key: 'header2', label: 'Sub H-Header 2', width: 130 },
					],
				],
				vertical: [
					[{ label: 'V-Header', rowSpan: 2 }],
					[
						{ label: 'Sub V-Header 1', width: 100 },
						{ label: 'Sub V-Header 2', width: 100 },
					],
				],
			},
			_data: [
				{ header1: 'Cell 1.1', header2: 'Cell 1.2' },
				{ header1: 'Cell 2.1', header2: 'Cell 2.2' },
			],
		},
		{
			_label: 'Table with merged parent column width only',
			_headerCells: {
				horizontal: [
					[{ label: 'Personal Info', colSpan: 2, width: 300 }],
					[
						{ key: 'firstName', label: 'First Name' },
						{ key: 'lastName', label: 'Last Name' },
					],
				],
				vertical: [],
			},
			_data: [
				{ firstName: 'John', lastName: 'Doe' },
				{ firstName: 'Jane', lastName: 'Smith' },
			],
		},
		{
			_label: 'Table without data shows empty hint',
			_headerCells: {
				horizontal: [[{ key: 'header1', label: 'Header 1', textAlign: 'left', width: 180 }]],
				vertical: [],
			},
			_data: [],
		},
		{
			_label: 'Table without data with hidden column shows correct colspan',
			_headerCells: {
				horizontal: [
					[
						{ key: 'header1', label: 'Header 1', textAlign: 'left', width: 180 },
						{ key: 'header2', label: 'Header 2', textAlign: 'left', width: 180, visible: false },
					],
				],
				vertical: [],
			},
			_data: [],
		},
		{
			_label: 'Table without data with merged header shows spacer colspan greater than 1',
			_headerCells: {
				horizontal: [[{ label: 'Merged Header', colSpan: 2 }]],
				vertical: [],
			},
			_data: [],
		},
	],
);
