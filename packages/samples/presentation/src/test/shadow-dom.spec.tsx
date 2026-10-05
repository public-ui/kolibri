/**
 * Test file demonstrating Shadow DOM access with KoliBri components
 * This demonstrates the fix for #10543: "TypeError: Cannot convert undefined or null to object"
 * at @stencil/core/internal/client/index.js
 *
 * Root cause: Stencil accesses document.adoptedStyleSheets and
 * shadowRoot.adoptedStyleSheets, which jsdom does not implement.
 * happy-dom supports both natively, which is why the test environment
 * uses happy-dom instead of jsdom and needs no polyfills.
 */

import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { describe, expect, test } from 'vitest';

// React 19 sets custom element props as properties (no attribute reflection),
// so _label is asserted on the element property instead of the attribute.
type KolInputTextElement = HTMLElement & { _label?: string };

// The tests intentionally use KoliBri's web components directly (lowercase tag
// names) instead of the React adapters, to demonstrate Shadow DOM access on the
// custom elements themselves. React.createElement is used because JSX has no
// type declarations for the custom element tags.
const TestComponent = () =>
	React.createElement(
		'div',
		{ 'data-testid': 'test-container' },
		React.createElement('kol-button', { label: 'Test Button', _variant: 'primary' }),
		React.createElement('kol-input-text', { _label: 'Test Input', _value: '' }),
	);

// Stencil lazy components upgrade asynchronously, so shadow roots
// must be awaited with waitFor instead of being read synchronously.
describe('KoliBri Shadow DOM Tests with happy-dom - Issue #10543', () => {
	test('should render KoliBri button in DOM', async () => {
		render(<TestComponent />);

		// Wait for the custom element to upgrade before asserting,
		// so no lazy initialization is pending when the test unmounts.
		const kolButton = await waitFor(() => {
			const button = document.querySelector('kol-button');
			expect(button?.shadowRoot).toBeTruthy();
			return button;
		});
		expect(kolButton?.getAttribute('label')).toBe('Test Button');
	});

	test('should have shadow root on KoliBri button', async () => {
		render(<TestComponent />);

		// Check that shadow root exists (this would fail in the original issue)
		const shadowRoot = await waitFor(() => {
			const root = document.querySelector('kol-button')?.shadowRoot;
			expect(root).toBeTruthy();
			return root;
		});
		expect(shadowRoot).toBeInstanceOf(ShadowRoot);
	});

	test('should render KoliBri input in DOM', async () => {
		render(<TestComponent />);

		const kolInput = await waitFor(() => {
			const input = document.querySelector('kol-input-text');
			expect(input?.shadowRoot).toBeTruthy();
			return input;
		});
		expect((kolInput as KolInputTextElement)._label).toBe('Test Input');
	});

	test('should have shadow root on KoliBri input', async () => {
		render(<TestComponent />);

		// Check that shadow root exists
		const shadowRoot = await waitFor(() => {
			const root = document.querySelector('kol-input-text')?.shadowRoot;
			expect(root).toBeTruthy();
			return root;
		});
		expect(shadowRoot).toBeInstanceOf(ShadowRoot);
	});

	test('should demonstrate the FIX for issue #10543: accessing shadow DOM content', async () => {
		// The issue was: "TypeError: Cannot convert undefined or null to object"
		// This happened because adoptedStyleSheets was undefined in jsdom

		render(<TestComponent />);

		// Access shadow root (this would fail in the original issue)
		const shadowRoot = await waitFor(() => {
			const root = document.querySelector('kol-button')?.shadowRoot;
			expect(root).toBeTruthy();
			return root;
		});
		expect(shadowRoot).toBeInstanceOf(ShadowRoot);
	});
});

describe('KoliBri Dialog Shadow DOM Tests', () => {
	test('should render KoliBri dialog in DOM', async () => {
		const DialogTestComponent = () =>
			React.createElement('div', null, React.createElement('kol-dialog', { _heading: 'Test Dialog' }, React.createElement('p', null, 'Dialog content')));

		render(React.createElement(DialogTestComponent));

		const dialog = await waitFor(() => {
			const element = document.querySelector('kol-dialog');
			expect(element?.shadowRoot).toBeTruthy();
			return element;
		});
		expect(dialog?.getAttribute('_heading')).toBe('Test Dialog');
	});

	test('should have shadow root on KoliBri dialog', async () => {
		const DialogTestComponent = () =>
			React.createElement('div', null, React.createElement('kol-dialog', { _heading: 'Test Dialog' }, React.createElement('p', null, 'Dialog content')));

		render(React.createElement(DialogTestComponent));

		// Check that shadow root exists
		const shadowRoot = await waitFor(() => {
			const root = document.querySelector('kol-dialog')?.shadowRoot;
			expect(root).toBeTruthy();
			return root;
		});
		expect(shadowRoot).toBeInstanceOf(ShadowRoot);
	});
});

describe('Issue #10543 Reproduction and Fix Verification', () => {
	test('verifies adoptedStyleSheets is available on the document', () => {
		// The original issue was that this code would fail with:
		// "TypeError: Cannot convert undefined or null to object"
		// at @stencil/core/internal/client/index.js
		//
		// Stencil tried to access Object.getOwnPropertyDescriptor(win.document.adoptedStyleSheets, "length")
		// but adoptedStyleSheets was undefined in jsdom. happy-dom provides it natively.
		expect(document.adoptedStyleSheets).toBeDefined();
		expect(Array.isArray(document.adoptedStyleSheets)).toBe(true);
	});

	test('verifies adoptedStyleSheets is available on shadow roots', () => {
		// Stencil's addStyle() calls shadowRoot.adoptedStyleSheets.includes(...)
		// when the environment supports constructable stylesheets, which jsdom
		// does not implement on ShadowRoot. happy-dom provides it natively.
		const host = document.createElement('div');
		document.body.appendChild(host);
		const shadowRoot = host.attachShadow({ mode: 'open' });
		expect(Array.isArray(shadowRoot.adoptedStyleSheets)).toBe(true);
	});

	test('verifies customElements is available', () => {
		expect(customElements).toBeDefined();
		expect(typeof customElements.define).toBe('function');
		expect(typeof customElements.get).toBe('function');
	});

	test('verifies HTMLDialogElement is available', () => {
		expect(window.HTMLDialogElement).toBeDefined();
	});

	test('verifies MutationObserver is available', () => {
		expect(window.MutationObserver).toBeDefined();
	});

	test('verifies ResizeObserver is available', () => {
		expect(window.ResizeObserver).toBeDefined();
	});
});
