import type { JSX } from '@stencil/core';
import { Component, Element, Method, Prop, State, Watch } from '@stencil/core';

import type { PopoverButtonWcWebComponentInterface } from '../../internal/functional-components/popover-button/api';
import type {
	AccessKeyPropType,
	AriaDescriptionPropType,
	ButtonTypePropType,
	ClickableElement,
	CustomClassPropType,
	FocusableElement,
	IconsPropType,
	IdPropType,
	InlinePropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	PopoverAlignPropType,
	PopoverButtonProps,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { nonce } from '../../utils/dev.utils';
import { directClick, directFocus } from '../../utils/element-interaction';
import { BasePopoverButtonWebComponent } from './base';

/**
 * Transitional `kol-popover-button-wc` — a `shadow:false` wrapper that renders `PopoverButtonFC`
 * directly into the light DOM.
 *
 * This exists because `FormFieldLabel` renders this element inside its own shadow DOM. As a
 * stateless functional component it has no lifecycle to drive the popover orchestration
 * (`createPopoverButtonItem` needs a `componentDidRender` and a `disconnectedCallback`), so it
 * cannot switch to `PopoverButtonFC` yet — that step needs a web component around it and is up to
 * the owner. Once that consumer has migrated, this component can be deleted.
 *
 * The orchestrator logic lives in `BasePopoverButtonWebComponent`; the differences to the public
 * `kol-popover-button` are:
 *
 * - `@directFocus`/`@directClick` instead of `@delegateFocus`/`@delegateClick`: this element has
 *   no shadow root, so the interactive element is reached directly.
 * - one extra prop that only legacy consumers set from inside their own shadow DOM: `_id`.
 *
 * @internal
 */
@Component({
	tag: 'kol-popover-button-wc',
	shadow: false,
})
export class KolPopoverButtonWc
	extends BasePopoverButtonWebComponent
	implements ClickableElement, FocusableElement, PopoverButtonProps, PopoverButtonWcWebComponentInterface
{
	@Element() protected readonly host?: HTMLKolPopoverButtonWcElement;

	public constructor() {
		super();
		this.initFormAssociation();
	}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initPopoverButtonRenderProps();

		this.watchAccessKey(this._accessKey);
		this.watchAriaDescription(this._ariaDescription);
		this.watchCustomClass(this._customClass);
		this.watchDisabled(this._disabled);
		this.watchHideLabel(this._hideLabel);
		this.watchIcons(this._icons);
		this.watchId(this._id);
		this.watchInline(this._inline);
		this.watchLabel(this._label);
		this.watchName(this._name);
		this.watchPopoverAlign(this._popoverAlign);
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
		this.syncPopoverToggleListener();
	}

	public disconnectedCallback(): void {
		this.destroyTooltipBehavior();
		this.destroyPopover();
	}

	// --- Public methods ---

	/**
	 * Hides the popover programmatically.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async hidePopover() {
		this.closePopover();
	}

	/**
	 * Shows the popover programmatically.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async showPopover() {
		this.openPopover();
	}

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
		return this.renderPopoverButtonFC();
	}

	// --- @State ---

	@State() public ariaDescriptionId: string = nonce();

	@State() public popoverOpen = false;

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
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType;
	@Watch('_ariaDescription')
	public watchAriaDescription(value?: AriaDescriptionPropType): void {
		this.applyAriaDescription(value);
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
	 * Defines where to show the Popover preferably: top, right, bottom or left.
	 */
	@Prop() public _popoverAlign?: PopoverAlignPropType = 'bottom';
	@Watch('_popoverAlign')
	public watchPopoverAlign(value?: PopoverAlignPropType): void {
		this.applyPopoverAlign(value);
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
	 */
	@Prop() public _variant?: VariantClassNamePropType = 'normal';
	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}
}
