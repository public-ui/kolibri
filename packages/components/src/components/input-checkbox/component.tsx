import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { BaseFormFieldWebComponent } from '../../internal/functional-components/form-field/base-web-component';
import { CheckboxFC } from '../../internal/functional-components/form-field/checkbox';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import { FieldControlFC } from '../../internal/functional-components/form-field/field-control';
import type { InputFCProps } from '../../internal/functional-components/form-field/input';
import type { PropsConfigShape, WebComponentInterface } from '../../internal/functional-components/generic-types';
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
import type {
	AccessKeyPropType,
	AriaDetailsPropType,
	CheckedPropType,
	ClickableElement,
	DisabledPropType,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	HideLabelPropType,
	HideMsgPropType,
	HintPropType,
	IndeterminatePropType,
	InputCheckboxIconsProp,
	InputTypeOnDefault,
	KolFocusOptions,
	LabelAlignPropType,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	RequiredPropType,
	ShortKeyPropType,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	TouchedPropType,
} from '../../schema';
import { bem } from '../../schema/bem-registry';
import type { InputCheckboxVariantPropType } from '../../schema/props';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import clsx from '../../utils/clsx';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { submitFormOnEnter } from '../form/controller';

const checkboxBem = bem.forBlock('kol-input-checkbox');

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
	implements ClickableElement, FocusableElement, WebComponentInterface<InputCheckboxApi>
{
	@Element()
	protected readonly host?: HTMLKolInputCheckboxElement;

	@State()
	public id = createUniqueId('input-checkbox');

	/** Whether the info popover of the label is open. */
	@State()
	public infoPopoverOpen = false;

	@State()
	public inputHasFocus = false;

	protected readonly ctaRef = createCtaRef<HTMLInputElement>();

	protected readonly propsConfig: PropsConfigShape = inputCheckboxPropsConfig;

	public constructor() {
		super();
		this.initFormAssociation('checkbox', this._name);
	}

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop()
	public _accessKey?: AccessKeyPropType = undefined;

	@Watch('_accessKey')
	public watchAccessKey(value?: AccessKeyPropType): void {
		this.applyProp(accessKeyProp, value);
		validateAccessAndShortKey(value, this._shortKey);
	}

	/**
	 * References an external element by ID that provides accessible details for this input.
	 *
	 * Behavior and screen reader support: see `AriaDetailsPropType` and KNOWN_ISSUES.md.
	 */
	@Prop()
	public _ariaDetails?: AriaDetailsPropType = undefined;

	@Watch('_ariaDetails')
	public watchAriaDetails(value?: AriaDetailsPropType): void {
		this.applyAriaDetails(value);
	}

	/**
	 * Defines whether the checkbox is checked or not. Can be read and written.
	 */
	@Prop({ mutable: true, reflect: true })
	public _checked?: CheckedPropType = false;

	@Watch('_checked')
	public watchChecked(value?: CheckedPropType): void {
		this.applyProp(checkedProp, value);
		this.syncFormAssociatedValue();
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop()
	public _disabled?: DisabledPropType = false;

	@Watch('_disabled')
	public watchDisabled(value?: DisabledPropType): void {
		this.applyDisabled(value);
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 */
	@Prop()
	public _hideLabel?: HideLabelPropType = false;

	@Watch('_hideLabel')
	public watchHideLabel(value?: HideLabelPropType): void {
		this.applyHideLabel(value);
	}

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 */
	@Prop()
	public _hideMsg?: HideMsgPropType = false;

	@Watch('_hideMsg')
	public watchHideMsg(value?: HideMsgPropType): void {
		this.applyHideMsg(value);
	}

	/**
	 * Defines the hint text.
	 */
	@Prop()
	public _hint?: HintPropType = '';

	@Watch('_hint')
	public watchHint(value?: HintPropType): void {
		this.applyHint(value);
	}

	/**
	 * Defines the icon classnames.
	 */
	@Prop()
	public _icons?: Stringified<InputCheckboxIconsProp> = undefined;

	/** Merges the given icons into the current ones, so the other states keep their icons. */
	@Watch('_icons')
	public watchIcons(value?: Stringified<InputCheckboxIconsProp>): void {
		this.applyProp(iconsInputCheckboxProp, value, (v) => this.setRenderProp('icons', { ...this.getRenderProp('icons'), ...v }));
	}

	/**
	 * Puts the checkbox in the indeterminate state, does not change the value of _checked.
	 */
	@Prop({ mutable: true, reflect: true })
	public _indeterminate?: IndeterminatePropType = undefined;

	@Watch('_indeterminate')
	public watchIndeterminate(value?: IndeterminatePropType): void {
		this.applyProp(indeterminateProp, value);
	}

	/**
	 * Defines the informational popover after the label.
	 */
	@Prop()
	public _infoPopover?: FormFieldLabelInfoPopoverProps = undefined;

	@Watch('_infoPopover')
	public watchInfoPopover(value?: FormFieldLabelInfoPopoverProps): void {
		this.applyInfoPopover(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `''` to enable the expert slot.
	 */
	@Prop()
	public _label!: LabelWithExpertSlotPropType;

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Defines which alignment should be used for presentation.
	 */
	@Prop()
	public _labelAlign?: LabelAlignPropType = 'right';

	@Watch('_labelAlign')
	public watchLabelAlign(value?: LabelAlignPropType): void {
		this.applyProp(labelAlignProp, value);
	}

	/**
	 * Defines the properties for a message rendered as Alert component.
	 */
	@Prop()
	public _msg?: Stringified<MsgPropType> = undefined;

	@Watch('_msg')
	public watchMsg(value?: Stringified<MsgPropType>): void {
		this.applyMsg(value);
	}

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop()
	public _name?: NamePropType = undefined;

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.applyName(value);
	}

	/**
	 * Defines the callback functions for input events.
	 */
	@Prop()
	public _on?: InputTypeOnDefault = undefined;

	@Watch('_on')
	public watchOn(value?: InputTypeOnDefault): void {
		this.applyOn(value);
	}

	/**
	 * Makes the input element required.
	 */
	@Prop()
	public _required?: RequiredPropType = false;

	@Watch('_required')
	public watchRequired(value?: RequiredPropType): void {
		this.applyProp(requiredProp, value);
	}

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop()
	public _shortKey?: ShortKeyPropType = undefined;

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		this.applyProp(shortKeyProp, value);
		validateAccessAndShortKey(this._accessKey, value);
	}

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop()
	public _syncValueBySelector?: SyncValueBySelectorPropType = undefined;

	@Watch('_syncValueBySelector')
	public watchSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.applySyncValueBySelector(value);
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop()
	public _tooltipAlign?: TooltipAlignPropType = 'top';

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyTooltipAlign(value);
	}

	/**
	 * Shows if the input was touched by a user.
	 */
	@Prop({ mutable: true, reflect: true })
	public _touched?: TouchedPropType = false;

	@Watch('_touched')
	public watchTouched(value?: TouchedPropType): void {
		this.applyTouched(value);
	}

	/**
	 * Defines the value of the element.
	 */
	@Prop()
	public _value: StencilUnknown = true;

	/**
	 * `null` and `undefined` are kept as value instead of falling back to the default `true`: the
	 * checked checkbox then reports and submits no value.
	 */
	@Watch('_value')
	public watchValue(value: StencilUnknown): void {
		if (value === null || value === undefined) {
			this.setRenderProp('value', value as unknown as NonNullable<StencilUnknown>);
		} else {
			this.applyProp(checkboxValueProp, value);
		}
		this.syncFormAssociatedValue();
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop()
	public _variant?: InputCheckboxVariantPropType = 'default';

	@Watch('_variant')
	public watchVariant(value?: InputCheckboxVariantPropType): void {
		this.applyProp(variantInputCheckboxProp, value);
	}

	/**
	 * Returns the current value.
	 */
	@Method()
	public getValue(): Promise<StencilUnknown> {
		return Promise.resolve(this.getModelValue());
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	public focus(options?: KolFocusOptions): Promise<void> {
		// The focus decorator owns the implementation and forwards `options` to `setFocus`; this body only declares the public signature.
		void options;
		return Promise.resolve();
	}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {
		return Promise.resolve();
	}

	public componentWillLoad(): void {
		this._touched = this._touched === true;
		this.watchAccessKey(this._accessKey);
		this.watchAriaDetails(this._ariaDetails);
		this.watchChecked(this._checked);
		this.watchDisabled(this._disabled);
		this.watchHideLabel(this._hideLabel);
		this.watchHideMsg(this._hideMsg);
		this.watchHint(this._hint);
		this.watchIcons(this._icons);
		this.watchIndeterminate(this._indeterminate);
		this.watchInfoPopover(this._infoPopover);
		this.watchLabel(this._label);
		this.watchLabelAlign(this._labelAlign);
		this.watchMsg(this._msg);
		this.watchName(this._name);
		this.watchOn(this._on);
		this.watchRequired(this._required);
		this.watchShortKey(this._shortKey);
		this.watchSyncValueBySelector(this._syncValueBySelector);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchTouched(this._touched);
		this.watchValue(this._value);
		this.watchVariant(this._variant);
	}

	public componentDidRender(): void {
		this.syncFormField();
	}

	public disconnectedCallback(): void {
		this.destroyFormField();
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

		submitFormOnEnter(event, { form: this.host, ref: this.ctaRef.el });
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
						class: checkboxBem({
							checked,
							indeterminate,
							[`variant-${variant}`]: true,
							[`label-align-${this.getRenderProp('labelAlign')}`]: true,
						}),
						accessKey,
						shortKey,
						required,
						renderNoLabel: true,
						renderNoTooltip: true,
					})}
				>
					<FieldControlFC
						class={checkboxBem('field-control', {
							checked,
							indeterminate,
							[`variant-${variant}`]: true,
						})}
						id={this.id}
						label={this.getRenderProp('label')}
						hint={this.getRenderProp('hint')}
						hideLabel={this.getRenderProp('hideLabel')}
						labelAlign={this.getRenderProp('labelAlign')}
						infoPopover={this.getInfoPopover()}
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
}
