import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop } from '@stencil/core';
import { KolLinkWcTag } from '../../core/component-names';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaCurrentValuePropType,
	AriaDescriptionPropType,
	ButtonVariantPropType,
	CustomClassPropType,
	DownloadPropType,
	FocusableElement,
	FocusOptions,
	HrefPropType,
	IconsPropType,
	LabelWithExpertSlotPropType,
	LinkButtonProps,
	LinkOnCallbacksPropType,
	LinkTargetPropType,
	ShortKeyPropType,
	TooltipAlignPropType,
} from '../../schema';
import { delegateClick, setClick } from '../../utils/element-click';
import { delegateFocus, setFocus } from '../../utils/element-focus';

/**
 * The **LinkButton** component is semantically a link but has the appearance of a button. All relevant properties of the Link component are adopted and extended with the design-defining properties of a button.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons.
 */
@Component({
	tag: 'kol-link-button',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolLinkButton implements LinkButtonProps, FocusableElement {
	@Element() private readonly host?: HTMLKolLinkButtonElement;
	private linkWcRef?: HTMLKolLinkWcElement;

	private readonly setLinkWcRef = (ref?: HTMLKolLinkWcElement) => {
		this.linkWcRef = ref;
	};

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus(options?: FocusOptions): Promise<void> {
		return delegateFocus(this.host!, () => setFocus(this.linkWcRef!, options));
	}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	public async click(): Promise<void> {
		return delegateClick(this.host!, async () => setClick(this.linkWcRef!));
	}

	public render(): JSX.Element {
		return (
			<KolLinkWcTag
				ref={this.setLinkWcRef}
				_accessKey={this._accessKey}
				_ariaCurrentValue={this._ariaCurrentValue}
				_ariaControls={this._ariaControls}
				_ariaDescription={this._ariaDescription}
				_customClass={this._customClass}
				_disabled={this._disabled}
				_download={this._download}
				_hideLabel={this._hideLabel}
				_href={this._href}
				_icons={this._icons}
				_label={this._label}
				_on={this._on}
				_shortKey={this._shortKey}
				_target={this._target}
				_tooltipAlign={this._tooltipAlign}
				_variant={this._variant}
			>
				<slot name="expert" slot="expert"></slot>
			</KolLinkWcTag>
		);
	}

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Defines the value for the aria-current attribute.
	 */
	@Prop() public _ariaCurrentValue?: AriaCurrentValuePropType;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

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
	 *
	 * @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

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
