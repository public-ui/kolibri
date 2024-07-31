import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	ButtonCallbacksPropType,
	ButtonLinkProps,
	ButtonTypePropType,
	FocusableElement,
	IconsPropType,
	IdPropType,
	LabelWithExpertSlotPropType,
	NamePropType,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, Prop } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';

@Component({
	tag: 'kol-button-link',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolButtonLink implements ButtonLinkProps, FocusableElement {
	private buttonWcRef?: HTMLKolButtonWcElement;

	private readonly catchRef = (ref?: HTMLKolButtonWcElement) => {
		this.buttonWcRef = ref;
	};

	/**
	 * Get value of button.
	 * @returns {Promise<Stringified<StencilUnknown> | undefined>}
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<Stringified<StencilUnknown> | undefined> {
		return this._value;
	}

	/**
	 * Sets the focus on the button.
	 * @deprecated Use kolFocus instead.
	 */
	@Method()
	// eslint-disable-next-line @stencil-community/reserved-member-names
	public async focus() {
		await this.kolFocus();
	}

	/**
	 * Sets the focus on the button.
	 */
	@Method()
	public async kolFocus() {
		await this.buttonWcRef?.kolFocus();
	}

	public render(): JSX.Element {
		return (
			<Host class="kol-button-link">
				<KolButtonWcTag
					ref={this.catchRef}
					_accessKey={this._accessKey}
					_ariaControls={this._ariaControls}
					_ariaExpanded={this._ariaExpanded}
					_ariaSelected={this._ariaSelected}
					_disabled={this._disabled}
					_icons={this._icons}
					_hideLabel={this._hideLabel}
					_id={this._id}
					_label={this._label}
					_name={this._name}
					_on={this._on}
					_role="link"
					_syncValueBySelector={this._syncValueBySelector}
					_tabIndex={this._tabIndex}
					_tooltipAlign={this._tooltipAlign}
					_type={this._type}
					_value={this._value}
				>
					<slot name="expert" slot="expert"></slot>
				</KolButtonWcTag>
			</Host>
		);
	}

	/**
	 * Defines the elements access key.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 * @TODO: Change type back to `AriaExpandedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 * @TODO: Change type back to `AriaSelectedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
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
	@Prop() public _id?: IdPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	/**
	 * Gibt die EventCallback-Funktionen für die Button-Events an.
	 */
	@Prop() public _on?: ButtonCallbacksPropType<StencilUnknown>;

	/**
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

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
}
