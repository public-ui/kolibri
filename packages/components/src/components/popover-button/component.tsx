import type { JSX } from '@stencil/core';
import { Component, Fragment, h, Method, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { ButtonController } from '../../internal/functional-components/button/controller';
import { renderButtonFC } from '../../internal/functional-components/button/render';
import { PopoverFC } from '../../internal/functional-components/popover/component';
import { PopoverController } from '../../internal/functional-components/popover/controller';
import type {
	AccessKeyPropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonTypePropType,
	ButtonVariantPropType,
	CustomClassPropType,
	FocusableElement,
	IconsPropType,
	IdPropType,
	InlinePropType,
	KolFocusOptions,
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
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, directClick, directFocus } from '../../utils/element-interaction';

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
export class KolPopoverButtonWc implements FocusableElement, PopoverButtonProps {
	protected readonly ctaRef = createCtaRef<HTMLButtonElement>();
	private readonly buttonCtrl = new ButtonController(BaseWebComponent.stateLess);
	private readonly popoverCtrl = new PopoverController();
	private popoverElement?: HTMLDivElement;
	private readonly popoverId = createUniqueId('popover');

	private readonly setPopoverElementRef = (element?: HTMLDivElement) => {
		this.popoverElement = element;
		this.popoverCtrl.setPopoverElementRef(element);
	};

	private readonly setButtonElementRef = (element?: HTMLButtonElement) => {
		this.ctaRef(element);
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

	private handleToggle = (event: Event): void => {
		this.popoverOpen = (event as ToggleEvent).newState === 'open';
	};

	public render(): JSX.Element {
		return (
			<>
				{(() => {
					this.buttonCtrl.applyProps({
						accessKey: this._accessKey,
						ariaControls: this.popoverId,
						ariaDescription: this._ariaDescription,
						ariaExpanded: this.popoverOpen,
						customClass: this._customClass,
						disabled: this._disabled,
						hideLabel: this._hideLabel,
						icons: this._icons,
						id: this._id,
						inline: this._inline,
						label: this._label,
						name: this._name,
						on: this.on,
						shortKey: this._shortKey,
						tabIndex: this._tabIndex,
						tooltipAlign: this._tooltipAlign,
						type: this._type,
						value: this._value,
						variant: this._variant,
					});
					return renderButtonFC(this.buttonCtrl, {
						class: clsx('kol-popover-button', {
							'kol-popover-button--open': this.popoverOpen,
							'kol-popover-button--inline': this.state._inline === true,
							'kol-popover-button--standalone': this.state._inline === false,
						}),
						refButton: this.setButtonElementRef,
					});
				})()}
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
