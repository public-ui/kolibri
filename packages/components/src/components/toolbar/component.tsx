import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import type { LabelPropType, ToolbarAPI, ToolbarStates, ToolbarItemsPropType, ToolbarItemPropType } from '../../schema';
import { validateLabel, validateToolbarItems } from '../../schema';
import { KolLinkTag, KolButtonTag } from '../../core/component-names';

const TOOLBAR_ITEM_TAG_NAME = 'kol-toolbar-item';

@Component({
	tag: 'kol-toolbar',
	styleUrl: './style.scss',
	shadow: false,
})
export class KolToolbar implements ToolbarAPI {
	@Element() host!: HTMLElement;

	@State() public state: ToolbarStates = {
		_label: '',
		_items: [],
	};

	private readonly renderElement = (element: ToolbarItemPropType, index: number): JSX.Element => (
		<div key={index} class={`${TOOLBAR_ITEM_TAG_NAME}`}>
			{'_href' in element ? <KolLinkTag {...element}></KolLinkTag> : <KolButtonTag {...element}></KolButtonTag>}
		</div>
	);

	public render(): JSX.Element {
		return (
			<Host class="kol-toolbar">
				<div class="toolbar" role="toolbar" aria-label={this._label}>
					{(this.state._items as ToolbarItemPropType[]).map(this.renderElement)}
				</div>
			</Host>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;

	/**
	 * Defines the elements of toolbar to render.
	 */
	@Prop() public _items!: ToolbarItemsPropType;

	@Watch('_label') validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_items')
	public validateItems(value?: ToolbarItemsPropType): void {
		validateToolbarItems(this, value);
	}

	/**
	 * Retrieves all toolbar items within the host element.
	 * 
	 * @returns An array of HTMLElements representing the toolbar items.
	*/
	private getToolbarItems(): HTMLElement[] {
		return Array.from(this.host.querySelectorAll(`.${TOOLBAR_ITEM_TAG_NAME}`));
	}
	
	/**
	 * Finds the first focusable child element within a given toolbar item.
	 * Focusable elements include 'kol-button' and 'kol-link'.
	 * 
	 * @param element - The toolbar item element to search within.
	 * @returns The first focusable child element, or null if none is found.
	*/
	private getFocusableChild(element: HTMLElement): HTMLElement | null {
		return element.querySelector('kol-button, kol-link') as HTMLElement | null;
	}
	
	/**
	 * Traverses up the DOM tree from a given element to find its parent toolbar item.
	 * 
	 * @param element - The starting element to begin the traversal from.
	 * @returns The parent toolbar item element, or null if none is found.
	*/
	private getActiveToolbarItem(element: Element | null): HTMLElement | null {
		while (element && !element.classList.contains(TOOLBAR_ITEM_TAG_NAME)) {
			element = element.parentElement;
		}
		return element as HTMLElement | null;
	}
	
	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		const isArrowKey = event.code === 'ArrowRight' || event.code === 'ArrowLeft';
		if (!isArrowKey) return;

		event.preventDefault();
		const elements = this.getToolbarItems();
		const currentElement = this.getActiveToolbarItem(document.activeElement);
		const currentIndex = elements.indexOf(currentElement as HTMLElement);

		const nextIndex = event.code === 'ArrowRight'
			? (currentIndex + 1) % elements.length
			: (currentIndex - 1 + elements.length) % elements.length;

		if (elements.length > 0 && currentIndex !== -1) {
			const currentChild = this.getFocusableChild(elements[currentIndex]);
			if (currentChild) {
				currentChild.setAttribute('tabindex', '-1');
				currentChild.blur();
			}
		}

		const nextChild = this.getFocusableChild(elements[nextIndex]);
		if (nextChild) {
			nextChild.setAttribute('tabindex', '0');
			nextChild.focus();
		}
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateItems(this._items);
	}
}
