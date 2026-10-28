import { waitFor } from '@testing-library/dom';
import { expect } from 'vitest';

/**
 * Stencil upgrades lazy components asynchronously. Resolves once the element exists and has rendered
 * the given selector into its shadow root, so no lazy initialization is pending when a test continues.
 */
export const findInShadow = async <T extends Element = Element>(host: string, selector: string): Promise<T> =>
	waitFor(() => {
		const element = document.querySelector(host)?.shadowRoot?.querySelector<T>(selector);
		expect(element).toBeTruthy();
		return element as T;
	});
