import { afterAll, afterEach, beforeAll, describe, expect, it, jest } from '@jest/globals';
import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolTextarea } from '../component';

describe('kol-textarea counter runtime updates', () => {
	const originalHTMLTextAreaElement = (globalThis as unknown as { HTMLTextAreaElement?: unknown }).HTMLTextAreaElement;

	beforeAll(() => {
		(globalThis as unknown as { HTMLTextAreaElement: unknown }).HTMLTextAreaElement = class HTMLTextAreaElement {
			static [Symbol.hasInstance](instance: unknown): boolean {
				return (instance as { tagName?: string })?.tagName === 'TEXTAREA';
			}
		};
	});

	afterAll(() => {
		(globalThis as unknown as { HTMLTextAreaElement: unknown }).HTMLTextAreaElement = originalHTMLTextAreaElement;
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('populates counter immediately when _hasCounter is toggled to true at runtime', async () => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" _maxLength={20} _value="Hello" />,
		});

		expect(page.root?.shadowRoot?.querySelector('[data-testid="input-counter"]')).toBeNull();

		const component = page.root as HTMLKolTextareaElement;
		component._hasCounter = true;
		await page.waitForChanges();

		const counter = page.root?.shadowRoot?.querySelector('[data-testid="input-counter"]') as HTMLSpanElement;
		expect(counter).not.toBeNull();
		expect(counter.innerText).toBe('kol-character-counter-current-of-max');
	});

	it('updates counter immediately when _maxLengthBehavior is changed at runtime', async () => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea _label="Label" _hasCounter={true} _maxLength={2} _maxLengthBehavior="hard" _value="Hello" />,
		});

		expect(page.root?.shadowRoot?.querySelector('[data-testid="input-counter"]')).not.toBeNull();

		const component = page.root as HTMLKolTextareaElement;
		component._maxLengthBehavior = 'soft';
		await page.waitForChanges();

		const counter = page.root?.shadowRoot?.querySelector('[data-testid="input-counter"]') as HTMLSpanElement;
		expect(counter.innerText).toBe('kol-character-limit-exceeded');
	});

	describe('accessibility regressions', () => {
		it('debounces aria-live counter updates while typing', async () => {
			const page = await newSpecPage({
				components: [KolTextarea],
				template: () => <kol-textarea _label="Label" _hasCounter={true} _maxLength={5} _maxLengthBehavior="soft" _value="" />,
			});

			jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });

			const visualCounter = page.root?.shadowRoot?.querySelector('[data-testid="input-counter"]') as HTMLSpanElement;
			const ariaCounter = page.root?.shadowRoot?.querySelector('[data-testid="input-counter-aria"]') as HTMLSpanElement;
			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

			expect(visualCounter.innerText).toBe('kol-character-limit-remaining');
			expect(ariaCounter.innerText).toBe('kol-character-limit-remaining');

			textarea.value = 'Exceeded';
			textarea.dispatchEvent(new Event('input'));
			await page.waitForChanges();

			expect(visualCounter.innerText).toBe('kol-character-limit-exceeded');
			expect(ariaCounter.innerText).toBe('kol-character-limit-remaining');

			jest.advanceTimersByTime(1000);
			expect(ariaCounter.innerText).toBe('kol-character-limit-exceeded');
		});

		it('re-announces counter with marker on focus', async () => {
			const page = await newSpecPage({
				components: [KolTextarea],
				template: () => <kol-textarea _label="Label" _hasCounter={true} _maxLength={10} _value="Test" />,
			});

			jest.useFakeTimers({ doNotFake: ['nextTick', 'setImmediate'] });

			const ariaCounter = page.root?.shadowRoot?.querySelector('[data-testid="input-counter-aria"]') as HTMLSpanElement;
			const textarea = page.root?.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;

			expect(ariaCounter.innerText).toBe('kol-character-counter-current-of-max-aria');

			textarea.dispatchEvent(new FocusEvent('focus'));
			await page.waitForChanges();

			expect(ariaCounter.innerText.endsWith('\u00a0')).toBe(false);

			jest.advanceTimersByTime(1000);
			expect(ariaCounter.innerText.endsWith('\u00a0')).toBe(true);
		});
	});
});
