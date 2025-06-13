import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from 'clsx';

import type {
	FocusableElement,
	HideMsgPropType,
	IconsHorizontalPropType,
	IdPropType,
	InputRangeAPI,
	InputRangeStates,
	InputTypeOnDefault,
	InputTypeOnOff,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	NumberString,
	ShortKeyPropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';

import { nonce } from '../../utils/dev.utils';
import { propagateSubmitEventToForm } from '../form/controller';
import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper';
import KolInputStateWrapperFc, { type InputStateWrapperProps } from '../../functional-component-wrappers/InputStateWrapper';
import KolInputContainerFc from '../../functional-component-wrappers/InputContainerStateWrapper';
import { InputRangeController } from './controller';
import KolSuggestionsFc from '../../functional-components/Suggestions';

/**
 * @slot - Die Beschriftung des Eingabeelements.
 */
@Component({
	tag: 'kol-input-range',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolInputRange implements InputRangeAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolInputRangeElement;
	private refInputNumber?: HTMLInputElement;
	private refInputRange?: HTMLInputElement;

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.refInputNumber?.focus();
	}

	private readonly catchInputNumberRef = (element?: HTMLInputElement) => {
		if (element) {
			this.refInputNumber = element;
			if (!this._value && this.refInputNumber?.value) {
				this.validateValue(parseFloat(this.refInputNumber.value));
			}
		}
	};

	private readonly catchInputRangeRef = (element?: HTMLInputElement) => {
		if (element) {
			this.refInputRange = element;
		}
	};

	private getSanitizedFloatValue(value: string): number {
		const floatValue = parseFloat(value);
		if (this.state._max && floatValue > this.state._max) {
			return this.state._max;
		}
		if (this.state._min && floatValue < this.state._min) {
			return this.state._min;
		}
		return floatValue;
	}

	/**
	 * Map the value to the initial format. E.g., if the user provided a string initially, return a string.
	 */
	private remapValue(value: number): number | NumberString {
		if (this._initialValueType === 'NumberString') {
			return String(value) as NumberString;
		}
		return value;
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<number | NumberString | undefined> {
		if (this.refInputNumber !== undefined) {
			const value = this.refInputNumber.value;
			const floatValue = this.getSanitizedFloatValue(value);
			return this.remapValue(floatValue);
		}
	}

	private readonly onInput = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		const floatValue = this.getSanitizedFloatValue(value);
		this.controller.onFacade.onInput(event, true, this.remapValue(floatValue));
	};

	private readonly onChange = (event: Event) => {
		const value = (event.target as HTMLInputElement).value;
		const floatValue = this.getSanitizedFloatValue(value);
		const remappedValue = this.remapValue(floatValue);
		this.validateValue(remappedValue);
		this.controller.onFacade.onChange(event, remappedValue);
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.refInputNumber,
			});
		}
	};

	componentDidLoad() {
		if (!this._value && this.refInputRange?.value) {
			this.validateValue(parseFloat(this.refInputRange.value));
		}
	}

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: clsx('kol-input-range', 'range'),
			tooltipAlign: this._tooltipAlign,
			onClick: () => this.refInputRange?.focus(),
			alert: this.showAsAlert(),
		};
	}

	private getGenericInputProps() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { _suggestions, ...other } = this.state;

		return {
			state: { ...other, _suggestions: [] },
			...this.controller.onFacade,
			onChange: this.onChange,
			onInput: this.onInput,
			onFocus: (event: Event) => {
				this.controller.onFacade.onFocus(event);
				this.inputHasFocus = true;
			},
			onBlur: (event: Event) => {
				this.controller.onFacade.onBlur(event);
				this.inputHasFocus = false;
			},
		};
	}

	private get hasSuggestions(): boolean {
		return Array.isArray(this.state._suggestions) && this.state._suggestions.length > 0;
	}

	private getInputRangeProps(): InputStateWrapperProps {
		return {
			...this.getGenericInputProps(),
			name: this.state._name ? `${this.state._name}-range` : undefined,
			list: this.hasSuggestions ? `${this.state._id}-list` : undefined,
			type: 'range',
			tabIndex: -1,
			id: undefined,
			'aria-hidden': 'true',
			ref: this.catchInputRangeRef,
		};
	}

	private getInputNumberProps(): InputStateWrapperProps {
		return {
			...this.getGenericInputProps(),
			name: this.state._name ? `${this.state._name}-number` : undefined,
			list: this.hasSuggestions ? `${this.state._id}-list` : undefined,
			type: 'number',
			ref: this.catchInputNumberRef,
			onKeyDown: this.onKeyDown,
		};
	}

	private setInitialValueType(value?: number | NumberString) {
		if (this.controller.isNumberString(value)) {
			this._initialValueType = 'NumberString';
		} else {
			this._initialValueType = 'number';
		}
	}

	public render(): JSX.Element {
		const inputsWrapperStyle = {
			// use number of digits in max value plus some space for the number input arrow buttons
			'--kolibri-input-range--input-number--width': `calc(${String(this.state._max ?? 1000).length}ch + 1.5em)`,
		};

		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerFc state={this.state}>
					<div class="kol-input-range__inputs-wrapper" style={inputsWrapperStyle}>
						<KolInputStateWrapperFc class="kol-input-range__input kol-input-range__input--range" {...this.getInputRangeProps()} />
						<KolInputStateWrapperFc class="kol-input-range__input kol-input-range__input--number" {...this.getInputNumberProps()} />
					</div>
					{this.hasSuggestions && <KolSuggestionsFc id={this.state._id} suggestions={this.state._suggestions} />}
				</KolInputContainerFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	private readonly controller: InputRangeController;

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the input can be auto-completed.
	 */
	@Prop() public _autoComplete?: InputTypeOnOff;

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
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsHorizontalPropType;

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: IdPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the largest possible input value.
	 */
	@Prop() public _max?: number | NumberString;

	/**
	 * Defines the smallest possible input value.
	 */
	@Prop() public _min?: number | NumberString;

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
	 * Adds a visual short key hint to the component.
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
	 * Defines the value of the input.
	 */
	@Prop({ mutable: true, reflect: true }) public _value?: number | NumberString;

	@State() public state: InputRangeStates = {
		_autoComplete: 'off',
		_hideMsg: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_suggestions: [],
	};
	@State() private _initialValueType: 'number' | 'NumberString' = 'number';
	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new InputRangeController(this, 'range', this.host);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_autoComplete')
	public validateAutoComplete(value?: InputTypeOnOff): void {
		this.controller.validateAutoComplete(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_hideMsg')
	public validateHideMsg(value?: HideMsgPropType): void {
		this.controller.validateHideMsg(value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		this.controller.validateHideLabel(value);
	}

	@Watch('_hint')
	public validateHint(value?: string): void {
		this.controller.validateHint(value);
	}

	@Watch('_icons')
	public validateIcons(value?: IconsHorizontalPropType): void {
		this.controller.validateIcons(value);
	}

	@Watch('_id')
	public validateId(value?: string): void {
		this.controller.validateId(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		this.controller.validateLabel(value);
	}

	@Watch('_max')
	public validateMax(value?: number | NumberString): void {
		this.controller.validateMax(value);
	}

	@Watch('_min')
	public validateMin(value?: number | NumberString): void {
		this.controller.validateMin(value);
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

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_step')
	public validateStep(value?: number | NumberString): void {
		this.controller.validateStep(value);
	}

	@Watch('_suggestions')
	public validateSuggestions(value?: SuggestionsPropType): void {
		this.controller.validateSuggestions(value);
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
	public validateValue(value?: number | NumberString): void {
		this.controller.validateValue(value);
		if (value !== undefined) {
			this.setInitialValueType(value);
		}
	}

	public componentWillLoad(): void {
		if (this._value !== undefined) {
			this.setInitialValueType(this._value);
		}
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
	}
}
