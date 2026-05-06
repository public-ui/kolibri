import { KolDrawer } from '../shadow';

describe('kol-drawer methods', () => {
	it('does not throw in open when dialog showModal is unavailable', async () => {
		const drawer = new KolDrawer();
		(drawer as unknown as { dialogElement: object }).dialogElement = {};

		await expect(drawer.open()).resolves.toBeUndefined();
	});

	it('does not throw in close flow when dialog close is unavailable', async () => {
		const drawer = new KolDrawer();
		(drawer as unknown as { dialogWrapperElement: HTMLElement; dialogElement: object }).dialogWrapperElement = document.createElement('div');
		(drawer as unknown as { dialogElement: object }).dialogElement = {};
		jest.spyOn(window, 'getComputedStyle').mockReturnValue({ animationName: 'none' } as CSSStyleDeclaration);

		await expect(drawer.close()).resolves.toBeUndefined();
	});
});
