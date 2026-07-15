import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';

import type {
	AriaDetailsPropType,
	FocusableElement,
	IconsHorizontalPropType,
	InputTypeOnDefault,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	OptionsWithOptgroupPropType,
	RowsPropType,
	SelectProps,
	ShortKeyPropType,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';

import { KolSelectWcTag } from '../../core/component-names';
import { validateAriaDetails } from '../../schema/props/aria-details';
import { createCtaRef, delegateFocus } from '../../utils/element-interaction';

/**
 * @slot expert - Custom label content, e.g. for rich text or icons.
 */
@Component({
	tag: 'kol-select',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSelect implements FocusableElement, SelectProps {
	@Element() protected readonly host?: HTMLKolSelectElement;
	protected readonly ctaRef = createCtaRef<HTMLKolSelectWcElement>();

	/**
	 * Returns the selected values.
	 */
	@Method()
	public async getValue(): Promise<StencilUnknown[] | StencilUnknown | undefined> {
		return this.ctaRef.el?.getValue();
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	public render(): JSX.Element {
		return (
			<Host class="kol-select">
				<KolSelectWcTag
					ref={this.ctaRef}
					_accessKey={this._accessKey}
					_ariaDetails={this._ariaDetails}
					_disabled={this._disabled}
					_hideLabel={this._hideLabel}
					_hideMsg={this._hideMsg}
					_hint={this._hint}
					_icons={this._icons}
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
					_variant={this._variant}
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
	 * References an external element by ID that provides accessible details for this select.
	 */
	@Prop() public _ariaDetails?: AriaDetailsPropType;

	@Watch('_ariaDetails')
	public validateAriaDetails(value?: AriaDetailsPropType): void {
		validateAriaDetails(this, this.host, undefined, value);
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideMsgPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideMsg?: boolean = false;

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
	 * Options the user can choose from.
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
	 * Maximum number of visible rows of the element.
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
	 * Defines the value of the element.
	 */
	@Prop({ mutable: true, reflect: true }) public _value?: Stringified<StencilUnknown[]> | Stringified<StencilUnknown>;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;
}
