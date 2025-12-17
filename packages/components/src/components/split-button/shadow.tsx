import type { JSX } from '@stencil/core';
import { Component, h, Method, Prop, State } from '@stencil/core';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonTypePropType,
	ButtonVariantPropType,
	CustomClassPropType,
	IconsPropType,
	LabelWithExpertSlotPropType,
	ShortKeyPropType,
	SplitButtonProps,
	SplitButtonStates,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';

import clsx from 'clsx';
import { KolButtonWcTag, KolPopoverWcTag } from '../../core/component-names';
import { translate } from '../../i18n';

/**
 * @slot - Ermöglicht das Einfügen beliebigen HTMLs in das dropdown.
 */
@Component({
	tag: 'kol-split-button',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSplitButton implements SplitButtonProps /*, SplitButtonAPI*/ {
	private primaryButtonWcRef?: HTMLKolButtonWcElement;

	private readonly catchPrimaryRef = (ref?: HTMLKolButtonWcElement) => {
		this.primaryButtonWcRef = ref;
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
	public async kolFocus() {
		await this.primaryButtonWcRef?.kolFocus();
	}

	private readonly clickButtonHandler = {
		onClick: (event: MouseEvent) => {
			event.stopPropagation(); // stop propagation to avoid triggering the event that closes the popover

			if (typeof this._on?.onClick === 'function') {
				// TODO: this._on is not validated
				this._on?.onClick(event, this._value);
			}
		},
	};
	private readonly clickToggleHandler = {
		onClick: (event: MouseEvent) => {
			event.stopPropagation(); // stop propagation to avoid triggering the event that closes the popover
			this.toggleDropdown();
		},
	};

	private readonly toggleDropdown = () => {
		this.state = { ...this.state, _show: !this.state._show };
	};

	private readonly handleOnClose = () => {
		this.state = { ...this.state, _show: false };
	};

	public render(): JSX.Element {
		const i18nDropdownLabel = 'kol-split-button-dropdown-label';
		return (
			<div class="kol-split-button">
				<div class="kol-split-button__root">
					<KolButtonWcTag
						class={clsx('kol-split-button__button', {
							[this._variant as string]: this._variant !== 'custom',
							[this._customClass as string]: this._variant === 'custom' && typeof this._customClass === 'string' && this._customClass.length > 0,
						})}
						ref={this.catchPrimaryRef}
						_accessKey={this._accessKey}
						_ariaControls={this._ariaControls}
						_ariaDescription={this._ariaDescription}
						_ariaExpanded={this._ariaExpanded}
						_ariaSelected={this._ariaSelected}
						_customClass={this._customClass}
						_disabled={this._disabled}
						_icons={this._icons}
						_id={this._id}
						_hideLabel={this._hideLabel}
						_label={this._label}
						_name={this._name}
						_on={this.clickButtonHandler}
						_shortKey={this._shortKey}
						_syncValueBySelector={this._syncValueBySelector}
						_tooltipAlign={this._tooltipAlign}
						_type={this._type}
						_value={this._value}
						_buttonVariant={this._variant}
					></KolButtonWcTag>
					<div class="kol-split-button__horizontal-line"></div>
					<KolButtonWcTag
						class="kol-split-button__secondary-button"
						_disabled={this._disabled}
						_hideLabel
						_icons="kol-icons-chevron-down"
						_label={this.state._show ? translate(`${i18nDropdownLabel}-close`) : translate(`${i18nDropdownLabel}-open`)}
						_on={this.clickToggleHandler}
					></KolButtonWcTag>
				</div>
				<KolPopoverWcTag _show={this.state._show} _on={{ onClose: this.handleOnClose }} _align="bottom">
					<slot />
				</KolPopoverWcTag>
			</div>
		);
	}

	/**
	 * Closes the dropdown.
	 */
	@Method()
	public async closePopup() {
		this.handleOnClose();

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
	 * Defines the internal ID of the primary component element.
	 * @deprecated Will be removed in the next major version.
	 */
	@Prop() public _id?: string;

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
	 * Defines the value that the button emits on click.
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
