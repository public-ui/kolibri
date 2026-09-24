import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { TabsApi } from '../../internal/functional-components/tabs/api';
import { tabsPropsConfig } from '../../internal/functional-components/tabs/api';
import type { TabsButton, TabsButtonItem } from '../../internal/functional-components/tabs/button-item';
import { createTabsButtonItem } from '../../internal/functional-components/tabs/button-item';
import { TabsFC } from '../../internal/functional-components/tabs/component';
import { alignProp, hasCreateButtonProp, labelWithExpertSlotProp, selectedProp, tabBehaviorProp, tabsCallbacksProp, tabsProp } from '../../internal/props';
import type {
	AlignPropType,
	ButtonCallbacksPropType,
	ClickableElement,
	FocusableElement,
	KolFocusOptions,
	KoliBriTabsCallbacks,
	LabelPropType,
	StencilUnknown,
	Stringified,
	TabBehaviorPropType,
	TabButtonProps,
	TabsProps,
} from '../../schema';
import { devHint, koliBriQuerySelector } from '../../schema';

import { translate } from '../../i18n';
import { KeyboardKey } from '../../schema/enums';
import type { HasCreateButtonPropType } from '../../schema/props/has-create-button';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html

/**
 * The **Tabs** component is used to organize related content on the same page and navigate between them. Tabs ensure that large amounts of content can be more easily organized for users.
 */
@Component({
	tag: 'kol-tabs',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTabs extends BaseWebComponent<TabsApi> implements ClickableElement, FocusableElement, TabsProps, WebComponentInterface<TabsApi> {
	@Element() protected readonly host?: HTMLKolTabsElement;

	private rootElement?: HTMLDivElement;
	private tabPanelHost?: HTMLDivElement;
	private readonly onCreateLabel = `${translate('kol-new')} …`;
	private currentFocusIndex: number | undefined;

	/** Points at the button of the selected tab; `focus()` and `click()` delegate to it. */
	protected readonly ctaRef = createCtaRef<HTMLButtonElement>();

	/**
	 * Instance-unique prefix for all tab button and tabpanel ids (`id`, `aria-controls`,
	 * `aria-labelledby`, `focusTabById` selector). Must not be derived from `_label`:
	 * label characters (e.g. commas, which split CSS selector lists) would break the
	 * `button#...` lookup, and identical labels on multiple `<kol-tabs>` would collide.
	 */
	private readonly id = createUniqueId('tabs');

	/** One orchestrated button per tab, rebuilt whenever `_tabs` changes. */
	private tabButtonItems: TabsButtonItem[] = [];
	private readonly createButtonItem = createTabsButtonItem();

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(tabsPropsConfig);
		alignProp.apply(this._align, (v) => this.setRenderProp('align', v));
		tabBehaviorProp.apply(this._behavior, (v) => this.setRenderProp('behavior', v));
		hasCreateButtonProp.apply(this._hasCreateButton, (v) => this.setRenderProp('hasCreateButton', v));
		labelWithExpertSlotProp.apply(this._label, (v) => this.setRenderProp('label', v));
		tabsCallbacksProp.apply(this._on, (v) => this.setRenderProp('on', v));
		this.applySelected(this._selected);
		this.applyTabs(this._tabs);
	}

	public componentWillRender(): void {
		this.resolveButtons();
	}

	public componentDidRender(): void {
		this.ctaRef(this.tabButtonItems[this.getRenderProp('selected')]?.getButtonElement());
		this.tabButtonItems.forEach((item) => item.syncListeners());
		this.createButtonItem.syncListeners();
		this.refreshTabPanels();
	}

	public disconnectedCallback(): void {
		this.tabButtonItems.forEach((item) => item.destroy());
		this.createButtonItem.destroy();
	}

	// --- Public methods ---

	/**
	 * Sets focus on the current tab button.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Triggers a click on the currently selected tab.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Selection ---

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

	/**
	 * Moves the selection off a disabled or out-of-range tab. Runs after `_selected` and after
	 * `_tabs`, because the result depends on both.
	 */
	private syncSelected(): void {
		const tabs = this.getRenderProp('tabs');
		if (tabs.length > 0) {
			this.setRenderProp('selected', this.selectNextNotDisabledTab(this.getRenderProp('selected'), tabs));
		}
	}

	// --- Event handling ---

	private readonly handleKeyDown = (event: KeyboardEvent): void => {
		switch (event.key as KeyboardKey) {
			case KeyboardKey.ArrowRight:
				this.goToNextTab(event);
				break;
			case KeyboardKey.ArrowLeft:
				this.goToPreviousTab(event);
				break;
			case KeyboardKey.Space:
			case KeyboardKey.Enter:
				this.activateFocusedTab(event);
				break;
		}
	};

	private readonly handleBlur = (): void => {
		this.currentFocusIndex = undefined;
	};

	private getCurrentFocusIndex(): number {
		if (typeof this.currentFocusIndex === 'number') {
			return this.currentFocusIndex;
		}

		return this.getRenderProp('selected');
	}

	private getKeyboardTabChangeMode(): 'selectFocusOnly' | 'activateCompletely' {
		if (this.getRenderProp('behavior') === 'select-manual') {
			return 'selectFocusOnly';
		}

		return 'activateCompletely';
	}

	private goToNextTab(event: KeyboardEvent) {
		const nextFocusIndex = this.nextPossibleTabIndex(this.getRenderProp('tabs'), this.getCurrentFocusIndex());
		this.selectNextTabEvent(event, nextFocusIndex, this.getKeyboardTabChangeMode());
	}

	private goToPreviousTab(event: KeyboardEvent) {
		const nextFocusIndex = this.prevPossibleTabIndex(this.getRenderProp('tabs'), this.getCurrentFocusIndex());
		this.selectNextTabEvent(event, nextFocusIndex, this.getKeyboardTabChangeMode());
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
		changeMode: 'selectFocusOnly' | 'activateCompletely' = 'activateCompletely',
	): void {
		this.currentFocusIndex = nextTabIndex;

		this.focusTabById(nextTabIndex);

		if (changeMode === 'activateCompletely') {
			this._selected = nextTabIndex;

			const tab = this.getRenderProp('tabs')[nextTabIndex];
			tab._on?.onSelect?.(event, nextTabIndex);

			this.onSelect(event, nextTabIndex);
		}
	}

	private readonly onMouseDown = (event: Event): void => {
		event.preventDefault();
	};

	private readonly tabButtonCallbacks: ButtonCallbacksPropType<number> = {
		onClick: this.onClickSelect,
		onMouseDown: this.onMouseDown,
	};

	private focusTabById(index: number): void {
		if (this.rootElement /* SSR instanceof HTMLElement */) {
			const button: HTMLElement | null = koliBriQuerySelector(`button#${this.id}-tab-${index}`, this.rootElement);
			button?.focus();
		}
	}

	private onSelect(event: CustomEvent | KeyboardEvent | MouseEvent | PointerEvent, index: number): void {
		this.getRenderProp('on').onSelect?.(event, index);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.select, index);
		}

		this.focusTabById(index);
	}

	private readonly onCreate = (event: Event): void => {
		event.preventDefault();
		this.getRenderProp('on').onCreate?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.create);
		}
	};

	// --- Tab panels ---

	private readonly setRootRef = (element?: HTMLDivElement): void => {
		this.rootElement = element;
	};

	private readonly setContentRef = (element?: HTMLDivElement): void => {
		this.tabPanelHost = element;
	};

	/**
	 * Recreates one panel per tab. Each panel projects the light-DOM child with the same index
	 * through a named slot, which is why the panels are built imperatively rather than rendered.
	 */
	private refreshTabPanels(): void {
		if (!this.tabPanelHost) return;
		while (this.tabPanelHost.firstChild) {
			this.tabPanelHost.removeChild(this.tabPanelHost.firstChild);
		}
		const tabs = this.getRenderProp('tabs');
		for (let i = 0; i < tabs.length; i++) {
			const div = document.createElement('div');
			div.setAttribute('aria-labelledby', `${this.id}-tab-${i}`);
			div.setAttribute('id', `${this.id}-panel-${i}`);
			div.setAttribute('role', 'tabpanel');
			div.setAttribute('hidden', '');
			// Panels are not tabbable, see https://github.com/public-ui/kolibri/issues/10082
			const slot = document.createElement('slot');
			slot.setAttribute('name', `tabpanel-slot-${i}`);
			div.appendChild(slot);
			this.tabPanelHost.appendChild(div);

			if (typeof HTMLCollection !== 'undefined' && this.host?.children instanceof HTMLCollection && this.host?.children[i] /* SSR instanceof HTMLElement */) {
				this.host.children[i].setAttribute('slot', `tabpanel-slot-${i}`);
			}
		}
		this.updateVisiblePanel();
	}

	private updateVisiblePanel(): void {
		if (!this.tabPanelHost) return;
		const selected = this.getRenderProp('selected');
		Array.from(this.tabPanelHost.children).forEach((child, i) => {
			if (i === selected) {
				child.removeAttribute('hidden');
			} else {
				child.setAttribute('hidden', '');
			}
		});
	}

	// --- Render ---

	/**
	 * Resolves the embedded buttons against the current selection. The props are the ones the
	 * predecessor handed its `kol-button-wc` elements.
	 */
	private resolveButtons(): void {
		const selected = this.getRenderProp('selected');
		const tabs = this.getRenderProp('tabs');

		this.tabButtons = this.tabButtonItems.map((item, index) => {
			const tab = tabs[index];
			const isSelected = selected === index;
			return item.getButton(
				{
					_ariaControls: `${this.id}-panel-${index}`,
					_ariaSelected: isSelected,
					_customClass: isSelected ? 'selected' : '',
					_disabled: tab._disabled,
					_hideLabel: tab._hideLabel,
					_icons: tab._icons,
					_id: `${this.id}-tab-${index}`,
					_label: tab._label, // TODO: ariaLabel-Konzept prüfen
					_on: this.tabButtonCallbacks as ButtonCallbacksPropType<StencilUnknown>,
					_role: 'tab',
					_tabIndex: isSelected ? 0 : -1,
					_tooltipAlign: tab._tooltipAlign,
					_value: index,
					_variant: isSelected ? 'custom' : undefined,
				},
				this.host,
			);
		});

		this.createButton = this.createButtonItem.getButton(
			{
				_icons: 'kolicon-plus',
				_label: this.onCreateLabel,
				_on: { onClick: this.onCreate },
			},
			this.host,
		);
	}

	public render(): JSX.Element {
		return (
			<Host>
				<TabsFC
					align={this.getRenderProp('align')}
					behavior={this.getRenderProp('behavior')}
					createButton={this.createButton}
					handleBlur={this.handleBlur}
					handleKeyDown={this.handleKeyDown}
					hasCreateButton={this.getRenderProp('hasCreateButton')}
					label={this.getRenderProp('label')}
					on={this.getRenderProp('on')}
					refContent={this.setContentRef}
					refRoot={this.setRootRef}
					selected={this.getRenderProp('selected')}
					tabButtons={this.tabButtons}
					tabs={this.getRenderProp('tabs')}
				/>
			</Host>
		);
	}

	// --- Resolved per render pass (see `resolveButtons`) ---

	/**
	 * Deliberately not `@State`: both are derived from props in `componentWillRender`, so a prop
	 * change already schedules the render that refreshes them.
	 */
	public createButton!: TabsButton;
	public tabButtons: TabsButton[] = [];

	// --- Props + Watchers ---

	/**
	 * Defines the visual orientation of the component.
	 */
	@Prop() public _align?: AlignPropType = 'top';
	@Watch('_align')
	public watchAlign(value?: AlignPropType): void {
		alignProp.apply(value, (v) => this.setRenderProp('align', v));
	}

	/**
	 * Defines which behavior is active.
	 */
	@Prop() public _behavior?: TabBehaviorPropType;
	@Watch('_behavior')
	public watchBehavior(value?: TabBehaviorPropType): void {
		tabBehaviorProp.apply(value, (v) => this.setRenderProp('behavior', v));
	}

	/**
	 * Defines whether the element has a create button.
	 */
	@Prop() public _hasCreateButton?: HasCreateButtonPropType = false;
	@Watch('_hasCreateButton')
	public watchHasCreateButton(value?: HasCreateButtonPropType): void {
		hasCreateButtonProp.apply(value, (v) => this.setRenderProp('hasCreateButton', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Defines the callback functions for tabs events.
	 */
	@Prop() public _on?: KoliBriTabsCallbacks;
	@Watch('_on')
	public watchOn(value?: KoliBriTabsCallbacks): void {
		tabsCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	/**
	 * Defines which tab is active.
	 */
	@Prop({ mutable: true, reflect: true }) public _selected?: number = 0;
	@Watch('_selected')
	public watchSelected(value?: number): void {
		this.applySelected(value);
	}

	/**
	 * Defines the tab captions.
	 */
	@Prop() public _tabs!: Stringified<TabButtonProps[]>;
	@Watch('_tabs')
	public watchTabs(value?: Stringified<TabButtonProps[]>): void {
		this.applyTabs(value);
	}

	private applySelected(value?: number): void {
		selectedProp.apply(value, (v) => {
			this.setRenderProp('selected', v);
			this.syncSelected();
		});
	}

	private applyTabs(value?: Stringified<TabButtonProps[]>): void {
		tabsProp.apply(value, (tabs) => {
			this.setRenderProp('tabs', tabs);
			this.tabButtonItems.forEach((item) => item.destroy());
			this.tabButtonItems = tabs.map(() => createTabsButtonItem());
			this.syncSelected();
		});
	}
}
