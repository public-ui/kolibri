import { describe, expect, it } from '@jest/globals';
import { h } from '@stencil/core';

import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import { BemRootNodeFC } from './component';

const attributeNames = (element: Element): string[] => Array.from(element.attributes).map((attribute) => attribute.name);

describe('BemRootNodeFC', () => {
	it('renders a div with the block, its modifiers and the forwarded class', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <BemRootNodeFC block="kol-meter" modifiers={{ vertical: true }} class="extra" />);

		const root = page.root!;
		expect(root.tagName).toBe('DIV');
		expect(root.getAttribute('class')).toBe('kol-meter kol-meter--vertical extra');
	});

	it('renders the element named by component with the attributes of that element', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <BemRootNodeFC component="img" block="kol-image" alt="Alt text" src="image.png" />);

		const root = page.root!;
		expect(root.tagName).toBe('IMG');
		expect(root.getAttribute('class')).toBe('kol-image');
		expect(root.getAttribute('alt')).toBe('Alt text');
		expect(root.getAttribute('src')).toBe('image.png');
	});

	it('places the class at the position of block, so the root keeps the attribute order of the call site', async () => {
		const page = await renderFunctionalComponentToSpecPage(() => <BemRootNodeFC aria-label="Avatar" block="kol-avatar" role="img" />);

		expect(attributeNames(page.root!)).toEqual(['aria-label', 'class', 'role']);
	});
});
