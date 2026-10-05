import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type {
	AriaDetailsPropType,
	ClickableElement,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	IconsHorizontalPropType,
	InputTypeOnDefault,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MaxLengthBehaviorPropType,
	MsgPropType,
	NamePropType,
	RowsPropType,
	ShortKeyPropType,
	SpellCheckPropType,
	Stringified,
	SyncValueBySelectorPropType,
	TextareaProps,
	TextareaResizePropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { CounterBehavior } from '../../internal/functional-components/counter/behavior';
import { getInputAdornments } from '../../internal/functional-components/form-field/adornments';
import { BaseFormFieldWebComponent } from '../../internal/functional-components/form-field/base-web-component';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import { InputContainerFC } from '../../internal/functional-components/form-field/input-container';
import { TextAreaFC, type TextAreaFCProps } from '../../internal/functional-components/form-field/textarea';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { TextareaApi } from '../../internal/functional-components/textarea/api';
import { textareaPropsConfig } from '../../internal/functional-components/textarea/api';
import {
	accessKeyProp,
	adjustHeightProp,
	horizontalIconsProp,
	placeholderProp,
	readOnlyProp,
	requiredProp,
	resizeProp,
	rowsProp,
	shortKeyProp,
	spellCheckProp,
	stringValueProp,
	variantProp,
} from '../../internal/props';
import clsx from '../../utils/clsx';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';

/**
 * The **Textarea** component provides a larger input field for content. Unlike InputText, it also allows extensive content to be entered, including line breaks.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-textarea',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTextarea
	extends BaseFormFieldWebComponent<TextareaApi>
	implements ClickableElement, FocusableElement, TextareaProps, WebComponentInterface<TextareaApi>
{
	@Element() protected readonly host?: HTMLKolTextareaElement;
	protected readonly ctaRef = createCtaRef<HTMLTextAreaElement>();
	private readonly counter = new CounterBehavior(BaseWebComponent.stateLess);

	/**
	 * Whether the field has a value, rendered as the root class `kol-form-field--has-value`. It is a
	 * plain field, not state, and only follows `change` (#11053).
	 */
	private hasValue = false;

	@State() public id = createUniqueId('textarea');

	@State() public inputHasFocus = false;

	public constructor() {
		super();
		this.initFormAssociation('textarea', this._name);
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

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(textareaPropsConfig);
		this.watchAriaDetails(this._ariaDetails);
		this._touched = this._touched === true;
		this.watchName(this._name);
		this.watchSyncValueBySelector(this._syncValueBySelector);
		this.watchTouched(this._touched);
		this.watchAccessKey(this._accessKey);
		this.watchAdjustHeight(this._adjustHeight);
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
		this.watchHasCounter(this._hasCounter);
		this.watchMaxLengthBehavior(this._maxLengthBehavior);
		// Without a counter update: `componentDidLoad` fills the counter once its spans exist.
		this.counter.watchMaxLength(this._maxLength);
		this.watchPlaceholder(this._placeholder);
		this.watchReadOnly(this._readOnly);
		this.watchRequired(this._required);
		this.watchResize(this._resize);
		this.watchRows(this._rows);
		this.watchSpellCheck(this._spellCheck);
		this.applyValue(this._value);
		this.hasValue = Boolean(this.getRenderProp('value'));
	}

	public componentDidLoad(): void {
		if (this.counter.hasCounter() || this.counter.hasSoftLimit()) {
			this.counter.updateImmediate(this._value?.length ?? 0);
		}
		// Runs after the first paint, so the height can be measured.
		setTimeout(() => {
			if (this._adjustHeight === true && this.ctaRef.el) {
				this._rows = this.increaseTextareaHeight(this.ctaRef.el);
			} else if (!this._rows) {
				this._rows = 1;
			}
		});
	}

	public disconnectedCallback(): void {
		this.destroyFormField();
		this.counter.destroy();
	}

	// --- Event handling ---

	private readonly handleTextareaInput = (event: Event): void => {
		if (this.ctaRef.el instanceof HTMLTextAreaElement) {
			this._value = this.ctaRef.el.value;
			if (this.getRenderProp('adjustHeight')) {
				this._rows = this.increaseTextareaHeight(this.ctaRef.el);
			}
			this.handleInput(event);
		}
	};

	private readonly handleTextareaChange = (event: Event): void => {
		this.handleChange(event);
		this.hasValue = Boolean((event.target as HTMLTextAreaElement).value);
	};

	private readonly handleTextareaFocus = (event: FocusEvent): void => {
		this.handleFocus(event);
		this.counter.retriggerAria(this._value?.length ?? 0);
	};

	private readonly handleTextareaKeyDown = (event: KeyboardEvent): void => {
		this.handleKeyDown(event);
		this.counter.handleKeyDown(event, this.ctaRef.el?.value.length ?? 0);
	};

	/**
	 * Measures the rows the content needs. The result never falls below the current rows, so the
	 * textarea only grows (#11051).
	 *
	 * @see https://stackoverflow.com/questions/17772260/textarea-auto-height
	 */
	private increaseTextareaHeight(el: HTMLTextAreaElement): number {
		// Hides the scrollbar during the measurement; the padding is removed temporarily for a correct row height.
		el.style.overflow = 'hidden';
		el.style.padding = '0';
		const currentRows = el.rows;
		const rowHeight = el.clientHeight / currentRows;
		el.rows = 1;
		const nextRows = Math.round(el.scrollHeight / rowHeight);
		el.rows = currentRows;
		el.style.padding = '';

		const rows = this.getRenderProp('rows');
		return rows && rows > nextRows ? rows : nextRows;
	}

	// --- Render ---

	/**
	 * Props of the native `<textarea>` in the key order of the legacy state wrapper. `spellCheck` is
	 * accepted but not rendered (#10863).
	 */
	private getTextareaProps(): TextAreaFCProps {
		const id = this.id;
		const shortKey = this.getRenderProp('shortKey');
		const maxLength = this.counter.getMaxLengthAttribute();
		const characterLimitHintId = this.counter.getCharacterLimitHintId(id);
		const { ariaDescribedBy, hasError } = this.getAria();

		return {
			id,
			hideLabel: this.getRenderProp('hideLabel'),
			label: this.getRenderProp('label'),
			value: this.getRenderProp('value'),
			accessKey: this.getRenderProp('accessKey') || undefined,
			disabled: this.getRenderProp('disabled'),
			// The name prop defaults to `''`; an unnamed field renders no `name` attribute.
			name: this.getRenderProp('name') || undefined,
			rows: this.getRenderProp('rows'),
			readonly: this.getRenderProp('readOnly'),
			required: this.getRenderProp('required'),
			placeholder: this.getRenderProp('placeholder'),
			touched: this.getRenderProp('touched'),
			msg: this.getRenderProp('msg'),
			ref: this.ctaRef,
			style: {
				resize: this.getRenderProp('resize'),
			},
			onBlur: this.handleBlur,
			onChange: this.handleTextareaChange,
			onClick: this.handleClick,
			onFocus: this.handleTextareaFocus,
			onInput: this.handleTextareaInput,
			onKeyDown: this.handleTextareaKeyDown,
			ariaDescribedBy: characterLimitHintId ? [...ariaDescribedBy, characterLimitHintId] : ariaDescribedBy,
			'aria-invalid': hasError ? 'true' : undefined,
			...(maxLength !== undefined ? { maxLength } : {}),
			...(shortKey ? { 'aria-keyshortcuts': shortKey } : {}),
		};
	}

	public render(): JSX.Element {
		const disabled = this.getRenderProp('disabled');
		const { startAdornment, endAdornment } = getInputAdornments({ icons: this.getRenderProp('icons'), disabled });

		return (
			<Host>
				<FormFieldFC
					{...this.getFormFieldProps({
						class: clsx('kol-form-field-textarea', {
							'kol-form-field--has-value': this.hasValue,
							'kol-form-field--has-counter': this.counter.hasSoftLimit() || this.counter.hasCounter(),
						}),
						accessKey: this.getRenderProp('accessKey') || undefined,
						shortKey: this.getRenderProp('shortKey') || undefined,
						variant: this.getRenderProp('variant'),
						required: this.getRenderProp('required'),
						readOnly: this.getRenderProp('readOnly'),
						maxLength: this.counter.getRenderProp('maxLength'),
						counter: this.counter.getCounterProps(),
					})}
				>
					<InputContainerFC
						disabled={disabled}
						msg={this.getRenderProp('msg')}
						touched={this.getRenderProp('touched')}
						startAdornment={startAdornment}
						endAdornment={endAdornment}
					>
						<TextAreaFC {...this.getTextareaProps()} />
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
	 * Adjusts the height of the element to its content.
	 * @TODO: change back to AdjustHeightPropType after stencil #4663 has been resolved
	 */
	@Prop() public _adjustHeight?: boolean = false;

	/**
	 * References an external element by ID that provides accessible details for this textarea.
	 */
	@Prop() public _ariaDetails?: AriaDetailsPropType;

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
	 * Defines the maximum number of input characters.
	 */
	@Prop() public _maxLength?: number;

	/**
	 * Shows a character counter for the input element.
	 */
	@Prop() public _hasCounter?: boolean = false;

	/**
	 * Defines the behavior when maxLength is set. 'hard' sets the maxlength attribute, 'soft' shows a character counter without preventing input.
	 */
	@Prop() public _maxLengthBehavior?: MaxLengthBehaviorPropType = 'hard';

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
	 * Defines the placeholder for input field. To be shown when there's no value.
	 */
	@Prop() public _placeholder?: string;

	/**
	 * Makes the input element read only.
	 * @TODO: Change type back to `ReadOnlyPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _readOnly?: boolean = false;

	/**
	 * Defines whether and in which direction the size of the input can be changed by the user. (https://developer.mozilla.org/de/docs/Web/CSS/resize)
	 * In version 3 (v3), horizontal resizing is abolished. The corresponding property is then reduced to the properties `vertical` (default) and `none`.
	 */
	@Prop() public _resize?: TextareaResizePropType = 'vertical';

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Maximum number of visible rows of the element.
	 */
	@Prop({ mutable: true, reflect: false }) public _rows?: RowsPropType;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	/**
	 * Defines whether the browser should check the spelling and grammar.
	 */
	@Prop() public _spellCheck?: SpellCheckPropType;

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

	@Watch('_adjustHeight')
	public watchAdjustHeight(value?: boolean): void {
		adjustHeightProp.apply(value, (v) => this.setRenderProp('adjustHeight', v));
	}

	@Watch('_ariaDetails')
	public watchAriaDetails(value?: AriaDetailsPropType): void {
		this.applyAriaDetails(value);
	}

	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.applyDisabled(value);
	}

	@Watch('_hasCounter')
	public watchHasCounter(value?: boolean): void {
		this.counter.watchHasCounter(value);
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

	@Watch('_maxLength')
	public watchMaxLength(value?: number): void {
		this.counter.watchMaxLength(value);
		this.counter.updateImmediate(this._value?.length ?? 0);
	}

	@Watch('_maxLengthBehavior')
	public watchMaxLengthBehavior(value?: MaxLengthBehaviorPropType): void {
		this.counter.watchMaxLengthBehavior(value);
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

	@Watch('_readOnly')
	public watchReadOnly(value?: boolean): void {
		readOnlyProp.apply(value, (v) => this.setRenderProp('readOnly', v));
	}

	@Watch('_required')
	public watchRequired(value?: boolean): void {
		requiredProp.apply(value, (v) => this.setRenderProp('required', v));
	}

	@Watch('_resize')
	public watchResize(value?: TextareaResizePropType): void {
		resizeProp.apply(value, (v) => this.setRenderProp('resize', v));
	}

	@Watch('_rows')
	public watchRows(value?: RowsPropType): void {
		rowsProp.apply(value, (v) => this.setRenderProp('rows', v));
	}

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
		validateAccessAndShortKey(this._accessKey, value);
	}

	@Watch('_spellCheck')
	public watchSpellCheck(value?: SpellCheckPropType): void {
		spellCheckProp.apply(value, (v) => this.setRenderProp('spellCheck', v));
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
	public watchValue(value?: string): void {
		this.applyValue(value);
		this.counter.update(value?.length ?? 0);
	}

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}

	/** Applies the value without a counter update; the watcher adds it. */
	private applyValue(value?: string): void {
		stringValueProp.apply(value, (v) => this.setRenderProp('value', v));
		this.formAssociation.setFormAssociatedValue(this.getRenderProp('value'));
	}
}
