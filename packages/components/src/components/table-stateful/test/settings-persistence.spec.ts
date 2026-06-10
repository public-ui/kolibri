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
	headerKeysChanged: (previous: KoliBriTableHeaders, next: KoliBriTableHeaders) => boolean;
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

	it('takes logic fields (compareFn) from the original headers and overlays the sort state', () => {
		const table = new KolTableStateful() as unknown as Internal;
		const compareFn = () => 0;
		// Original headers carry the compareFn; the adjusted cells (from the settings menu) do not.
		table.state._headers = { horizontal: [[{ key: 'a', label: 'A', compareFn }]] } as unknown as KoliBriTableHeaders;
		table.handleChangeHeaderCells({ horizontal: [[{ key: 'a', label: 'A', width: 300 }]] });
		table.sortData = [{ label: 'A', key: 'a', compareFn, direction: 'DESC' }];

		const result = table.buildHeaderCells();

		expect(result.horizontal?.[0][0].width).toBe(300);
		// compareFn was recovered from _headers, so the column is still recognised as sortable.
		expect(result.horizontal?.[0][0].sortDirection).toBe('DESC');
	});

	it('only treats a header update as structural when the column keys change', () => {
		const table = new KolTableStateful() as unknown as Internal;

		// Same keys, different labels / new reference -> not structural (settings must survive).
		expect(
			table.headerKeysChanged(HEADERS, {
				horizontal: [
					[
						{ key: 'a', label: 'A2' },
						{ key: 'b', label: 'B2' },
					],
				],
			}),
		).toBe(false);
		// Removed column -> structural.
		expect(table.headerKeysChanged(HEADERS, { horizontal: [[{ key: 'a', label: 'A' }]] })).toBe(true);
		// Reordered keys -> structural.
		expect(
			table.headerKeysChanged(HEADERS, {
				horizontal: [
					[
						{ key: 'b', label: 'B' },
						{ key: 'a', label: 'A' },
					],
				],
			}),
		).toBe(true);
	});
});
