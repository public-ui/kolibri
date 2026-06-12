import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State } from '@stencil/core';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonTypePropType,
	ButtonVariantPropType,
	CustomClassPropType,
	FocusableElement,
	IconsPropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	ShortKeyPropType,
	SplitButtonProps,
	SplitButtonStates,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';

import { KolPopoverButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { ButtonController, initButtonControllerFromProps } from '../../internal/functional-components/button/controller';
import { renderButtonFC } from '../../internal/functional-components/button/render';
import clsx from '../../utils/clsx';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { propagateResetEventToForm, propagateSubmitEventToForm } from '../form/controller';

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
export class KolSplitButton implements SplitButtonProps, FocusableElement /*, SplitButtonAPI*/ {
	@Element() protected readonly host?: HTMLKolSplitButtonElement;
	protected readonly ctaRef = createCtaRef<HTMLButtonElement>();
	private readonly buttonCtrl = new ButtonController(BaseWebComponent.stateLess);
	private popoverButtonRef?: HTMLKolPopoverButtonWcElement;

	private readonly setPopoverButtonRef = (ref?: HTMLKolPopoverButtonWcElement) => {
		this.popoverButtonRef = ref;
	};

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

	private readonly clickButtonHandler = {
		onClick: (event: MouseEvent) => {
			event.stopPropagation();

			if (typeof this._on?.onClick === 'function') {
				this._on?.onClick(event, this._value);
			}
		},
	};

	public render(): JSX.Element {
		const i18nDropdownLabel = 'kol-split-button-dropdown-label';
		return (
			<div class="kol-split-button">
				<div class="kol-split-button__root">
					{(() => {
						initButtonControllerFromProps(this.buttonCtrl, {
							_accessKey: this._accessKey,
							_ariaControls: this._ariaControls,
							_ariaDescription: this._ariaDescription,
							_ariaExpanded: this._ariaExpanded,
							_ariaSelected: this._ariaSelected,
							_customClass: this._customClass,
							_disabled: this._disabled,
							_icons: this._icons,
							_hideLabel: this._hideLabel,
							_label: this._label,
							_name: this._name,
							_on: this.clickButtonHandler,
							_shortKey: this._shortKey,
							_tooltipAlign: this._tooltipAlign,
							_type: this._type,
							_value: this._value,
							_variant: this._variant,
						});
						return renderButtonFC(this.buttonCtrl, {
							class: clsx('kol-split-button__button', {
								[this._variant as string]: this._variant !== 'custom',
								[this._customClass as string]: this._variant === 'custom' && typeof this._customClass === 'string' && this._customClass.length > 0,
							}),
							refButton: this.ctaRef,
							onClick: (_event, result) => {
								if (result.formAction === 'submit') {
									propagateSubmitEventToForm({ form: this.host, ref: this.ctaRef.el });
								} else if (result.formAction === 'reset') {
									propagateResetEventToForm({ form: this.host, ref: this.ctaRef.el });
								}
							},
						});
					})()}
					<div class="kol-split-button__horizontal-line"></div>
					<KolPopoverButtonWcTag
						class="kol-split-button__secondary-button"
						ref={this.setPopoverButtonRef}
						_disabled={this._disabled}
						_hideLabel
						_icons="kolicon-chevron-down"
						_label={translate(`${i18nDropdownLabel}-open`)}
						_popoverAlign="bottom"
					>
						<slot />
					</KolPopoverButtonWcTag>
				</div>
			</div>
		);
	}

	public connectedCallback(): void {
		this.state = { ...this.state, _show: false };
	}

	/**
	 * Closes the dropdown.
	 */
	@Method()
	public async closePopup() {
		void this.popoverButtonRef?.hidePopover();
		return Promise.resolve();
	}

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType;

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: string;

	/**
	 * Defines the callback functions for button events.
	 */
	@Prop() public _on?: ButtonCallbacksPropType<StencilUnknown>;

	/**
	 * Defines the role of the components primary element.
	 *
	 * @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: ButtonTypePropType = 'button';

	/**
	 * Defines the value of the element.
	 */
	@Prop() public _value?: StencilUnknown;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: ButtonVariantPropType = 'normal';

	@State() public state: SplitButtonStates = {
		_show: false,
	};
}
