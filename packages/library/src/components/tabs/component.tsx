import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { Events } from '../../enums/events';
import { KoliBriIconProp } from '../../types/icon';

import { Generic } from '@public-ui/core';
import { EventCallback, EventValueCallback } from '../../types/callbacks';
import { Stringified } from '../../types/common';
import { Alignment } from '../../types/props/alignment';
import { a11yHintLabelingLandmarks, devHint, featureHint, uiUxHintMillerscheZahl } from '../../utils/a11y.tipps';
import { Log } from '../../utils/dev.utils';
import { koliBriQuerySelector, setState, watchJsonArrayString, watchNumber, watchString } from '../../utils/prop.validators';
import { validateAlignment } from '../../utils/validators/alignment';

// https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html

const PrerenderEvent = new CustomEvent('prerender');

export type KoliBriTabsCallbacks = /* {
	onClose?: true | EventValueCallback<Event, number>;
} & */ {
	onCreate?:
		| EventCallback<Event>
		| {
				label: string;
				callback: EventCallback<Event>;
		  };
} & {
	[Events.onSelect]?: EventValueCallback<CustomEvent | KeyboardEvent | PointerEvent, number>;
};

type RequiredTabButtonProps = {
	label: string;
};
type OptionalTabButtonProps = {
	disabled: boolean;
	icon: Stringified<KoliBriIconProp>;
	iconOnly: boolean;
	on: KoliBriTabsCallbacks;
	tooltipAlign: Alignment;
};
export type TabButtonProps = Generic.Element.Members<RequiredTabButtonProps, OptionalTabButtonProps>;

/**
 * API
 */
type RequiredProps = {
	ariaLabel: string;
	tabs: Stringified<TabButtonProps[]>;
};
type OptionalProps = {
	on: KoliBriTabsCallbacks;
	tabsAlign: Alignment;
	selected: number;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaLabel: string;
	tabsAlign: Alignment;
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
		default: './style.sass',
	},
	shadow: true,
})
export class KolTabs implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	private hostElement?: HTMLElement;
	private tabsElement?: HTMLElement;
	private htmlDivElements?: HTMLCollection;
	private onCreateLabel = 'Neu …';
	private showCreateTab = false;
	private selectedTimeout: NodeJS.Timeout = setTimeout(() => undefined);

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
		setTimeout(() => {
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

	private readonly onClickSelect = (event: PointerEvent, index: number): void => {
		this.onSelect(event, index, true);
	};

	// private readonly onClickClose = (event: Event, button: TabButtonProps, index: number) => {
	// 	event.stopPropagation();
	// 	this.onClose(button, event, index);
	// };

	private readonly onMouseDown = (event: Event): void => {
		event.stopPropagation();
	};

	private readonly preRender = (): void => {
		if (this.state._selected > 0 && this.state._selected > this.state._tabs.length - 1) {
			if (this.state._tabs.length > 0) {
				this.onSelect(PrerenderEvent, this.state._tabs.length - 1);
			}
			return <Host></Host>;
		} else if (this.state._tabs.length > 0 && this.state._selected < this.state._tabs.length) {
			/**
			 * TODO: Hier gibt es noch ein Problem mit _disabled is undefined
			 */
			if (this.state._tabs[this.state._selected]?._disabled) {
				let index = this.nextPossibleTabIndex(this.state._tabs, this.state._selected, 1);
				if (this.state._selected === index) {
					index = this.nextPossibleTabIndex(this.state._tabs, this.state._selected, -1);
				}
				if (this._selected === index) {
					devHint(`[KolTabs] Alle Tabs sind deaktiviert und somit kann kein Tab angezeigt werden.`);
				}
				this.onSelect(PrerenderEvent, index);
			}
		}
	};

	private renderButtonGroup() {
		return (
			// <!-- style="order:2" -->
			<kol-button-group role="tablist" aria-label={this.state._ariaLabel} onKeyDown={this.onKeyDown}>
				{this.state._tabs.map((button: TabButtonProps, index: number) => {
					return (
						/**
						 * Ohne Shadow-DOM könnte auch die kol-button-wc genutzt werden.
						 */
						<div class="inline-flex">
							<kol-button-wc
								class="h-full"
								_ariaControls={`tabpanel-${index}`}
								_id={`tab-${index}`}
								_disabled={button._disabled}
								_icon={button._icon}
								_iconOnly={button._iconOnly}
								_label={button._label && button._label} // TODO: ariaLabel-Konzept prüfen
								_on={{
									onClick: (event) => this.onClickSelect(event, index),
									onMouseDown: this.onMouseDown,
								}}
								_tabIndex={this.state._selected === index ? 0 : -1}
								_tooltipAlign={button._tooltipAlign}
								_variant={this.state._selected === index ? 'custom' : undefined}
								_customClass={this.state._selected === index ? 'selected' : undefined}
								aria-selected={this.state._selected === index ? 'true' : 'false'}
								role="tab"
							></kol-button-wc>
							{/* {typeof button._on?.onClose === 'function' ||
                        (button._on?.onClose === true && (
                            <kol-button-wc
                                class="close-button"
                                _icon={{
                                    left: {
                                        icon: 'fa-solid fa-xmark',
                                        style: {
                                            'font-size': '200%',
                                        },
                                    },
                                }}
                                _iconOnly
                                _label={`Registerkarte ${button._label} schließen`}
                                _on={{
                                    onClick: (event: Event) => this.onClickClose(event, button, index),
                                }}
                                _variant="ghost"
                            ></kol-button-wc>
                        ))} */}
						</div>
					);
				})}
				{this.showCreateTab && (
					<kol-button-wc
						class="create-button"
						_label={this.onCreateLabel}
						_on={{
							onClick: this.onCreate,
						}}
					></kol-button-wc>
				)}
			</kol-button-group>
		);
	}

	public render(): JSX.Element {
		this.preRender();
		return (
			<Host
				ref={(el) => {
					this.hostElement = el as HTMLElement;
				}}
			>
				{/* style="display: grid, gridTemplateColumns: 1fr 1fr" */}
				<div
					ref={(el) => {
						this.tabsElement = el as HTMLElement;
					}}
					class={{
						[`tab-align-${this.state._tabsAlign}`]: true,
					}}
				>
					{this.renderButtonGroup()}
					{/* style="display: grid" */}
					<div>
						{this.state._tabs.map((_tab: TabButtonProps, index: number) => {
							return (
								<div
									role="tabpanel"
									id={`tabpanel-${index}`}
									aria-labelledby={`tab-${index}`}
									style={
										this.state._selected !== index || _tab._disabled === true
											? {
													display: 'none',
													visibility: 'hidden',
											  }
											: undefined
									}
								>
									<slot name={`tab-${index}`} />
								</div>
							);
						})}
					</div>
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
	@Prop({ mutable: true, reflect: false }) public _selected?: number = 0;

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie in Links an.
	 */
	@Prop() public _tabs!: Stringified<TabButtonProps[]>;

	/**
	 * Gibt an, ob die Tab-Schalter entweder oben, rechts, unten oder links angeordnet sind.
	 */
	@Prop() public _tabsAlign?: Alignment = 'top';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_ariaLabel: '…',
		_tabsAlign: 'top',
		_selected: 0,
		_tabs: [],
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		watchString(this, '_ariaLabel', value, {
			required: true,
		});
		a11yHintLabelingLandmarks(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_selected')
	public validateSelected(value?: number): void {
		watchNumber(this, '_selected', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_tabs')
	public validateTabs(value?: Stringified<TabButtonProps[]>): void {
		watchJsonArrayString(
			this,
			'_tabs',
			(item: TabButtonProps) => typeof item === 'object' && item !== null && typeof item._label === 'string' && item._label.length > 0,
			value
		);
		uiUxHintMillerscheZahl('KolTabs', this.state._tabs.length);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_tabsAlign')
	public validateTabsAlign(value?: Alignment): void {
		validateAlignment(this, '_tabsAlign', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateOn(this._on);
		this.validateSelected(this._selected);
		this.validateTabs(this._tabs);
		this.validateTabsAlign(this._tabsAlign);
	}

	public componentDidRender(): void {
		if (this.hostElement instanceof HTMLElement) {
			this.htmlDivElements = this.hostElement?.children;
			for (let i = 0; i < this.htmlDivElements.length; i++) {
				if (this.htmlDivElements[i] instanceof HTMLElement) {
					this.htmlDivElements[i].setAttribute('slot', `tab-${i}`);
				}
			}
		}
	}

	private onSelect(event: CustomEvent | KeyboardEvent | PointerEvent, index: number, focus = false): void {
		// this.selectedTimeout = setTimeout(() => {
		// 	clearTimeout(this.selectedTimeout);
		this._selected = index;
		if (typeof this._on?.onSelect === 'function') {
			this._on?.onSelect(event, index);
		}
		if (focus === true) {
			// TODO: prüfen, ob hier noch was offen ist
			// devHint('[KolTabs] Tab-Fokus-verschieben geht im Moment nicht.');
			this.selectedTimeout = setTimeout(() => {
				clearTimeout(this.selectedTimeout);
				if (this.tabsElement instanceof HTMLElement) {
					const button: HTMLElement | null = koliBriQuerySelector(`button#tab-${index}`, this.tabsElement);
					button?.focus();
				}
			}, 100);
		}
		// }, 0);
	}

	// private onClose(button: TabButtonProps, event: Event, index: number) {
	// 	if (typeof button._on?.onClose === 'function') {
	// 		button._on?.onClose(event, index);
	// 	} else if (button._on?.onClose === true) {
	// 		if (this.htmlDivElements && this.htmlDivElements[index] instanceof HTMLElement) {
	// 			this.state._tabs.splice(index, 1);
	// 			this.hostElement?.removeChild(this.htmlDivElements[index]);
	// 			this.validateTabs(this.state._tabs);
	// 			this.onSelect(this.state._selected, true);
	// 		}
	// 	}
	// }

	private onCreate = (event: Event) => {
		event.stopPropagation();
		if (typeof this.state._on?.onCreate === 'function') {
			this.state._on?.onCreate(event);
		}
	};
}

// console.log(
//   stringifyJson([
//     { _label: 'Tab 1', _href: '#tab-1', _icon: 'fa-solid fa-house' },
//     { _label: 'Tab 2', _id: '#tab-2' },
//     { _label: 'Tab 3', _id: '#tab-3' },
//     { _label: 'Tab 4', _id: '#tab-4' },
//     { _label: 'Tab 5', _id: '#tab-5' },
//     { _label: 'Tab 6', _id: '#tab-6' },
//     { _label: 'Tab 7', _id: '#tab-7' },
//     { _label: 'Tab 8', _id: '#tab-8' },
//   ])
// );
