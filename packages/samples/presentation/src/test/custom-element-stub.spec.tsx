/**
 * Alternative without the real components: a stub registered for a custom tag name.
 *
 * Useful for wrapper tests that only need to verify what the wrapper passes to a KoliBri tag
 * and which events it emits. The stub never loads Stencil, so these tests are fast and independent
 * of lazy chunks. The tag name is deliberately not a real KoliBri tag.
 */

import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { describe, expect, test, vi } from 'vitest';

class StubButton extends HTMLElement {
	public _label = '';
	public _on?: { onClick?: (event: Event) => void };

	public connectedCallback(): void {
		this.attachShadow({ mode: 'open' }).innerHTML = '<button type="button"></button>';
		this.shadowRoot?.querySelector('button')?.addEventListener('click', (event) => this._on?.onClick?.(event));
	}
}

if (!customElements.get('kol-stub-button')) {
	customElements.define('kol-stub-button', StubButton);
}

const Wrapper = ({ onClick }: { onClick: () => void }) => React.createElement('kol-stub-button', { _label: 'Stub', _on: { onClick } });

describe('custom element stub', () => {
	test('passes props as properties to the stub', () => {
		render(<Wrapper onClick={vi.fn()} />);

		expect((document.querySelector('kol-stub-button') as StubButton)._label).toBe('Stub');
	});

	test('wrapper callback is called on a click inside the stub shadow root', () => {
		const onClick = vi.fn();
		render(<Wrapper onClick={onClick} />);

		fireEvent.click(document.querySelector('kol-stub-button')?.shadowRoot?.querySelector('button') as HTMLButtonElement);

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
