import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolInputText } from '../component';

describe('kol-input-text counter runtime updates', () => {
	it('populates counter immediately when _hasCounter is toggled to true at runtime', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _maxLength={20} _value="Hello" />,
		});

		expect(page.root?.shadowRoot?.querySelector('[data-testid="input-counter"]')).toBeNull();

		const component = page.root as HTMLKolInputTextElement;
		component._hasCounter = true;
		await page.waitForChanges();

		const counter = page.root?.shadowRoot?.querySelector('[data-testid="input-counter"]') as HTMLSpanElement;
		expect(counter).not.toBeNull();
		expect(counter.innerText).toBe('kol-character-counter-current-of-max');
	});

	it('updates counter immediately when _maxLengthBehavior is changed at runtime', async () => {
		const page = await newSpecPage({
			components: [KolInputText],
			template: () => <kol-input-text _label="Label" _hasCounter={true} _maxLength={2} _maxLengthBehavior="hard" _value="Hello" />,
		});

		const counter = page.root?.shadowRoot?.querySelector('[data-testid="input-counter"]') as HTMLSpanElement;
		expect(counter).not.toBeNull();

		const component = page.root as HTMLKolInputTextElement;
		component._maxLengthBehavior = 'soft';
		await page.waitForChanges();

		expect(counter.classList.contains('kol-form-field__counter--exceeded')).toBe(true);
		expect(counter.innerText).toBe('kol-character-limit-exceeded');
	});
});
