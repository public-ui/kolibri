import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getDocument } from '../../../schema';
import { BaseWebComponent } from '../base-web-component';
import { TooltipBehavior } from './behavior';

type TooltipFixture = {
	behavior: TooltipBehavior;
	target: HTMLElement;
	tooltip: HTMLElement;
	show: () => void;
};

const created: HTMLElement[] = [];
const createTooltipFixture = (): TooltipFixture => {
	const behavior = new TooltipBehavior(BaseWebComponent.stateLess);
	behavior.componentWillLoad({ label: 'Sample tooltip' });

	const target = document.createElement('button');
	target.textContent = 'Trigger';
	const tooltip = document.createElement('div');
	const arrow = document.createElement('span');
	arrow.className = 'kol-tooltip__arrow';
	tooltip.appendChild(arrow);

	document.body.appendChild(target);
	document.body.appendChild(tooltip);
	created.push(target, tooltip);

	behavior.initContext(target);
	behavior.setTooltipElementRef(tooltip);
	behavior.syncListeners(undefined, target, true);

	const show = (): void => {
		target.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
		jest.advanceTimersByTime(300);
	};

	return { behavior, target, tooltip, show };
};

describe('TooltipBehavior', () => {
	let addEventListenerSpy: jest.SpiedFunction<Document['addEventListener']>;
	let removeEventListenerSpy: jest.SpiedFunction<Document['removeEventListener']>;

	beforeEach(() => {
		jest.useFakeTimers();
		addEventListenerSpy = jest.spyOn(getDocument(), 'addEventListener');
		removeEventListenerSpy = jest.spyOn(getDocument(), 'removeEventListener');
	});

	afterEach(() => {
		jest.clearAllTimers();
		jest.useRealTimers();
		addEventListenerSpy.mockRestore();
		removeEventListenerSpy.mockRestore();
		created.splice(0).forEach((element) => element.remove());
	});

	describe('Escape keydown listener registration on show', () => {
		it('registers keydown event listener on document when shown via mouseover', () => {
			const { show, tooltip } = createTooltipFixture();

			expect(addEventListenerSpy).not.toHaveBeenCalledWith('keydown', expect.any(Function));

			show();

			expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
			expect(tooltip.classList.contains('show')).toBe(true);
		});

		it('registers keydown event listener on document when shown via focusin', () => {
			const { target, tooltip } = createTooltipFixture();

			target.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
			jest.advanceTimersByTime(300);

			expect(addEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
			expect(tooltip.classList.contains('show')).toBe(true);
		});
	});

	describe('Escape keydown listener cleanup on hide and destroy', () => {
		it('removes the keydown listener with the identical event type and handler reference on hideTooltip()', () => {
			const { behavior, show } = createTooltipFixture();
			show();

			const addCalls = addEventListenerSpy.mock.calls.filter(([event]) => event === 'keydown');
			expect(addCalls).toHaveLength(1);
			const registeredHandler = addCalls[0][1];

			behavior.hideTooltip();

			expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', registeredHandler);
		});

		it('removes the keydown listener with the identical event type and handler reference on destroy()', () => {
			const { behavior, show } = createTooltipFixture();
			show();

			const addCalls = addEventListenerSpy.mock.calls.filter(([event]) => event === 'keydown');
			expect(addCalls).toHaveLength(1);
			const registeredHandler = addCalls[0][1];

			behavior.destroy();

			expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', registeredHandler);
		});

		it('removes listener when mouse leaves target after debounce interval', () => {
			const { target, show } = createTooltipFixture();
			show();

			const addCalls = addEventListenerSpy.mock.calls.filter(([event]) => event === 'keydown');
			expect(addCalls).toHaveLength(1);
			const registeredHandler = addCalls[0][1];

			target.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
			jest.advanceTimersByTime(300);

			expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', registeredHandler);
		});

		it('removes listener when focus leaves target after debounce interval', () => {
			const { target } = createTooltipFixture();
			target.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
			jest.advanceTimersByTime(300);

			const addCalls = addEventListenerSpy.mock.calls.filter(([event]) => event === 'keydown');
			expect(addCalls).toHaveLength(1);
			const registeredHandler = addCalls[0][1];

			target.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
			jest.advanceTimersByTime(300);

			expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', registeredHandler);
		});

		it('does not fail when hideTooltip or destroy is called without prior show', () => {
			const { behavior } = createTooltipFixture();

			expect(() => behavior.hideTooltip()).not.toThrow();
			expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

			expect(() => behavior.destroy()).not.toThrow();
		});
	});

	describe('Escape key event handling', () => {
		it('hides the tooltip and removes listener when Escape key is pressed', () => {
			const { show, tooltip } = createTooltipFixture();
			show();

			const addCalls = addEventListenerSpy.mock.calls.filter(([event]) => event === 'keydown');
			expect(addCalls).toHaveLength(1);
			const registeredHandler = addCalls[0][1];

			const escapeEvent = new KeyboardEvent('keydown', {
				key: 'Escape',
				bubbles: true,
				cancelable: true,
			});
			const stopPropagationSpy = jest.spyOn(escapeEvent, 'stopPropagation');

			getDocument().dispatchEvent(escapeEvent);

			expect(stopPropagationSpy).toHaveBeenCalledTimes(1);
			expect(escapeEvent.defaultPrevented).toBe(true);
			expect(tooltip.classList.contains('hide')).toBe(true);
			expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', registeredHandler);
		});

		it('ignores non-Escape keys while visible', () => {
			const { show, tooltip } = createTooltipFixture();
			show();

			const enterEvent = new KeyboardEvent('keydown', {
				key: 'Enter',
				bubbles: true,
				cancelable: true,
			});

			getDocument().dispatchEvent(enterEvent);

			expect(enterEvent.defaultPrevented).toBe(false);
			expect(tooltip.classList.contains('show')).toBe(true);
			expect(removeEventListenerSpy).not.toHaveBeenCalledWith('keydown', expect.any(Function));
		});

		it('allows subsequent Escape events to reach document listeners unhindered once hidden', () => {
			const { behavior, show } = createTooltipFixture();
			show();
			behavior.hideTooltip();

			const externalListener = jest.fn();
			getDocument().addEventListener('keydown', externalListener);

			const escapeEvent = new KeyboardEvent('keydown', {
				key: 'Escape',
				bubbles: true,
				cancelable: true,
			});

			getDocument().dispatchEvent(escapeEvent);

			expect(externalListener).toHaveBeenCalledWith(escapeEvent);
			expect(escapeEvent.defaultPrevented).toBe(false);

			getDocument().removeEventListener('keydown', externalListener);
		});
	});
});
