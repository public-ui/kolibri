import type { PaginationInput } from './item';
import { createPaginationItem } from './item';

type Reported = string[];

/** Creates an item whose `_on` callbacks and events are logged. */
const setup = () => {
	const reported: Reported = [];
	const target = document.createElement('div');
	['click', 'changepage', 'changepagesize'].forEach((type) =>
		target.addEventListener(type, (event) => reported.push(`ev:${type}:${JSON.stringify((event as CustomEvent).detail)}`)),
	);
	const requestRender = jest.fn();
	const item = createPaginationItem({ getEventTarget: () => target, requestRender });
	const on = {
		onClick: (_event: Event, page: number) => reported.push(`cb:onClick:${page}`),
		onChangePage: (event: Event, page: number) => reported.push(`cb:onChangePage:${page}:${event.type}`),
		onChangePageSize: (event: Event, pageSize: number) => reported.push(`cb:onChangePageSize:${pageSize}:${event.type}`),
	};
	return { item, on, reported, requestRender };
};

const flush = () => new Promise((resolve) => setTimeout(resolve));

describe('createPaginationItem', () => {
	it('reports a page beyond the last page twice on load, because the page is applied again last', async () => {
		const { item, on, reported } = setup();
		item.load({ max: 10, on, page: 20 });
		await flush();
		expect(item.getFcProps().page).toBe(10);
		expect(reported).toEqual(['cb:onChangePage:10:StateChange', 'ev:changepage:10', 'cb:onChangePage:10:StateChange', 'ev:changepage:10']);
	});

	it('applies only the inputs that differ from the last passed ones', async () => {
		const { item, on, reported } = setup();
		const input: PaginationInput = { max: 30, on, page: 2, pageSize: 10, pageSizeOptions: [10, 20] };
		item.load(input);
		await flush();
		reported.length = 0;

		item.update(input);
		await flush();
		expect(reported).toEqual([]);

		item.update({ ...input, page: 9 });
		await flush();
		expect(item.getFcProps().page).toBe(3);
		expect(reported).toEqual(['cb:onChangePage:3:StateChange', 'ev:changepage:3']);
	});

	it('applies changed inputs in the attribute order, so the page is clamped before the page size changes', async () => {
		const { item, on, reported } = setup();
		item.load({ max: 7, on, page: 1, pageSize: 20, pageSizeOptions: [5, 20] });
		await flush();
		reported.length = 0;

		item.update({ max: 7, on, page: 9, pageSize: 5, pageSizeOptions: [5, 20] });
		await flush();
		expect(item.getFcProps()).toMatchObject({ page: 1, pageSize: 5 });
		expect(reported).toEqual(['cb:onChangePage:1:StateChange', 'ev:changepage:1']);
	});

	it('takes a page size chosen in the select, renders and keeps it while the old page size is passed again', async () => {
		const { item, on, reported, requestRender } = setup();
		const input: PaginationInput = { max: 40, on, page: 4, pageSize: 10, pageSizeOptions: [10, 20] };
		item.load(input);
		await flush();
		reported.length = 0;

		item.getFcProps().handlePageSizeChange(new Event('change'), '20');
		expect(requestRender).toHaveBeenCalledTimes(1);
		item.update(input);
		await flush();
		expect(item.getFcProps()).toMatchObject({ page: 2, pageSize: 20 });
		expect(reported).toEqual(['cb:onChangePage:2:StateChange', 'ev:changepage:2', 'cb:onChangePageSize:20:change', 'ev:changepagesize:20']);

		item.update({ ...input, pageSize: 20 });
		await flush();
		expect(item.getFcProps().pageSize).toBe(20);
	});

	it('reports a page click through the callback and the click event, then asynchronously as page change', async () => {
		const { item, on, reported } = setup();
		item.load({ max: 30, on, page: 1, pageSize: 10 });
		await flush();
		reported.length = 0;

		const event = new Event('click');
		item.getFcProps().handlePageClick(event, 3);
		expect(reported).toEqual(['cb:onClick:3', 'ev:click:3']);
		await flush();
		expect(reported).toEqual(['cb:onClick:3', 'ev:click:3', 'cb:onChangePage:3:click', 'ev:changepage:3']);
	});

	it('reads the targets of the navigation buttons when they are clicked', async () => {
		const { item, on, reported } = setup();
		item.load({ max: 30, on, page: 2, pageSize: 10 });
		await flush();
		const { navigationCallbacks } = item.getFcProps();
		item.applyPage(3);
		reported.length = 0;

		navigationCallbacks.previous.onClick(new Event('click'));
		navigationCallbacks.last.onClick(new Event('click'));
		expect(reported).toEqual(['cb:onClick:2', 'ev:click:2', 'cb:onClick:3', 'ev:click:3']);
		expect(item.getFcProps().navigationCallbacks).toBe(navigationCallbacks);
	});
});
