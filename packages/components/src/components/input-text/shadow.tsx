import type { JSX, VNode } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from '../../utils/clsx';

import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper/FormFieldStateWrapper';
import KolInputContainerFc from '../../functional-component-wrappers/InputContainerStateWrapper/InputContainerStateWrapper';
import KolInputStateWrapperFc, { type InputStateWrapperProps } from '../../functional-component-wrappers/InputStateWrapper/InputStateWrapper';
import KolIconButtonFc from '../../functional-components/IconButton';
import { translate } from '../../i18n';
import type {
	AccessKeyPropType,
	AriaDetailsPropType,
	AutoCompletePropType,
	ClickableElement,
	DisabledPropType,
	FocusableElement,
	HasCounterPropType,
	HideLabelPropType,
	HideMsgPropType,
	HintPropType,
	IconsHorizontalPropType,
	InputTextAPI,
	InputTextStates,
	InputTextTypePropType,
	InputTypeOnDefault,
	InternalButtonProps,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MaxLengthBehaviorPropType,
	MsgPropType,
	NamePropType,
	PlaceholderPropType,
	ReadOnlyPropType,
	RequiredPropType,
	ShortKeyPropType,
	SpellCheckPropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { CounterDomUpdater } from '../../utils/counter-dom-updater';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { propagateSubmitEventToForm } from '../form/controller';
import { InputTextController } from './controller';

/**
 * The **Text** input type creates an input field for plain text, search terms, URLs, or phone numbers.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-input-text',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputText implements ClickableElement, FocusableElement, InputTextAPI {
	@Element() protected readonly host?: HTMLKolInputTextElement;
	protected readonly ctaRef = createCtaRef<HTMLInputElement>();
	private oldValue?: string;
	private readonly counterUpdater = new CounterDomUpdater();

	private readonly onBlur = (event: FocusEvent) => {
		this.controller.onFacade.onBlur(event);
		this.inputHasFocus = false;
	};

	private readonly onChange = (event: Event) => {
		const value = this.ctaRef.el?.value;

		if (this.oldValue !== value) {
			this.oldValue = value;
		}

		this.controller.onFacade.onChange(event);
	};

	private readonly onFocus = (event: FocusEvent) => {
		this.controller.onFacade.onFocus(event);
		this.inputHasFocus = true;
		this.counterUpdater.retriggerAria(this._value?.length ?? 0, this.state._maxLength, this.state._maxLengthBehavior ?? 'hard');
	};

	private readonly onInput = (event: InputEvent) => {
		this._value = this.ctaRef.el?.value ?? '';
		this.controller.onFacade.onInput(event);
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		this.controller.onFacade.onKeyDown(event);
		this.counterUpdater.handleKeyDown(event, this.ctaRef.el?.value.length ?? 0, this.state._maxLength, this.state._maxLengthBehavior ?? 'hard');

		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ctaRef.el,
			});
		}
	};

	private readonly translateClearSearch = translate('kol-clear-search');

	private getClearButton(): VNode | null {
		if (this.state._type === 'search' && !this._disabled && this.state._hasValue) {
			return (
				<KolIconButtonFc
					componentName="button"
					class="kol-input-text__clear-button kol-input-container__smart-button"
					data-testid="kol-input-text-clear-button"
					label={this.translateClearSearch}
					buttonVariant="ghost"
					onClick={(): void => {
						this._value = '';
						this.ctaRef.el?.focus();
					}}
					icon="kolicon-x"
					disabled={this._disabled}
				/>
			);
		}

		return null;
	}

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this.ctaRef.el?.value;
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

	/**
	 * Get selection start of internal element.
	 */
	@Method()
	public async selectionStart() {
		return Promise.resolve(this.ctaRef.el?.selectionStart);
	}

	/**
	 * Get selection end of internal element.
	 */
	@Method()
	public async selectionEnd() {
		return Promise.resolve(this.ctaRef.el?.selectionEnd);
	}

	/**
	 * Set selection start and end, and optional in which direction, of internal element; just like https://developer.mozilla.org/docs/Web/API/HTMLInputElement/setSelectionRange
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none') {
		this.ctaRef.el?.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
	}

	/**
	 * Set selection start (and end = start) of internal element.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async setSelectionStart(selectionStart: number) {
		this.ctaRef.el?.setSelectionRange(selectionStart, selectionStart);
	}

	/**
	 * Add string at position of internal element; just like https://developer.mozilla.org/docs/Web/API/HTMLInputElement/setRangeText
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async setRangeText(replacement: string, selectionStart?: number, selectionEnd?: number, selectMode?: 'select' | 'start' | 'end' | 'preserve') {
		if (selectionStart !== undefined && selectionEnd !== undefined) {
			this.ctaRef.el?.setRangeText(replacement, selectionStart, selectionEnd, selectMode);
		} else {
			this.ctaRef.el?.setRangeText(replacement);
		}
	}

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: clsx('kol-input-text', this.state._type as string, {
				'has-value': this.state._hasValue,
				'kol-form-field--has-counter': this.controller.hasSoftCharacterLimit() || this.controller.hasCounter(),
			}),
			tooltipAlign: this._tooltipAlign,
			alert: this.showAsAlert(),
			counterRefs: {
				visualRef: this.counterUpdater.setVisualRef,
				ariaRef: this.counterUpdater.setAriaRef,
			},
		};
	}

	private getInputProps(): InputStateWrapperProps {
		const ariaDescribedBy =
			typeof this.state._maxLength === 'number' && !this.controller.hasCounter() ? [createRelatedUniqueId(this.state._id, 'character-limit-hint')] : undefined; // When a character limit is defined but no counter is shown, we provide an additional hint referenced by aria-describedby. With a counter, its spans already convey the limit.

		return {
			ref: this.ctaRef,
			state: this.state,
			ariaDescribedBy,
			...this.controller.onFacade,
			onBlur: this.onBlur,
			onChange: this.onChange,
			onFocus: this.onFocus,
			onInput: this.onInput,
			onKeyDown: this.onKeyDown,
		};
	}

	public render(): JSX.Element {
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerFc state={this.state} endAdornment={this.getClearButton()}>
					<KolInputStateWrapperFc {...this.getInputProps()} />
				</KolInputContainerFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	private readonly controller: InputTextController;

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Defines whether the input can be auto-completed.
	 */
	@Prop() public _autoComplete?: AutoCompletePropType = 'off';

	/**
	 * References an external element by ID that provides accessible details for this input.
	 */
	@Prop() public _ariaDetails?: AriaDetailsPropType;

	@Watch('_ariaDetails')
	public validateAriaDetails(value?: AriaDetailsPropType): void {
		this.controller.validateAriaDetails(value);
	}

	/**
	 * Shows a character counter for the input element.
	 */
	@Prop() public _hasCounter?: boolean = false;

	/**
	 * Defines the behavior when maxLength is set. 'hard' sets the maxlength attribute, 'soft' shows a character counter without preventing input.
	 */
	@Prop() public _maxLengthBehavior?: MaxLengthBehaviorPropType = 'hard';

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
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: IconsHorizontalPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the maximum number of input characters.
	 */
	@Prop() public _maxLength?: number;

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
	 * Defines a validation pattern for the input field.
	 */
	@Prop() public _pattern?: string;

	/**
	 * Defines the placeholder for input field. To be shown when there's no value.
	 */
	@Prop() public _placeholder?: string;

	/**
	 * Makes the input element read only.
	 * @TODO: Change type back to `ReadOnlyPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _readOnly?: boolean = false;

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
	 * Defines whether the browser should check the spelling and grammar.
	 */
	@Prop() public _spellCheck?: SpellCheckPropType;

	/**
	 * Suggestions to provide for the input.
	 */
	@Prop() public _suggestions?: SuggestionsPropType;

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<InternalButtonProps>;

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
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: InputTextTypePropType = 'text';

	/**
	 * Defines the value of the element.
	 */
	@Prop({ mutable: true, reflect: true }) public _value?: string;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	@State() public state: InputTextStates = {
		_hasValue: false,
		_hideMsg: false,
		_id: createUniqueId('input-text'),
		_label: '', // ⚠ required
		_suggestions: [],
		_type: 'text',
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new InputTextController(this, 'text', this.host);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: AccessKeyPropType): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_autoComplete')
	public validateAutoComplete(value?: AutoCompletePropType): void {
		this.controller.validateAutoComplete(value);
	}

	@Watch('_maxLengthBehavior')
	public validateMaxLengthBehavior(value?: MaxLengthBehaviorPropType): void {
		this.controller.validateMaxLengthBehavior(value);
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

	@Watch('_hasCounter')
	public validateHasCounter(value?: HasCounterPropType): void {
		this.controller.validateHasCounter(value);
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

	@Watch('_maxLength')
	public validateMaxLength(value?: number): void {
		this.controller.validateMaxLength(value);
		this.counterUpdater.updateImmediate(this._value?.length ?? 0, this.state._maxLength, this.state._maxLengthBehavior ?? 'hard');
	}

	@Watch('_msg')
	public validateMsg(value?: Stringified<MsgPropType>): void {
		this.controller.validateMsg(value);
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		this.controller.validateOn(value);
	}

	@Watch('_pattern')
	public validatePattern(value?: string): void {
		this.controller.validatePattern(value);
	}

	@Watch('_placeholder')
	public validatePlaceholder(value?: PlaceholderPropType): void {
		this.controller.validatePlaceholder(value);
	}

	@Watch('_readOnly')
	public validateReadOnly(value?: ReadOnlyPropType): void {
		this.controller.validateReadOnly(value);
	}

	@Watch('_required')
	public validateRequired(value?: RequiredPropType): void {
		this.controller.validateRequired(value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_spellCheck')
	public validateSpellCheck(value?: SpellCheckPropType): void {
		this.controller.validateSpellCheck(value);
	}

	@Watch('_suggestions')
	public validateSuggestions(value?: SuggestionsPropType): void {
		this.controller.validateSuggestions(value);
	}

	@Watch('_smartButton')
	public validateSmartButton(value?: InternalButtonProps | string): void {
		this.controller.validateSmartButton(value);
	}

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.controller.validateSyncValueBySelector(value);
	}

	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	@Watch('_type')
	public validateType(value?: InputTextTypePropType): void {
		this.controller.validateType(value);
	}

	@Watch('_value')
	public validateValue(value?: string): void {
		this.controller.validateValue(value);
		this.oldValue = value;
		this.counterUpdater.update(value?.length ?? 0, this.state._maxLength, this.state._maxLengthBehavior ?? 'hard');
	}

	@Watch('_variant')
	public validateVariant(value?: VariantClassNamePropType): void {
		this.controller.validateVariant(value);
	}

	public componentDidLoad(): void {
		if (this.controller.hasCounter() || this.controller.hasSoftCharacterLimit()) {
			this.counterUpdater.updateImmediate(this._value?.length ?? 0, this.state._maxLength, this.state._maxLengthBehavior ?? 'hard');
		}
	}

	public disconnectedCallback(): void {
		this.counterUpdater.destroy();
	}

	public componentWillLoad(): void {
		this.validateAriaDetails(this._ariaDetails);

		this._touched = this._touched === true;
		this.oldValue = this._value;
		this.controller.componentWillLoad();

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}
}
