import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { Events } from '../../enums/events';
import { KoliBriIconProp } from '../../types/icon';

import { Generic } from '@a11y-ui/core';
import { EventCallback, EventValueOrEventCallback } from '../../types/callbacks';
import { Stringified } from '../../types/common';
import { PropAlignment } from '../../types/props';
import { a11yHintLabelingLandmarks, devHint, featureHint, uiUxHintMillerscheZahl } from '../../utils/a11y.tipps';
import { koliBriQuerySelector, setState, watchJsonArrayString, watchNumber, watchString } from '../../utils/prop.validators';
import { validateAlignment } from '../../utils/validators/alignment';
import { translate } from '../../i18n';
import { KoliBriButtonCallbacks } from '../../types/button-link';
import { Log } from '../../utils/dev.utils';

// https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html

export type KoliBriTabsCallbacks = /* {
	onClose?: true | EventOrEventValueCallback<Event, number>;
} & */ {
	onCreate?:
		| EventCallback<Event>
		| {
				label: string;
				callback: EventCallback<Event>;
		  };
} & {
	[Events.onSelect]?: EventValueOrEventCallback<CustomEvent | KeyboardEvent | MouseEvent | PointerEvent, number>;
};

type RequiredTabButtonProps = {
	label: string;
};
type OptionalTabButtonProps = {
	disabled: boolean;
	icon: Stringified<KoliBriIconProp>;
	iconOnly: boolean;
	tooltipAlign: PropAlignment;
};
export type TabButtonProps = Generic.Element.Members<RequiredTabButtonProps, OptionalTabButtonProps>;

type RequiredProps = {
	ariaLabel: string;
	tabs: Stringified<TabButtonProps[]>;
};
type OptionalProps = {
	on: KoliBriTabsCallbacks;
	tabsAlign: PropAlignment;
	selected: number;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaLabel: string;
	tabsAlign: PropAlignment;
	selected: number;
	tabs: TabButtonProps[];
};
type OptionalStates = {
	on: KoliBriTabsCallbacks;
};
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-tabs',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolTabs implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	@Element() private readonly host?: HTMLKolTabsElement;
	private tabPanelsElement?: HTMLElement;
	private onCreateLabel = `${translate('kol-new')} …`;
	private showCreateTab = false;
	private selectedTimeout?: ReturnType<typeof setTimeout>;

	private nextPossibleTabIndex = (tabs: TabButtonProps[], offset: number, step: number): number => {
		if (step > 0) {
			if (offset + step < tabs.length) {
				if (tabs[offset + step]._disabled) {
					return this.nextPossibleTabIndex(tabs, offset, step + 1);
				}
				return offset + step;
			}
		} else if (step < 0) {
			if (offset + step >= 0) {
				if (tabs[offset + step]._disabled) {
					return this.nextPossibleTabIndex(tabs, offset, step - 1);
				}
				return offset + step;
			}
		}
		return offset;
	};

	private onKeyDown = (event: KeyboardEvent) => {
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			let selectedIndex: number | null = null;
			switch (event.key) {
				case 'ArrowRight':
					selectedIndex = this.nextPossibleTabIndex(this.state._tabs, this.state._selected, 1);
					break;
				case 'ArrowLeft':
					selectedIndex = this.nextPossibleTabIndex(this.state._tabs, this.state._selected, -1);
					break;
			}
			if (selectedIndex !== null) {
				this.onSelect(event, selectedIndex, true);
			}
		}, 250);
	};

	private readonly onClickSelect = (event: MouseEvent, index: number): void => {
		this.onSelect(event, index, true);
	};

	// private readonly onClickClose = (event: Event, button: TabButtonProps, index: number) => {
	// 	event.stopPropagation();
	// 	this.onClose(button, event, index);
	// };

	private readonly onMouseDown = (event: Event): void => {
		event.stopPropagation();
	};

	private readonly callbacks: KoliBriButtonCallbacks<number> = {
		onClick: this.onClickSelect,
		onMouseDown: this.onMouseDown,
	};

	private renderButtonGroup() {
		return (
			<kol-button-group-wc role="tablist" aria-label={this.state._ariaLabel} onKeyDown={this.onKeyDown}>
				{this.state._tabs.map((button: TabButtonProps, index: number) => (
					<kol-button-wc
						_disabled={button._disabled}
						_icon={button._icon}
						_iconOnly={button._iconOnly}
						_label={button._label && button._label} // TODO: ariaLabel-Konzept prüfen
						_on={this.callbacks as KoliBriButtonCallbacks<unknown>}
						_tabIndex={this.state._selected === index ? 0 : -1}
						_tooltipAlign={button._tooltipAlign}
						_variant={this.state._selected === index ? 'custom' : undefined}
						_customClass={this.state._selected === index ? 'selected' : undefined}
						_ariaControls={`tabpanel-${index}`}
						_ariaSelected={this.state._selected === index}
						_id={`tab-${index}`}
						_role="tab"
						_value={index}
					></kol-button-wc>
				))}
				{this.showCreateTab && (
					<kol-button-wc
						class="create-button"
						_label={this.onCreateLabel}
						_on={{
							onClick: this.onCreate,
						}}
					></kol-button-wc>
				)}
			</kol-button-group-wc>
		);
	}

	private tabPanelHost?: HTMLDivElement;

	private readonly catchTabPanelHost = (el?: HTMLDivElement) => {
		this.tabPanelHost = el;
	};

	public render(): JSX.Element {
		return (
			<Host>
				<div
					ref={(el) => {
						this.tabPanelsElement = el as HTMLElement;
					}}
					class={{
						[`tabs-align-${this.state._tabsAlign}`]: true,
					}}
				>
					{this.renderButtonGroup()}
					<div ref={this.catchTabPanelHost}>{/* <slot /> */}</div>
				</div>
			</Host>
		);
	}

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Gibt die Liste der Callback-Funktionen an, die auf Events aufgerufen werden sollen.
	 */
	@Prop() public _on?: KoliBriTabsCallbacks;

	/**
	 * Gibt an, welches Tab selektiert sein soll.
	 */
	@Prop({ mutable: true, reflect: true }) public _selected?: number = 0;

	/**
	 * Setzt die Daten für die Registrierkarten.
	 */
	@Prop() public _tabs!: Stringified<TabButtonProps[]>;

	/**
	 * Setzt die Position der Registrierkarten.
	 */
	@Prop() public _tabsAlign?: PropAlignment = 'top';

	@State() public state: States = {
		_ariaLabel: '…',
		_selected: 0,
		_tabs: [],
		_tabsAlign: 'top',
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
						devHint(`[KolTabs] Alle Tabs sind deaktiviert und somit kann kein Tab angezeigt werden.`);
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

	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		watchString(this, '_ariaLabel', value, {
			required: true,
		});
		a11yHintLabelingLandmarks(value);
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
							`[KolTabs] Der Label-Text für Neu in {
  onCreate: {
    label: string (!),
    callback: Function
  }
} ist nicht korrekt gesetzt.`
						);
					}
					if (typeof value.onCreate.callback === 'function') {
						callbacks.onCreate = value.onCreate.callback;
					} else {
						Log.debug(
							`[KolTabs] Die onCreate-Callback-Funktion für Neu in {
  onCreate: {
    label: string,
    callback: Function (!)
  }
} ist nicht korrekt gesetzt.`
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
			}
		);
		uiUxHintMillerscheZahl('KolTabs', this.state._tabs.length);
	}

	@Watch('_tabsAlign')
	public validateTabsAlign(value?: PropAlignment): void {
		validateAlignment(this, '_tabsAlign', value);
	}

	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateOn(this._on);
		this.validateSelected(this._selected);
		this.validateTabs(this._tabs);
		this.validateTabsAlign(this._tabsAlign);
	}

	private readonly handleTabPanels = () => {
		if (this.tabPanelHost instanceof HTMLDivElement) {
			for (let i = this.tabPanelHost.children.length; i < this.state._tabs.length; i++) {
				const div = document.createElement('div');
				div.setAttribute('aria-labelledby', `tab-${i}`);
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

	private onSelect(event: CustomEvent | KeyboardEvent | MouseEvent | PointerEvent, index: number, focus = false): void {
		this._selected = index;
		if (typeof this._on?.onSelect === 'function') {
			this._on?.onSelect(event, index);
		}
		if (focus === true) {
			// TODO: prüfen, ob hier noch was offen ist
			// devHint('[KolTabs] Tab-Fokus-verschieben geht im Moment nicht.');
			this.selectedTimeout = setTimeout(() => {
				clearTimeout(this.selectedTimeout);
				if (this.tabPanelsElement /* SSR instanceof HTMLElement */) {
					const button: HTMLElement | null = koliBriQuerySelector(`button#tab-${index}`, this.tabPanelsElement);
					button?.focus();
				}
			}, 250);
		}
	}

	private onCreate = (event: Event) => {
		event.stopPropagation();
		if (typeof this.state._on?.onCreate === 'function') {
			this.state._on?.onCreate(event);
		}
	};
}
