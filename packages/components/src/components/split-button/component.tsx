import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';

import type { SplitButtonWebComponentInterface } from '../../internal/functional-components/button/api';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonTypePropType,
	ClickableElement,
	CustomClassPropType,
	FocusableElement,
	IconsPropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	ShortKeyPropType,
	SplitButtonProps,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';

import { KolPopoverButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import clsx from '../../utils/clsx';
import { nonce } from '../../utils/dev.utils';
import { delegateClick, delegateFocus } from '../../utils/element-interaction';
import { BaseButtonWebComponent } from '../button/base';

/**
 * The **SplitButton** component can be used to display a two-part button. The primary button is typically used for
 * a main action, while the secondary button opens a context menu (`Popover`) that contains additional actions.
 *
 * @slot - Allows arbitrary HTML to be inserted into the dropdown.
 */
@Component({
	tag: 'kol-split-button',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSplitButton extends BaseButtonWebComponent implements ClickableElement, FocusableElement, SplitButtonProps, SplitButtonWebComponentInterface {
	@Element() protected readonly host?: HTMLKolSplitButtonElement;

	public constructor() {
		super();
		this.initFormAssociation();
	}

	private popoverButtonRef?: HTMLKolPopoverButtonWcElement;

	private readonly setPopoverButtonRef = (ref?: HTMLKolPopoverButtonWcElement) => {
		this.popoverButtonRef = ref;
	};

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initButtonRenderProps();

		this.watchAccessKey(this._accessKey);
		this.watchAriaControls(this._ariaControls);
		this.watchAriaDescription(this._ariaDescription);
		this.watchAriaExpanded(this._ariaExpanded);
		this.watchAriaSelected(this._ariaSelected);
		this.watchCustomClass(this._customClass);
		this.watchDisabled(this._disabled);
		this.watchHideLabel(this._hideLabel);
		this.watchIcons(this._icons);
		// No public `_inline`: the predecessor's inner `kol-button-wc` defaulted to `false`, so the
		// primary button renders as `kol-button--standalone`.
		this.applyInline(false);
		this.watchLabel(this._label);
		this.watchName(this._name);
		this.watchOn(this._on);
		this.watchShortKey(this._shortKey);
		this.watchSyncValueBySelector(this._syncValueBySelector);
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
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown> {
		return this._value;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	/**
	 * Closes the dropdown.
	 */
	@Method()
	public async closePopup() {
		void this.popoverButtonRef?.hidePopover();
		return Promise.resolve();
	}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<div class="kol-split-button">
				<div class="kol-split-button__root">
					{/* The predecessor put this class on its inner `<kol-button-wc>` element; a `div` keeps the
					    theme selectors (`.kol-split-button__button .kol-button…`) and, as a flex item, the box. */}
					<div
						class={clsx('kol-split-button__button', {
							[this._variant as string]: this._variant !== 'custom',
							[this._customClass as string]: this._variant === 'custom' && typeof this._customClass === 'string' && this._customClass.length > 0,
						})}
					>
						{this.renderButtonFC()}
					</div>
					<div class="kol-split-button__horizontal-line"></div>
					<KolPopoverButtonWcTag
						class="kol-split-button__secondary-button"
						ref={this.setPopoverButtonRef}
						_disabled={this._disabled}
						_hideLabel
						_icons="kolicon-chevron-down"
						_label={translate('kol-split-button-dropdown-label-open')}
						_popoverAlign="bottom"
					>
						<slot />
					</KolPopoverButtonWcTag>
				</div>
			</div>
		);
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
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
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
		// The predecessor handed its inner button a callback object that carried `onClick` only, so
		// `onMouseDown`/`onFocus`/`onBlur` never reached the consumer. Kept for public API parity.
		this.applyOn({ onClick: value?.onClick });
	}

	/**
	 * Defines the role of the components primary element.
	 *
	 * @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;
	@Watch('_role')
	public watchRole(): void {
		// Deliberately not forwarded: the predecessor never handed `_role` to its inner element, so a
		// consumer-set role was never rendered. Keeping that behaviour is public API parity; the link
		// owner's decision to drop `_role` from the public surface has not been taken here yet.
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
