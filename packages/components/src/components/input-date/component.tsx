import type { JSX, VNode } from '@stencil/core';
import { Component, Element, forceUpdate, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type {
	AriaDetailsPropType,
	AutoCompletePropType,
	ClickableElement,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	IconsHorizontalPropType,
	InputDateProps,
	InputDateTypePropType,
	InputTypeOnDefault,
	InternalButtonProps,
	Iso8601,
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
import { deprecatedHint } from '../../schema';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';

import { getInputAdornments } from '../../internal/functional-components/form-field/adornments';
import { BaseFormFieldWebComponent } from '../../internal/functional-components/form-field/base-web-component';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import type { DateValueType } from '../../internal/functional-components/form-field/date-value';
import { getDateValueType, remapDateValue } from '../../internal/functional-components/form-field/date-value';
import { InputFC, type InputFCProps } from '../../internal/functional-components/form-field/input';
import { InputContainerFC } from '../../internal/functional-components/form-field/input-container';
import { SuggestionsFC } from '../../internal/functional-components/form-field/suggestions';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { InputDateApi } from '../../internal/functional-components/input-date/api';
import { inputDatePropsConfig } from '../../internal/functional-components/input-date/api';
import {
	accessKeyProp,
	autoCompleteProp,
	horizontalIconsProp,
	inputDateMaxProp,
	inputDateMinProp,
	inputDateTypeProp,
	inputDateValueProp,
	readOnlyProp,
	requiredProp,
	shortKeyProp,
	smartButtonProp,
	stepProp,
	suggestionsProp,
	variantProp,
} from '../../internal/props';
import type { InputDateDeps } from '../../internal/props/helpers/iso-date';
import clsx from '../../utils/clsx';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { propagateSubmitEventToForm } from '../form/controller';

/**
 * The **Date** input type creates an input field for date values. These can be specific dates as well as weeks, months, or time values.
 *
 * @slot - The label of the input field.
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-input-date',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputDate
	extends BaseFormFieldWebComponent<InputDateApi>
	implements ClickableElement, FocusableElement, InputDateProps, WebComponentInterface<InputDateApi>
{
	@Element() protected readonly host?: HTMLKolInputDateElement;
	protected readonly ctaRef = createCtaRef<HTMLInputElement>();

	@State() public id = createUniqueId('input-date');

	@State() public inputHasFocus = false;

	/** Type in which `_value` was set; `getValue()` and the events return the value in this type. */
	private valueType: DateValueType = null;

	/**
	 * Whether the field has a value, rendered as the root class `has-value`. It is a plain field, not
	 * state: it follows the initial value and every `change`, and the class follows with the next
	 * render (#11053).
	 */
	private hasValue = false;

	public constructor() {
		super();
		this.initFormAssociation('date', this._name);
	}

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | Date | undefined | null> {
		return this.ctaRef.el && remapDateValue(this.ctaRef.el.value, this.valueType);
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
	 * Resets the component's value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async reset() {
		// `_value` keeps its value; only the rendered and the form value are cleared.
		this.setRenderProp('value', undefined as unknown as string);
		forceUpdate(this);
		this.formAssociation.setFormAssociatedValue('');

		// Setting the render value might not change the native element if the previous value is already an empty string,
		// which can occur during an incomplete input. Directly setting the DOM property "forces" a reset of the native element.
		if (this.ctaRef.el) {
			this.ctaRef.el.value = '';
		}
	}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(inputDatePropsConfig);
		// Without `_smartButton` no button is rendered, so the seeded default must not survive.
		this.unsetRenderProp('smartButton');

		if (this._value !== undefined) {
			this.valueType = getDateValueType(this._value);
		}
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
		this.watchSmartButton(this._smartButton);
		this.watchOn(this._on);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchVariant(this._variant);
		this.watchIcons(this._icons);
		this.watchAutoComplete(this._autoComplete);
		this.watchMax(this._max);
		this.watchMin(this._min);
		this.watchSuggestions(this._suggestions);
		this.watchReadOnly(this._readOnly);
		this.watchRequired(this._required);
		this.watchStep(this._step);
		this.watchType(this._type);
		this.watchValue(this._value);

		this.hasValue = Boolean(this.getRenderProp('value'));
	}

	public disconnectedCallback(): void {
		this.destroyFormField();
	}

	// --- Value ---

	/** The date props depend on the raw `_type` and `_step`, like the legacy validation. */
	private get dateDeps(): InputDateDeps {
		return { type: this._type, step: this._step };
	}

	private readValue(event: Event): Date | Iso8601 | null {
		return remapDateValue((event.target as HTMLInputElement).value, this.valueType);
	}

	// --- Event handling ---

	/** Writes the value before the input event is dispatched, so the watcher has run when listeners read it. */
	private readonly handleDateInput = (event: Event): void => {
		const value = this.readValue(event);
		this._value = value;
		this.handleInput(event, value);
	};

	private readonly handleDateChange = (event: Event): void => {
		const value = this.readValue(event);
		this.handleChange(event, value);
		this.hasValue = Boolean(value);
	};

	/** Writes the value back when it switches between empty and set, so a reset via `_value = null` works again. */
	private readonly handleDateBlur = (event: FocusEvent): void => {
		this.handleBlur(event);
		const value = (event.target as HTMLInputElement).value;
		if (Boolean(value) !== Boolean(this._value)) {
			this._value = value as Iso8601;
		}
	};

	private isNativeCalendarIconFocused(): boolean {
		if (!this.ctaRef.el || typeof window === 'undefined' || typeof window.getComputedStyle !== 'function') {
			return false;
		}
		return window.getComputedStyle(this.ctaRef.el).content.includes('native-icon-focused');
	}

	/** Enter submits the surrounding `kol-form`, unless it opens the native calendar; Space does not open it while read-only. */
	private readonly handleDateKeyDown = (event: KeyboardEvent): void => {
		this.handleKeyDown(event);
		if ((event.code === 'Enter' || event.code === 'NumpadEnter') && !this.isNativeCalendarIconFocused()) {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ctaRef.el,
			});
		}
		if (this.getRenderProp('readOnly') && event.code === 'Space') {
			event.preventDefault();
		}
	};

	// --- Render ---

	/**
	 * Props of the native `<input>`. The keys follow the order of the legacy state wrapper, and props
	 * the legacy state only held once set are only passed when set: the rendered attributes keep their
	 * order in the hydrate snapshot.
	 */
	private getInputProps(): InputFCProps {
		const id = this.id;
		const accessKey = this.getRenderProp('accessKey');
		const shortKey = this.getRenderProp('shortKey');
		const suggestions = this.getRenderProp('suggestions');
		const { ariaDescribedBy, hasError } = this.getAria();

		return {
			id,
			hideLabel: this.getRenderProp('hideLabel'),
			label: this.getRenderProp('label'),
			disabled: this.getRenderProp('disabled'),
			// The name prop defaults to `''`; an unnamed field renders no `name` attribute.
			name: this.getRenderProp('name') || undefined,
			...(accessKey ? { accessKey } : {}),
			type: this.getRenderProp('type'),
			value: this.getRenderProp('value'),
			required: this.getRenderProp('required'),
			autoComplete: this.getRenderProp('autoComplete'),
			readonly: this.getRenderProp('readOnly'),
			min: this.getRenderProp('min'),
			max: this.getRenderProp('max'),
			step: this.getRenderProp('step'),
			touched: this.getRenderProp('touched'),
			msg: this.getRenderProp('msg'),
			...(shortKey ? { 'aria-keyshortcuts': shortKey } : {}),
			...(suggestions.length > 0 ? { suggestions: (<SuggestionsFC id={id} suggestions={suggestions} />) as VNode } : {}),
			ref: this.ctaRef,
			onBlur: this.handleDateBlur,
			onChange: this.handleDateChange,
			onClick: this.handleClick,
			onFocus: this.handleFocus,
			onInput: this.handleDateInput,
			onKeyDown: this.handleDateKeyDown,
			ariaDescribedBy,
			'aria-invalid': hasError ? 'true' : undefined,
		};
	}

	public render(): JSX.Element {
		const disabled = this.getRenderProp('disabled');
		const { startAdornment, endAdornment } = getInputAdornments({
			icons: this.getRenderProp('icons'),
			smartButton: this.getRenderProp('smartButton') as InternalButtonProps | undefined,
			disabled,
		});

		return (
			<Host>
				<FormFieldFC
					{...this.getFormFieldProps({
						class: clsx('kol-input-date', this.getRenderProp('type'), {
							'has-value': this.hasValue,
						}),
						accessKey: this.getRenderProp('accessKey') || undefined,
						shortKey: this.getRenderProp('shortKey') || undefined,
						variant: this.getRenderProp('variant'),
						required: this.getRenderProp('required'),
						readOnly: this.getRenderProp('readOnly'),
					})}
				>
					<InputContainerFC
						disabled={disabled}
						msg={this.getRenderProp('msg')}
						touched={this.getRenderProp('touched')}
						startAdornment={startAdornment}
						endAdornment={endAdornment}
					>
						<InputFC {...this.getInputProps()} />
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
	@Prop() public _max?: Iso8601 | Date;

	/**
	 * Defines the smallest possible input value.
	 */
	@Prop() public _min?: Iso8601 | Date;

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
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<InternalButtonProps>;

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
	 * Defines the step size for value changes.
	 */
	@Prop() public _step?: number | NumberString;

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
	@Prop() public _type: InputDateTypePropType = 'date';

	/**
	 * Defines the value of the element.
	 */
	@Prop({ mutable: true, reflect: true }) public _value?: Iso8601 | Date | null;

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
	public watchMax(value?: Iso8601 | Date): void {
		inputDateMaxProp.apply(value, (v) => this.setRenderProp('max', v), this.dateDeps);
	}

	@Watch('_min')
	public watchMin(value?: Iso8601 | Date): void {
		inputDateMinProp.apply(value, (v) => this.setRenderProp('min', v), this.dateDeps);
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

	@Watch('_readOnly')
	public watchReadOnly(value?: boolean): void {
		readOnlyProp.apply(value, (v) => this.setRenderProp('readOnly', v));
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

	@Watch('_smartButton')
	public watchSmartButton(value?: Stringified<InternalButtonProps>): void {
		if (value === undefined || value === null) {
			this.unsetRenderProp('smartButton');
		} else {
			smartButtonProp.apply(value, (v) => this.setRenderProp('smartButton', v));
		}
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

	@Watch('_type')
	public watchType(value?: InputDateTypePropType): void {
		inputDateTypeProp.apply(value, (v) => this.setRenderProp('type', v));
	}

	/** A value reset to `null` keeps the remembered type. */
	@Watch('_value')
	public watchValue(value?: Iso8601 | Date | null): void {
		if (value instanceof Date) {
			deprecatedHint('Date type will be removed in v3. Use `Iso8601` instead.');
		}
		inputDateValueProp.apply(value, (v) => this.setRenderProp('value', v), this.dateDeps);
		this.formAssociation.setFormAssociatedValue(this.getRenderProp('value') ?? null);
		if (value !== undefined && value !== null) {
			this.valueType = getDateValueType(value);
		}
	}

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
