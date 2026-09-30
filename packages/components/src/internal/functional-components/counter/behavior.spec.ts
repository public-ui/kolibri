import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';
import { BaseWebComponent } from '../base-web-component';
import { CounterBehavior } from './behavior';

type Spans = { visual: HTMLSpanElement; aria: HTMLSpanElement };

const createCounter = (limit: { hasCounter?: boolean; maxLength?: number; maxLengthBehavior?: 'hard' | 'soft' } = {}): [CounterBehavior, Spans] => {
	const counter = new CounterBehavior(BaseWebComponent.stateLess);
	counter.componentWillLoad(limit);
	const spans = { visual: document.createElement('span'), aria: document.createElement('span') };
	counter.setVisualRef(spans.visual);
	counter.setAriaRef(spans.aria);
	return [counter, spans];
};

const keyDown = (key: string, init: KeyboardEventInit = {}): KeyboardEvent => new KeyboardEvent('keydown', { key, ...init });

describe('CounterBehavior', () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	describe('props', () => {
		it('has no counter and a hard limit by default', () => {
			const [counter] = createCounter();
			expect(counter.hasCounter()).toBe(false);
			expect(counter.getRenderProp('maxLengthBehavior')).toBe('hard');
			expect(counter.getCounterProps()).toBeUndefined();
		});

		it('passes the limit and the refs to the form field', () => {
			const [counter] = createCounter({ hasCounter: true, maxLength: 10 });
			expect(counter.getCounterProps()).toEqual({ maxLength: 10, maxLengthBehavior: 'hard', visualRef: counter.setVisualRef, ariaRef: counter.setAriaRef });
		});

		it('sets the native maxlength only for a hard limit', () => {
			expect(createCounter({ maxLength: 10 })[0].getMaxLengthAttribute()).toBe(10);
			expect(createCounter({ maxLength: 10, maxLengthBehavior: 'soft' })[0].getMaxLengthAttribute()).toBeUndefined();
		});

		it('detects a soft limit', () => {
			expect(createCounter({ maxLength: 10, maxLengthBehavior: 'soft' })[0].hasSoftLimit()).toBe(true);
			expect(createCounter({ maxLengthBehavior: 'soft' })[0].hasSoftLimit()).toBe(false);
		});

		it('references the character limit hint only for a maximum without counter', () => {
			expect(createCounter({ maxLength: 10 })[0].getCharacterLimitHintId('field')).toBe('field-character-limit-hint');
			expect(createCounter({ hasCounter: true, maxLength: 10 })[0].getCharacterLimitHintId('field')).toBeUndefined();
			expect(createCounter()[0].getCharacterLimitHintId('field')).toBeUndefined();
		});
	});

	describe('texts', () => {
		it('updates the visible span immediately and the aria span after one second', () => {
			const [counter, spans] = createCounter({ hasCounter: true, maxLength: 10 });
			counter.update(3);
			expect(spans.visual.innerText).toBe('kol-character-counter-current-of-max');
			expect(spans.aria.innerText).toBe('');
			jest.advanceTimersByTime(1000);
			expect(spans.aria.innerText).toBe('kol-character-counter-current-of-max-aria');
		});

		it('updates both spans at once with updateImmediate', () => {
			const [counter, spans] = createCounter({ hasCounter: true });
			counter.updateImmediate(3);
			expect(spans.visual.innerText).toBe('kol-character-counter-current');
			expect(spans.aria.innerText).toBe('kol-character-counter-current');
		});

		it('marks an exceeded soft limit', () => {
			const [counter, spans] = createCounter({ hasCounter: true, maxLength: 2, maxLengthBehavior: 'soft' });
			counter.updateImmediate(3);
			expect(spans.visual.innerText).toBe('kol-character-limit-exceeded');
			expect(spans.visual.classList.contains('kol-form-field__counter--exceeded')).toBe(true);
			counter.updateImmediate(1);
			expect(spans.visual.classList.contains('kol-form-field__counter--exceeded')).toBe(false);
		});

		it('adds the maximum text once a hard limit is reached', () => {
			const [counter, spans] = createCounter({ hasCounter: true, maxLength: 3 });
			counter.updateImmediate(3);
			expect(spans.aria.innerText).toBe('kol-character-counter-current-of-max-aria kol-character-counter-max-aria');
		});

		it('uses the limit of the time of the call for the debounced text', () => {
			const [counter, spans] = createCounter({ hasCounter: true, maxLength: 10 });
			counter.update(3);
			counter.watchMaxLength(undefined);
			jest.advanceTimersByTime(1000);
			expect(spans.aria.innerText).toBe('kol-character-counter-current-of-max-aria');
		});
	});

	describe('re-announcement', () => {
		it('re-announces a reached hard limit on a character key, alternating a no-break space', () => {
			const [counter, spans] = createCounter({ hasCounter: true, maxLength: 3 });
			counter.handleKeyDown(keyDown('a'), 3);
			jest.advanceTimersByTime(1000);
			expect(spans.aria.innerText).toBe('kol-character-counter-current-of-max-aria kol-character-counter-max-aria ');
			counter.handleKeyDown(keyDown('b'), 3);
			jest.advanceTimersByTime(1000);
			expect(spans.aria.innerText).toBe('kol-character-counter-current-of-max-aria kol-character-counter-max-aria');
		});

		it.each([
			['a control key', keyDown('ArrowLeft'), 3],
			['a shortcut', keyDown('a', { ctrlKey: true }), 3],
			['a length below the limit', keyDown('a'), 2],
		])('does not re-announce for %s', (_, event, length) => {
			const [counter, spans] = createCounter({ hasCounter: true, maxLength: 3 });
			counter.handleKeyDown(event, length);
			jest.advanceTimersByTime(1000);
			expect(spans.aria.innerText).toBe('');
		});

		it('does not re-announce a soft limit', () => {
			const [counter, spans] = createCounter({ hasCounter: true, maxLength: 3, maxLengthBehavior: 'soft' });
			counter.handleKeyDown(keyDown('a'), 3);
			jest.advanceTimersByTime(1000);
			expect(spans.aria.innerText).toBe('');
		});

		it('cancels a pending update on destroy', () => {
			const [counter, spans] = createCounter({ hasCounter: true });
			counter.update(3);
			counter.destroy();
			jest.advanceTimersByTime(1000);
			expect(spans.aria.innerText).toBe('');
		});
	});
});
