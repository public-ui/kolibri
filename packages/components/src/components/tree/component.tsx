import { Component, Element, h, Host, JSX, Listen, State } from '@stencil/core';

import { API, States } from './types';
import { TREE_ITEM_TAG_NAME } from './constants';

@Component({
	tag: 'kol-tree-wc',
	shadow: false,
})
export class KolTreeWc implements API {
	@Element() host!: HTMLElement;

	private observer?: MutationObserver;
	private treeItemElements?: HTMLKolTreeItemElement[];

	public render(): JSX.Element {
		return (
			<Host onSlotchange={this.handleSlotchange.bind(this)}>
				<nav aria-label="YYY">
					<ul class="treeview-navigation" role="tree" aria-label="YYY">
						<slot />
					</ul>
				</nav>
			</Host>
		);
	}

	@State() public state: States = {};

	public componentWillLoad(): void {
		this.updateTreeItemElements();
		this.observeChildListMutations();
	}

	public disconnectedCallback(): void {
		this.observer?.disconnect();
	}

	private observeChildListMutations() {
		this.observer = new MutationObserver(this.updateTreeItemElements.bind(this));
		this.observeTopLevelItems();
	}

	private handleSlotchange() {
		this.observeTopLevelItems();
	}

	private observeTopLevelItems() {
		this.getTopLevelTreeItems().forEach((treeItem) => {
			this.observer!.observe(treeItem, { childList: true, subtree: true });
		});
	}

	private getTopLevelTreeItems(): HTMLKolTreeItemElement[] {
		return (this.host.querySelector('slot')?.assignedNodes() as Element[]).filter(
			(node) => node.tagName === TREE_ITEM_TAG_NAME.toUpperCase()
		) as HTMLKolTreeItemElement[];
	}

	private updateTreeItemElements(): void {
		this.treeItemElements = this.getTreeItemElements();
	}

	/**
	 * Returns array of all TreeItem elements in the order they appear
	 */
	private getTreeItemElements(): HTMLKolTreeItemElement[] {
		const topLevelTreeItems: HTMLKolTreeItemElement[] = (this.host.querySelector('slot')?.assignedNodes() as Element[]).filter(
			(node) => node.tagName === TREE_ITEM_TAG_NAME.toUpperCase()
		) as HTMLKolTreeItemElement[];

		return topLevelTreeItems.reduce((accumulator: HTMLKolTreeItemElement[], currentValue: HTMLKolTreeItemElement) => {
			const children = currentValue.querySelectorAll(TREE_ITEM_TAG_NAME);

			return [...accumulator, currentValue, ...children];
		}, []);
	}

	private getVisibleTreeItemElements(): HTMLKolTreeItemElement[] | undefined {
		return this.treeItemElements?.filter((element) => !element.hasAttribute('hidden') && !element.closest('[hidden]'));
	}

	@Listen('keydown')
	public async handleKeyDown(event: KeyboardEvent) {
		const visibleItems = this.getVisibleTreeItemElements();
		const currentTreeItem: HTMLKolTreeItemElement | undefined | null = document.activeElement?.closest(TREE_ITEM_TAG_NAME);

		if (!visibleItems || !currentTreeItem) {
			return;
		}

		const currentIndex = visibleItems?.findIndex((elem) => elem === currentTreeItem);

		switch (event.key) {
			case 'ArrowDown': {
				await visibleItems[currentIndex + 1]?.focus();
				break;
			}
			case 'ArrowUp': {
				await visibleItems[currentIndex - 1]?.focus();
				break;
			}
			case 'ArrowRight': {
				await currentTreeItem.expand();
				break;
			}
			case 'ArrowLeft': {
				await currentTreeItem.collapse();
				break;
			}
			case '*': {
				const siblings = currentTreeItem.closest('kol-tree')?.querySelectorAll(TREE_ITEM_TAG_NAME);
				if (siblings) {
					siblings.forEach((element) => element.expand());
				}
				break;
			}
		}
	}
}
