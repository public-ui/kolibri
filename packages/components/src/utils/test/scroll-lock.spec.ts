import { lockScroll, unlockScroll } from '../scroll-lock';

describe('scroll-lock', () => {
	const docEl = document.documentElement;
	const ownerA = {};
	const ownerB = {};

	const stubClientWidth = (value: number) => {
		Object.defineProperty(docEl, 'clientWidth', { value, configurable: true });
	};

	beforeEach(() => {
		// No visible scrollbar by default, so no padding compensation applies.
		stubClientWidth(window.innerWidth);
	});

	afterEach(() => {
		unlockScroll(ownerA);
		unlockScroll(ownerB);
		docEl.style.removeProperty('overflow');
		docEl.style.removeProperty('padding-right');
	});

	afterAll(() => {
		// Remove the stubbed own property so the prototype getter applies again.
		Reflect.deleteProperty(docEl, 'clientWidth');
	});

	it('hides the document overflow on the first lock', () => {
		lockScroll(ownerA);

		expect(docEl.style.getPropertyValue('overflow')).toBe('hidden');
	});

	it('keeps the lock until the last owner unlocks', () => {
		lockScroll(ownerA);
		lockScroll(ownerB);

		unlockScroll(ownerA);
		expect(docEl.style.getPropertyValue('overflow')).toBe('hidden');

		unlockScroll(ownerB);
		expect(docEl.style.getPropertyValue('overflow')).toBe('');
	});

	it('restores previous inline styles after unlocking', () => {
		docEl.style.setProperty('overflow', 'auto');
		docEl.style.setProperty('padding-right', '10px');

		lockScroll(ownerA);
		expect(docEl.style.getPropertyValue('overflow')).toBe('hidden');

		unlockScroll(ownerA);
		expect(docEl.style.getPropertyValue('overflow')).toBe('auto');
		expect(docEl.style.getPropertyValue('padding-right')).toBe('10px');
	});

	it('removes the inline styles when none were set before locking', () => {
		lockScroll(ownerA);
		unlockScroll(ownerA);

		expect(docEl.style.getPropertyValue('overflow')).toBe('');
		expect(docEl.style.getPropertyValue('padding-right')).toBe('');
	});

	it('ignores repeated locks of the same owner', () => {
		lockScroll(ownerA);
		lockScroll(ownerA);

		unlockScroll(ownerA);
		expect(docEl.style.getPropertyValue('overflow')).toBe('');
	});

	it('ignores unlocks of unknown owners', () => {
		lockScroll(ownerA);

		unlockScroll(ownerB);
		expect(docEl.style.getPropertyValue('overflow')).toBe('hidden');

		unlockScroll(ownerA);
		unlockScroll(ownerA);
		expect(docEl.style.getPropertyValue('overflow')).toBe('');
	});

	it('compensates the scrollbar width with padding while locked', () => {
		stubClientWidth(window.innerWidth - 15);

		lockScroll(ownerA);
		expect(docEl.style.getPropertyValue('padding-right')).toBe('15px');

		unlockScroll(ownerA);
		expect(docEl.style.getPropertyValue('padding-right')).toBe('');
	});
});
