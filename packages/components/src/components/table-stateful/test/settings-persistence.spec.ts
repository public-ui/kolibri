import type { KoliBriTableHeaders, TableHeaderCells } from '../../../schema';
import { KolTableStateful } from '../shadow';

/**
 * Regression tests for #10344: KolTableStateful must remember column settings (visibility, width,
 * order) applied via the settings menu and reapply them on every render instead of resetting to the
 * original `_headers` on sorting, pagination, selection or data updates.
 */
type SortDataEntry = { label: string; key: string; compareFn: () => number; direction: string };
type Internal = {
	state: { _headers: KoliBriTableHeaders };
	sortData: SortDataEntry[];
	adjustedHeaderCells?: TableHeaderCells;
	buildHeaderCells: () => TableHeaderCells;
	handleChangeHeaderCells: (headerCells: TableHeaderCells) => void;
};

const HEADERS: KoliBriTableHeaders = {
	horizontal: [
		[
			{ key: 'a', label: 'A', visible: true, width: 100 },
			{ key: 'b', label: 'B', visible: true, width: 100 },
		],
	],
};

describe('KolTableStateful settings persistence (#10344)', () => {
	it('uses the original headers when no settings were applied', () => {
		const table = new KolTableStateful() as unknown as Internal;
		table.state._headers = HEADERS;

		const result = table.buildHeaderCells();

		expect(result.horizontal?.[0].map((cell) => cell.key)).toEqual(['a', 'b']);
	});

	it('persists adjusted header cells (reorder, hide, resize) across rebuilds', () => {
		const table = new KolTableStateful() as unknown as Internal;
		table.state._headers = HEADERS;

		// Simulate a settings-menu change: reorder (b before a), hide column a, resize column b.
		table.handleChangeHeaderCells({
			horizontal: [
				[
					{ key: 'b', label: 'B', visible: true, width: 250 },
					{ key: 'a', label: 'A', visible: false, width: 100 },
				],
			],
		});

		const result = table.buildHeaderCells();

		expect(result.horizontal?.[0].map((cell) => cell.key)).toEqual(['b', 'a']);
		expect(result.horizontal?.[0][0].width).toBe(250);
		expect(result.horizontal?.[0][1].visible).toBe(false);
	});

	it('overlays the current sort state on the persisted header cells', () => {
		const table = new KolTableStateful() as unknown as Internal;
		const compareFn = () => 0;
		table.state._headers = { horizontal: [[{ key: 'a', label: 'A', compareFn }]] } as unknown as KoliBriTableHeaders;

		table.handleChangeHeaderCells({ horizontal: [[{ key: 'a', label: 'A', width: 300, compareFn }]] } as unknown as TableHeaderCells);
		table.sortData = [{ label: 'A', key: 'a', compareFn, direction: 'DESC' }];

		const result = table.buildHeaderCells();

		expect(result.horizontal?.[0][0].width).toBe(300);
		expect(result.horizontal?.[0][0].sortDirection).toBe('DESC');
	});
});
