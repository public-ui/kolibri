import { KolTableStatelessWcTag } from '../../../core/component-names';
import type { TableStatelessProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';

import { KolTableStateless } from '../component';

describe('Table Stateless V3 MinWidth Calculation', () => {
	const componentClass = KolTableStateless;
	const component = new componentClass();

	afterEach(() => {
		document.body.innerHTML = '';
	});

	it('should calculate min-width from column minWidth values', () => {
		const headers = {
			horizontal: [
				[
					{ key: 'col1', label: 'Column 1', minWidth: '100px' },
					{ key: 'col2', label: 'Column 2', minWidth: '150px' },
					{ key: 'col3', label: 'Column 3', minWidth: '200px' },
				],
			],
		};

		component.state = {
			_headerCells: headers,
			_data: [{ col1: 'data1', col2: 'data2', col3: 'data3' }],
			_label: 'Test Table',
		};

		// Access private method for testing
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const getTableMinWidth = (component as any).getTableMinWidth.bind(component);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const result = getTableMinWidth();

		expect(result).toBe('450px'); // 100 + 150 + 200 = 450
	});

	it('should handle mixed unit types in minWidth values', () => {
		const headers = {
			horizontal: [
				[
					{ key: 'col1', label: 'Column 1', minWidth: '100px' },
					{ key: 'col2', label: 'Column 2', minWidth: '5em' },
				],
			],
		};

		component.state = {
			_headerCells: headers,
			_data: [{ col1: 'data1', col2: 'data2' }],
			_label: 'Test Table',
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const getTableMinWidth = (component as any).getTableMinWidth.bind(component);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const result = getTableMinWidth();

		expect(result).toBe('105px'); // 100 + 5 = 105
	});

	it('should handle numeric minWidth values', () => {
		const headers = {
			horizontal: [
				[
					{ key: 'col1', label: 'Column 1', minWidth: 120 },
					{ key: 'col2', label: 'Column 2', minWidth: 180 },
				],
			],
		};

		component.state = {
			_headerCells: headers,
			_data: [{ col1: 'data1', col2: 'data2' }],
			_label: 'Test Table',
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const getTableMinWidth = (component as any).getTableMinWidth.bind(component);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const result = getTableMinWidth();

		expect(result).toBe('300px'); // 120 + 180 = 300
	});

	it('should filter out invisible columns from calculation', () => {
		const headers = {
			horizontal: [
				[
					{ key: 'col1', label: 'Column 1', minWidth: '100px' },
					{ key: 'col2', label: 'Column 2', minWidth: '150px' },
					{ key: 'col3', label: 'Column 3', minWidth: '200px' },
				],
			],
		};

		component.state = {
			_headerCells: headers,
			_data: [{ col1: 'data1', col2: 'data2', col3: 'data3' }],
			_label: 'Test Table',
			_tableSettings: {
				columns: [
					{ key: 'col1', label: 'Column 1', position: 0, visible: true },
					{ key: 'col2', label: 'Column 2', position: 1, visible: false }, // Hidden
					{ key: 'col3', label: 'Column 3', position: 2, visible: true },
				],
			},
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const getTableMinWidth = (component as any).getTableMinWidth.bind(component);
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
		const result = getTableMinWidth();

		expect(result).toBe('300px'); // 100 + 200 = 300 (col2 excluded)
	});
});

executeSnapshotTests<TableStatelessProps>(
	KolTableStatelessWcTag,
	[KolTableStateless],
	[
		{
			_label: 'V3 Table with minWidth auto calculation',
			_headerCells: {
				horizontal: [
					[
						{ key: 'name', label: 'Name', minWidth: '150px' },
						{ key: 'age', label: 'Age', minWidth: '80px' },
						{ key: 'email', label: 'Email', minWidth: '200px' },
					],
				],
			},
			_data: [
				{ name: 'John Doe', age: 30, email: 'john@example.com' },
				{ name: 'Jane Smith', age: 25, email: 'jane@example.com' },
			],
		},
	],
);
