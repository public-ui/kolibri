import { autoUpdate } from '@floating-ui/dom';
import type { JSX } from '@stencil/core';
import { Component, h, Method, Prop, State, Watch } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';
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
import { alignFloatingElements } from '../../utils/align-floating-elements';
import clsx from '../../utils/clsx';

/**
 * @internal
 * @slot - The popover content.
 */
@Component({
	tag: 'kol-popover-button-wc',
	shadow: false,
})
// class implementing PopoverButtonProps and not API because we don't want to repeat the entire state and validation for button props
export class KolPopoverButtonWc implements PopoverButtonProps {
	private refButton?: HTMLKolButtonWcElement;
	private refPopover?: HTMLDivElement;
	private cleanupAutoPositioning?: () => void;
	private on: ButtonCallbacksPropType<StencilUnknown> = {
		onClick: this.handleButtonClick.bind(this),
	};

	@State() public state: PopoverButtonStates = {
		_label: '',
		_popoverAlign: 'bottom',
	};
	@State() private justClosed = false;
	@State() private popoverOpen = false;

	/**
	 * Hides the popover programmatically by calling the native hidePopover method.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async hidePopover() {
		void this.refPopover?.hidePopover();
	}

	/**
	 * Show the popover programmatically by calling the native showPopover method.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async showPopover() {
		void this.refPopover?.showPopover();
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus(host: HTMLElement): Promise<void> {
		await this.refButton?.focus(host);
	}

	/* Regarding type issue see https://github.com/microsoft/TypeScript/issues/54864 */
	private handleBeforeToggle = (event: Event) => {
		if ((event as ToggleEvent).newState === 'closed') {
			this.justClosed = true;

			setTimeout(() => {
				// Reset the flag after the event loop tick.
				this.justClosed = false;
			}, 10); // timeout of 0 should be sufficient but doesn't work in Safari Mobile (needs further investigation).
		} else {
			if (this.refPopover) {
				/**
				 * Avoid "flicker" by hiding the element until the position is set in the `toggle` event handler. `alignFloatingElements` is responsible for setting the visibility back to 'visible'.
				 */
				this.refPopover.style.visibility = 'hidden';
			}
		}
	};

	private alignPopover() {
		if (this.refPopover && this.refButton) {
			void alignFloatingElements({
				align: this.state._popoverAlign,
				floatingElement: this.refPopover,
				referenceElement: this.refButton,
			});
		}
	}

	private handleToggle = (event: Event) => {
		this.popoverOpen = (event as ToggleEvent).newState === 'open';

		if (this.popoverOpen) {
			if (this.refPopover && this.refButton) {
				this.cleanupAutoPositioning = autoUpdate(this.refButton, this.refPopover, () => {
					this.alignPopover();
				});
			}
		} else if (this.cleanupAutoPositioning) {
			this.cleanupAutoPositioning();
			this.cleanupAutoPositioning = undefined;
		}
	};

	private handleButtonClick() {
		// If the popover was just closed by native behavior, do nothing (and let it stay closed).
		if (!this.justClosed) {
			this.refPopover?.togglePopover();
		}
	}

	public componentDidRender() {
		this.refPopover?.addEventListener('toggle', this.handleToggle);
		this.refPopover?.addEventListener('beforetoggle', this.handleBeforeToggle);
	}

	public disconnectedCallback() {
		this.refPopover?.removeEventListener('toggle', this.handleToggle);
		this.refPopover?.removeEventListener('beforetoggle', this.handleBeforeToggle);
		this.cleanupAutoPositioning?.();
	}

	public render(): JSX.Element {
		return (
			<div
				class={clsx('kol-popover-button', {
					'kol-popover-button--open': this.popoverOpen,
					'kol-popover-button--inline': this.state._inline === true,
					'kol-popover-button--standalone': this.state._inline === false,
				})}
			>
				<KolButtonWcTag
					_accessKey={this._accessKey}
					_aria-controls="popover"
					_ariaDescription={this._ariaDescription}
					_ariaExpanded={this.popoverOpen}
					_ariaHasPopup={'dialog'}
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
					data-testid="popover-button"
					class="kol-popover-button__button"
					ref={(element) => (this.refButton = element)}
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
	}

	public componentWillLoad() {
		this.validateInline(this._inline);
		this.validatePopoverAlign(this._popoverAlign);
	}
}
