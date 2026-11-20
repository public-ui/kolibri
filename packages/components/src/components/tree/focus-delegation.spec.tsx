import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolTreeItem } from '../tree-item/component';
import { KolTree } from './component';

const renderTree = (secondItemActive = false) =>
	newSpecPage({
		components: [KolTree, KolTreeItem],
		template: () => (
			<kol-tree _label="Tree">
				<kol-tree-item _label="First" _href="#first"></kol-tree-item>
				<kol-tree-item _label="Second" _href="#second" _active={secondItemActive}></kol-tree-item>
			</kol-tree>
		),
	});

const dispatchFocusIn = (element: Element): void => {
	element.dispatchEvent(new Event('focusin', { bubbles: true }));
};

/**
 * The Stencil mock document ships a `MutationObserver` without `observe`. The tree observes its
 * items on mount, so the stub keeps the component lifecycle working in the test environment.
 */
const stubMutationObserver = (): void => {
	const original = globalThis.MutationObserver;
	const stub = class {
		observe(): void {}
		disconnect(): void {}
	};
	beforeAll(() => {
		globalThis.MutationObserver = stub as unknown as typeof MutationObserver;
	});
	afterAll(() => {
		globalThis.MutationObserver = original;
	});
};

stubMutationObserver();

/**
 * Runs callbacks registered via `requestAnimationFrame` synchronously, so the deferred focus
 * delegation is testable without real frame timing.
 */
const runFrameCallbacksSynchronously = (): jest.SpyInstance => {
	const globalScope = globalThis as { requestAnimationFrame?: (callback: FrameRequestCallback) => number };
	globalScope.requestAnimationFrame ??= (callback) => setTimeout(() => callback(0), 0) as unknown as number;
	return jest.spyOn(globalScope, 'requestAnimationFrame').mockImplementation((callback: FrameRequestCallback) => {
		callback(0);
		return 0;
	});
};

describe('kol-tree focus behavior', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('takes part in the tab order', async () => {
		const page = await renderTree();
		expect(page.root?.getAttribute('tabindex')).toBe('0');
	});

	it('delegates focus to the first tree item when the tree itself receives focus', async () => {
		const page = await renderTree();
		const root = page.root!;
		root.setAttribute('data-themed', '');
		runFrameCallbacksSynchronously();

		const focusSpy = jest.spyOn(KolTreeItem.prototype, 'focus').mockResolvedValue();
		dispatchFocusIn(root);
		await page.waitForChanges();
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(focusSpy).toHaveBeenCalledTimes(1);
	});

	it('does not delegate when the focus lands inside a tree item', async () => {
		const page = await renderTree();
		const root = page.root!;
		root.setAttribute('data-themed', '');
		runFrameCallbacksSynchronously();

		const firstItem = root.querySelector('kol-tree-item')!;
		const focusSpy = jest.spyOn(KolTreeItem.prototype, 'focus').mockResolvedValue();
		dispatchFocusIn(firstItem);
		await page.waitForChanges();
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(focusSpy).not.toHaveBeenCalled();
	});

	it('does not delegate when the focus comes back from a tree item', async () => {
		const page = await renderTree();
		const root = page.root!;
		root.setAttribute('data-themed', '');
		runFrameCallbacksSynchronously();

		const firstItem = root.querySelector('kol-tree-item')!;
		const focusSpy = jest.spyOn(KolTreeItem.prototype, 'focus').mockResolvedValue();
		const event = new Event('focusin', { bubbles: true });
		Object.defineProperty(event, 'relatedTarget', { value: firstItem });
		root.dispatchEvent(event);
		await page.waitForChanges();
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(focusSpy).not.toHaveBeenCalled();
	});

	it('leaves the tab order on Shift+Tab from a tree item and rejoins it once the focus has left the tree', async () => {
		const page = await renderTree();
		const root = page.root!;
		const firstItem = root.querySelector('kol-tree-item')!;

		const shiftTab = new Event('keydown', { bubbles: true });
		Object.defineProperties(shiftTab, { key: { value: 'Tab' }, shiftKey: { value: true } });
		firstItem.dispatchEvent(shiftTab);
		expect(root.getAttribute('tabindex')).toBe('-1');

		const outside = document.createElement('button');
		document.body.appendChild(outside);
		const focusOut = new Event('focusout', { bubbles: true });
		Object.defineProperty(focusOut, 'relatedTarget', { value: outside });
		firstItem.dispatchEvent(focusOut);

		expect(root.getAttribute('tabindex')).toBe('0');
	});

	it('keeps the roving tabindex on the item anchors', async () => {
		const page = await renderTree(true);
		const items = page.root?.querySelectorAll('kol-tree-item');

		expect(items?.[0]?.shadowRoot?.querySelector('a')?.getAttribute('tabindex')).toBe('-1');
		expect(items?.[1]?.shadowRoot?.querySelector('a')?.getAttribute('tabindex')).toBe('0');
	});
});
