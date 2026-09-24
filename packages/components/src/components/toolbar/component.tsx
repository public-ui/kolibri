import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { ToolbarApi } from '../../internal/functional-components/toolbar/api';
import { toolbarPropsConfig } from '../../internal/functional-components/toolbar/api';
import { ToolbarFC } from '../../internal/functional-components/toolbar/component';
import type { ToolbarButtonItem, ToolbarLinkItem } from '../../internal/functional-components/toolbar/item';
import { createToolbarItem } from '../../internal/functional-components/toolbar/item';
import { labelWithExpertSlotProp, orientationProp, toolbarItemsProp } from '../../internal/props';
import type { ClickableElement, FocusableElement, KolFocusOptions, ToolbarItemsPropType, ToolbarProps } from '../../schema';
import { KeyboardKey } from '../../schema/enums';
import type { OrientationPropType } from '../../schema/props/orientation';
import { delegateClick, setClick } from '../../utils/element-click';
import { delegateFocus, setFocus } from '../../utils/element-focus';
import type { UnsubscribeFunction } from '../link/ariaCurrentService';
import { onLocationChange } from '../link/ariaCurrentService';

const ARROW_KEYS: KeyboardKey[] = [KeyboardKey.ArrowUp, KeyboardKey.ArrowDown, KeyboardKey.ArrowRight, KeyboardKey.ArrowLeft];

@Component({
	tag: 'kol-toolbar',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolToolbar extends BaseWebComponent<ToolbarApi> implements ClickableElement, FocusableElement, ToolbarProps, WebComponentInterface<ToolbarApi> {
	@Element() protected readonly host?: HTMLKolToolbarElement;

	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(toolbarPropsConfig);

		this.watchLabel(this._label);
		this.watchItems(this._items);
		this.watchOrientation(this._orientation);

		this.unsubscribeOnLocationChange = onLocationChange((location) => {
			this.location = location;
		});
	}

	public componentDidRender(): void {
		this.itemRecords.forEach((record) => record.syncListeners());
	}

	public disconnectedCallback(): void {
		if (this.unsubscribeOnLocationChange) {
			this.unsubscribeOnLocationChange();
			this.unsubscribeOnLocationChange = undefined;
		}
		this.itemRecords.forEach((record) => record.destroy());
	}

	// --- Public methods ---

	/**
	 * Sets focus on the currently active toolbar item.
	 */
	@Method()
	public async focus(options?: KolFocusOptions): Promise<void> {
		const element = this.getCurrentItemElement();
		if (element) {
			return delegateFocus(this.host!, () => setFocus(element, options));
		}
	}

	/**
	 * Triggers a click on the currently active toolbar item.
	 */
	@Method()
	public async click(): Promise<void> {
		const element = this.getCurrentItemElement();
		if (element) {
			return delegateClick(this.host!, async () => setClick(element));
		}
	}

	// --- Roving tabindex ---

	/**
	 * The interactive element the roving tabindex points at, or `undefined` while that item is
	 * disabled: the index is seeded with the first enabled item, but an item can be disabled again
	 * while it is current.
	 */
	private getCurrentItemElement(): HTMLAnchorElement | HTMLButtonElement | undefined {
		const record = this.itemRecords[this.currentIndex];
		return record && !record.disabled ? record.getElement() : undefined;
	}

	private setFirstEnabledItemIndex(): void {
		this.currentIndex = this.itemRecords.findIndex((record) => !record.disabled);
	}

	/**
	 * Walks the items from `fromIndex` in `step` direction, wrapping around, and returns the first
	 * enabled one.
	 *
	 * Disabled items are skipped rather than blocking the walk: stopping at the first disabled
	 * neighbour would make every item behind it unreachable by keyboard.
	 *
	 * @returns the index to move to, or `undefined` when no other item is enabled.
	 */
	private findNextEnabledItemIndex(fromIndex: number, step: -1 | 1): number | undefined {
		const itemCount = this.itemRecords.length;
		for (let offset = 1; offset <= itemCount; offset++) {
			const candidate = (((fromIndex + step * offset) % itemCount) + itemCount) % itemCount;
			if (!this.itemRecords[candidate].disabled) {
				return candidate;
			}
		}
		return undefined;
	}

	// --- Listeners ---

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent): void {
		const pressedKey = event.code as KeyboardKey;
		if (!ARROW_KEYS.includes(pressedKey)) return;
		event.preventDefault();

		if (this.itemRecords.length === 0) return;
		const step = pressedKey === KeyboardKey.ArrowUp || pressedKey === KeyboardKey.ArrowLeft ? -1 : 1;
		const nextIndex = this.findNextEnabledItemIndex(this.currentIndex, step);

		if (nextIndex === undefined || nextIndex === this.currentIndex) {
			return;
		}

		this.currentIndex = nextIndex;
		void this.itemRecords[nextIndex].getElement()?.focus();
	}

	/**
	 * Resets the roving tabindex to the first enabled item once focus leaves the toolbar.
	 */
	@Listen('focusout', { capture: true })
	public handleFocusout(event: FocusEvent): void {
		if (event.target === this.host) this.setFirstEnabledItemIndex();
	}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<ToolbarFC
					currentIndex={this.currentIndex}
					itemRecords={this.itemRecords}
					label={this.getRenderProp('label')}
					location={this.location}
					orientation={this.getRenderProp('orientation')}
				/>
			</Host>
		);
	}

	// --- States ---

	@State() public currentIndex: number = 0;

	@State() public itemRecords: Array<ToolbarButtonItem | ToolbarLinkItem> = [];

	@State() public location: string = '';

	// --- Props + Watchers ---

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: string;
	@Watch('_label')
	public watchLabel(value?: string): void {
		labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Defines the functional elements of toolbar to render (e.g. kol-link, kol-button).
	 */
	@Prop() public _items!: ToolbarItemsPropType;
	@Watch('_items')
	public watchItems(value?: ToolbarItemsPropType): void {
		toolbarItemsProp.apply(value, (items) => {
			this.setRenderProp('items', items);
			this.itemRecords.forEach((record) => record.destroy());
			this.itemRecords = items.map((item) => createToolbarItem(item, () => this.host));
			this.setFirstEnabledItemIndex();
		});
	}

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 */
	@Prop() public _orientation?: OrientationPropType;
	@Watch('_orientation')
	public watchOrientation(value?: OrientationPropType): void {
		orientationProp.apply(value, (v) => this.setRenderProp('orientation', v));
	}
}
