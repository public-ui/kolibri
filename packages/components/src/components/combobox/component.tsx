import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import type {
	AriaDetailsPropType,
	ClickableElement,
	ComboboxProps,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	IconsHorizontalPropType,
	InputTypeOnDefault,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	ShortKeyPropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
	W3CInputValue,
} from '../../schema';
import type { EventDetail } from '../../schema/interfaces/EventDetail';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import clsx from '../../utils/clsx';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { createEventWithTarget, KolEvent } from '../../utils/events';

import type { ComboboxApi } from '../../internal/functional-components/combobox/api';
import { comboboxPropsConfig } from '../../internal/functional-components/combobox/api';
import { getInputAdornments } from '../../internal/functional-components/form-field/adornments';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import { CustomSuggestionsOptionFC, CustomSuggestionsOptionsGroupFC } from '../../internal/functional-components/form-field/custom-suggestions';
import { InputFC, type InputFCProps } from '../../internal/functional-components/form-field/input';
import { InputContainerFC } from '../../internal/functional-components/form-field/input-container';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { IconFC } from '../../internal/functional-components/icon/component';
import { BaseListboxWebComponent } from '../../internal/functional-components/listbox/base-web-component';
import {
	accessKeyProp,
	hasClearButtonProp,
	horizontalIconsProp,
	placeholderProp,
	requiredProp,
	shortKeyProp,
	stringValueProp,
	suggestionsProp,
	variantProp,
} from '../../internal/props';

/**
 * @slot - The label of the input field.
 */
@Component({
	tag: 'kol-combobox',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolCombobox
	extends BaseListboxWebComponent<ComboboxApi>
	implements ClickableElement, ComboboxProps, FocusableElement, WebComponentInterface<ComboboxApi>
{
	@Element() protected readonly host?: HTMLKolComboboxElement;
	protected readonly ctaRef = createCtaRef<HTMLInputElement>();
	private clearButtonRef?: HTMLKolButtonWcElement;

	private readonly translateDeleteSelection = translate('kol-delete-selection');

	@State() public id = createUniqueId('combobox');

	/** Whether the focus is inside the field; only `focusin` and `focusout` change it. */
	@State() public inputHasFocus = false;

	@State() public isOpen = false;

	@State() public blockSuggestionMouseOver = false;

	/**
	 * The suggestions matching the input. The `_suggestions` watcher assigns the raw prop, which can
	 * be a JSON string; no option is rendered then until the next filtering.
	 */
	@State() public filteredSuggestions?: SuggestionsPropType;

	/** Whether the field has a value, for the class `has-value`; it follows each `change`. */
	private hasValue = false;

	public constructor() {
		super();
		this.initFormAssociation('combobox', this._name);
	}

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string> {
		return this.getRenderProp('value');
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(comboboxPropsConfig);
		// Without `_value` the field starts with the empty string; `undefined` and `null` keep the value.
		this.setRenderProp('value', '');

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
		this.watchHasClearButton(this._hasClearButton);
		this.watchPlaceholder(this._placeholder);
		this.watchRequired(this._required);
		this.applySuggestions(this._suggestions);
		this.applyValue(this._value);

		this.hasValue = !!this.getRenderProp('value');
		this.filteredSuggestions = this.getRenderProp('suggestions');
	}

	public disconnectedCallback(): void {
		this.destroyFormField();
	}

	// --- Listbox ---

	protected getOptionCount(): number {
		return Array.isArray(this.filteredSuggestions) ? this.filteredSuggestions.length : 0;
	}

	protected moveFocus(delta: number): void {
		if (!this.filteredSuggestions) {
			return;
		}
		this.moveFocusWrapping(delta);
	}

	protected focusFirstOption(): void {
		this.focusOption(0);
	}

	protected focusLastOption(): void {
		this.focusOption(this.filteredSuggestions ? this.filteredSuggestions.length - 1 : 0);
	}

	protected handleConfirmKey(event: KeyboardEvent): void {
		// On the clear button, Enter and Space trigger its native click, which must not be prevented.
		if (this.clearButtonRef && event.composedPath().includes(this.clearButtonRef)) {
			return;
		}

		if (event.key === ' ') {
			if (this.isOpen && this.selectFocusedOption()) {
				this.isOpen = false;
				event.preventDefault();
			}
			return;
		}

		if (this.isOpen && this.selectFocusedOption()) {
			this.isOpen = false;
		} else {
			this.toggleListbox();
		}
		event.preventDefault();
	}

	private readonly toggleListbox = (): void => {
		if (this.getRenderProp('disabled') === true) {
			this.isOpen = false;
		} else {
			this.ctaRef.el?.focus();
			if (this.isOpen) {
				this.isOpen = false;
			} else if (Array.isArray(this.filteredSuggestions) && this.filteredSuggestions.length > 0) {
				this.isOpen = true;
				const selectedIndex = this.filteredSuggestions.findIndex((option) => option === this.getRenderProp('value'));
				this.focusedIndex = selectedIndex >= 0 ? selectedIndex : -1;
				this.focusOption(this.focusedIndex);
			}
		}
	};

	private selectFocusedOption(): boolean {
		if (this.filteredSuggestions && this.focusedIndex >= 0 && this.focusedIndex < this.filteredSuggestions.length) {
			this.selectOption(this.filteredSuggestions[this.focusedIndex] as string);
			return true;
		}
		return false;
	}

	/** Typeahead on the list: the first suggestion starting with the character, `-1` without one. */
	private focusSuggestionStartingWith(char: string): void {
		const charLowerCase = char.toLowerCase();
		const index =
			Array.isArray(this.filteredSuggestions) &&
			this.filteredSuggestions.length > 0 &&
			this.filteredSuggestions.findIndex((option: W3CInputValue) => (option as string).toLowerCase().startsWith(charLowerCase));

		if (typeof index === 'number') {
			this.focusOption(index);
		}
	}

	/** Opens or closes the list after typing: a single suggestion equal to the text closes it. */
	private setFilteredSuggestionsByQuery(query: string | undefined): void {
		if (query === undefined) {
			return;
		}
		const suggestions = this.getRenderProp('suggestions');

		if (query.trim() === '') {
			this.filteredSuggestions = [...suggestions];
		} else {
			this.filteredSuggestions = Array.isArray(suggestions)
				? suggestions.filter((option: W3CInputValue) => (option as string).toLowerCase().includes(query.trim().toLowerCase()))
				: this.filteredSuggestions;

			if (this.filteredSuggestions?.length === 1 && this.filteredSuggestions[0] === query) {
				this.isOpen = false;
			} else if (this.filteredSuggestions && this.filteredSuggestions.length > 0) {
				this.isOpen = true;
			} else {
				this.isOpen = false;
			}
		}
	}

	/** Reports the suggestion; the `_value` prop keeps its value (#11124). */
	private selectOption(option: string): void {
		const name = this.getRenderProp('name');
		this.handleInput(createEventWithTarget<EventDetail>(KolEvent.input, { name, value: option }, this.ctaRef.el), option);
		this.handleChange(createEventWithTarget<EventDetail>(KolEvent.change, { name, value: option }, this.ctaRef.el), option);
		this.hasValue = !!option;
		this.formAssociation.setFormAssociatedValue(option);
		this.filteredSuggestions = [...this.getRenderProp('suggestions')];
		this.setRenderProp('value', option);
		this.ctaRef.el?.focus();
	}

	private clearSelection(): void {
		if (this.getRenderProp('disabled') === true) {
			return;
		}

		// empty value removes the clear button (Chromium would send a `focusout`, which would read as leaving the field)
		// so focus on input before clearing the input
		this.ctaRef.el?.focus();

		const emptyValue = '';
		this.focusedIndex = -1;
		this._value = emptyValue;
		this.setRenderProp('value', emptyValue);
		this.filteredSuggestions = [...this.getRenderProp('suggestions')];
		this.isOpen = false;

		const detail = { name: this.getRenderProp('name'), value: emptyValue };
		this.handleInput(createEventWithTarget<EventDetail>(KolEvent.input, detail, this.ctaRef.el), emptyValue);
		this.handleChange(createEventWithTarget<EventDetail>(KolEvent.change, detail, this.ctaRef.el), emptyValue);
		this.hasValue = false;
		this.formAssociation.setFormAssociatedValue(emptyValue);
	}

	// --- Event handling ---

	private readonly handleComboboxInput = (event: Event): void => {
		const value = (event.target as HTMLInputElement).value;
		this.setRenderProp('value', value);
		this._value = value;
		this.handleInput(event, value);
		this.setFilteredSuggestionsByQuery(value);
		this.focusedIndex = -1;
		event.stopImmediatePropagation();
	};

	private readonly handleComboboxChange = (event: Event): void => {
		event.stopPropagation();
		const value = this.getRenderProp('value');
		this.handleChange(event, value);
		this.hasValue = !!value;
		this.formAssociation.setFormAssociatedValue(value);
	};

	/** The input reports the blur; `focusout` on the host decides whether the focus left the field. */
	private readonly handleInputBlur = (event: FocusEvent): void => {
		this.handleFocusLeave(event);
	};

	/** The focus stays inside the field, so the `focus` and `blur` events of the clear button do not leave the combobox. */
	private readonly stopClearButtonFocusEvent = (event: Event): void => {
		event.stopPropagation();
	};

	private readonly handleDropdownKeyDown = (event: KeyboardEvent): void => {
		if (event.key.length === 1 && /[a-z0-9]/i.test(event.key)) {
			this.isOpen = true;
			this.focusSuggestionStartingWith(event.key);
		}
	};

	@Listen('keydown')
	public handleHostKeyDown(event: KeyboardEvent): void {
		this.handleListboxKeyDown(event);
	}

	@Listen('mousemove')
	public handleMouseEvent(): void {
		this.handleListboxMouseMove();
	}

	@Listen('focusin')
	public handleFocusIn(event: FocusEvent): void {
		if (this.host?.contains(document.activeElement) && !this.inputHasFocus) {
			this.handleFocus(event);
		}
	}

	@Listen('focusout')
	public handleFocusOut(event: FocusEvent): void {
		const relatedTarget = event.relatedTarget as HTMLElement | null;
		const isFocusInside = relatedTarget && (relatedTarget === this.host || this.host?.contains(relatedTarget));

		if (this.inputHasFocus && !isFocusInside) {
			this.handleBlur(event);
			if (this.isOpen) {
				this.isOpen = false;
			}
		}
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
			value: this.getRenderProp('value'),
			required: this.getRenderProp('required'),
			...(placeholder ? { placeholder } : {}),
			touched: this.getRenderProp('touched'),
			msg: this.getRenderProp('msg'),
			...(shortKey ? { 'aria-keyshortcuts': shortKey } : {}),
			ref: this.ctaRef,
			class: 'kol-combobox__input',
			type: 'text',
			role: 'combobox',
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
			onBlur: this.handleInputBlur,
			onChange: this.handleComboboxChange,
			onClick: this.handleClick,
			onFocus: this.handleFocus,
			onInput: this.handleComboboxInput,
			onKeyDown: this.handleKeyDown,
			ariaDescribedBy,
			'aria-invalid': hasError ? 'true' : undefined,
		} as InputFCProps;
	}

	private renderOptions(): JSX.Element[] | false {
		const value = this.getRenderProp('value');
		return (
			Array.isArray(this.filteredSuggestions) &&
			this.filteredSuggestions.length > 0 &&
			this.filteredSuggestions.map((option, index) => (
				<CustomSuggestionsOptionFC
					disabled={false}
					index={index}
					option={option}
					searchTerm={value}
					ref={(el) => {
						if (el) this.optionRefs[index] = el;
					}}
					selected={value === option}
					onClick={() => {
						this.selectOption(option as string);
						this.toggleListbox();
						this.isOpen = false;
					}}
					onMouseOver={() => {
						if (!this.blockSuggestionMouseOver) {
							this.focusOption(index);
						}
					}}
					onFocus={() => {
						this.focusOption(index);
					}}
				/>
			))
		);
	}

	public render(): JSX.Element {
		const isDisabled = this.getRenderProp('disabled') === true;
		const { startAdornment, endAdornment } = getInputAdornments({ icons: this.getRenderProp('icons'), disabled: isDisabled });

		return (
			<Host>
				<FormFieldFC
					{...this.getFormFieldProps({
						class: clsx('kol-combobox', { 'has-value': this.hasValue, 'kol-combobox--open': this.isOpen }),
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
						<div class="kol-combobox__group">
							<InputFC {...this.getInputProps()} />
							{this.getRenderProp('value') && this.getRenderProp('hasClearButton') && (
								<KolButtonWcTag
									ref={(el) => (this.clearButtonRef = el)}
									_icons="kolicon-cross"
									_label={this.translateDeleteSelection}
									_hideLabel
									_variant="ghost"
									_disabled={isDisabled}
									data-testid="combobox-delete"
									class="kol-combobox__delete"
									hidden={isDisabled}
									onBlur={this.stopClearButtonFocusEvent}
									onFocus={this.stopClearButtonFocusEvent}
									_on={{
										onClick: () => {
											this.clearSelection();
										},
									}}
								/>
							)}
							<button type="button" tabIndex={-1} class="kol-combobox-toggle" onClick={this.toggleListbox} disabled={isDisabled} hidden={isDisabled}>
								<IconFC icons="kolicon-chevron-down" label="" />
							</button>
						</div>
						<CustomSuggestionsOptionsGroupFC
							blockSuggestionMouseOver={this.blockSuggestionMouseOver}
							onKeyDown={this.handleDropdownKeyDown}
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
	 * References an external element by ID that provides accessible details for this combobox.
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
	 * Defines the icon classnames.
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
	 * Shows the clear button if enabled.
	 */
	@Prop() public _hasClearButton?: boolean = true;

	/**
	 * Suggestions to provide for the input.
	 */
	@Prop() public _suggestions!: SuggestionsPropType;

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
	@Prop({ mutable: true, reflect: true }) public _value?: string;

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

	@Watch('_placeholder')
	public watchPlaceholder(value?: string): void {
		placeholderProp.apply(value, (v) => this.setRenderProp('placeholder', v));
	}

	@Watch('_required')
	public watchRequired(value?: boolean): void {
		requiredProp.apply(value, (v) => this.setRenderProp('required', v));
	}

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
		validateAccessAndShortKey(this._accessKey, value);
	}

	private applySuggestions(value?: SuggestionsPropType): void {
		suggestionsProp.apply(value, (v) => this.setRenderProp('suggestions', v));
	}

	/** Assigns the raw prop to the filtered suggestions, then filters them by the `_value` prop. */
	@Watch('_suggestions')
	public watchSuggestions(value?: SuggestionsPropType): void {
		this.applySuggestions(value);
		this.filteredSuggestions = value;
		this.setFilteredSuggestionsByQuery(this._value);
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

	/** `undefined` and `null` keep the current value. */
	private applyValue(value?: string): void {
		if (value !== undefined && value !== null) {
			stringValueProp.apply(value, (v) => this.setRenderProp('value', v));
		}
	}

	@Watch('_value')
	public watchValue(value?: string): void {
		this.applyValue(value);
		this.formAssociation.setFormAssociatedValue(value as string);
	}

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
