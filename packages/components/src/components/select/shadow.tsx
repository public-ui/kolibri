import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, Prop } from '@stencil/core';
import type {
	FocusableElement,
	IconsHorizontalPropType,
	IdPropType,
	InputTypeOnDefault,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	OptionsWithOptgroupPropType,
	RowsPropType,
	SelectProps,
	ShortKeyPropType,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	StencilUnknown,
} from '../../schema';

import { KolSelectWcTag } from '../../core/component-names';

/**
 * @slot - Die Beschriftung des Eingabefeldes.
 */
@Component({
	tag: 'kol-select',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSelect implements SelectProps, FocusableElement {
	private selectWcRef?: HTMLKolSelectWcElement;

	private readonly catchRef = (ref?: HTMLKolSelectWcElement) => {
		this.selectWcRef = ref;
	};

	/**
	 * Returns the selected values.
	 */
	@Method()
	public async getValue(): Promise<Stringified<StencilUnknown[]> | undefined> {
		return this.selectWcRef?.getValue();
	}

	/**
	 * @deprecated Use kolFocus instead.
	 */
	@Method()
	public async focus() {
		await this.kolFocus();
	}

	/**
	 * Focuses the select element.
	 */
	@Method()
	public async kolFocus() {
		await this.selectWcRef?.kolFocus();
	}

	public render(): JSX.Element {
		return (
			<Host class="kol-select">
				<KolSelectWcTag
					ref={this.catchRef}
					_accessKey={this._accessKey}
					_alert={this._alert}
					_disabled={this._disabled}
					_error={this._error}
					_hideError={this._hideError}
					_hideLabel={this._hideLabel}
					_hint={this._hint}
					_icons={this._icons}
					_id={this._id}
					_label={this._label}
					_msg={this._msg}
					_multiple={this._multiple}
					_name={this._name}
					_on={this._on}
					_options={this._options}
					_required={this._required}
					_rows={this._rows}
					_shortKey={this._shortKey}
					_syncValueBySelector={this._syncValueBySelector}
					_tabIndex={this._tabIndex}
					_tooltipAlign={this._tooltipAlign}
					_touched={this._touched}
					_value={this._value}
				>
					<slot name="expert" slot="expert"></slot>
				</KolSelectWcTag>
			</Host>
		);
	}

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the screen-readers should read out the notification.
	 * @deprecated Will be removed in v3. Use automatic behaviour instead.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Defines the error message text.
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	@Prop() public _error?: string;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideErrorPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _hideError?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the hint text.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsHorizontalPropType;

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: IdPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the properties for a message rendered as Alert component.
	 */
	@Prop() public _msg?: Stringified<MsgPropType>;

	/**
	 * Makes the input accept multiple inputs.
	 * @TODO: Change type back to `MultiplePropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _multiple?: boolean = false;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Options the user can choose from, also supporting Optgroup.
	 */
	@Prop() public _options!: OptionsWithOptgroupPropType;

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	/**
	 * Defines how many rows of options should be visible at the same time.
	 */
	@Prop() public _rows?: RowsPropType;

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
	 * Shows if the input was touched by a user.
	 * @TODO: Change type back to `TouchedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Defines the value of the input.
	 */
	@Prop({ mutable: true }) public _value?: Stringified<StencilUnknown[]>;
}
