import { describe, expect, it } from '@jest/globals';
import { newSpecPage } from '@stencil/core/testing';

import { KolTableStateless } from './component';

type CellRenderAccess = {
	cellRenderTimeouts: Map<HTMLElement, ReturnType<typeof setTimeout>>;
	teardownTable(): void;
};

const flushTimers = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 0));

describe('kol-table-stateless deferred cell rendering', () => {
	it('drops the timer of a cell once its render function has run', async () => {
		const page = await newSpecPage({
			components: [KolTableStateless],
			html: `<kol-table-stateless _label="Table" _data='[{"id":"1001"}]'></kol-table-stateless>`,
		});
		const table = page.root as HTMLKolTableStatelessElement;
		table._headers = { horizontal: [[{ key: 'id', label: 'ID', render: () => 'rendered' }]], vertical: [] };
		await page.waitForChanges();
		await flushTimers();

		const access = page.rootInstance as unknown as CellRenderAccess;
		expect(page.root?.shadowRoot?.textContent).toContain('rendered');
		expect(access.cellRenderTimeouts.size).toBe(0);
	});

	it('clears pending timers when the table is torn down', async () => {
		const page = await newSpecPage({
			components: [KolTableStateless],
			html: `<kol-table-stateless _label="Table" _data='[{"id":"1001"}]'></kol-table-stateless>`,
		});
		const table = page.root as HTMLKolTableStatelessElement;
		table._headers = { horizontal: [[{ key: 'id', label: 'ID', render: () => 'rendered' }]], vertical: [] };
		await page.waitForChanges();

		const access = page.rootInstance as unknown as CellRenderAccess;
		access.teardownTable();

		expect(access.cellRenderTimeouts.size).toBe(0);
	});
});
