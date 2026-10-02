import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type {
	AriaDetailsPropType,
	AutoCompletePropType,
	ClickableElement,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	IconsHorizontalPropType,
	InputRangeProps,
	InputTypeOnDefault,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	NumberString,
	ShortKeyPropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';

import { getInputAdornments } from '../../internal/functional-components/form-field/adornments';
import { BaseFormFieldWebComponent } from '../../internal/functional-components/form-field/base-web-component';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import { InputFC, type InputFCProps } from '../../internal/functional-components/form-field/input';
import { InputContainerFC } from '../../internal/functional-components/form-field/input-container';
import { clampRangeValue, getNumberValueType, remapNumberValue } from '../../internal/functional-components/form-field/number-value';
import { SuggestionsFC } from '../../internal/functional-components/form-field/suggestions';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { InputRangeApi } from '../../internal/functional-components/input-range/api';
import { inputRangePropsConfig } from '../../internal/functional-components/input-range/api';
import {
	BEM_CLASS_INPUT_RANGE__INPUT_NUMBER,
	BEM_CLASS_INPUT_RANGE__INPUT_RANGE,
	InputRangeInputsFC,
} from '../../internal/functional-components/input-range/component';
import {
	accessKeyProp,
	autoCompleteProp,
	horizontalIconsProp,
	inputMaxProp,
	inputMinProp,
	inputNumberValueProp,
	shortKeyProp,
	stepProp,
	suggestionsProp,
	variantProp,
} from '../../internal/props';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { propagateSubmitEventToForm } from '../form/controller';

/**
 * The **Range** input type creates a slider control for selecting a numeric value within a defined range. Use the `_min`, `_max`, and `_step` properties to configure the range and step size.
 *
 * @slot - The label of the input field.
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-input-range',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputRange
	extends BaseFormFieldWebComponent<InputRangeApi>
	implements ClickableElement, FocusableElement, InputRangeProps, WebComponentInterface<InputRangeApi>
{
	@Element() protected readonly host?: HTMLKolInputRangeElement;
	/** The number input: the target of `focus()`, `click()` and `getValue()`. */
	protected readonly ctaRef = createCtaRef<HTMLInputElement>();
	private rangeRef?: HTMLInputElement;

	@State() public id = createUniqueId('input-range');

	@State() public inputHasFocus = false;

	/** Whether `_value` was set as a string; `getValue()` and the events return the value in this type. */
	private valueIsNumberString = false;

	public constructor() {
		super();
		this.initFormAssociation('range', this._name);
	}

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<number | NumberString | undefined> {
		if (this.ctaRef.el !== undefined) {
			return this.readValue(this.ctaRef.el.value);
		}
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
		this.initRenderProps(inputRangePropsConfig);
		// The bounds start at the defaults of `_min` and `_max`, so an ignored invalid value keeps them (#11077).
		this.setRenderProp('min', 0);
		this.setRenderProp('max', 100);

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
		this.watchAutoComplete(this._autoComplete);
		this.watchMax(this._max);
		this.watchMin(this._min);
		this.watchStep(this._step);
		this.watchSuggestions(this._suggestions);
		this.watchValue(this._value);
	}

	/** Without a value the field takes the value of the native range input, which the browser sets to the middle of the range (#11076). */
	public componentDidLoad(): void {
		if (!this._value && this.rangeRef?.value) {
			this._value = parseFloat(this.rangeRef.value);
		}
	}

	public disconnectedCallback(): void {
		this.destroyFormField();
	}

	// --- Value ---

	/** The clamped value of a native input in the type in which `_value` was set. */
	private readValue(raw: string): number | NumberString {
		const value = clampRangeValue(raw, this.getRenderProp('min'), this.getRenderProp('max'));
		return remapNumberValue(value, this.valueIsNumberString ? 'NumberString' : 'number') ?? value;
	}

	// --- Event handling ---

	/** The inputs follow `_value` only on `change` (#11075). */
	private readonly handleRangeInput = (event: Event): void => {
		this.handleInput(event, this.readValue((event.target as HTMLInputElement).value));
	};

	private readonly handleRangeChange = (event: Event): void => {
		const value = this.readValue((event.target as HTMLInputElement).value);
		this._value = value;
		this.handleChange(event, value);
	};

	/** Enter in the number input submits the surrounding `kol-form`, like in a native form. */
	private readonly handleNumberKeyDown = (event: KeyboardEvent): void => {
		this.handleKeyDown(event);
		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ctaRef.el,
			});
		}
	};

	private readonly setRangeRef = (element?: HTMLInputElement): void => {
		if (element) {
			this.rangeRef = element;
		}
	};

	// --- Render ---

	/**
	 * Props both native inputs share. The keys follow the order of the legacy state wrapper, the
	 * input-specific props follow in the JSX and the ARIA props come last; props the legacy state only
	 * held once set are only passed when set. The rendered attributes keep their order in the hydrate
	 * snapshot.
	 */
	private getSharedInputProps(): InputFCProps {
		const accessKey = this.getRenderProp('accessKey');
		const shortKey = this.getRenderProp('shortKey');

		return {
			id: this.id,
			hideLabel: this.getRenderProp('hideLabel'),
			label: this.getRenderProp('label'),
			disabled: this.getRenderProp('disabled'),
			name: undefined,
			...(accessKey ? { accessKey } : {}),
			// Unset numbers are `null`, like in the legacy state: the first render then writes the empty value, and the
			// range input takes the middle of its range, which `componentDidLoad` reads as the initial value.
			value: this.getRenderProp('value') ?? null,
			autoComplete: this.getRenderProp('autoComplete'),
			min: this.getRenderProp('min') ?? null,
			max: this.getRenderProp('max') ?? null,
			step: this.getRenderProp('step') ?? null,
			touched: this.getRenderProp('touched'),
			msg: this.getRenderProp('msg'),
			...(shortKey ? { 'aria-keyshortcuts': shortKey } : {}),
			onBlur: this.handleBlur,
			onChange: this.handleRangeChange,
			onClick: this.handleClick,
			onFocus: this.handleFocus,
			onInput: this.handleRangeInput,
			onKeyDown: this.handleKeyDown,
		};
	}

	public render(): JSX.Element {
		const disabled = this.getRenderProp('disabled');
		const name = this.getRenderProp('name');
		const min = this.getRenderProp('min');
		const max = this.getRenderProp('max');
		const suggestions = this.getRenderProp('suggestions');
		const hasSuggestions = suggestions.length > 0;
		const list = hasSuggestions ? createRelatedUniqueId(this.id, 'list') : undefined;
		const shared = this.getSharedInputProps();
		const { ariaDescribedBy, hasError } = this.getAria();
		const ariaInvalid = hasError ? 'true' : undefined;
		const { startAdornment, endAdornment } = getInputAdornments({ icons: this.getRenderProp('icons'), disabled });

		return (
			<Host>
				<FormFieldFC
					{...this.getFormFieldProps({
						class: 'kol-input-range range',
						accessKey: this.getRenderProp('accessKey') || undefined,
						shortKey: this.getRenderProp('shortKey') || undefined,
						variant: this.getRenderProp('variant'),
					})}
				>
					<InputContainerFC
						disabled={disabled}
						msg={this.getRenderProp('msg')}
						touched={this.getRenderProp('touched')}
						startAdornment={startAdornment}
						endAdornment={endAdornment}
					>
						<InputRangeInputsFC max={max} min={min}>
							<InputFC
								{...shared}
								class={BEM_CLASS_INPUT_RANGE__INPUT_RANGE}
								name={name ? `${name}-range` : undefined}
								list={list}
								type="range"
								tabIndex={-1}
								id={undefined}
								accessKey={undefined}
								aria-hidden="true"
								ref={this.setRangeRef}
								ariaDescribedBy={ariaDescribedBy}
								aria-invalid={ariaInvalid}
							/>
							<InputFC
								{...shared}
								class={BEM_CLASS_INPUT_RANGE__INPUT_NUMBER}
								name={name ? `${name}-number` : undefined}
								list={list}
								type="number"
								ref={this.ctaRef}
								onKeyDown={this.handleNumberKeyDown}
								ariaDescribedBy={ariaDescribedBy}
								aria-invalid={ariaInvalid}
							/>
						</InputRangeInputsFC>
						{hasSuggestions && <SuggestionsFC id={this.id} suggestions={suggestions} />}
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
	 * Defines whether the input can be auto-completed.
	 */
	@Prop() public _autoComplete?: AutoCompletePropType = 'off';

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
	 * Defines the informational popover after the label.
	 */
	@Prop() public _infoPopover?: FormFieldLabelInfoPopoverProps;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the maximum value of the element.
	 */
	@Prop() public _max?: number | NumberString = 100;

	/**
	 * Defines the smallest possible input value.
	 */
	@Prop() public _min?: number | NumberString = 0;

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
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	/**
	 * Defines the step size for value changes.
	 */
	@Prop() public _step?: number | NumberString;

	/**
	 * Suggestions to provide for the input.
	 */
	@Prop() public _suggestions?: SuggestionsPropType;

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
	@Prop({ mutable: true, reflect: true }) public _value?: number | NumberString;

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

	@Watch('_autoComplete')
	public watchAutoComplete(value?: AutoCompletePropType): void {
		autoCompleteProp.apply(value, (v) => this.setRenderProp('autoComplete', v));
	}

	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.applyDisabled(value);
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

	@Watch('_max')
	public watchMax(value?: number | NumberString): void {
		inputMaxProp.apply(value, (v) => this.setRenderProp('max', v));
	}

	@Watch('_min')
	public watchMin(value?: number | NumberString): void {
		inputMinProp.apply(value, (v) => this.setRenderProp('min', v));
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

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
		validateAccessAndShortKey(this._accessKey, value);
	}

	@Watch('_step')
	public watchStep(value?: number | NumberString): void {
		stepProp.apply(value, (v) => this.setRenderProp('step', v));
	}

	@Watch('_suggestions')
	public watchSuggestions(value?: SuggestionsPropType): void {
		suggestionsProp.apply(value, (v) => this.setRenderProp('suggestions', v));
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
	public watchValue(value?: number | NumberString | null): void {
		inputNumberValueProp.apply(value, (v) => this.setRenderProp('value', v));
		this.formAssociation.setFormAssociatedValue(this.getRenderProp('value') ?? null);
		if (value !== undefined) {
			this.valueIsNumberString = getNumberValueType(value) === 'NumberString';
		}
	}

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
