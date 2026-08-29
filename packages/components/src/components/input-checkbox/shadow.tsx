import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from '../../utils/clsx';

import type {
	AriaDetailsPropType,
	CheckedPropType,
	ClickableElement,
	DisabledPropType,
	FocusableElement,
	HideLabelPropType,
	HideMsgPropType,
	HintPropType,
	IndeterminatePropType,
	InputCheckboxAPI,
	InputCheckboxIconsProp,
	InputCheckboxStates,
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
} from '../../schema';

import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { InputCheckboxController } from './controller';

import type { FormFieldLabelInfoPopoverProps } from '../../components';
import KolCheckboxStateWrapperFc, { type CheckboxStateWrapperProps } from '../../functional-component-wrappers/CheckboxStateWrapper/CheckboxStateWrapper';
import KolFieldControlStateWrapperFc, {
	type FieldControlStateWrapperProps,
} from '../../functional-component-wrappers/FieldControlStateWrapper/FieldControlStateWrapper';
import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper/FormFieldStateWrapper';
import type { InputCheckboxVariantPropType } from '../../schema/props/variant-input-checkbox';
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
export class KolInputCheckbox implements ClickableElement, FocusableElement, InputCheckboxAPI {
	@Element() protected readonly host?: HTMLKolInputCheckboxElement;
	protected readonly ctaRef = createCtaRef<HTMLInputElement>();

	private getModelValue(): StencilUnknown {
		return this._checked ? this.state._value : null;
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

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: clsx('kol-input-checkbox', {
				[`kol-input-checkbox--checked`]: this.state._checked,
				[`kol-input-checkbox--indeterminate`]: this.state._indeterminate,
				[`kol-input-checkbox--variant-${this.state._variant || 'default'}`]: true,
				[`kol-input-checkbox--label-align-${this.state._labelAlign || 'right'}`]: true,
			}),
			tooltipAlign: this._tooltipAlign,
			alert: this.showAsAlert(),
			renderNoTooltip: true,
		};
	}

	private getFieldControlProps(): FieldControlStateWrapperProps {
		return {
			class: clsx('kol-input-checkbox__field-control', {
				[`kol-input-checkbox__field-control--checked`]: this.state._checked,
				[`kol-input-checkbox__field-control--indeterminate`]: this.state._indeterminate,
				[`kol-input-checkbox__field-control--variant-${this.state._variant || 'default'}`]: true,
			}),
			state: this.state,
			// Prevent blur/focus cycling when clicking the visible text label while
			// the checkbox is already focused (Shadow DOM htmlFor-label quirk).
			fieldControlLabelProps: {
				onMouseDown: (e: Event) => {
					if (this.inputHasFocus) {
						e.preventDefault();
					}
				},
			},
			infoPopover: this._infoPopover,
		};
	}

	private getInputProps(): CheckboxStateWrapperProps {
		return {
			state: this.state,
			icon: this.getIcon(),
			// Prevent blur/focus cycling when clicking the icon area while the checkbox
			// is already focused. Text-label clicks are handled via fieldControlLabelProps.
			onMouseDown: (e: Event) => {
				if (this.inputHasFocus && !(e.target instanceof HTMLInputElement)) {
					e.preventDefault();
				}
			},
			inputProps: {
				class: clsx({
					'visually-hidden': this.state._variant === 'button',
				}),
				ref: this.ctaRef,
				...this.controller.onFacade,
				onInput: this.onInput,
				onChange: this.onChange,
				onKeyDown: this.onKeyDown,
				onFocus: (event: FocusEvent) => {
					this.controller.onFacade.onFocus(event);
					this.inputHasFocus = true;
				},
				onBlur: (event: FocusEvent) => {
					if (this._disabled) {
						return;
					}
					this.controller.onFacade.onBlur(event);
					this.inputHasFocus = false;
				},
				onClick: undefined, // onClick is not needed since onChange already triggers the correct event
			},
		};
	}

	private getIcon(): string {
		if (this.state._indeterminate) return this.state._icons.indeterminate;
		if (this.state._checked) return this.state._icons.checked;
		return this.state._icons.unchecked;
	}

	public render(): JSX.Element {
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()} renderNoLabel>
				<KolFieldControlStateWrapperFc {...this.getFieldControlProps()} renderNoHint>
					<KolCheckboxStateWrapperFc {...this.getInputProps()} />
				</KolFieldControlStateWrapperFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	private readonly controller: InputCheckboxController;

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

	@State() public state: InputCheckboxStates = {
		_checked: false,
		_hideMsg: false,
		_icons: {
			checked: 'kolicon-check',
			indeterminate: 'kolicon-minus',
			unchecked: 'kolicon-cross',
		},
		_id: createUniqueId('input-checkbox'),
		_indeterminate: false,
		_label: '', // ⚠ required
		_value: true,
		_variant: 'default',
		_labelAlign: 'right',
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new InputCheckboxController(this, 'checkbox', this.host);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_ariaDetails')
	public validateAriaDetails(value?: AriaDetailsPropType): void {
		this.controller.validateAriaDetails(value);
	}

	@Watch('_checked')
	public validateChecked(value?: CheckedPropType): void {
		this.controller.validateChecked(value);
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
	public validateIcons(value?: Stringified<InputCheckboxIconsProp>): void {
		this.controller.validateIcons(value);
	}

	@Watch('_indeterminate')
	public validateIndeterminate(value?: IndeterminatePropType): void {
		this.controller.validateIndeterminate(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		this.controller.validateLabel(value);
	}

	@Watch('_labelAlign')
	public validateLabelAlign(value?: LabelAlignPropType): void {
		this.controller.validateLabelAlign(value);
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

	@Watch('_required')
	public validateRequired(value?: RequiredPropType): void {
		this.controller.validateRequired(value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.controller.validateSyncValueBySelector(value);
	}

	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	@Watch('_value')
	public validateValue(value: StencilUnknown): void {
		this.controller.validateValue(value);
	}

	@Watch('_variant')
	public validateVariant(value?: InputCheckboxVariantPropType): void {
		this.controller.validateVariant(value);
	}

	public componentWillLoad(): void {
		this._touched = this._touched === true;
		this.validateAriaDetails(this._ariaDetails);
		this.controller.componentWillLoad();
	}

	private onInput = (event: Event): void => {
		this._checked = !this._checked;
		this._indeterminate = false;
		const value = this.getModelValue();
		this.controller.onFacade.onInput(event, false, value);
		this.controller.setFormAssociatedCheckboxValue(value);
	};

	private onChange = (event: Event): void => {
		this.controller.onFacade.onChange(event, this.getModelValue());
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		this.controller.onFacade.onKeyDown(event);

		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ctaRef.el,
			});
		}
	};
}
