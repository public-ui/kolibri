import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import type { LabelPropType, TreeAPI, TreeStates } from '../../schema';
import { validateLabel } from '../../schema';
import { KolTreeItemTag, KolTreeTag } from '../../core/component-names';

@Component({
	tag: 'kol-tree-wc',
	shadow: false,
})
export class KolTreeWc implements TreeAPI {
	@Element() host!: HTMLKolTreeWcElement;

	@State() public state: TreeStates = {
		_label: '',
	};
	private observer?: MutationObserver;
	private treeItemElements?: HTMLKolTreeItemElement[];

	/**
	 * Defines the label of the tree.
	 */
	@Prop() _label!: LabelPropType;

	@Watch('_label') validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	public render(): JSX.Element {
		return (
			<Host onSlotchange={this.handleSlotchange.bind(this)} class="kol-tree-wc">
				<nav class="tree" aria-label={this.state._label}>
					<ul class="treeview-navigation" role="tree" aria-label={this.state._label}>
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
		this.observer = new MutationObserver(this.handleTreeChange.bind(this));
		this.observeTopLevelItems();
	}

	private handleSlotchange() {
		this.observeTopLevelItems();
		this.handleTreeChange();
	}

	private observeTopLevelItems() {
		this.getTopLevelTreeItems()?.forEach((treeItem) => {
			this.observer?.observe(treeItem, { childList: true, subtree: true });
		});
	}

	private getTopLevelTreeItems(): HTMLKolTreeItemElement[] {
		return (this.host.querySelector('slot')?.assignedNodes?.() as HTMLElement[])?.filter(KolTreeWc.isTreeItem);
	}

	private handleTreeChange(): void {
		this.treeItemElements = this.getTreeItemElements();
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

		const areElementAndAllParentsOpen = async (element: HTMLKolTreeItemElement): Promise<boolean> => {
			if (!KolTreeWc.isTreeItem(element.parentElement)) {
				// parent is tree itself, top level is always open
				return true;
			} else {
				return (await element.parentElement.isOpen()) && (await areElementAndAllParentsOpen(element.parentElement));
			}
		};

		const elementsWithInclude = await Promise.all(
			this.treeItemElements.map(async (element) => ({
				value: element,
				include: await areElementAndAllParentsOpen(element),
			})),
		);

		return elementsWithInclude.filter((element) => element.include).map((element) => element.value);
	}

	@Listen('keydown')
	public async handleKeyDown(event: KeyboardEvent) {
		const openItems = await this.getOpenTreeItemElements();
		const currentTreeItem: HTMLKolTreeItemElement | undefined | null = document.activeElement?.closest(KolTreeItemTag);

		if (!openItems || !currentTreeItem) {
			return;
		}

		const currentIndex = openItems?.findIndex((elem) => elem === currentTreeItem);

		switch (event.key) {
			case 'ArrowDown': {
				await openItems[currentIndex + 1]?.focusLink();
				event.preventDefault();
				break;
			}
			case 'ArrowUp': {
				await openItems[currentIndex - 1]?.focusLink();
				event.preventDefault();
				break;
			}
			case 'Right':
			case 'ArrowRight': {
				event.preventDefault();
				if (await currentTreeItem.isOpen()) {
					await openItems[currentIndex + 1]?.focusLink();
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
					const parentIndex = openItems.findIndex((item) => item === currentTreeItem.parentElement);
					parentIndex !== -1 && (await openItems[parentIndex]?.focusLink());
				}

				break;
			}
			case 'Home': {
				await openItems[0]?.focusLink();
				event.preventDefault();
				break;
			}
			case 'End': {
				await openItems[openItems.length - 1]?.focusLink();
				event.preventDefault();
				break;
			}
			case event.key.match(/[a-zA-Z0-9]/)?.input: {
				const char = event.key.toLowerCase();
				const startIndex = openItems.indexOf(currentTreeItem) + 1;
				const wrapAroundItems = openItems.concat(openItems);
				const matchIndex = wrapAroundItems
					.slice(startIndex, startIndex + openItems.length)
					.findIndex((item) => item.getAttribute('_label')?.trim().toLowerCase().startsWith(char));

				if (matchIndex !== -1) {
					await wrapAroundItems[startIndex + matchIndex].focusLink();
					event.preventDefault();
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

	@Listen('focusout')
	public async handleFocusOut(event: FocusEvent) {
		if (event.relatedTarget && !(event.relatedTarget as Element).closest(KolTreeTag)) {
			/* Tree lost focus */
			await this.ensureActiveItemVisibility();
		}
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	private async ensureActiveItemVisibility() {
		const findActiveItem = (): HTMLKolTreeItemElement | undefined => {
			const rootNodes = (this.host.querySelector('slot')?.assignedNodes?.() as HTMLElement[])?.filter(KolTreeWc.isTreeItem) ?? [];
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
