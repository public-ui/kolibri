import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaCurrentValuePropType,
	AriaDescriptionPropType,
	ButtonVariantPropType,
	CustomClassPropType,
	DownloadPropType,
	FocusableElement,
	HrefPropType,
	IconsPropType,
	LabelWithExpertSlotPropType,
	LinkButtonProps,
	LinkOnCallbacksPropType,
	LinkTargetPropType,
	TooltipAlignPropType,
} from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, Prop } from '@stencil/core';
import { KolLinkWcTag } from '../../core/component-names';

@Component({
	tag: 'kol-link-button',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolLinkButton implements LinkButtonProps, FocusableElement {
	private linkWcRef?: HTMLKolLinkWcElement;

	private readonly catchRef = (ref?: HTMLKolLinkWcElement) => {
		this.linkWcRef = ref;
	};

	/**
	 * Sets the focus on the link element.
	 * @deprecated Use kolFocus instead.
	 */
	@Method()
	// eslint-disable-next-line @stencil-community/reserved-member-names
	public async focus() {
		await this.kolFocus();
	}

	/**
	 * Sets the focus on the link element.
	 */
	@Method()
	public async kolFocus() {
		await this.linkWcRef?.kolFocus();
	}

	public render(): JSX.Element {
		return (
			<Host class="kol-link-button">
				<KolLinkWcTag
					ref={this.catchRef}
					class={{
						button: true,
						[this._variant as string]: this._variant !== 'custom',
						[this._customClass as string]: this._variant === 'custom' && typeof this._customClass === 'string' && this._customClass.length > 0,
					}}
					_accessKey={this._accessKey}
					_ariaCurrentValue={this._ariaCurrentValue}
					_ariaDescription={this._ariaDescription}
					_disabled={this._disabled}
					_download={this._download}
					_hideLabel={this._hideLabel}
					_href={this._href}
					_icons={this._icons}
					_label={this._label}
					_on={this._on}
					_role="button"
					_tabIndex={this._tabIndex}
					_target={this._target}
					_tooltipAlign={this._tooltipAlign}
				>
					<slot name="expert" slot="expert"></slot>
				</KolLinkWcTag>
			</Host>
		);
	}

	/**
	 * Defines the elements access key.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Defines the value for the aria-current attribute.
	 */
	@Prop() public _ariaCurrentValue?: AriaCurrentValuePropType;

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType;

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Tells the browser that the link contains a file. Optionally sets the filename.
	 */
	@Prop() public _download?: DownloadPropType;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the target URI of the link.
	 */
	@Prop() public _href!: HrefPropType;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label?: LabelWithExpertSlotPropType;

	/**
	 * Defines the callback functions for links.
	 */
	@Prop() public _on?: LinkOnCallbacksPropType;

	/**
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'right';

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: ButtonVariantPropType = 'normal';
}
