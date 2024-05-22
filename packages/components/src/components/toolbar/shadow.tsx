import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import type { LabelPropType, ToolbarAPI, ToolbarStates, ToolbarItemsPropType, ToolbarItemPropType } from '../../schema';
import { validateLabel, validateToolbarItems } from '../../schema';
import { KolLinkTag, KolButtonTag } from '../../core/component-names';

const TOOLBAR_ITEM_TAG_NAME = 'kol-toolbar-item';

@Component({
	tag: 'kol-toolbar',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolToolbar implements ToolbarAPI {
	@Element() host!: HTMLElement;

	@State() public state: ToolbarStates = {
		_label: '',
		_items: [],
	};

	@State() private currentIndex: number = 0;

	private renderElement = (element: ToolbarItemPropType, index: number): JSX.Element => {
		const tabIndex = index === this.currentIndex && !element?._disabled ? 0 : -1;
		const props = {
			key: index,
			class: TOOLBAR_ITEM_TAG_NAME,
			_tabIndex: tabIndex,
		};
		if ('_href' in element) {
			return <KolLinkTag {...element} {...props}></KolLinkTag>;
		}
		return <KolButtonTag {...element} {...props}></KolButtonTag>;
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-toolbar">
				<div class="toolbar" role="toolbar" aria-label={this.state._label}>
					{(this.state._items as ToolbarItemPropType[]).map(this.renderElement)}
				</div>
			</Host>
		);
	}

	/**
	 * Defines the semantic aria-label of the component.
	 */
	@Prop() public _label!: string;

	/**
	 * Defines the functional elements of toolbar to render (e.g. kol-link, kol-button).
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
	 * Retrieves the toolbar.
	 *
	 * @returns An array of HTMLElements representing the toolbar items.
	 */
	private getToolbar(): HTMLElement | null | undefined {
		return this.host.shadowRoot?.querySelector('.toolbar');
	}

	/**
	 * Retrieves all toolbar items within the host element.
	 *
	 * @returns An array of HTMLElements representing the toolbar items.
	 */
	private getToolbarItems(): HTMLElement[] {
		const toolbar = this.getToolbar();
		if (!toolbar) return [];
		return Array.from(toolbar.querySelectorAll(`.${TOOLBAR_ITEM_TAG_NAME}`));
	}

	/**
	 * Finds the first enabled toolbar item.
	 *
	 * @returns Returns the index of the first enabled toolbar item.
	 */
	private getFirstEnabledItemIndex(): number {
		const toolbarItems = this._items as ToolbarItemPropType[];
		let firstEnabledItemIndex: number | null = null;
		toolbarItems?.forEach((item, index) => {
			if (firstEnabledItemIndex === null && !item._disabled) return (firstEnabledItemIndex = index);
		});
		return firstEnabledItemIndex ?? 0;
	}

	/**
	 * Sets the index of the first enabled toolbar item.
	 */
	private setFirstEnabledItemIndex() {
		this.currentIndex = this.getFirstEnabledItemIndex();
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		if (event.code === 'Tab') {
			const toolbar = this.getToolbar();
			return toolbar?.blur();
		}

		const isArrowKey = event.code === 'ArrowRight' || event.code === 'ArrowLeft';
		if (!isArrowKey) return;
		event.preventDefault();

		const items = this.getToolbarItems();
		const lastItemIndex = this._items?.length - 1;
		const currentIndex = this.currentIndex;
		let nextIndex = 0;

		switch (event.code) {
			case 'ArrowLeft':
				nextIndex = currentIndex !== nextIndex ? currentIndex - 1 : lastItemIndex;
				break;
			case 'ArrowRight':
				if (lastItemIndex !== currentIndex) nextIndex = currentIndex + 1;
				break;
		}
		if (currentIndex === nextIndex) return;

		this.currentIndex = nextIndex;
		items[nextIndex].focus();
	}

	@Listen('focusin')
	public handleFocusIn() {
		const items = this.getToolbarItems();
		items[this.currentIndex].focus();
	}

	@Listen('blur', { capture: true })
	public handleBlur(event: FocusEvent) {
		if (event.target === this.host) this.setFirstEnabledItemIndex();
	}

	public componentDidLoad(): void {
		this.setFirstEnabledItemIndex();
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateItems(this._items);
	}
}
