import { KolDrawer } from '../component';

type DrawerInternals = {
	dialogRef: { el?: object };
	wrapperRef: { el?: HTMLElement };
	handleClose: (event: Event) => void;
};

const internals = (drawer: KolDrawer) => drawer as unknown as DrawerInternals;

/**
 * Builds a loaded drawer with a stand-in for the native dialog: jsdom implements neither
 * `showModal()` nor `close()`, which is what the optional chaining in the component guards against.
 */
const setUpDrawer = (dialog: object = {}) => {
	const drawer = new KolDrawer();
	drawer.componentWillLoad();
	internals(drawer).dialogRef.el = dialog;
	return drawer;
};

/** Replays the native `close` event of the dialog, which the component listens to for teardown. */
const fireDialogClose = (drawer: KolDrawer) => {
	internals(drawer).handleClose({ target: internals(drawer).dialogRef.el } as unknown as Event);
};

afterEach(() => {
	jest.restoreAllMocks();
});

describe('kol-drawer methods', () => {
	it('does not throw in open when dialog showModal is unavailable', async () => {
		const drawer = setUpDrawer();

		await expect(drawer.open()).resolves.toBeUndefined();
	});

	it('does not throw in close flow when dialog close is unavailable', async () => {
		const drawer = setUpDrawer();
		internals(drawer).wrapperRef.el = document.createElement('div');
		jest.spyOn(window, 'getComputedStyle').mockReturnValue({ animationName: 'none' } as CSSStyleDeclaration);

		await expect(drawer.close()).resolves.toBeUndefined();
	});
});

describe('kol-drawer scroll lock', () => {
	const getOverflow = () => document.documentElement.style.getPropertyValue('overflow');

	let currentDrawer: KolDrawer | undefined;

	const setUpLockedDrawer = () => {
		currentDrawer = setUpDrawer();
		return currentDrawer;
	};

	afterEach(() => {
		// Release a possibly remaining lock so the module-level registry is empty for the next test.
		currentDrawer?.disconnectedCallback();
		currentDrawer = undefined;
		document.documentElement.style.removeProperty('overflow');
		document.documentElement.style.removeProperty('padding-right');
	});

	it('locks the document scroll when shown modally', async () => {
		const drawer = setUpLockedDrawer();

		await drawer.show(true);

		expect(getOverflow()).toBe('hidden');
	});

	it('does not lock the document scroll when shown non-modally', async () => {
		const drawer = setUpLockedDrawer();

		await drawer.show(false);

		expect(getOverflow()).toBe('');
	});

	it('unlocks the document scroll when the native dialog closes', async () => {
		const drawer = setUpLockedDrawer();
		jest.spyOn(window, 'getComputedStyle').mockReturnValue({ animationName: 'none' } as CSSStyleDeclaration);

		await drawer.show(true);
		expect(getOverflow()).toBe('hidden');

		fireDialogClose(drawer);
		expect(getOverflow()).toBe('');
	});

	it('unlocks the document scroll when the component is disconnected while open', async () => {
		const drawer = setUpLockedDrawer();

		await drawer.show(true);
		expect(getOverflow()).toBe('hidden');

		drawer.disconnectedCallback();
		expect(getOverflow()).toBe('');
	});
});
