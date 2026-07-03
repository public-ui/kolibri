import { KolDrawer } from '../shadow';

afterEach(() => {
	jest.restoreAllMocks();
});

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

describe('kol-drawer scroll lock', () => {
	const getOverflow = () => document.documentElement.style.getPropertyValue('overflow');

	let currentDrawer: KolDrawer | undefined;

	const setUpDrawer = () => {
		const drawer = new KolDrawer();
		(drawer as unknown as { dialogElement: object }).dialogElement = {
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
		};
		currentDrawer = drawer;
		return drawer;
	};

	afterEach(() => {
		// Release a possibly remaining lock so the module-level registry is empty for the next test.
		currentDrawer?.disconnectedCallback();
		currentDrawer = undefined;
		document.documentElement.style.removeProperty('overflow');
		document.documentElement.style.removeProperty('padding-right');
	});

	it('locks the document scroll when shown modally', async () => {
		const drawer = setUpDrawer();

		await drawer.show(true);

		expect(getOverflow()).toBe('hidden');
	});

	it('does not lock the document scroll when shown non-modally', async () => {
		const drawer = setUpDrawer();

		await drawer.show(false);

		expect(getOverflow()).toBe('');
	});

	it('unlocks the document scroll when the native dialog closes', async () => {
		const drawer = setUpDrawer();
		jest.spyOn(window, 'getComputedStyle').mockReturnValue({ animationName: 'none' } as CSSStyleDeclaration);

		await drawer.show(true);
		expect(getOverflow()).toBe('hidden');

		(drawer as unknown as { handleClose: () => void }).handleClose();
		expect(getOverflow()).toBe('');
	});

	it('unlocks the document scroll when the component is disconnected while open', async () => {
		const drawer = setUpDrawer();

		await drawer.show(true);
		expect(getOverflow()).toBe('hidden');

		drawer.disconnectedCallback();
		expect(getOverflow()).toBe('');
	});
});
