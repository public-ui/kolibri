import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import type {
	AriaDetailsPropType,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	IconsHorizontalPropType,
	InputTypeOnDefault,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	Option,
	OptionsPropType,
	RowsPropType,
	ShortKeyPropType,
	SingleSelectProps,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import type { EventDetail } from '../../schema/interfaces/EventDetail';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import clsx from '../../utils/clsx';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateFocus } from '../../utils/element-interaction';
import { createEventWithTarget, KolEvent } from '../../utils/events';

import { getInputAdornments } from '../../internal/functional-components/form-field/adornments';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import { CustomSuggestionsOptionFC, CustomSuggestionsOptionsGroupFC } from '../../internal/functional-components/form-field/custom-suggestions';
import { InputFC, type InputFCProps } from '../../internal/functional-components/form-field/input';
import { InputContainerFC } from '../../internal/functional-components/form-field/input-container';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { BaseListboxWebComponent } from '../../internal/functional-components/listbox/base-web-component';
import { ListboxGroupFC } from '../../internal/functional-components/listbox/group';
import type { SingleSelectApi } from '../../internal/functional-components/single-select/api';
import { singleSelectPropsConfig } from '../../internal/functional-components/single-select/api';
import { BEM_CLASS_SINGLE_SELECT__DELETE, SingleSelectNoResultsFC, SingleSelectToggleFC } from '../../internal/functional-components/single-select/component';
import {
	accessKeyProp,
	hasClearButtonProp,
	horizontalIconsProp,
	placeholderProp,
	requiredProp,
	shortKeyProp,
	singleSelectOptionsProp,
	singleSelectRowsProp,
	variantProp,
} from '../../internal/props';

/**
 * The **SingleSelect** component creates a dropdown list from which exactly one predefined option can be selected.
 *
 * @slot - The label of the input field.
 */
@Component({
	tag: 'kol-single-select',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSingleSelect
	extends BaseListboxWebComponent<SingleSelectApi>
	implements FocusableElement, SingleSelectProps, WebComponentInterface<SingleSelectApi>
{
	@Element() protected readonly host?: HTMLKolSingleSelectElement;
	protected readonly ctaRef = createCtaRef<HTMLInputElement>();

	private readonly translateDeleteSelection = translate('kol-delete-selection');
	private readonly translateNoResultsMessage = translate('kol-no-results-message');

	@State() public id = createUniqueId('single-select');

	/** Whether the focus is inside the field. */
	@State() public inputHasFocus = false;

	@State() public isOpen = false;

	@State() public blockSuggestionMouseOver = false;

	/** The options matching the text of the input. */
	@State() public filteredOptions: Option<StencilUnknown>[] = [];

	/** The text of the input: the label of the selected option or the text typed to filter the options. */
	@State() public inputValue = '';

	public constructor() {
		super();
		this.initFormAssociation('single-select', this._name);
	}

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown> {
		return this._value;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(singleSelectPropsConfig);

		this.optionRefs = [];
		this._touched = this._touched === true;
		this.watchAriaDetails(this._ariaDetails);
		this.watchName(this._name);
		this.watchSyncValueBySelector(this._syncValueBySelector);
		this.watchTouched(this._touched);
		this.watchAccessKey(this._accessKey);
		this.watchMsg(this._msg);
		this.watchDisabled(this._disabled);
		this.watchHideMsg(this._hideMsg);
		this.watchHideLabel(this._hideLabel);
		this.watchHint(this._hint);
		this.watchInfoPopover(this._infoPopover);
		this.watchLabel(this._label);
		this.watchShortKey(this._shortKey);
		this.watchOn(this._on);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchVariant(this._variant);
		this.watchIcons(this._icons);
		this.applyOptions(this._options);
		this.watchRequired(this._required);
		this.watchPlaceholder(this._placeholder);
		this.watchHasClearButton(this._hasClearButton);
		this.watchRows(this._rows);

		this.filteredOptions = this.getRenderProp('options');
		this.updateInputValue(this._value);
	}

	public disconnectedCallback(): void {
		this.destroyFormField();
	}

	// --- Listbox ---

	protected getOptionCount(): number {
		return Array.isArray(this.filteredOptions) ? this.filteredOptions.length : 0;
	}

	protected moveFocus(delta: number, searchStep = 1): void {
		if (!this.filteredOptions) {
			return;
		}
		this.moveFocusSkippingDisabled(delta, searchStep, (index) => Boolean(this.filteredOptions[index].disabled));
	}

	protected focusFirstOption(): void {
		this.moveFocus(this.focusedIndex * -1);
	}

	protected focusLastOption(): void {
		this.moveFocus(this.filteredOptions ? this.filteredOptions.length - 1 - this.focusedIndex : 0, -1);
	}

	/** Enter, NumpadEnter and Space: clear on the clear button, select the focused option, or open the listbox. */
	protected handleConfirmKey(event: KeyboardEvent): void {
		if (this.clearButtonFocused) {
			this.clearSelection();
			event.preventDefault();
		} else if (this.isOpen) {
			if (this.selectFocusedOption()) {
				this.ctaRef.el?.focus();
				this.handleListboxEvent(event, false);
			}
		} else {
			this.toggleListbox(event);
		}
	}

	/** Opens the listbox with the focus on the option whose label is the text of the input, or closes it. */
	private readonly toggleListbox = (event: Event): void => {
		event?.preventDefault();
		if (this.getRenderProp('disabled') === true) {
			return;
		}
		this.ctaRef.el?.focus();
		if (this.isOpen) {
			this.isOpen = false;
		} else {
			this.isOpen = true;
			const selectedIndex = Array.isArray(this.filteredOptions) ? this.filteredOptions.findIndex((option) => option.label === this.inputValue) : -1;
			this.focusOption(selectedIndex >= 0 ? selectedIndex : -1);
		}
	};

	/** A disabled option is not selected; the keyboard and the mouse refuse it alike. */
	private selectFocusedOption(): boolean {
		if (Array.isArray(this.filteredOptions) && this.filteredOptions.length > 0 && this.focusedIndex >= 0) {
			const option = this.filteredOptions[this.focusedIndex];
			if (option?.disabled) {
				return false;
			}
			this.selectOption(option);
			return true;
		}
		return false;
	}

	/** Typeahead on the list: the first enabled option starting with the character. */
	private focusOptionStartingWith(char: string): void {
		const charLowerCase = char.toLowerCase();
		const index =
			Array.isArray(this.filteredOptions) &&
			this.filteredOptions.findIndex((option) => (option.label as string).toLowerCase().startsWith(charLowerCase) && !option.disabled);

		if (typeof index === 'number' && index >= 0) {
			this.focusOption(index);
		}
	}

	private setFilteredOptionsByQuery(query: string | undefined): void {
		if (query === undefined) {
			return;
		}
		const options = this.getRenderProp('options');

		if (query.trim() === '') {
			this.filteredOptions = [...options];
		} else if (Array.isArray(options) && options.length > 0 && query.length > 0) {
			this.filteredOptions = options.filter((option) => (option.label as string)?.toLowerCase()?.includes(query.toLowerCase()));
		}
	}

	/** Shows the label of the option with the value, or an empty input without one. */
	private updateInputValue(value?: StencilUnknown): void {
		const matchedOption = this.getRenderProp('options')?.find((option) => option.value === value);
		this.inputValue = matchedOption ? String(matchedOption.label) : '';
	}

	/** Selecting the selected option again only restores its label and the full list, without events. */
	private selectOption(option: Option<StencilUnknown>): void {
		if (option.value === this._value) {
			this.inputValue = option.label as string;
			this.filteredOptions = [...this.getRenderProp('options')];
			return;
		}

		this._value = option.value;
		this.inputValue = option.label as string;

		const detail = { name: this.getRenderProp('name') ?? '', value: option.value };
		this.handleInput(createEventWithTarget<EventDetail>(KolEvent.input, detail, this.ctaRef.el), option.value);
		this.handleChange(createEventWithTarget<EventDetail>(KolEvent.change, detail, this.ctaRef.el), option.value);

		this.filteredOptions = [...this.getRenderProp('options')];
		this.formAssociation.setFormAssociatedValue(this._value);
	}

	/**
	 * Sends the payload `{ value: null }` (#10841) as value of the `input` and `change` events and as
	 * form value, then opens the listbox.
	 */
	private clearSelection(): void {
		if (this.getRenderProp('disabled') === true) {
			return;
		}

		const emptyValue = null;
		this.focusedIndex = -1;
		this._value = emptyValue;
		this.inputValue = '';
		this.filteredOptions = [...this.getRenderProp('options')];

		const detail = { name: this.getRenderProp('name'), value: emptyValue };
		this.handleInput(createEventWithTarget<EventDetail>(KolEvent.input, detail, this.ctaRef.el), { value: emptyValue });
		this.handleChange(createEventWithTarget<EventDetail>(KolEvent.change, detail, this.ctaRef.el), { value: emptyValue });

		this.ctaRef.el?.focus();
		this.isOpen = true;
	}

	/**
	 * Runs whenever the focus leaves an element of the field: a text equal to an option label
	 * (case-insensitive) selects that option, otherwise a selected value restores the full list
	 * (#10501, #10617).
	 */
	private selectOptionByInputValue(): void {
		const options = this.getRenderProp('options');
		const matchingOption = options?.find((option) => (option.label as string)?.toLowerCase() === this.inputValue?.toLowerCase());

		if (matchingOption) {
			this.selectOption(matchingOption);
		} else if (this._value !== null && this._value !== undefined) {
			this.filteredOptions = [...(options ?? [])];
		}
	}

	// --- Event handling ---

	/** Typing filters the options and opens the listbox; it sends no event and changes no value. */
	private readonly handleSingleSelectInput = (event: Event): void => {
		const value = (event.target as HTMLInputElement).value;
		this.inputValue = value;
		this.isOpen = true;
		this.setFilteredOptionsByQuery(value);
		this.focusedIndex = -1;
	};

	/** The native `change` is reported only while the listbox is closed, with the selected value. */
	private readonly handleSingleSelectChange = (event: Event): void => {
		if (!this.isOpen) {
			this.handleChange(event, this._value);
		}
	};

	private readonly handleSingleSelectClick = (event: MouseEvent): void => {
		this.toggleListbox(event);
		this.ctaRef.el?.focus();
		this.handleClick(event);
	};

	/** The input reports the blur; `focusout` on the host decides whether the focus left the field. */
	private readonly handleInputBlur = (event: FocusEvent): void => {
		this.handleFocusLeave(event);
	};

	private readonly handleDropdownKeyDown = (event: KeyboardEvent): void => {
		if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
			event.preventDefault();
			this.isOpen = true;
			this.focusOptionStartingWith(event.key);
		}
	};

	private readonly handleClearButtonClick = (): void => {
		this.clearSelection();
		this.ctaRef.el?.focus();
		// Firefox sends no blur to the removed button.
		this.clearButtonFocused = false;
	};

	@Listen('keydown')
	public handleHostKeyDown(event: KeyboardEvent): void {
		this.handleListboxKeyDown(event);
	}

	@Listen('mousemove')
	public handleMouseEvent(): void {
		this.handleListboxMouseMove();
	}

	/** Waits for the focus to settle, so a move between the elements of the field is no focus of the field. */
	@Listen('focusin')
	public handleFocusIn(event: FocusEvent): void {
		setTimeout(() => {
			if (this.host?.contains(document.activeElement) && !this.inputHasFocus) {
				this.handleFocus(event);
			}
		});
	}

	/** Waits for the focus to settle, so a move between the elements of the field is no blur of the field. */
	@Listen('focusout')
	public handleFocusOut(event: FocusEvent): void {
		this.selectOptionByInputValue();
		setTimeout(() => {
			if (this.inputHasFocus && !this.host?.contains(document.activeElement)) {
				this.handleBlur(event);
				this.isOpen = false;
			}
		});
	}

	// --- Render ---

	private getInputProps(): InputFCProps {
		const { ariaDescribedBy, hasError } = this.getAria();
		const id = this.id;
		const disabled = this.getRenderProp('disabled') === true;
		const accessKey = this.getRenderProp('accessKey') || undefined;
		const placeholder = this.getRenderProp('placeholder');
		const shortKey = this.getRenderProp('shortKey') || undefined;
		const hideLabel = this.getRenderProp('hideLabel');
		const label = this.getRenderProp('label');

		return {
			id,
			hideLabel,
			label,
			disabled,
			name: this.getRenderProp('name') || undefined,
			...(accessKey ? { accessKey } : {}),
			value: this.inputValue,
			required: this.getRenderProp('required'),
			...(placeholder ? { placeholder } : {}),
			touched: this.getRenderProp('touched'),
			msg: this.getRenderProp('msg'),
			...(shortKey ? { 'aria-keyshortcuts': shortKey } : {}),
			'aria-activedescendant': this.isOpen && this.focusedIndex >= 0 ? `option-${this.focusedIndex}` : undefined,
			'aria-autocomplete': 'both',
			'aria-controls': createRelatedUniqueId(id, 'listbox'),
			'aria-describedby': ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined,
			'aria-expanded': this.isOpen ? 'true' : 'false',
			'aria-label': hideLabel && typeof label === 'string' ? label : undefined,
			'aria-labelledby': createRelatedUniqueId(id, 'label'),
			autocapitalize: 'off',
			autocorrect: 'off',
			autocomplete: 'off',
			class: 'kol-single-select__input',
			ref: this.ctaRef,
			role: 'combobox',
			type: 'text',
			onBlur: this.handleInputBlur,
			onChange: this.handleSingleSelectChange,
			onClick: this.handleSingleSelectClick,
			onFocus: this.handleFocus,
			onInput: this.handleSingleSelectInput,
			onKeyDown: this.handleKeyDown,
			ariaDescribedBy,
			'aria-invalid': hasError ? 'true' : undefined,
		} as InputFCProps;
	}

	private renderOptions(): JSX.Element | JSX.Element[] {
		if (!Array.isArray(this.filteredOptions) || this.filteredOptions.length === 0) {
			return <SingleSelectNoResultsFC message={this.translateNoResultsMessage} />;
		}

		return this.filteredOptions.map((option, index) => (
			<CustomSuggestionsOptionFC
				index={index}
				option={option.label}
				searchTerm={this.inputValue}
				ref={(el) => {
					if (el) this.optionRefs[index] = el;
				}}
				selected={this._value === option.value}
				disabled={option.disabled ? true : false}
				onClick={(event: Event) => {
					if (option.disabled) {
						return;
					}
					event.preventDefault();
					this.selectOption(option);
					this.isOpen = false;
					this.ctaRef.el?.focus();
				}}
				onMouseOver={() => {
					if (!this.blockSuggestionMouseOver && !option.disabled) {
						this.focusOption(index);
					}
				}}
				onFocus={() => {
					if (!option.disabled) {
						this.focusOption(index);
					}
				}}
			/>
		));
	}

	public render(): JSX.Element {
		const isDisabled = this.getRenderProp('disabled') === true;
		const { startAdornment, endAdornment } = getInputAdornments({ icons: this.getRenderProp('icons'), disabled: isDisabled });

		return (
			<Host>
				<FormFieldFC
					{...this.getFormFieldProps({
						class: clsx('kol-single-select', { 'kol-single-select--open': this.isOpen }),
						accessKey: this.getRenderProp('accessKey') || undefined,
						shortKey: this.getRenderProp('shortKey') || undefined,
						required: this.getRenderProp('required'),
						variant: this.getRenderProp('variant'),
					})}
				>
					<InputContainerFC
						disabled={isDisabled}
						msg={this.getRenderProp('msg')}
						touched={this.getRenderProp('touched')}
						startAdornment={startAdornment}
						endAdornment={endAdornment}
					>
						<ListboxGroupFC block="kol-single-select">
							<InputFC {...this.getInputProps()} />
							{this.inputValue && this.getRenderProp('hasClearButton') && (
								<KolButtonWcTag
									_icons="kolicon-cross"
									_label={this.translateDeleteSelection}
									_hideLabel
									_variant="ghost"
									_disabled={isDisabled}
									data-testid="single-select-delete"
									class={BEM_CLASS_SINGLE_SELECT__DELETE}
									hidden={isDisabled}
									_on={{
										onClick: this.handleClearButtonClick,
										onFocus: this.handleClearButtonFocus,
										onBlur: this.handleClearButtonBlur,
									}}
								/>
							)}
							<SingleSelectToggleFC disabled={isDisabled} handleClick={this.toggleListbox} />
						</ListboxGroupFC>
						<CustomSuggestionsOptionsGroupFC
							blockSuggestionMouseOver={this.blockSuggestionMouseOver}
							onKeyDown={this.handleDropdownKeyDown}
							style={{ '--visible-options': `${this.getRenderProp('rows') ?? 5}` }}
							hidden={!this.isOpen || isDisabled}
							id={createRelatedUniqueId(this.id, 'listbox')}
						>
							{this.renderOptions()}
						</CustomSuggestionsOptionsGroupFC>
					</InputContainerFC>
				</FormFieldFC>
			</Host>
		);
	}

	// --- Props ---

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * References an external element by ID that provides accessible details for this input.
	 * Uses ElementInternals.ariaDetailsElements to cross the Shadow DOM boundary.
	 * Supported by desktop screen readers (NVDA, JAWS with Chrome/Firefox).
	 * Not yet supported by mobile screen readers (TalkBack, VoiceOver iOS).
	 */
	@Prop() public _ariaDetails?: AriaDetailsPropType;

	/**
	 * Defines the placeholder for input field. To be shown when there's no value.
	 */
	@Prop() public _placeholder?: string;

	/**
	 * Makes the element not focusable and ignore all events.
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
	 * Defines the icon classnames (e.g. `icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsHorizontalPropType;

	/**
	 * Defines the informational popover after the label.
	 */
	@Prop() public _infoPopover?: FormFieldLabelInfoPopoverProps;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the properties for a message rendered as Alert component.
	 */
	@Prop() public _msg?: Stringified<MsgPropType>;

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
	@Prop() public _options!: OptionsPropType;

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
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

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
	@Prop({ mutable: true }) public _value: StencilUnknown = null;

	/**
	 * Shows the clear button if enabled.
	 */
	@Prop() public _hasClearButton?: boolean = true;

	/**
	 * Maximum number of visible rows of the element.
	 */
	@Prop() public _rows?: RowsPropType;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	// --- Watchers ---

	@Watch('_accessKey')
	public watchAccessKey(value?: string): void {
		accessKeyProp.apply(value, (v) => this.setRenderProp('accessKey', v));
		validateAccessAndShortKey(value, this._shortKey);
	}

	@Watch('_ariaDetails')
	public watchAriaDetails(value?: AriaDetailsPropType): void {
		this.applyAriaDetails(value);
	}

	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.applyDisabled(value);
	}

	@Watch('_hasClearButton')
	public watchHasClearButton(value?: boolean): void {
		hasClearButtonProp.apply(value, (v) => this.setRenderProp('hasClearButton', v));
	}

	@Watch('_hideMsg')
	public watchHideMsg(value?: boolean): void {
		this.applyHideMsg(value);
	}

	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		this.applyHideLabel(value);
	}

	@Watch('_hint')
	public watchHint(value?: string): void {
		this.applyHint(value);
	}

	@Watch('_icons')
	public watchIcons(value?: IconsHorizontalPropType): void {
		horizontalIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	@Watch('_infoPopover')
	public watchInfoPopover(value?: FormFieldLabelInfoPopoverProps): void {
		this.applyInfoPopover(value);
	}

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	@Watch('_msg')
	public watchMsg(value?: Stringified<MsgPropType>): void {
		this.applyMsg(value);
	}

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.applyName(value);
	}

	@Watch('_on')
	public watchOn(value?: InputTypeOnDefault): void {
		this.applyOn(value);
	}

	private applyOptions(value?: OptionsPropType): void {
		singleSelectOptionsProp.apply(value, (v) => this.setRenderProp('options', v));
	}

	/** Shows all options again; an open listbox keeps the filter of the input, a closed one shows the label of the value. */
	@Watch('_options')
	public watchOptions(value?: OptionsPropType): void {
		this.applyOptions(value);
		this.filteredOptions = [...(this.getRenderProp('options') ?? [])];
		if (this.isOpen) {
			this.setFilteredOptionsByQuery(this.inputValue);
		} else {
			this.updateInputValue(this._value);
		}
	}

	@Watch('_placeholder')
	public watchPlaceholder(value?: string): void {
		placeholderProp.apply(value, (v) => this.setRenderProp('placeholder', v));
	}

	@Watch('_required')
	public watchRequired(value?: boolean): void {
		requiredProp.apply(value, (v) => this.setRenderProp('required', v));
	}

	@Watch('_rows')
	public watchRows(value?: RowsPropType): void {
		singleSelectRowsProp.apply(value, (v) => this.setRenderProp('rows', v));
	}

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
		validateAccessAndShortKey(this._accessKey, value);
	}

	@Watch('_syncValueBySelector')
	public watchSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.applySyncValueBySelector(value);
	}

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyTooltipAlign(value);
	}

	@Watch('_touched')
	public watchTouched(value?: boolean): void {
		this.applyTouched(value);
	}

	@Watch('_value')
	public watchValue(value: StencilUnknown): void {
		this.updateInputValue(value);
	}

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
