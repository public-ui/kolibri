import type { JSX } from '@stencil/core';
import { Component, Element, h, Listen, Method, Prop, State, Watch } from '@stencil/core';

import { getFeatureFlag } from 'adopted-style-sheets';
import { KolButtonWcTag, KolLinkWcTag } from '../../core/component-names';
import type {
	ClickableElement,
	FocusableElement,
	KolFocusOptions,
	LabelPropType,
	ToolbarAPI,
	ToolbarItemPropType,
	ToolbarItemsPropType,
	ToolbarStates,
} from '../../schema';
import { validateLabel, validateToolbarItems } from '../../schema';
import { KeyboardKey } from '../../schema/enums';
import type { OrientationPropType } from '../../schema/props/orientation';
import { validateOrientation } from '../../schema/props/orientation';
import { delegateClick, setClick } from '../../utils/element-click';
import { delegateFocus, setFocus } from '../../utils/element-focus';

@Component({
	tag: 'kol-toolbar',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolToolbar implements ClickableElement, FocusableElement, ToolbarAPI {
	@Element() private readonly host?: HTMLElement;

	@State() public state: ToolbarStates = {
		_label: '',
		_items: [],
	};

	@State() private currentIndex: number = 0;

	private indexToElement = new Map<number, HTMLKolLinkWcElement | HTMLKolButtonWcElement>();

	/**
	 * Sets focus on the currently active toolbar item.
	 */
	@Method()
	public async focus(options?: KolFocusOptions): Promise<void> {
		if (this.isCurrentItemDisabled()) {
			return;
		}
		const firstEnabledItem = this.indexToElement.get(this.currentIndex);
		if (firstEnabledItem) {
			return delegateFocus(this.host!, () => setFocus(firstEnabledItem, options));
		}
	}

	/**
	 * Triggers a click on the currently active toolbar item.
	 */
	@Method()
	public async click(): Promise<void> {
		if (this.isCurrentItemDisabled()) {
			return;
		}
		const currentItem = this.indexToElement.get(this.currentIndex);
		if (currentItem) {
			return delegateClick(this.host!, async () => setClick(currentItem));
		}
	}

	/**
	 * Whether the item the roving tabindex currently points at refuses interaction. The index is
	 * seeded with the first enabled item, but an item can be disabled again while it is current.
	 */
	private isCurrentItemDisabled(): boolean {
		return this.state._items?.[this.currentIndex]?._disabled === true;
	}

	private normalizeItem(item: ToolbarItemPropType): ToolbarItemPropType {
		const { _icons, _disabled, ...rest } = item;
		return { ...rest, _icons, _disabled };
	}
	private renderItem = (raw: ToolbarItemPropType, index: number): JSX.Element => {
		const element = this.normalizeItem(raw);
		const tabIndex = index === this.currentIndex && !element?._disabled ? 0 : -1;

		const props = {
			key: index,
			class: 'kol-toolbar__item',
			_tabIndex: tabIndex,
			_inline: false,
			_variant: getFeatureFlag('buttonVariantDefault', this.host) ?? 'normal',
		};
		const catchRef = (el?: HTMLKolLinkWcElement | HTMLKolButtonWcElement) => {
			if (el) this.indexToElement.set(index, el);
		};
		return element.type === 'link' ? (
			<KolLinkWcTag {...props} {...element} ref={catchRef}></KolLinkWcTag>
		) : (
			<KolButtonWcTag {...props} {...element} ref={catchRef}></KolButtonWcTag>
		);
	};

	public render(): JSX.Element {
		return (
			<div class={`kol-toolbar kol-toolbar--orientation-${this.state._orientation}`} role="toolbar" aria-label={this.state._label}>
				{this.state._items.map(this.renderItem)}
			</div>
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

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 */
	@Prop() public _orientation?: OrientationPropType;

	@Watch('_label') validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_items')
	public validateItems(value?: ToolbarItemsPropType): void {
		validateToolbarItems(this, value);
		this.indexToElement.clear();
		this.setFirstEnabledItemIndex();
	}

	@Watch('_orientation')
	public validateOrientation(value?: OrientationPropType): void {
		validateOrientation(this, value);
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

	/**
	 * Walks the items from `fromIndex` in `step` direction, wrapping around, and returns the first
	 * enabled one.
	 *
	 * Disabled items are skipped rather than blocking the walk: stopping at the first disabled
	 * neighbour makes every item behind it unreachable by keyboard, which is how the toolbar
	 * behaved before.
	 *
	 * @returns the index to move to, or `undefined` when no other item is enabled.
	 */
	private findNextEnabledItemIndex(fromIndex: number, step: -1 | 1, lastItemIndex: number): number | undefined {
		const itemCount = lastItemIndex + 1;
		for (let offset = 1; offset <= itemCount; offset++) {
			const candidate = (((fromIndex + step * offset) % itemCount) + itemCount) % itemCount;
			if (!this.state._items?.[candidate]?._disabled) {
				return candidate;
			}
		}
		return undefined;
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent) {
		const pressedKey = event.code as KeyboardKey;
		const isArrowKey = [KeyboardKey.ArrowUp, KeyboardKey.ArrowDown, KeyboardKey.ArrowRight, KeyboardKey.ArrowLeft].includes(pressedKey);
		if (!isArrowKey) return;
		event.preventDefault();

		const lastItemIndex = (this._items?.length ?? 0) - 1;
		if (lastItemIndex < 0) return;
		const currentIndex = this.currentIndex;
		const step = pressedKey === KeyboardKey.ArrowUp || pressedKey === KeyboardKey.ArrowLeft ? -1 : 1;
		const nextIndex = this.findNextEnabledItemIndex(currentIndex, step, lastItemIndex);

		if (nextIndex === undefined || currentIndex === nextIndex) {
			return;
		}

		this.currentIndex = nextIndex;
		const item = this.getCurrentToolbarItem(nextIndex);
		if (this.host) {
			void item?.focus();
		}
	}

	/**
	 * Resets the tabIndexes of the toolbar to default.
	 */
	@Listen('focusout', { capture: true })
	public handleFocusout(event: FocusEvent) {
		if (event.target === this.host) this.setFirstEnabledItemIndex();
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateItems(this._items);
		this.validateOrientation(this._orientation);
		this.setFirstEnabledItemIndex();
	}
}
