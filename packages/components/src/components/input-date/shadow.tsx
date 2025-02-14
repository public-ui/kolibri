import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from 'clsx';

import type {
	ButtonProps,
	FocusableElement,
	HideMsgPropType,
	IdPropType,
	InputDateAPI,
	InputDateStates,
	InputDateType,
	InputTypeOnDefault,
	InputTypeOnOff,
	Iso8601,
	KoliBriHorizontalIcons,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	ReadOnlyPropType,
	ShortKeyPropType,
	Stringified,
	SuggestionsPropType,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
} from '../../schema';
import { deprecatedHint } from '../../schema';

import { nonce } from '../../utils/dev.utils';
import { propagateSubmitEventToForm } from '../form/controller';
import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper';
import KolInputStateWrapperFc, { type InputStateWrapperProps } from '../../functional-component-wrappers/InputStateWrapper';
import KolInputContainerFc from '../../functional-component-wrappers/InputContainerStateWrapper';
import { InputDateController } from './controller';

/**
 * @slot - Die Beschriftung des Eingabefeldes.
 */
@Component({
	tag: 'kol-input-date',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolInputDate implements InputDateAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolInputDateElement;
	private inputRef?: HTMLInputElement;

	@State() private _initialValueType: 'Date' | 'String' | null = null;

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.inputRef = ref;
	};

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | Date | undefined> {
		return this.inputRef && this.remapValue(this.inputRef?.value);
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.inputRef?.focus();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async reset() {
		this.state = {
			...this.state,
			_value: null,
		};
		this.controller.setFormAssociatedValue('');

		// Setting the state value might not trigger a state change and rerender if the previous value is already an empty string,
		// which can occur during an incomplete input. Directly setting the DOM property "forces" a reset of the native element.
		if (this.inputRef) {
			this.inputRef.value = '';
		}
	}

	private setInitialValueType(value: Iso8601 | Date | null) {
		if (value instanceof Date) {
			this._initialValueType = 'Date';
		} else if (typeof value === 'string') {
			this._initialValueType = 'String';
		} else {
			this._initialValueType = null;
		}
	}
	private remapValue(newValue: string): Date | Iso8601 {
		return this._initialValueType === 'Date' ? new Date(newValue) : (newValue as Iso8601);
	}

	private readonly onBlur = (event: Event) => {
		this.controller.onFacade.onBlur(event);
		this.inputHasFocus = false;
	};

	private readonly onFocus = (event: Event) => {
		this.controller.onFacade.onFocus(event);
		this.inputHasFocus = true;
	};

	private readonly onChange = (event: Event) => {
		const newValue = (event.target as HTMLInputElement).value;
		const remappedValue = this.remapValue(newValue);
		this.controller.onFacade.onChange(event, remappedValue);
	};

	private readonly onInput = (event: Event) => {
		const newValue = (event.target as HTMLInputElement).value;
		const remappedValue = this.remapValue(newValue);
		this._value = remappedValue;
		this.controller.onFacade.onInput(event, true, remappedValue);
	};

	private readonly onKeyDown = (event: KeyboardEvent) => {
		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.inputRef,
			});
		}
	};

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: clsx('kol-input-date', this.state._type as string, {
				'has-value': this.state._hasValue,
			}),
			tooltipAlign: this._tooltipAlign,
			onClick: () => this.inputRef?.focus(),
			alert: this.showAsAlert(),
		};
	}

	private getInputProps(): InputStateWrapperProps {
		return {
			ref: this.catchRef,
			state: this.state,
			...this.controller.onFacade,
			onBlur: this.onBlur,
			onFocus: this.onFocus,
			onKeyDown: this.onKeyDown,
			onChange: this.onChange,
			onInput: this.onInput,
		};
	}

	public render(): JSX.Element {
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerFc state={this.state}>
					<KolInputStateWrapperFc {...this.getInputProps()} />
				</KolInputContainerFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	private readonly controller: InputDateController;

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
	@Prop() public _icons?: Stringified<KoliBriHorizontalIcons>;

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
	 * Adds a visual short key hint to the component.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<ButtonProps>;

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
	@Prop() public _step?: number;

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
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type: InputDateType = 'date';

	/**
	 * Defines the value of the input.
	 */
	@Prop({ mutable: true, reflect: true }) public _value?: Iso8601 | Date | null;

	@State() public state: InputDateStates = {
		_autoComplete: 'off',
		_hasValue: false,
		_hideMsg: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_suggestions: [],
		_type: 'datetime-local',
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new InputDateController(this, 'date', this.host);
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
	public validateIcons(value?: Stringified<KoliBriHorizontalIcons>): void {
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
	public validateMax(value?: Iso8601 | Date): void {
		this.controller.validateMax(value);
	}

	@Watch('_min')
	public validateMin(value?: Iso8601 | Date): void {
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

	@Watch('_readOnly')
	public validateReadOnly(value?: ReadOnlyPropType): void {
		this.controller.validateReadOnly(value);
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
		this.controller.validateRequired(value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_smartButton')
	public validateSmartButton(value?: ButtonProps | string): void {
		this.controller.validateSmartButton(value);
	}

	@Watch('_suggestions')
	public validateSuggestions(value?: SuggestionsPropType): void {
		this.controller.validateSuggestions(value);
	}

	@Watch('_step')
	public validateStep(value?: number): void {
		this.controller.validateStep(value);
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

	@Watch('_type')
	public validateType(value?: InputDateType): void {
		this.controller.validateType(value);
	}

	@Watch('_value')
	public validateValue(value?: Iso8601 | Date | null): void {
		if (value instanceof Date) {
			deprecatedHint('Date type will be removed in v3. Use `Iso8601` instead.');
		}
		this.controller.validateValueEx(value);
		if (value !== undefined) this.setInitialValueType(value);
	}

	public componentWillLoad(): void {
		if (this._value !== undefined) this.setInitialValueType(this._value);
		this._touched = this._touched === true;
		this.controller.componentWillLoad();

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}
}
