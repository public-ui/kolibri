import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from 'clsx';

import type {
	FocusableElement,
	HideMsgPropType,
	IdPropType,
	InputRadioAPI,
	InputRadioStates,
	InputTypeOnDefault,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	Orientation,
	RadioOption,
	RadioOptionsPropType,
	ShortKeyPropType,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';

import { nonce } from '../../utils/dev.utils';
import { InputRadioController } from './controller';
import { propagateSubmitEventToForm } from '../form/controller';

import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper';
import KolFieldControlStateWrapperFc, { type FieldControlStateWrapperProps } from '../../functional-component-wrappers/FieldControlStateWrapper';
import KolInputStateWrapperFc, { type InputStateWrapperProps } from '../../functional-component-wrappers/InputStateWrapper';

/**
 * @slot - Die Legende/Überschrift der Radiobuttons.
 */
@Component({
	tag: 'kol-input-radio',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolInputRadio implements InputRadioAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolInputRadioElement;
	private inputRef?: HTMLInputElement;

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.inputRef = ref;
	};

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown | undefined> {
		return this._value;
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.inputRef?.focus();
	}

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			component: 'fieldset',
			class: clsx('kol-form-field--radio'),
			formFieldLabelProps: {
				component: 'legend',
				class: 'kol-form-field__label--legend',
			},
			formFieldInputProps: {
				class: `kol-form-field__input--orientation-${this.state._orientation}`,
			},
			tooltipAlign: this._tooltipAlign,
			alert: this.showAsAlert(),
			hideLabel: false,
		};
	}

	public render(): JSX.Element {
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				{this.state._options.map((option, index) => this.renderOption(option, index))}
			</KolFormFieldStateWrapperFc>
		);
	}

	private getOptionProps(option: RadioOption<StencilUnknown>, id: string): FieldControlStateWrapperProps {
		const obj: FieldControlStateWrapperProps = {
			state: this.state,
			id: id,
			hint: option.hint,
			label: option.label as string,
			required: false,
			fieldControlLabelProps: {
				showBadge: false,
			},
		};

		if (option.disabled) {
			obj.disabled = true;
		}

		return obj;
	}

	private getInputProps(option: RadioOption<StencilUnknown>, id: string, index: number, selected: boolean): InputStateWrapperProps {
		const obj: InputStateWrapperProps = {
			state: this.state,
			id: id,
			ref: this.state._value === option.value ? this.catchRef : undefined,
			class: clsx('kol-input-radio', {
				['kol-input-radio--disabled']: Boolean(this.state._disabled || option.disabled),
			}),
			'aria-label': this.state._hideLabel && typeof option.label === 'string' ? option.label : undefined,
			type: 'radio',
			name: this.state._name || this.state._id,
			value: `-${index}`,
			checked: selected,

			...this.controller.onFacade,
			onChange: this.onChange,
			onClick: undefined, // onClick is not needed since onChange already triggers the correct event
			onInput: this.onInput,
			onKeyDown: this.onKeyDown.bind(this),
			onFocus: (event: Event) => {
				this.controller.onFacade.onFocus(event);
				this.inputHasFocus = true;
			},
			onBlur: (event: Event) => {
				this.controller.onFacade.onBlur(event);
				this.inputHasFocus = false;
			},
		};

		if (option.disabled) {
			obj.disabled = true;
		}

		return obj;
	}

	private renderOption(option: RadioOption<StencilUnknown>, index: number): JSX.Element {
		const customId = `${this.state._id}-${index}`;
		const selected = this.state._value === option.value;

		return (
			<KolFieldControlStateWrapperFc key={customId} {...this.getOptionProps(option, customId)}>
				<KolInputStateWrapperFc {...this.getInputProps(option, customId, index, selected)} />
			</KolFieldControlStateWrapperFc>
		);
	}

	private readonly controller: InputRadioController;

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideMsgPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _hideMsg?: boolean = false;

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
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: IdPropType;

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
	@Prop() public _options?: RadioOptionsPropType;

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Adds a visual short key hint to the component.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

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
	 * @see Known bug: https://github.com/ionic-team/stencil/issues/3902
	 */
	@Prop({ mutable: true, reflect: true }) public _value?: StencilUnknown;

	@State() public state: InputRadioStates = {
		_hideMsg: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_options: [],
		_orientation: 'vertical',
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new InputRadioController(this, 'radio', this.host);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: TooltipAlignPropType): void {
		this.controller.validateTooltipAlign(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		this.controller.validateHideLabel(value);
	}

	@Watch('_hideMsg')
	public validateHideMsg(value?: HideMsgPropType): void {
		this.controller.validateHideMsg(value);
	}

	@Watch('_hint')
	public validateHint(value?: string): void {
		this.controller.validateHint(value);
	}

	@Watch('_id')
	public validateId(value?: string): void {
		this.controller.validateId(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		this.controller.validateLabel(value);
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

	@Watch('_options')
	public validateOptions(value?: RadioOptionsPropType): void {
		this.controller.validateOptions(value);
	}

	@Watch('_orientation')
	public validateOrientation(value?: Orientation): void {
		this.controller.validateOrientation(value);
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
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

	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		this.controller.validateTabIndex(value);
	}

	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	@Watch('_value')
	public validateValue(value?: Stringified<StencilUnknown>): void {
		this.controller.validateValue(value);
	}

	public componentWillLoad(): void {
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
	}

	private onInput = (event: Event): void => {
		if (event.target instanceof HTMLInputElement) {
			const option = this.controller.getOptionByKey(event.target.value);
			if (option !== undefined) {
				this.controller.onFacade.onInput(event, true, option.value);
			}
		}
	};

	private onChange = (event: Event): void => {
		if (event.target instanceof HTMLInputElement) {
			const option = this.controller.getOptionByKey(event.target.value);
			if (option !== undefined) {
				this.controller.onFacade.onChange(event, option.value);

				this._value = option.value;
			}
		}
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.inputRef,
			});
		}
	};
}
