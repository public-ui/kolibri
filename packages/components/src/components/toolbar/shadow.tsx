import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import type { LabelPropType, ToolbarAPI, ToolbarStates, ToolbarItemsPropType, ToolbarItemPropType } from '../../schema';
import { validateLabel, validateToolbarItems } from '../../schema';
import { KolButtonWcTag, KolLinkWcTag } from '../../core/component-names';

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

	private indexToElement = new Map<number, HTMLKolLinkWcElement | HTMLKolButtonWcElement>();
	private normalizeItem(item: ToolbarItemPropType): ToolbarItemPropType {
		const { _icons, _disabled, ...rest } = item as any;
		return { ...rest, _icons, _disabled } as ToolbarItemPropType;
	}

	private renderItem = (raw: ToolbarItemPropType, index: number): JSX.Element => {
		const element = this.normalizeItem(raw);
		const tabIndex = index === this.currentIndex && !element?._disabled ? 0 : -1;
		const props = {
			key: index,
			_tabIndex: tabIndex,
			class: `button normal ${TOOLBAR_ITEM_TAG_NAME} `,
		};
		const catchRef = (el?: HTMLKolLinkWcElement | HTMLKolButtonWcElement) => {
			if (el) this.indexToElement.set(index, el);
		};

		return '_href' in element ? (
			<KolLinkWcTag {...element} {...props} ref={catchRef}></KolLinkWcTag>
		) : (
			<KolButtonWcTag {...element} {...props} ref={catchRef}></KolButtonWcTag>
		);
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-toolbar">
				<div class="toolbar" role="toolbar" aria-label={this.state._label}>
					{this.state._items.map(this.renderItem)}
				</div>
			</Host>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
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
		this.indexToElement.clear();
		this.setFirstEnabledItemIndex();
	}

	/**
	 * Retrieves the toolbar item by index if defined.
	 * If not it use the current index of state.
	 *
	 * @returns An array of HTMLElements representing the toolbar items.
	 */
	private getCurrentToolbarItem(index?: number): HTMLKolLinkWcElement | HTMLKolButtonWcElement | undefined {
		return typeof index === 'number' ? this.indexToElement.get(index) : undefined;
	}

	/**
	 * Sets the index of the first enabled toolbar item.
	 */
	private setFirstEnabledItemIndex() {
		this.currentIndex = this.state._items?.findIndex((item) => !item._disabled);
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		const isArrowKey = event.code === 'ArrowRight' || event.code === 'ArrowLeft' || event.code === 'ArrowUp' || event.code === 'ArrowDown';
		if (!isArrowKey) return;
		event.preventDefault();

		const lastItemIndex = (this._items?.length ?? 0) - 1;
		if (lastItemIndex < 0) return;

		const currentIndex = this.currentIndex;
		let nextIndex = currentIndex;

		switch (event.code) {
			case 'ArrowUp':
			case 'ArrowLeft':
				nextIndex = currentIndex > 0 ? currentIndex - 1 : lastItemIndex;
				break;
			case 'ArrowDown':
			case 'ArrowRight':
				nextIndex = currentIndex < lastItemIndex ? currentIndex + 1 : 0;
				break;
		}

		if (currentIndex === nextIndex) return;

		if (this.state._items?.[nextIndex]?._disabled) return;

		this.currentIndex = nextIndex;
		void (this.getCurrentToolbarItem(nextIndex) as HTMLKolLinkWcElement | HTMLKolButtonWcElement | undefined)?.kolFocus();
	}

	/**
	 * Resets the tabIndexes of the toolbar to default.
	 */
	@Listen('blur', { capture: true })
	public handleBlur(event: FocusEvent) {
		if (event.target === this.host) this.setFirstEnabledItemIndex();
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateItems(this._items);
		this.setFirstEnabledItemIndex();
	}
}
