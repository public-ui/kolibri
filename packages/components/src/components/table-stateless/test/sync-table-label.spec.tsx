import { describe, expect, it } from '@jest/globals';
import { newSpecPage } from '@stencil/core/testing';

import { KolTableStateless } from '../component';

type TableElementWithReflection = {
	ariaLabelledByElements: HTMLElement[] | null;
	attributes: Record<string, string>;
	setAttribute(name: string, value: string): void;
};

const createTableStub = (): TableElementWithReflection => {
	const stub: TableElementWithReflection = {
		ariaLabelledByElements: null,
		attributes: {},
		setAttribute(name: string, value: string): void {
			stub.attributes[name] = value;
		},
	};
	return stub;
};

type SyncTableLabelAccess = {
	tableElement?: unknown;
	syncTableLabel(elements?: HTMLElement[]): void;
};

const renderTable = async (): Promise<SyncTableLabelAccess> => {
	const page = await newSpecPage({
		components: [KolTableStateless],
		html: `<kol-table-stateless _label="Table" _headers='{"horizontal":[[{"key":"id","label":"ID"}]],"vertical":[]}' _data='[{"id":"1001"}]'></kol-table-stateless>`,
	});
	return page.rootInstance as unknown as SyncTableLabelAccess;
};

describe('kol-table-stateless syncTableLabel', () => {
	it('assigns the external label elements to the table', async () => {
		const access = await renderTable();
		const table = createTableStub();
		access.tableElement = table;
		const heading = document.createElement('h2');

		access.syncTableLabel([heading]);

		expect(table.ariaLabelledByElements).toEqual([heading]);
	});

	it('releases the references when the external label list empties', async () => {
		const access = await renderTable();
		const table = createTableStub();
		access.tableElement = table;
		access.syncTableLabel([document.createElement('h2')]);

		access.syncTableLabel([]);

		expect(table.ariaLabelledByElements).toBeNull();
		expect(table.attributes['aria-labelledby']).toBe('caption');
	});

	it('releases the references without an external label list', async () => {
		const access = await renderTable();
		const table = createTableStub();
		access.tableElement = table;
		access.syncTableLabel([document.createElement('h2')]);

		access.syncTableLabel(undefined);

		expect(table.ariaLabelledByElements).toBeNull();
		expect(table.attributes['aria-labelledby']).toBe('caption');
	});

	it('leaves a table element without explicit references untouched', async () => {
		const access = await renderTable();
		const table = createTableStub();
		access.tableElement = table;

		access.syncTableLabel([]);

		expect(table.ariaLabelledByElements).toBeNull();
		expect(table.attributes['aria-labelledby']).toBeUndefined();
	});

	it('does nothing without a table element', async () => {
		const access = await renderTable();
		access.tableElement = undefined;

		expect(() => access.syncTableLabel([document.createElement('h2')])).not.toThrow();
	});

	it('does nothing when the table element lacks element reflection', async () => {
		const access = await renderTable();
		const table: Record<string, unknown> = {};
		access.tableElement = table;

		access.syncTableLabel([document.createElement('h2')]);

		expect('ariaLabelledByElements' in table).toBe(false);
	});
});
