/**
 * Environment checks: the browser APIs Stencil needs exist in happy-dom, and KoliBri components
 * upgrade, render into an open shadow root and are visible to accessibility queries.
 */

import { render } from '@testing-library/react';
import React from 'react';
import { screen } from 'shadow-dom-testing-library';
import { describe, expect, test, vi } from 'vitest';

type KolInputTextElement = HTMLElement & { _label?: string };

const findShadowRoot = (tagName: string) =>
	vi.waitFor(() => {
		const shadowRoot = document.querySelector(tagName)?.shadowRoot;
		expect(shadowRoot).toBeInstanceOf(ShadowRoot);
		return shadowRoot as ShadowRoot;
	});

describe('environment', () => {
	test('provides adoptedStyleSheets on the document', () => {
		expect(Array.isArray(document.adoptedStyleSheets)).toBe(true);
	});

	test('provides adoptedStyleSheets on shadow roots', () => {
		const host = document.createElement('div');
		document.body.appendChild(host);

		expect(Array.isArray(host.attachShadow({ mode: 'open' }).adoptedStyleSheets)).toBe(true);
	});

	test.each(['customElements', 'HTMLDialogElement', 'MutationObserver', 'ResizeObserver'])('provides %s', (name) => {
		expect(window).toHaveProperty(name);
	});
});

describe('KoliBri custom elements', () => {
	test.each(['kol-button', 'kol-dialog', 'kol-input-text'])('%s renders into a shadow root', async (tagName) => {
		render(React.createElement(tagName, { _label: 'Label' }));

		expect(await findShadowRoot(tagName)).toBeInstanceOf(ShadowRoot);
	});

	test('receives React props as element properties', async () => {
		render(React.createElement('kol-input-text', { _label: 'Label' }));
		await findShadowRoot('kol-input-text');

		expect((document.querySelector('kol-input-text') as KolInputTextElement)._label).toBe('Label');
	});

	test('is visible after hydration, so role queries match by accessible name', async () => {
		render(React.createElement('kol-button', { _label: 'Label' }));

		const button = await screen.findByShadowRole('button', { name: 'Label' });

		expect(button).toBeVisible();
	});
});
