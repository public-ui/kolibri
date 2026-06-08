import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from '../../utils/clsx';

import type {
	AriaDetailsPropType,
	DisabledPropType,
	FocusableElement,
	HideLabelPropType,
	HideMsgPropType,
	HintPropType,
	IconsHorizontalPropType,
	InputTypeOnDefault,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MsgPropType,
	MultiplePropType,
	NamePropType,
	OptionsWithOptgroupPropType,
	RequiredPropType,
	RowsPropType,
	SelectAPI,
	SelectStates,
	ShortKeyPropType,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { validateAriaDetails } from '../../schema/props/aria-details';

import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper/FormFieldStateWrapper';
import KolInputContainerFc from '../../functional-component-wrappers/InputContainerStateWrapper/InputContainerStateWrapper';
import KolSelectStateWrapperFc, { type SelectStateWrapperProps } from '../../functional-component-wrappers/SelectStateWrapper/SelectStateWrapper';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, directClick, directFocus } from '../../utils/element-interaction';
import { propagateSubmitEventToForm } from '../form/controller';
import { SelectController } from './controller';

/**
 * @internal
 * @slot - The label of the input field.
 */
@Component({
	tag: 'kol-select-wc',
	shadow: false,
})
export class KolSelectWc implements SelectAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolSelectWcElement;
	protected readonly ctaRef = createCtaRef<HTMLSelectElement>();

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown[] | StencilUnknown> {
		if (this._multiple) {
			return this.state._value;
		} else {
			return Array.isArray(this.state._value) && this.state._value.length > 0 ? this.state._value[0] : this.state._value;
		}
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

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: clsx('kol-form-field-select', {
				'kol-form-field--has-value': this.state._hasValue,
			}),
			tooltipAlign: this._tooltipAlign,
			onClick: () => this.ctaRef.el?.focus(),
			alert: this.showAsAlert(),
		};
	}

	private getSelectProps(): SelectStateWrapperProps {
		return {
			ref: this.ctaRef,
			state: this.state,
			...this.controller.onFacade,
			onInput: this.onInput.bind(this),
			onChange: this.onChange.bind(this),
			onFocus: (event: Event) => {
				this.controller.onFacade.onFocus(event);
				this.inputHasFocus = true;
			},
			onBlur: (event: Event) => {
				this.controller.onFacade.onBlur(event);
				this.inputHasFocus = false;
			},
		};
	}

	public render(): JSX.Element {
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerFc state={this.state}>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							propagateSubmitEventToForm({
								form: this.host,
								ref: this.ctaRef.el,
							});
						}}
					>
						<input type="submit" hidden />
						<KolSelectStateWrapperFc {...this.getSelectProps()} />
					</form>
				</KolInputContainerFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	private readonly controller: SelectController;

	/**
	 * Defines the key combination that can be used to trigger or focus the component’s interactive element.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * References an external element by ID that provides accessible details for this select.
	 */
	@Prop() public _ariaDetails?: AriaDetailsPropType;

	@Watch('_ariaDetails')
	public validateAriaDetails(value?: AriaDetailsPropType): void {
		validateAriaDetails(this, this.host, this.controller.internals, value);
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
	@Prop({ mutable: true, reflect: true }) public _value?: Stringified<StencilUnknown[]> | Stringified<StencilUnknown>;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	@State() public state: SelectStates = {
		_hasValue: false,
		_hideMsg: false,
		_id: createUniqueId('select'),
		_label: '', // ⚠ required
		_multiple: false,
		_options: [],
		_value: [],
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new SelectController(this, 'select', this.host);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: DisabledPropType): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_hideMsg')
	public validateHideMsg(value?: HideMsgPropType): void {
		this.controller.validateHideMsg(value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: HideLabelPropType): void {
		this.controller.validateHideLabel(value);
	}

	@Watch('_hint')
	public validateHint(value?: HintPropType): void {
		this.controller.validateHint(value);
	}

	@Watch('_icons')
	public validateIcons(value?: IconsHorizontalPropType): void {
		this.controller.validateIcons(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		this.controller.validateLabel(value);
	}

	@Watch('_msg')
	public validateMsg(value?: Stringified<MsgPropType>): void {
		this.controller.validateMsg(value);
	}

	@Watch('_multiple')
	public validateMultiple(value?: MultiplePropType): void {
		this.controller.validateMultiple(value);
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		this.controller.validateOn(value);
	}

	@Watch('_options')
	public validateOptions(value?: OptionsWithOptgroupPropType): void {
		this.controller.validateOptions(value);
	}

	@Watch('_required')
	public validateRequired(value?: RequiredPropType): void {
		this.controller.validateRequired(value);
	}

	@Watch('_rows')
	public validateRows(value?: RowsPropType): void {
		this.controller.validateRows(value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.controller.validateSyncValueBySelector(value);
	}

	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		this.controller.validateTabIndex(value);
	}

	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	@Watch('_value')
	public validateValue(value?: Stringified<StencilUnknown[]> | Stringified<StencilUnknown>): void {
		this.controller.validateValue(value);
	}

	@Watch('_variant')
	public validateVariant(value?: VariantClassNamePropType): void {
		this.controller.validateVariant(value);
	}

	public componentWillLoad(): void {
		this.validateAriaDetails(this._ariaDetails);

		this._touched = this._touched === true;
		this.controller.componentWillLoad();

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}

	private onInput(event: Event): void {
		const selectedValues = Array.from(this.ctaRef.el?.options || [])
			.filter((option) => option.selected)
			.map((option) => this.controller.getOptionByKey(option.value)?.value as string);

		if (this._multiple) {
			this._value = selectedValues;
			this.controller.onFacade.onInput(event, true, selectedValues);
		} else {
			const singleValue: StencilUnknown = selectedValues.length > 0 ? selectedValues[0] : undefined;
			this._value = singleValue;
			this.controller.onFacade.onInput(event, true, singleValue);
		}
	}

	private onChange(event: Event): void {
		if (this._multiple) {
			this.controller.onFacade.onChange(event, this._value as StencilUnknown[]);
		} else {
			this.controller.onFacade.onChange(event, this._value as StencilUnknown);
		}
	}
}
