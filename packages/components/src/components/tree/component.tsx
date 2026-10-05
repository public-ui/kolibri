import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Method, Prop, Watch } from '@stencil/core';

import { KolTreeItemTag, KolTreeTag } from '../../core/component-names';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { TreeApi } from '../../internal/functional-components/tree/api';
import { treePropsConfig } from '../../internal/functional-components/tree/api';
import { TreeFC } from '../../internal/functional-components/tree/component';
import { labelWithExpertSlotProp } from '../../internal/props';
import type { FocusableElement, KolFocusOptions, LabelPropType, TreeProps } from '../../schema';
import { delegateFocus } from '../../utils/element-focus';
import { registerOpenItemsCache, unregisterOpenItemsCache } from './open-items-cache';

const isTreeItem = (element?: Element | null): element is HTMLKolTreeItemElement => element?.tagName === KolTreeItemTag.toUpperCase();

/**
 * @slot - Children as TreeItem Components
 */
@Component({
	tag: 'kol-tree',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTree extends BaseWebComponent<TreeApi> implements FocusableElement, TreeProps, WebComponentInterface<TreeApi> {
	@Element() protected readonly host?: HTMLKolTreeElement;

	private observer?: MutationObserver;
	private treeItemElements?: HTMLKolTreeItemElement[];
	private cachedOpenItems?: HTMLKolTreeItemElement[];
	private cacheValid = false;
	private rafHandle?: number;

	// --- Lifecycle ---

	public connectedCallback(): void {
		if (this.host) {
			registerOpenItemsCache(this.host, this.invalidateOpenItemsCache);
		}
	}

	public componentWillLoad(): void {
		this.initRenderProps(treePropsConfig);
		this.watchLabel(this._label);

		this.handleTreeChange();
		this.observeChildListMutations();
	}

	public disconnectedCallback(): void {
		if (this.host) {
			unregisterOpenItemsCache(this.host);
		}
		this.observer?.disconnect();
		if (this.rafHandle !== undefined) {
			cancelAnimationFrame(this.rafHandle);
			this.rafHandle = undefined;
		}
	}

	// --- Public methods ---

	/**
	 * Sets focus on the first focusable tree item.
	 */
	@Method()
	public async focus(options?: KolFocusOptions): Promise<void> {
		if (this.host) {
			await delegateFocus(this.host, async () => {
				const openItems = await this.getOpenTreeItemElements();
				await openItems?.[0]?.focus(options);
			});
		}
	}

	// --- Tree item tracking ---

	/** Called by a tree item of this tree whenever it expands or collapses. */
	private readonly invalidateOpenItemsCache = (): void => {
		this.cacheValid = false;
	};

	private readonly handleSlotchange = (): void => {
		this.observeTopLevelItems();
		this.scheduleTreeChange();
	};

	private observeChildListMutations(): void {
		this.observer = new MutationObserver(() => this.scheduleTreeChange());
		this.observeTopLevelItems();
	}

	private observeTopLevelItems(): void {
		this.getTopLevelTreeItems().forEach((treeItem) => {
			this.observer?.observe(treeItem, { childList: true, subtree: true });
		});
	}

	private scheduleTreeChange(): void {
		if (this.rafHandle) cancelAnimationFrame(this.rafHandle);
		this.rafHandle = requestAnimationFrame(() => {
			this.handleTreeChange();
		});
	}

	/**
	 * The tree items assigned to the default slot. Read from the host's children rather than from
	 * the slot, because the slot is not rendered yet when `componentWillLoad` needs them.
	 */
	private getTopLevelTreeItems(): HTMLKolTreeItemElement[] {
		return Array.from(this.host?.children ?? []).filter((element): element is HTMLKolTreeItemElement => isTreeItem(element) && !element.slot);
	}

	private handleTreeChange(): void {
		this.treeItemElements = this.getTreeItemElements();
		this.cacheValid = false;
		this.ensureActiveItemVisibility();
	}

	/**
	 * Returns array of all TreeItem elements in the order they appear
	 */
	private getTreeItemElements(): HTMLKolTreeItemElement[] {
		return this.getTopLevelTreeItems().reduce((accumulator: HTMLKolTreeItemElement[], currentValue: HTMLKolTreeItemElement) => {
			const children = currentValue.querySelectorAll(KolTreeItemTag);

			return [...accumulator, currentValue, ...children];
		}, []);
	}

	private async getOpenTreeItemElements(): Promise<HTMLKolTreeItemElement[] | undefined> {
		if (!this.treeItemElements) {
			return;
		}

		if (this.cacheValid && this.cachedOpenItems) {
			return this.cachedOpenItems;
		}

		const areAllParentsOpen = async (element: HTMLKolTreeItemElement): Promise<boolean> => {
			let parent = element.parentElement;
			while (isTreeItem(parent)) {
				if (!(await parent.isOpen())) {
					return false;
				}
				parent = parent.parentElement;
			}
			return true;
		};

		this.cachedOpenItems = await Promise.all(
			this.treeItemElements.map(async (item) => ({
				item,
				isOpen: await areAllParentsOpen(item),
			})),
		).then((results) => results.filter(({ isOpen }) => isOpen).map(({ item }) => item));
		this.cacheValid = true;

		return this.cachedOpenItems;
	}

	private ensureActiveItemVisibility(): void {
		const findActiveItem = (): HTMLKolTreeItemElement | undefined => {
			for (const rootNode of this.getTopLevelTreeItems()) {
				if (rootNode._active) {
					return rootNode;
				}
				const childMatch = rootNode.querySelector<HTMLKolTreeItemElement>(`${KolTreeItemTag}[_active="true"]`);
				if (childMatch?._active) {
					return childMatch;
				}
			}
		};

		const expandParentElements = (element: HTMLKolTreeItemElement): void => {
			if (isTreeItem(element.parentElement)) {
				void element.parentElement.expand();
				expandParentElements(element.parentElement);
			}
		};

		const target = findActiveItem();
		if (target) {
			expandParentElements(target);
		}
	}

	// --- Keyboard and focus handling ---

	@Listen('keydown')
	public async handleKeyDown(event: KeyboardEvent): Promise<void> {
		const openItems = await this.getOpenTreeItemElements();
		const currentTreeItem: HTMLKolTreeItemElement | undefined | null = document.activeElement?.closest(KolTreeItemTag);
		const hasModifierKeyPressed = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

		if (!openItems || !currentTreeItem) {
			return;
		}

		const currentIndex = openItems.findIndex((elem) => elem === currentTreeItem);

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
					const startIndex = currentIndex + 1;
					const startsWithChar = (item: HTMLKolTreeItemElement): boolean => item.getAttribute('_label')?.trim().toLowerCase().startsWith(char) ?? false;

					// Search from the item after the current one to the end, then wrap around.
					let matchIndex = openItems.slice(startIndex).findIndex(startsWithChar);
					if (matchIndex === -1) {
						matchIndex = openItems.slice(0, startIndex).findIndex(startsWithChar);
					} else {
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
	public handleFocusIn(event: FocusEvent): void {
		// Only delegate if no tree item is already focused
		if (event.target === this.host && !document.activeElement?.closest(KolTreeItemTag)) {
			// Defer to next frame to ensure tree is fully ready
			requestAnimationFrame(() => {
				void this.focus();
			});
		}
	}

	@Listen('focusout')
	public handleFocusOut(event: FocusEvent): void {
		if (event.relatedTarget && !(event.relatedTarget as Element).closest(KolTreeTag)) {
			/* Tree lost focus */
			this.ensureActiveItemVisibility();
		}
	}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<TreeFC handleSlotchange={this.handleSlotchange} label={this.getRenderProp('label')} />
			</Host>
		);
	}

	// --- Props + Watchers ---

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp('label', v));
	}
}
