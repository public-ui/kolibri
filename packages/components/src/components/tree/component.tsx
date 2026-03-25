import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';

import { KolTreeItemTag, KolTreeTag } from '../../core/component-names';
import type { LabelPropType, TreeAPI, TreeStates } from '../../schema';
import { validateLabel } from '../../schema';

/**
 * @internal
 */
@Component({
	tag: 'kol-tree-wc',
	shadow: false,
})
export class KolTreeWc implements TreeAPI {
	@Element() private readonly host?: HTMLKolTreeWcElement;

	@State() public state: TreeStates = {
		_label: '',
	};
	private observer?: MutationObserver;
	private treeItemElements?: HTMLKolTreeItemElement[];
	private cachedOpenItems?: HTMLKolTreeItemElement[] | undefined;
	private cacheValid = false;
	private rafHandle?: number;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() _label!: LabelPropType;

	@Watch('_label') validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	/**
	 * Sets focus on the first focusable tree item.
	 */
	@Method()
	public async focus(): Promise<void> {
		const openItems = await this.getOpenTreeItemElements();
		await openItems?.[0]?.focus();
	}

	/**
	 * Invalidates the cache for open tree items.
	 * Called by tree-item when expand/collapse occurs.
	 * @internal
	 */
	@Method()
	public async invalidateOpenItemsCache(): Promise<void> {
		await Promise.resolve((this.cacheValid = false));
	}

	public render(): JSX.Element {
		return (
			<Host onSlotchange={this.handleSlotchange.bind(this)}>
				<nav class="kol-tree" aria-label={this.state._label}>
					<ul class="kol-tree__treeview-navigation" role="tree" aria-label={this.state._label}>
						<slot />
					</ul>
				</nav>
			</Host>
		);
	}

	private static isTreeItem(this: void, element?: HTMLElement | null): element is HTMLKolTreeItemElement {
		return element?.tagName === KolTreeItemTag.toUpperCase();
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);

		this.handleTreeChange();
		this.observeChildListMutations();
	}

	public disconnectedCallback(): void {
		this.observer?.disconnect();
	}

	private observeChildListMutations() {
		this.observer = new MutationObserver(() => this.scheduleTreeChange());
		this.observeTopLevelItems();
	}

	private handleSlotchange() {
		this.observeTopLevelItems();
		this.scheduleTreeChange();
	}

	private observeTopLevelItems() {
		this.getTopLevelTreeItems()?.forEach((treeItem) => {
			this.observer?.observe(treeItem, { childList: true, subtree: true });
		});
	}

	private scheduleTreeChange() {
		if (this.rafHandle) cancelAnimationFrame(this.rafHandle);
		this.rafHandle = requestAnimationFrame(() => {
			this.handleTreeChange();
		});
	}

	private getTopLevelTreeItems(): HTMLKolTreeItemElement[] {
		return (this.host?.querySelector('slot')?.assignedNodes?.() as HTMLElement[])?.filter(KolTreeWc.isTreeItem);
	}

	private handleTreeChange(): void {
		this.treeItemElements = this.getTreeItemElements();
		this.cacheValid = false;
		void this.ensureActiveItemVisibility();
	}

	/**
	 * Returns array of all TreeItem elements in the order they appear
	 */
	private getTreeItemElements(): HTMLKolTreeItemElement[] {
		return this.getTopLevelTreeItems()?.reduce((accumulator: HTMLKolTreeItemElement[], currentValue: HTMLKolTreeItemElement) => {
			const children = currentValue.querySelectorAll(KolTreeItemTag);

			return [...accumulator, currentValue, ...children];
		}, []);
	}

	private async getOpenTreeItemElements(): Promise<HTMLKolTreeItemElement[] | undefined> {
		if (!this.treeItemElements) {
			return;
		}

		// Cache-Hit: Return cached result
		if (this.cacheValid && this.cachedOpenItems) {
			return this.cachedOpenItems;
		}

		const areAllParentsOpen = async (element: HTMLKolTreeItemElement): Promise<boolean> => {
			let parent = element.parentElement as HTMLKolTreeItemElement | null;
			while (parent && KolTreeWc.isTreeItem(parent)) {
				if (!(await parent.isOpen())) {
					return false;
				}
				parent = parent.parentElement as HTMLKolTreeItemElement | null;
			}
			return true;
		};

		// Cache the result
		this.cachedOpenItems = await Promise.all(
			this.treeItemElements.map(async (item) => ({
				item,
				isOpen: await areAllParentsOpen(item),
			})),
		).then((results) => results.filter(({ isOpen }) => isOpen).map(({ item }) => item));
		this.cacheValid = true;

		return this.cachedOpenItems;
	}

	@Listen('keydown')
	public async handleKeyDown(event: KeyboardEvent) {
		const openItems = await this.getOpenTreeItemElements();
		const currentTreeItem: HTMLKolTreeItemElement | undefined | null = document.activeElement?.closest(KolTreeItemTag);
		const hasModifierKeyPressed = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

		if (!openItems || !currentTreeItem) {
			return;
		}

		const currentIndex = openItems?.findIndex((elem) => elem === currentTreeItem);

		switch (event.key) {
			case 'ArrowDown': {
				await openItems[currentIndex + 1]?.focus();
				event.preventDefault();
				break;
			}
			case 'ArrowUp': {
				await openItems[currentIndex - 1]?.focus();
				event.preventDefault();
				break;
			}
			case 'Right':
			case 'ArrowRight': {
				event.preventDefault();
				if (await currentTreeItem.isOpen()) {
					await openItems[currentIndex + 1]?.focus();
				} else {
					await currentTreeItem.expand();
				}
				break;
			}
			case 'Left':
			case 'ArrowLeft': {
				event.preventDefault();
				if (await currentTreeItem.isOpen()) {
					await currentTreeItem.collapse();
				} else {
					const parentItem = currentTreeItem.parentElement as HTMLKolTreeItemElement | null;
					const parentIndex = parentItem ? openItems.indexOf(parentItem) : -1;
					if (parentIndex !== -1) {
						await openItems[parentIndex]?.focus();
					}
				}

				break;
			}
			case 'Home': {
				await openItems[0]?.focus();
				event.preventDefault();
				break;
			}
			case 'End': {
				await openItems[openItems.length - 1]?.focus();
				event.preventDefault();
				break;
			}
			case event.key.match(/^[a-zA-Z0-9]$/)?.input: {
				/* Ignore events with any modifier key to avoid breaking native browser or OS shortcuts such as ⌘+L */
				if (!hasModifierKeyPressed) {
					const char = event.key.toLowerCase();
					const startIndex = openItems.indexOf(currentTreeItem) + 1;

					// Search from startIndex to end
					let matchIndex = openItems.slice(startIndex).findIndex((item) => item.getAttribute('_label')?.trim().toLowerCase().startsWith(char));

					// If not found, wrap around to beginning
					if (matchIndex === -1) {
						matchIndex = openItems.slice(0, startIndex).findIndex((item) => item.getAttribute('_label')?.trim().toLowerCase().startsWith(char));
						// Adjust matchIndex if found in wrap-around
						if (matchIndex !== -1) {
							// matchIndex is already correct (0-based from slice(0, startIndex))
						}
					} else {
						// matchIndex is from slice(startIndex), so add startIndex to get actual index
						matchIndex += startIndex;
					}

					if (matchIndex !== -1) {
						await openItems[matchIndex]?.focus();
						event.preventDefault();
					}
				}
				break;
			}
			case '*': {
				const siblings = currentTreeItem.parentElement?.querySelectorAll(KolTreeItemTag);
				siblings?.forEach((element) => {
					void element.expand();
				});
				break;
			}
		}
	}

	@Listen('focusin')
	public handleFocusIn(event: FocusEvent) {
		// Only delegate if no tree item is already focused
		if (event.target === this.host && !document.activeElement?.closest(KolTreeItemTag)) {
			// Defer to next frame to ensure tree is fully ready
			requestAnimationFrame(() => {
				void this.focus();
			});
		}
	}

	@Listen('focusout')
	public handleFocusOut(event: FocusEvent) {
		if (event.relatedTarget && !(event.relatedTarget as Element).closest(KolTreeTag)) {
			/* Tree lost focus */
			this.ensureActiveItemVisibility();
		}
	}

	private ensureActiveItemVisibility() {
		const findActiveItem = (): HTMLKolTreeItemElement | undefined => {
			const rootNodes = (this.host?.querySelector('slot')?.assignedNodes?.() as HTMLElement[])?.filter(KolTreeWc.isTreeItem) ?? [];
			for (const rootNode of rootNodes) {
				if (rootNode._active) {
					return rootNode;
				}
				const childMatch = rootNode.querySelector(`${KolTreeItemTag}[_active="true"]`);
				if (childMatch && (childMatch as HTMLKolTreeItemElement)._active) {
					return childMatch as HTMLKolTreeItemElement;
				}
			}
		};

		const expandParentElements = (element: HTMLKolTreeItemElement) => {
			if (KolTreeWc.isTreeItem(element.parentElement)) {
				void element.parentElement.expand();
				expandParentElements(element.parentElement);
			}
		};

		const target = findActiveItem();
		if (target) {
			expandParentElements(target);
		}
	}
}
