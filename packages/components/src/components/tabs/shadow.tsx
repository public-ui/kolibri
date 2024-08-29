import type {
	AlignPropType,
	ButtonCallbacksPropType,
	KoliBriTabsCallbacks,
	LabelPropType,
	StencilUnknown,
	Stringified,
	TabBehaviorPropType,
	TabButtonProps,
	TabsAPI,
	TabsStates,
} from '../../schema';
import {
	devHint,
	featureHint,
	koliBriQuerySelector,
	Log,
	setState,
	uiUxHintMillerscheZahl,
	validateAlign,
	validateLabel,
	validateTabBehavior,
	watchJsonArrayString,
	watchNumber,
} from '../../schema';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';

import type { JSX } from '@stencil/core';
import type { Generic } from 'adopted-style-sheets';
import { KolButtonGroupWcTag, KolButtonWcTag } from '../../core/component-names';
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html

enum Key {
	ArrowDown = 'ArrowDown',
	ArrowLeft = 'ArrowLeft',
	ArrowRight = 'ArrowRight',
	ArrowUp = 'ArrowUp',
	Enter = 'Enter',
	Space = ' ',
}

@Component({
	tag: 'kol-tabs',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTabs implements TabsAPI {
	@Element() private readonly host?: HTMLKolTabsElement;
	private tabPanelsElement?: HTMLElement;
	private onCreateLabel = `${translate('kol-new')} …`;
	private showCreateTab = false;
	private currentFocusIndex: number | undefined;

	private nextPossibleTabIndex = (tabs: TabButtonProps[], offset: number, step = 1): number => {
		const nextOffset = offset + step;

		if (nextOffset < tabs.length) {
			if (tabs[nextOffset]._disabled) {
				return this.nextPossibleTabIndex(tabs, offset, step + 1);
			}
			return nextOffset;
		}

		return offset;
	};

	private prevPossibleTabIndex = (tabs: TabButtonProps[], offset: number, step = 1): number => {
		const nextOffset = offset - step;

		if (nextOffset >= 0) {
			if (tabs[nextOffset]._disabled) {
				return this.prevPossibleTabIndex(tabs, offset, step + 1);
			}
			return nextOffset;
		}

		return offset;
	};

	private onKeyDown = (event: KeyboardEvent) => {
		switch (event.key as Key) {
			case Key.ArrowRight:
				this.goToNextTab(event);
				break;
			case Key.ArrowLeft:
				this.goToPreviousTab(event);
				break;
			case Key.Space:
			case Key.Enter:
				this.activateFocusedTab(event);
				break;
		}
	};

	private getCurrentFocusIndex(): number {
		if (typeof this.currentFocusIndex === 'number') {
			return this.currentFocusIndex;
		}

		return this.state._selected;
	}

	private getKeyboardTabChangeMode(): 'selectFocusOnly' | 'activateComplete' {
		if (this._behavior === 'select-manual') {
			return 'selectFocusOnly';
		}

		return 'activateComplete';
	}

	private goToNextTab(event: KeyboardEvent) {
		this.currentFocusIndex = this.nextPossibleTabIndex(this.state._tabs, this.getCurrentFocusIndex());
		this.selectNextTabEvent(event, this.currentFocusIndex, this.getKeyboardTabChangeMode());
	}

	private goToPreviousTab(event: KeyboardEvent) {
		this.currentFocusIndex = this.prevPossibleTabIndex(this.state._tabs, this.getCurrentFocusIndex());
		this.selectNextTabEvent(event, this.currentFocusIndex, this.getKeyboardTabChangeMode());
	}

	private activateFocusedTab(event: KeyboardEvent) {
		if (typeof this.currentFocusIndex === 'number') {
			this.onSelect(event, this.currentFocusIndex);
		}
	}

	private readonly onClickSelect = (event: MouseEvent, index: number): void => {
		this.selectNextTabEvent(event, index);
	};

	private selectNextTabEvent(
		event: KeyboardEvent | MouseEvent,
		nextTabIndex: number,
		changeMode: 'selectFocusOnly' | 'activateComplete' = 'activateComplete',
	): void {
		if (this.tabPanelsElement /* SSR instanceof HTMLElement */) {
			const button: HTMLElement | null = koliBriQuerySelector(`button#${this.state._label.replace(/\s/g, '-')}-tab-${nextTabIndex}`, this.tabPanelsElement);
			button?.focus();
		}

		if (changeMode === 'activateComplete') {
			this._selected = nextTabIndex;

			const tab = this.state._tabs[nextTabIndex];
			if (tab._on?.onSelect) {
				tab._on?.onSelect(event, nextTabIndex);
			}

			this.onSelect(event, nextTabIndex);
		}
	}

	// private readonly onClickClose = (event: Event, button: TabButtonProps, index: number) => {
	// 	event.preventDefault();
	// 	event.stopPropagation();
	// 	this.onClose(button, event, index);
	// };

	private readonly onMouseDown = (event: Event): void => {
		event.preventDefault();
		event.stopPropagation();
	};

	private readonly callbacks: ButtonCallbacksPropType<number> = {
		onClick: this.onClickSelect,
		onMouseDown: this.onMouseDown,
	};

	private renderButtonGroup() {
		return (
			<KolButtonGroupWcTag class="tabs-button-group" role="tablist" aria-label={this.state._label} onKeyDown={this.onKeyDown} onBlur={this.onBlur}>
				{this.state._tabs.map((button: TabButtonProps, index: number) => (
					<KolButtonWcTag
						_disabled={button._disabled}
						_icons={button._icons}
						_hideLabel={button._hideLabel}
						_label={button._label} // TODO: ariaLabel-Konzept prüfen
						_on={this.callbacks as ButtonCallbacksPropType<StencilUnknown>}
						_tabIndex={this.state._selected === index ? 0 : -1}
						_tooltipAlign={button._tooltipAlign}
						_variant={this.state._selected === index ? 'custom' : undefined}
						_customClass={this.state._selected === index ? 'selected' : undefined}
						_ariaControls={`tabpanel-${index}`}
						_ariaSelected={this.state._selected === index}
						_id={`${this.state._label.replace(/\s/g, '-')}-tab-${index}`}
						_role="tab"
						_value={index}
					></KolButtonWcTag>
				))}
				{this.showCreateTab && (
					<KolButtonWcTag
						class="create-button"
						_label={this.onCreateLabel}
						_on={{
							onClick: this.onCreate,
						}}
					></KolButtonWcTag>
				)}
			</KolButtonGroupWcTag>
		);
	}

	private tabPanelHost?: HTMLDivElement;

	private readonly catchTabPanelHost = (el?: HTMLDivElement) => {
		this.tabPanelHost = el;
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-tabs">
				<div
					ref={(el) => {
						this.tabPanelsElement = el as HTMLElement;
					}}
					class={{
						[`tabs-align-${this.state._align}`]: true,
					}}
				>
					{this.renderButtonGroup()}
					<div class="tabs-content" ref={this.catchTabPanelHost}>
						{/* <slot /> */}
					</div>
				</div>
			</Host>
		);
	}

	/**
	 * Defines the position of the tab captions.
	 */
	@Prop() public _align?: AlignPropType = 'top';

	/**
	 * Defines which behavior is active.
	 */
	@Prop() public _behavior?: TabBehaviorPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Gibt die Liste der Callback-Funktionen an, die auf Events aufgerufen werden sollen.
	 */
	@Prop() public _on?: KoliBriTabsCallbacks;

	/**
	 * Defines which tab is active.
	 */
	@Prop({ mutable: true, reflect: true }) public _selected?: number = 0;

	/**
	 * Defines the tab captions.
	 */
	@Prop() public _tabs!: Stringified<TabButtonProps[]>;

	@State() public state: TabsStates = {
		_align: 'top',
		_label: '', // ⚠ required
		_selected: 0,
		_tabs: [],
	};

	private selectNextNotDisabledTab = (selected: number, tabs: TabButtonProps[], upOrDown = true, initialSelected?: number): number => {
		if (selected > tabs.length - 1) {
			selected = tabs.length - 1;
		}
		if (selected < 0) {
			selected = 0;
		}
		if (Array.isArray(tabs) && tabs[selected]) {
			if (tabs[selected]._disabled) {
				if (upOrDown === true) {
					if (selected < tabs.length - 1) {
						return this.selectNextNotDisabledTab(selected + 1, tabs, true, initialSelected || selected);
					} else {
						selected = initialSelected || selected;
						upOrDown = false;
					}
				}
				if (upOrDown === false) {
					if (selected > 0) {
						return this.selectNextNotDisabledTab(selected - 1, tabs, false, initialSelected || selected);
					} else {
						devHint(`[KolTabs] All tabs are disabled, and therefore no tab can be displayed.`);
					}
				}
			}
		}
		return selected;
	};

	private syncSelectedAndTabs = (nextValue: unknown, nextState: Map<string, unknown>, _component: Generic.Element.Component, key: string) => {
		let selected: number;
		if (key === '_selected') {
			selected = nextValue as number;
		} else {
			selected = this.state._selected;
		}
		let tabs: TabButtonProps[];
		if (key === '_tabs') {
			tabs = nextValue as TabButtonProps[];
		} else {
			tabs = this.state._tabs;
		}
		if (tabs.length > 0) {
			nextState.set('_selected', this.selectNextNotDisabledTab(selected, tabs));
		}
	};

	@Watch('_align')
	public validateAlign(value?: AlignPropType) {
		validateAlign(this, value);
	}

	@Watch('_behavior')
	public validateBehavior(value?: TabBehaviorPropType) {
		validateTabBehavior(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_on')
	public validateOn(value?: KoliBriTabsCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			featureHint('[KolTabs] Prüfen, wie man auch einen EventCallback einzeln ändern kann.');
			const callbacks: KoliBriTabsCallbacks = {};
			if (typeof value.onCreate === 'function' || typeof value.onCreate === 'object') {
				if (typeof value.onCreate === 'object') {
					if (typeof value.onCreate.label === 'string' && value.onCreate.label.length > 0) {
						this.onCreateLabel = value.onCreate.label;
					} else {
						Log.debug(
							`[KolTabs] The label text for New in {
  onCreate: {
    label: string (!),
    callback: Function
  }
} is not set correctly.`,
						);
					}
					if (typeof value.onCreate.callback === 'function') {
						callbacks.onCreate = value.onCreate.callback;
					} else {
						Log.debug(
							`[KolTabs] The onCreate callback function for New in {
  onCreate: {
    label: string,
    callback: Function (!)
  }
} is not set correctly.`,
						);
					}
				} else {
					callbacks.onCreate = value.onCreate;
				}
				this.showCreateTab = typeof callbacks.onCreate === 'function';
			}
			if (typeof value.onSelect === 'function') {
				callbacks.onSelect = value.onSelect;
			}
			setState<KoliBriTabsCallbacks>(this, '_on', callbacks);
		}
	}

	@Watch('_selected')
	public validateSelected(value?: number): void {
		watchNumber(this, '_selected', value, {
			hooks: {
				beforePatch: this.syncSelectedAndTabs,
			},
		});
	}

	@Watch('_tabs')
	public validateTabs(value?: Stringified<TabButtonProps[]>): void {
		watchJsonArrayString(
			this,
			'_tabs',
			(item: TabButtonProps) => typeof item === 'object' && item !== null && typeof item._label === 'string' && item._label.length > 0,
			value,
			undefined,
			{
				hooks: {
					beforePatch: this.syncSelectedAndTabs,
				},
			},
		);
		uiUxHintMillerscheZahl('KolTabs', this.state._tabs.length);
	}

	public componentWillLoad(): void {
		this.validateAlign(this._align);
		this.validateLabel(this._label);
		this.validateOn(this._on);
		this.validateSelected(this._selected);
		this.validateTabs(this._tabs);
	}

	private readonly handleTabPanels = () => {
		if (this.tabPanelHost instanceof HTMLDivElement) {
			for (let i = this.tabPanelHost.children.length; i < this.state._tabs.length; i++) {
				const div = document.createElement('div');
				div.setAttribute('aria-labelledby', `${this.state._label.replace(/\s/g, '-')}-tab-${i}`);
				div.setAttribute('id', `tabpanel-${i}`);
				div.setAttribute('role', 'tabpanel');
				div.setAttribute('hidden', '');
				const slot = document.createElement('slot');
				slot.setAttribute('name', `tabpanel-slot-${i}`);
				div.appendChild(slot);
				this.tabPanelHost.appendChild(div);
				if (this.host?.children instanceof HTMLCollection && this.host?.children[i] /* SSR instanceof HTMLElement */) {
					// div.appendChild(this.host?.children[0]);
					this.host?.children[i].setAttribute('slot', `tabpanel-slot-${i}`);
				}
			}
		}
	};

	public componentDidRender(): void {
		this.handleTabPanels();
		if (this.tabPanelHost instanceof HTMLDivElement) {
			for (let i = 0; i < this.tabPanelHost.children.length; i++) {
				if (i !== this.state._selected) {
					this.tabPanelHost.children[i].setAttribute('hidden', '');
				} else {
					this.tabPanelHost.children[i].removeAttribute('hidden');
				}
			}
		}
	}

	private onSelect(event: CustomEvent | KeyboardEvent | MouseEvent | PointerEvent, index: number): void {
		this._on?.onSelect?.(event, index);

		if (this.tabPanelsElement /* SSR instanceof HTMLElement */) {
			const button: HTMLElement | null = koliBriQuerySelector(`button#${this.state._label.replace(/\s/g, '-')}-tab-${index}`, this.tabPanelsElement);
			button?.focus();
		}
	}

	private onCreate = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		if (typeof this.state._on?.onCreate === 'function') {
			this.state._on?.onCreate(event);
		}
	};

	private onBlur = () => {
		this.currentFocusIndex = undefined;
	};
}
