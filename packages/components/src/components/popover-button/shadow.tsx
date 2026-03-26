import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop } from '@stencil/core';
import { KolPopoverButtonWcTag } from '../../core/component-names';
import type {
	AccessKeyPropType,
	AriaDescriptionPropType,
	ButtonTypePropType,
	ButtonVariantPropType,
	CustomClassPropType,
	FocusableElement,
	IconsPropType,
	InlinePropType,
	LabelWithExpertSlotPropType,
	PopoverAlignPropType,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import type { PopoverButtonProps } from '../../schema/components/popover-button';
import { delegateFocus } from '../../utils/element-focus';

/**
 * A button that toggles the visibility of a popover overlay containing arbitrary content.
 * The popover uses the native HTML Popover API for lightweight, non-modal overlays.
 *
 * @slot - The popover content (displayed when the button is clicked).
 * @slot expert - Custom label content for the button (when `_label` is `false`).
 */
@Component({
	tag: 'kol-popover-button',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolPopoverButton implements PopoverButtonProps, FocusableElement {
	@Element() private readonly host?: HTMLKolPopoverButtonElement;
	private ref?: HTMLKolPopoverButtonWcElement;

	/**
	 * Hides the popover programmatically by forwarding the call to the web component.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async hidePopover() {
		void this.ref?.hidePopover();
	}

	/**
	 * Shows the popover programmatically by forwarding the call to the web component.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async showPopover() {
		void this.ref?.showPopover();
	}

	private readonly setRef = (ref: HTMLKolPopoverButtonWcElement | null) => {
		this.ref = ref || undefined;
	};

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus(): Promise<void> {
		return delegateFocus(this.host!, async () => this.ref?.focus?.());
	}

	public render(): JSX.Element {
		return (
			<KolPopoverButtonWcTag
				ref={this.setRef}
				_accessKey={this._accessKey}
				_ariaDescription={this._ariaDescription}
				_customClass={this._customClass}
				_disabled={this._disabled}
				_hideLabel={this._hideLabel}
				_icons={this._icons}
				_inline={this._inline}
				_label={this._label}
				_name={this._name}
				_popoverAlign={this._popoverAlign}
				_shortKey={this._shortKey}
				_syncValueBySelector={this._syncValueBySelector}
				_tabIndex={this._tabIndex}
				_tooltipAlign={this._tooltipAlign}
				_type={this._type}
				_value={this._value}
				_variant={this._variant}
			>
				<slot name="expert" slot="expert"></slot>
				<slot />
			</KolPopoverButtonWcTag>
		);
	}

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

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
	 * Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.
	 */
	@Prop() public _inline?: InlinePropType = false;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: string;

	/**
	 * Defines where to show the Popover preferably: top, right, bottom or left.
	 */
	@Prop() public _popoverAlign?: PopoverAlignPropType = 'bottom';

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
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

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
}
