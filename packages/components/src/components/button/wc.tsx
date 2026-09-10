import type { JSX } from '@stencil/core';
import { Component, Element, Method, Prop, State, Watch } from '@stencil/core';

import type { ButtonApi } from '../../internal/functional-components/button/api';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonProps,
	ButtonTypePropType,
	ClickableElement,
	CustomClassPropType,
	FocusableElement,
	IconsPropType,
	IdPropType,
	InlinePropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import type { AriaHasPopupPropType } from '../../schema/props/aria-has-popup';
import { nonce } from '../../utils/dev.utils';
import { directClick, directFocus } from '../../utils/element-interaction';
import { BaseButtonWebComponent } from './base';

/**
 * Transitional `kol-button-wc` — a `shadow:false` wrapper that renders `ButtonFC` directly into the light DOM.
 *
 * This exists because legacy consumers (accordion, badge, details, input-file, pagination,
 * popover-button, tabs, table-settings, etc.) render `<kol-button-wc>` inside their own shadow DOM
 * and rely on being able to reach the inner `.kol-button` CSS classes from their stylesheets. A
 * `shadow:true` element would encapsulate those classes behind a shadow boundary, breaking
 * consumer styling.
 *
 * When a consumer migrates to the Skeleton pattern, it renders `ButtonFC` directly (see
 * `BaseButtonWebComponent`, as `kol-button-link` and `kol-split-button` do) instead of
 * instantiating this element. Once all consumers have migrated, this component can be deleted.
 *
 * The orchestrator logic lives in `BaseButtonWebComponent`; the differences to `kol-button` are:
 *
 * - `@directFocus`/`@directClick` instead of `@delegateFocus`/`@delegateClick`: this element has no
 *   shadow root, so the interactive element is reached directly.
 * - three extra props that only legacy consumers set from inside their own shadow DOM:
 *   `_ariaHasPopup`, `_id` and `_tabIndex` (see `ButtonWebComponentInterface`).
 * - no `getValue()`: reading the value is part of the public `kol-button` surface only.
 *
 * @internal
 */
@Component({
	tag: 'kol-button-wc',
	shadow: false,
})
export class KolButtonWc extends BaseButtonWebComponent implements ButtonProps, ClickableElement, FocusableElement, WebComponentInterface<ButtonApi> {
	@Element() protected readonly host?: HTMLKolButtonWcElement;

	public constructor() {
		super();
		this.initFormAssociation();
	}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initButtonRenderProps();

		this.watchAccessKey(this._accessKey);
		this.watchAriaControls(this._ariaControls);
		this.watchAriaDescription(this._ariaDescription);
		this.watchAriaExpanded(this._ariaExpanded);
		this.watchAriaHasPopup(this._ariaHasPopup);
		this.watchAriaSelected(this._ariaSelected);
		this.watchCustomClass(this._customClass);
		this.watchDisabled(this._disabled);
		this.watchHideLabel(this._hideLabel);
		this.watchIcons(this._icons);
		this.watchId(this._id);
		this.watchInline(this._inline);
		this.watchLabel(this._label);
		this.watchName(this._name);
		this.watchOn(this._on);
		this.watchRole(this._role);
		this.watchShortKey(this._shortKey);
		this.watchSyncValueBySelector(this._syncValueBySelector);
		this.watchTabIndex(this._tabIndex);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchType(this._type);
		this.watchValue(this._value);
		this.watchVariant(this._variant);

		this.initTooltipBehavior();
	}

	public componentDidRender(): void {
		this.syncTooltipListeners();
	}

	public disconnectedCallback(): void {
		this.destroyTooltipBehavior();
	}

	// --- Public methods ---

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@directFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@directClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Render ---

	public render(): JSX.Element {
		return this.renderButtonFC();
	}

	// --- @State ---

	@State() public ariaDescriptionId: string = nonce();

	// --- Props + Watchers ---

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;
	@Watch('_accessKey')
	public watchAccessKey(value?: AccessKeyPropType): void {
		this.applyAccessKey(value, this._shortKey);
	}

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;
	@Watch('_ariaControls')
	public watchAriaControls(value?: string): void {
		this.applyAriaControls(value);
	}

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType;
	@Watch('_ariaDescription')
	public watchAriaDescription(value?: AriaDescriptionPropType): void {
		this.applyAriaDescription(value);
	}

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;
	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: boolean): void {
		this.applyAriaExpanded(value);
	}

	/**
	 * Defines the aria-haspopup attribute. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-haspopup)
	 * @internal
	 */
	@Prop() public _ariaHasPopup?: AriaHasPopupPropType;
	@Watch('_ariaHasPopup')
	public watchAriaHasPopup(value?: AriaHasPopupPropType): void {
		this.applyAriaHasPopup(value);
	}

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop() public _ariaSelected?: boolean;
	@Watch('_ariaSelected')
	public watchAriaSelected(value?: boolean): void {
		this.applyAriaSelected(value);
	}

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;
	@Watch('_customClass')
	public watchCustomClass(value?: CustomClassPropType): void {
		this.applyCustomClass(value);
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;
	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.applyDisabled(value);
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;
	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		this.applyHideLabel(value);
	}

	/**
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: IconsPropType;
	@Watch('_icons')
	public watchIcons(value?: IconsPropType): void {
		this.applyIcons(value);
	}

	/**
	 * Defines the internal ID of the primary component element.
	 * @internal
	 */
	@Prop() public _id?: IdPropType;
	@Watch('_id')
	public watchId(value?: IdPropType): void {
		this.applyId(value);
	}

	/**
	 * Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.
	 */
	@Prop() public _inline?: InlinePropType = false;
	@Watch('_inline')
	public watchInline(value?: InlinePropType): void {
		this.applyInline(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;
	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: string;
	@Watch('_name')
	public watchName(value?: string): void {
		this.applyName(value);
	}

	/**
	 * Defines the callback functions for button events.
	 */
	@Prop() public _on?: ButtonCallbacksPropType<StencilUnknown>;
	@Watch('_on')
	public watchOn(value?: ButtonCallbacksPropType<StencilUnknown>): void {
		this.applyOn(value);
	}

	/**
	 * Defines the role of the components primary element.
	 *
	 * @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;
	@Watch('_role')
	public watchRole(value?: AlternativeButtonLinkRolePropType): void {
		this.applyRole(value);
	}

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;
	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		this.applyShortKey(value, this._accessKey);
	}

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;
	@Watch('_syncValueBySelector')
	public watchSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.applySyncValueBySelector(value);
	}

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;
	@Watch('_tabIndex')
	public watchTabIndex(value?: number): void {
		this.applyTabIndex(value);
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';
	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyTooltipAlign(value);
	}

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: ButtonTypePropType = 'button';
	@Watch('_type')
	public watchType(value?: ButtonTypePropType): void {
		this.applyType(value);
	}

	/**
	 * Defines the value of the element.
	 */
	@Prop() public _value?: StencilUnknown;
	@Watch('_value')
	public watchValue(value?: StencilUnknown): void {
		this.applyValue(value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 * @internal
	 */
	@Prop() public _variant?: VariantClassNamePropType;
	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}
}
