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
	@Element() host!: HTMLKolToolbarElement;

	@State() public state: ToolbarStates = {
		_label: '',
		_items: [],
	};

	@State() private currentIndex: number = 0;

	private indexToElement = new Map<number, HTMLKolLinkElement | HTMLKolButtonElement>();

	private renderItem = (element: ToolbarItemPropType, index: number): JSX.Element => {
		const tabIndex = index === this.currentIndex && !element?._disabled ? 0 : -1;
		const props = {
			key: index,
			class: TOOLBAR_ITEM_TAG_NAME,
			_tabIndex: tabIndex,
		};
		const catchRef = (element?: HTMLKolLinkElement | HTMLKolButtonElement) => {
			element && this.indexToElement.set(index, element);
		};

		return '_href' in element ? (
			<KolLinkTag {...element} {...props} ref={catchRef}></KolLinkTag>
		) : (
			<KolButtonTag {...element} {...props} ref={catchRef}></KolButtonTag>
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
	 * Retrieves the toolbar item by index if defined.
	 * If not it use the current index of state.
	 *
	 * @returns An array of HTMLElements representing the toolbar items.
	 */
	private getCurrentToolbarItem(index?: number): ChildNode | undefined {
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
		const isArrowKey = event.code === 'ArrowRight' || event.code === 'ArrowLeft';
		if (!isArrowKey) return;
		event.preventDefault();

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
		void (this.getCurrentToolbarItem(nextIndex) as HTMLKolLinkElement | HTMLKolButtonElement | undefined)?.kolFocus();
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
