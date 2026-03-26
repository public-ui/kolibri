import type { JSX } from '@stencil/core';
import { Component, Fragment, h, Method, Prop, State, Watch } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';
import { PopoverFC } from '../../internal/functional-components/popover/component';
import { PopoverController } from '../../internal/functional-components/popover/controller';
import type {
	AccessKeyPropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonTypePropType,
	ButtonVariantPropType,
	CustomClassPropType,
	IconsPropType,
	IdPropType,
	InlinePropType,
	LabelWithExpertSlotPropType,
	PopoverAlignPropType,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import { validateInline, validatePopoverAlign } from '../../schema';
import type { PopoverButtonProps, PopoverButtonStates } from '../../schema/components/popover-button';
import clsx from '../../utils/clsx';
import { nonce } from '../../utils/dev.utils';
import { setFocus } from '../../utils/element-focus';

/**
 * @internal
 * @slot - The popover content.
 *
 * **Note:** The `_on` button callback prop is not supported. The button's `onClick` is reserved for toggling the popover.
 * Manage the popover visibility state and coordinate with the internal popover element.
 */
@Component({
	tag: 'kol-popover-button-wc',
	shadow: false,
})
// class implementing PopoverButtonProps and not API because we don't want to repeat the entire state and validation for button props
export class KolPopoverButtonWc implements PopoverButtonProps {
	private refButton?: HTMLKolButtonWcElement;
	private readonly popoverCtrl = new PopoverController();
	private popoverElement?: HTMLDivElement;
	private readonly popoverId = `popover-${nonce()}`;

	private readonly setPopoverElementRef = (element?: HTMLDivElement) => {
		this.popoverElement = element;
		this.popoverCtrl.setPopoverElementRef(element);
	};

	private readonly setButtonElementRef = (element?: HTMLKolButtonWcElement) => {
		this.refButton = element;
		if (element) {
			this.popoverCtrl.setTriggerElement(element as HTMLElement);
		}
	};

	private on: ButtonCallbacksPropType<StencilUnknown> = {
		onClick: () => {
			this.popoverCtrl.setShow(!this.popoverOpen);
		},
	};

	@State() public state: PopoverButtonStates = {
		_label: '',
		_popoverAlign: 'bottom',
		_inline: false,
	};
	@State() private popoverOpen = false;

	/**
	 * Hides the popover programmatically by calling the PopoverController.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async hidePopover() {
		this.popoverCtrl.setShow(false);
	}

	/**
	 * Show the popover programmatically by calling the PopoverController.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async showPopover() {
		this.popoverCtrl.setShow(true);
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus(): Promise<void> {
		return setFocus(this.refButton!);
	}

	private handleToggle = (event: Event): void => {
		this.popoverOpen = (event as ToggleEvent).newState === 'open';
	};

	public render(): JSX.Element {
		return (
			<>
				<KolButtonWcTag
					class={clsx('kol-popover-button', {
						'kol-popover-button--open': this.popoverOpen,
						'kol-popover-button--inline': this.state._inline === true,
						'kol-popover-button--standalone': this.state._inline === false,
					})}
					_accessKey={this._accessKey}
					_ariaControls={this.popoverId}
					_ariaDescription={this._ariaDescription}
					_ariaExpanded={this.popoverOpen}
					_customClass={this._customClass}
					_disabled={this._disabled}
					_hideLabel={this._hideLabel}
					_icons={this._icons}
					_id={this._id}
					_inline={this._inline}
					_label={this._label}
					_name={this._name}
					_on={this.on}
					_shortKey={this._shortKey}
					_syncValueBySelector={this._syncValueBySelector}
					_tabIndex={this._tabIndex}
					_tooltipAlign={this._tooltipAlign}
					_type={this._type}
					_value={this._value}
					_variant={this._variant}
					ref={this.setButtonElementRef}
				>
					<slot name="expert" slot="expert"></slot>
				</KolButtonWcTag>
				<PopoverFC align={this.state._popoverAlign || 'bottom'} popoverRef={this.setPopoverElementRef} class="kol-popover-button__popover" id={this.popoverId}>
					<slot />
				</PopoverFC>
			</>
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
	 * Defines the internal ID of the primary component element.
	 * @internal
	 */
	@Prop() public _id?: IdPropType;

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

	@Watch('_inline')
	public validateInline(value?: InlinePropType): void {
		validateInline(this, value, {
			defaultValue: false,
		});
	}

	@Watch('_popoverAlign')
	public validatePopoverAlign(value?: PopoverAlignPropType): void {
		validatePopoverAlign(this, value);
		if (value) {
			this.popoverCtrl.setAlign(value);
		}
	}

	public componentWillLoad() {
		this.validateInline(this._inline);
		this.validatePopoverAlign(this._popoverAlign);
	}

	public componentDidRender() {
		// The popoverElement is already set via popoverRef callback from PopoverFC.
		// Register the toggle listener once the popover element is available.
		if (this.popoverElement) {
			this.popoverElement.addEventListener('toggle', this.handleToggle);
		}
		// Ensure align value is synced with controller
		if (this.state._popoverAlign) {
			this.popoverCtrl.setAlign(this.state._popoverAlign);
		}
	}

	public disconnectedCallback() {
		if (this.popoverElement) {
			this.popoverElement.removeEventListener('toggle', this.handleToggle);
		}
		this.popoverCtrl.destroy();
		this.popoverElement = undefined;
	}
}
