import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Prop, State, Watch } from '@stencil/core';

import type { LabelPropType, ToolbarAPI, ToolbarStates, ToolbarItemsPropType, ToolbarItemPropType } from '../../schema';
import { validateLabel, validateToolbarItems } from '../../schema';
import { KolButtonWcTag, KolLinkWcTag } from '../../core/component-names';
import type { KolLinkWc } from '../link/component';
import type { KolButtonWc } from '../button/component';

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

	private renderItem = (element: ToolbarItemPropType, index: number): JSX.Element => {
		const tabIndex = index === this.currentIndex && !element?._disabled ? 0 : -1;
		const props = {
			key: index,
			_tabIndex: tabIndex,
			class: `button normal ${TOOLBAR_ITEM_TAG_NAME}`,
		};
		const catchRef = (element?: HTMLKolLinkWcElement | HTMLKolButtonWcElement) => {
			if (element) this.indexToElement.set(index, element);
		};

		const { _icons, _disabled, ...rest } = element;

		return '_href' in element ? (
			<KolLinkWcTag {...(rest as KolLinkWc)} {...props} ref={catchRef} _icons={_icons} _disabled={_disabled} _role="button"></KolLinkWcTag>
		) : (
			<KolButtonWcTag {...(rest as KolButtonWc)} {...props} ref={catchRef} _icons={_icons} _disabled={_disabled}></KolButtonWcTag>
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
		this.state._items = value ?? [];
		this.setFirstEnabledItemIndex();
	}

	private getCurrentToolbarItem(index?: number) {
		return typeof index === 'number' ? this.indexToElement.get(index) : undefined;
	}

	private setFirstEnabledItemIndex() {
		const items = this.state._items || [];
		const firstEnabledIndex = items.findIndex((item) => !item._disabled);
		this.currentIndex = firstEnabledIndex >= 0 ? firstEnabledIndex : 0;

		// update all TabIndexes
		items.forEach((item, index) => {
			const element = this.indexToElement.get(index);
			if (element) {
				element._tabIndex = index === this.currentIndex && !item._disabled ? 0 : -1;
			}
		});
	}

	@Listen('keydown')
	handleKeyDown(event: KeyboardEvent) {
		if (event.code !== 'ArrowLeft' && event.code !== 'ArrowRight') return;
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
		const el = this.getCurrentToolbarItem(nextIndex);
		if (el) void el.kolFocus();
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
