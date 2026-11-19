import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { bootstrap } from '../../core/bootstrap';
import { KolTreeItemTag, KolTreeTag } from '../../core/component-names';
import { KolTreeItem } from '../tree-item/component';
import { KolTree } from './component';

const renderTree = () =>
	newSpecPage({
		components: [KolTree, KolTreeItem],
		template: () => (
			<KolTreeTag _label="Tree">
				<KolTreeItemTag _label="First" _href="#first"></KolTreeItemTag>
				<KolTreeItemTag _label="Second" _href="#second"></KolTreeItemTag>
			</KolTreeTag>
		),
	});

const dispatchFocusIn = (element: Element): void => {
	element.dispatchEvent(new Event('focusin', { bubbles: true }));
};

/** The Stencil mock document ships a `MutationObserver` without `observe`, which the tree calls on mount. */
const stubMutationObserver = (): void => {
	const original = globalThis.MutationObserver;
	beforeAll(() => {
		globalThis.MutationObserver = class {
			observe(): void {}
			disconnect(): void {}
		} as unknown as typeof MutationObserver;
	});
	afterAll(() => {
		globalThis.MutationObserver = original;
	});
};

stubMutationObserver();

describe('kol-tree under a tag name transformer', () => {
	beforeAll(async () => {
		await bootstrap([], [], { transformTagName: (tagName) => `app-${tagName}` });
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('finds its items through selectors on the transformed tag, so the tree delegates its focus to the first item', async () => {
		const page = await renderTree();
		const root = page.root!;
		root.setAttribute('data-themed', '');
		jest.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((callback: FrameRequestCallback) => {
			callback(0);
			return 0;
		});
		const focusSpy = jest.spyOn(KolTreeItem.prototype, 'focus').mockResolvedValue();

		dispatchFocusIn(root);
		await page.waitForChanges();
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(root.tagName).toBe('APP-KOL-TREE');
		expect(root.querySelectorAll('app-kol-tree-item')).toHaveLength(2);
		expect(focusSpy).toHaveBeenCalledTimes(1);
	});
});
