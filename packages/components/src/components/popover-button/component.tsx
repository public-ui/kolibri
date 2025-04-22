import type { JSX } from '@stencil/core';
import { Component, h, Prop, State, Watch } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';
import { alignFloatingElements } from '../../utils/align-floating-elements';
import type { PopoverButtonProps, PopoverButtonStates } from '../../schema/components/popover-button';
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
	PopoverAlignPropType,
	ShortKeyPropType,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import { validatePopoverAlign } from '../../schema';

/**
 * @slot - The popover content.
 */
@Component({
	tag: 'kol-popover-button-wc',
	shadow: false,
})
// class implementing PopoverButtonProps and not API because we don't want to repeat the entire state and validation for button props
export class KolPopoverButton implements PopoverButtonProps {
	private refButton?: HTMLKolButtonWcElement;
	private refPopover?: HTMLDivElement;

	@State() public state: PopoverButtonStates = {
		_label: '',
		_popoverAlign: 'bottom',
	};
	@State() private justClosed = false;

	/* Regarding type issue see https://github.com/microsoft/TypeScript/issues/54864 */
	private handleBeforeToggle(event: Event) {
		if ((event as ToggleEvent).newState === 'closed') {
			this.justClosed = true;

			setTimeout(() => {
				// Reset the flag after the event loop tick.
				this.justClosed = false;
			}, 10); // timeout of 0 should be sufficient but doesn't work in Safari Mobile (needs further investigation).
		} else if (this.refPopover) {
			/**
			 * Avoid "flicker" by hiding the element until the position is set in the `toggle` event handler. `alignFloatingElements` is responsible for setting the visibility back to 'visible'.
			 */
			this.refPopover.style.visibility = 'hidden';
		}
	}

	private handleToggle(event: Event) {
		if ((event as ToggleEvent).newState === 'open' && this.refPopover && this.refButton) {
			void alignFloatingElements({
				align: this.state._popoverAlign,
				floatingElement: this.refPopover,
				referenceElement: this.refButton,
			});
		}
	}

	private handleButtonClick() {
		// If the popover was just closed by native behavior, do nothing (and let it stay closed).
		if (!this.justClosed) {
			this.refPopover?.togglePopover();
		}
	}

	public componentDidRender() {
		this.refPopover?.addEventListener('toggle', this.handleToggle.bind(this));
		this.refPopover?.addEventListener('beforetoggle', this.handleBeforeToggle.bind(this));
	}

	public disconnectedCallback() {
		this.refPopover?.removeEventListener('toggle', this.handleToggle.bind(this));
		this.refPopover?.removeEventListener('beforetoggle', this.handleBeforeToggle.bind(this));
	}

	public render(): JSX.Element {
		return (
			<div class="kol-popover-button">
				<KolButtonWcTag
					_accessKey={this._accessKey}
					_ariaControls={this._ariaControls}
					_ariaDescription={this._ariaDescription}
					_ariaExpanded={this._ariaExpanded}
					_ariaSelected={this._ariaSelected}
					_customClass={this._customClass}
					_disabled={this._disabled}
					_hideLabel={this._hideLabel}
					_icons={this._icons}
					_id={this._id}
					_label={this._label}
					_name={this._name}
					_on={this._on}
					_role={this._role}
					_shortKey={this._shortKey}
					_syncValueBySelector={this._syncValueBySelector}
					_tabIndex={this._tabIndex}
					_tooltipAlign={this._tooltipAlign}
					_type={this._type}
					_value={this._value}
					_variant={this._variant}
					data-testid="popover-button"
					class="kol-popover-button__button"
					ref={(element) => (this.refButton = element)}
					onClick={this.handleButtonClick.bind(this)}
				>
					<slot name="expert" slot="expert"></slot>
				</KolButtonWcTag>

				<div ref={(element) => (this.refPopover = element)} data-testid="popover-content" popover="auto" id="popover" class="kol-popover-button__popover">
					<slot />
				</div>
			</div>
		);
	}

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
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
	 */
	@Prop() public _id?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
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
	 * Defines where to show the Popover preferably: top, right, bottom or left.
	 */
	@Prop() public _popoverAlign?: PopoverAlignPropType = 'bottom';

	/**
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Adds a visual short key hint to the component.
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
	 * Defines the value that the button emits on click.
	 */
	@Prop() public _value?: Stringified<StencilUnknown>;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: ButtonVariantPropType = 'normal';

	@Watch('_popoverAlign')
	public validatePopoverAlign(value?: PopoverAlignPropType): void {
		validatePopoverAlign(this, value);
	}

	public componentWillLoad() {
		this.validatePopoverAlign(this._popoverAlign);
	}
}
