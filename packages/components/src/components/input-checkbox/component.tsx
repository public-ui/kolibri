import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type {
	AriaDetailsPropType,
	ClickableElement,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	InputCheckboxIconsProp,
	InputCheckboxProps,
	InputTypeOnDefault,
	KolFocusOptions,
	LabelAlignPropType,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	ShortKeyPropType,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import type { InputCheckboxVariantPropType } from '../../schema/props/variant-input-checkbox';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import clsx from '../../utils/clsx';

import { BaseFormFieldWebComponent } from '../../internal/functional-components/form-field/base-web-component';
import { CheckboxFC } from '../../internal/functional-components/form-field/checkbox';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import { FieldControlFC } from '../../internal/functional-components/form-field/field-control';
import type { InputFCProps } from '../../internal/functional-components/form-field/input';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { InputCheckboxApi } from '../../internal/functional-components/input-checkbox/api';
import { inputCheckboxPropsConfig } from '../../internal/functional-components/input-checkbox/api';
import {
	accessKeyProp,
	checkboxValueProp,
	checkedProp,
	iconsInputCheckboxProp,
	indeterminateProp,
	labelAlignProp,
	requiredProp,
	shortKeyProp,
	variantInputCheckboxProp,
} from '../../internal/props';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { propagateSubmitEventToForm } from '../form/controller';

/**
 * The **Checkbox** input type generates a rectangular box that can be activated and deactivated by clicking. When activated, a colored checkmark is shown inside the box.
 *
 * @slot - The label of the input field.
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-input-checkbox',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputCheckbox
	extends BaseFormFieldWebComponent<InputCheckboxApi>
	implements ClickableElement, FocusableElement, InputCheckboxProps, WebComponentInterface<InputCheckboxApi>
{
	@Element() protected readonly host?: HTMLKolInputCheckboxElement;
	protected readonly ctaRef = createCtaRef<HTMLInputElement>();

	@State() public id = createUniqueId('input-checkbox');

	@State() public inputHasFocus = false;

	public constructor() {
		super();
		this.initFormAssociation('checkbox', this._name);
	}

	/**
	 * The value the field reports: `_value` while `_checked`, otherwise `null`. It reads the raw
	 * `_checked`, because the field writes it on every toggle.
	 */
	private getModelValue(): StencilUnknown {
		return this._checked ? this.getRenderProp('value') : null;
	}

	private syncFormAssociatedValue(): void {
		this.formAssociation.setFormAssociatedValue(this.getModelValue());
	}

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown> {
		return this.getModelValue();
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
		this.initRenderProps(inputCheckboxPropsConfig);

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
		this.watchRequired(this._required);
		this.watchChecked(this._checked);
		this.watchIcons(this._icons);
		this.watchIndeterminate(this._indeterminate);
		this.watchValue(this._value);
		this.watchVariant(this._variant);
		this.watchLabelAlign(this._labelAlign);
	}

	public disconnectedCallback(): void {
		this.destroyFormField();
	}

	// --- Event handling ---

	private readonly handleCheckboxInput = (event: Event): void => {
		this._checked = !this._checked;
		this._indeterminate = false;
		this.handleInput(event, this.getModelValue());
	};

	private readonly handleCheckboxChange = (event: Event): void => {
		this.handleChange(event, this.getModelValue());
	};

	private readonly handleCheckboxKeyDown = (event: KeyboardEvent): void => {
		this.handleKeyDown(event);

		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ctaRef.el,
			});
		}
	};

	/** A disabled checkbox keeps `inputHasFocus` on blur. */
	private readonly handleCheckboxBlur = (event: FocusEvent): void => {
		if (this._disabled) {
			return;
		}
		this.handleBlur(event);
	};

	/**
	 * Keeps the focus on the checkbox while its label text is pressed. Without it, the focus would
	 * leave and return to the input (Shadow DOM `for` label), which sends blur and focus.
	 */
	private readonly handleLabelMouseDown = (event: MouseEvent): void => {
		if (this.inputHasFocus) {
			event.preventDefault();
		}
	};

	/** Same as `handleLabelMouseDown` for the icon area of the checkbox; the input itself stays clickable. */
	private readonly handleCheckboxMouseDown = (event: MouseEvent): void => {
		if (this.inputHasFocus && !(event.target instanceof HTMLInputElement)) {
			event.preventDefault();
		}
	};

	// --- Render ---

	private getIcon(): string {
		const icons = this.getRenderProp('icons');
		if (this.getRenderProp('indeterminate')) return icons.indeterminate as string;
		if (this.getRenderProp('checked')) return icons.checked as string;
		return icons.unchecked as string;
	}

	private getInputProps(): InputFCProps {
		const shortKey = this.getRenderProp('shortKey');
		const { ariaDescribedBy, hasError } = this.getAria();

		return {
			id: this.id,
			hideLabel: this.getRenderProp('hideLabel'),
			label: this.getRenderProp('label'),
			value: this.getRenderProp('value') as string,
			accessKey: this.getRenderProp('accessKey') || undefined,
			disabled: this.getRenderProp('disabled'),
			// An empty `_name` is rendered as `name=""`; without `_name` the attribute is missing.
			name: this._name === undefined || this._name === null ? undefined : this.getRenderProp('name'),
			ariaDescribedBy,
			required: this.getRenderProp('required'),
			checked: this.getRenderProp('checked'),
			indeterminate: this.getRenderProp('indeterminate'),
			touched: this.getRenderProp('touched'),
			msg: this.getRenderProp('msg'),
			...(shortKey ? { 'aria-keyshortcuts': shortKey } : {}),
			class: clsx({
				'visually-hidden': this.getRenderProp('variant') === 'button',
			}),
			ref: this.ctaRef,
			onBlur: this.handleCheckboxBlur,
			onChange: this.handleCheckboxChange,
			onFocus: this.handleFocus,
			onInput: this.handleCheckboxInput,
			onKeyDown: this.handleCheckboxKeyDown,
			'aria-invalid': hasError ? 'true' : undefined,
		};
	}

	public render(): JSX.Element {
		const checked = this.getRenderProp('checked');
		const indeterminate = this.getRenderProp('indeterminate');
		const variant = this.getRenderProp('variant');
		const accessKey = this.getRenderProp('accessKey') || undefined;
		const shortKey = this.getRenderProp('shortKey') || undefined;
		const required = this.getRenderProp('required');

		return (
			<Host>
				<FormFieldFC
					{...this.getFormFieldProps({
						class: clsx('kol-input-checkbox', {
							'kol-input-checkbox--checked': checked,
							'kol-input-checkbox--indeterminate': indeterminate,
							[`kol-input-checkbox--variant-${variant}`]: true,
							[`kol-input-checkbox--label-align-${this.getRenderProp('labelAlign')}`]: true,
						}),
						accessKey,
						shortKey,
						required,
						renderNoLabel: true,
						renderNoTooltip: true,
					})}
				>
					<FieldControlFC
						class={clsx('kol-input-checkbox__field-control', {
							'kol-input-checkbox__field-control--checked': checked,
							'kol-input-checkbox__field-control--indeterminate': indeterminate,
							[`kol-input-checkbox__field-control--variant-${variant}`]: true,
						})}
						id={this.id}
						label={this.getRenderProp('label')}
						hint={this.getRenderProp('hint')}
						hideLabel={this.getRenderProp('hideLabel')}
						labelAlign={this.getRenderProp('labelAlign')}
						infoPopover={this.getRenderProp('infoPopover')}
						accessKey={accessKey}
						shortKey={shortKey}
						tooltipAlign={this.getRenderProp('tooltipAlign')}
						disabled={this.getRenderProp('disabled')}
						msg={this.getRenderProp('msg')}
						touched={this.getRenderProp('touched')}
						required={required}
						renderNoHint
						labelProps={{ onMouseDown: this.handleLabelMouseDown }}
						{...this.getLabelTooltipRefs()}
					>
						<CheckboxFC variant={variant} icon={this.getIcon()} onMouseDown={this.handleCheckboxMouseDown} inputProps={this.getInputProps()} />
					</FieldControlFC>
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
	 * Defines whether the checkbox is checked or not. Can be read and written.
	 * @TODO: Change type back to `CheckedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _checked?: boolean = false;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideMsgPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideMsg?: boolean = false;

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
	 * Defines the hint text.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: Stringified<InputCheckboxIconsProp>;

	/**
	 * Defines the informational popover after the label.
	 */
	@Prop() public _infoPopover?: FormFieldLabelInfoPopoverProps;

	/**
	 * Puts the checkbox in the indeterminate state, does not change the value of _checked.
	 * @TODO: Change type back to `IndeterminatePropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _indeterminate?: boolean;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines which alignment should be used for presentation.
	 */
	@Prop() public _labelAlign?: LabelAlignPropType = 'right';

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
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * References an external element by ID that provides accessible details for this input.
	 * Uses ElementInternals.ariaDetailsElements to cross the Shadow DOM boundary.
	 * Supported by desktop screen readers (NVDA, JAWS with Chrome/Firefox).
	 * Not yet supported by mobile screen readers (TalkBack, VoiceOver iOS).
	 */
	@Prop() public _ariaDetails?: AriaDetailsPropType;

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
	@Prop() public _value: StencilUnknown = true;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: InputCheckboxVariantPropType = 'default';

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

	@Watch('_checked')
	public watchChecked(value?: boolean): void {
		checkedProp.apply(value, (v) => this.setRenderProp('checked', v));
		this.syncFormAssociatedValue();
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

	/** Merges the given icons into the current ones, so the other states keep their icons. */
	@Watch('_icons')
	public watchIcons(value?: Stringified<InputCheckboxIconsProp>): void {
		iconsInputCheckboxProp.apply(value, (v) => this.setRenderProp('icons', { ...this.getRenderProp('icons'), ...v }));
	}

	@Watch('_indeterminate')
	public watchIndeterminate(value?: boolean): void {
		indeterminateProp.apply(value, (v) => this.setRenderProp('indeterminate', v));
	}

	@Watch('_infoPopover')
	public watchInfoPopover(value?: FormFieldLabelInfoPopoverProps): void {
		this.applyInfoPopover(value);
	}

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	@Watch('_labelAlign')
	public watchLabelAlign(value?: LabelAlignPropType): void {
		labelAlignProp.apply(value, (v) => this.setRenderProp('labelAlign', v));
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

	@Watch('_required')
	public watchRequired(value?: boolean): void {
		requiredProp.apply(value, (v) => this.setRenderProp('required', v));
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

	/**
	 * `null` and `undefined` are kept as value instead of falling back to the default `true`: the
	 * checked checkbox then reports and submits no value.
	 */
	@Watch('_value')
	public watchValue(value: StencilUnknown): void {
		if (value === null || value === undefined) {
			this.setRenderProp('value', value as unknown as NonNullable<StencilUnknown>);
		} else {
			checkboxValueProp.apply(value, (v) => this.setRenderProp('value', v));
		}
		this.syncFormAssociatedValue();
	}

	@Watch('_variant')
	public watchVariant(value?: InputCheckboxVariantPropType): void {
		variantInputCheckboxProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
