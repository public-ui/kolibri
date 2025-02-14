import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from 'clsx';

import type {
	AdjustHeightPropType,
	CSSResize,
	FocusableElement,
	HasCounterPropType,
	HideMsgPropType,
	IdPropType,
	InputTypeOnDefault,
	KoliBriHorizontalIcons,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	RowsPropType,
	ShortKeyPropType,
	SpellCheckPropType,
	Stringified,
	SyncValueBySelectorPropType,
	TextareaAPI,
	TextareaStates,
	TooltipAlignPropType,
} from '../../schema';
import { setState } from '../../schema';

import { nonce } from '../../utils/dev.utils';
import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper';
import KolTextAreaStateWrapperFc, { type TextAreaStateWrapperProps } from '../../functional-component-wrappers/TextAreaStateWrapper';
import KolInputContainerStateWrapperFc from '../../functional-component-wrappers/InputContainerStateWrapper';
import { TextareaController } from './controller';

/**
 * https://stackoverflow.com/questions/17772260/textarea-auto-height
 */
const increaseTextareaHeight = (el: HTMLTextAreaElement): number => {
	el.style.overflow = 'hidden'; // verhindert, dass ein Scrollbalken kurz angezeigt wird
	const currentRows = el.rows;
	const rowHeight = el.clientHeight / currentRows;
	el.rows = 1;
	const nextRows = Math.round(el.scrollHeight / rowHeight);
	el.rows = currentRows;
	return nextRows;
};

/**
 * @slot - Die Beschriftung des Eingabefeldes.
 */
@Component({
	tag: 'kol-textarea',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolTextarea implements TextareaAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolTextareaElement;
	private textareaRef?: HTMLTextAreaElement;

	private readonly catchRef = (ref?: HTMLTextAreaElement) => {
		this.textareaRef = ref;
	};

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this.textareaRef?.value;
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.textareaRef?.focus();
	}

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: clsx('kol-form-field-textarea', {
				'kol-form-field--has-value': this.state._hasValue,
				'kol-form-field--has-counter': !!this.state._hasCounter,
			}),
			tooltipAlign: this._tooltipAlign,
			onClick: () => this.textareaRef?.focus(),
			alert: this.showAsAlert(),
		};
	}

	private getTextAreaProps(): TextAreaStateWrapperProps {
		return {
			ref: this.catchRef,
			state: this.state,
			style: {
				resize: this.state._resize,
			},
			...this.controller.onFacade,
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

	public render(): JSX.Element {
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerStateWrapperFc state={this.state}>
					<KolTextAreaStateWrapperFc {...this.getTextAreaProps()} />
				</KolInputContainerStateWrapperFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	private readonly controller: TextareaController;

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Adjusts the height of the element to its content.
	 * @TODO: change back to AdjustHeightPropType after stencil #4663 has been resolved
	 */
	@Prop() public _adjustHeight?: boolean = false;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Shows the character count on the lower border of the input.
	 * @TODO: Change type back to `HasCounterPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCounter?: boolean = false;

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
	@Prop() public _icons?: KoliBriHorizontalIcons;

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: IdPropType;

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
	@Prop() public _resize?: CSSResize = 'vertical';

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Defines how many rows of text should be visible at the same time.
	 */
	@Prop({ mutable: true, reflect: false }) public _rows?: RowsPropType;

	/**
	 * Adds a visual short key hint to the component.
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
	 */
	@Prop({ mutable: true, reflect: true }) public _value?: string;

	@State() public state: TextareaStates = {
		_adjustHeight: false,
		_currentLength: 0,
		_hasValue: false,
		_hideMsg: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_resize: 'vertical',
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new TextareaController(this, 'textarea', this.host);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_adjustHeight')
	public validateAdjustHeight(value?: AdjustHeightPropType): void {
		this.controller.validateAdjustHeight(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_hasCounter')
	public validateHasCounter(value?: HasCounterPropType): void {
		this.controller.validateHasCounter(value);
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

	@Watch('_maxLength')
	public validateMaxLength(value?: number): void {
		this.controller.validateMaxLength(value);
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

	@Watch('_placeholder')
	public validatePlaceholder(value?: string): void {
		this.controller.validatePlaceholder(value);
	}

	@Watch('_readOnly')
	public validateReadOnly(value?: boolean): void {
		this.controller.validateReadOnly(value);
	}

	@Watch('_resize')
	public validateResize(value?: CSSResize): void {
		this.controller.validateResize(value);
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
		this.controller.validateRequired(value);
	}

	@Watch('_rows')
	public validateRows(value?: RowsPropType): void {
		this.controller.validateRows(value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_spellCheck')
	public validateSpellCheck(value?: SpellCheckPropType): void {
		this.controller.validateSpellCheck(value);
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
	public validateValue(value?: string): void {
		this.controller.validateValue(value);
	}

	public componentDidLoad(): void {
		setTimeout(() => {
			if (this._adjustHeight === true && this.textareaRef /* SSR instanceof HTMLTextAreaElement */) {
				this._rows =
					this.state?._rows && this.state._rows > increaseTextareaHeight(this.textareaRef) ? this.state._rows : increaseTextareaHeight(this.textareaRef);
			} else if (!this._rows) {
				this._rows = 1;
			}
		}, 0);
	}

	public componentWillLoad(): void {
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}

	private readonly onInput = (event: InputEvent) => {
		if (this.textareaRef instanceof HTMLTextAreaElement) {
			const value = this.textareaRef.value;
			setState(this, '_currentLength', value.length);
			this._value = value;
			if (this.state._adjustHeight) {
				this._rows = increaseTextareaHeight(this.textareaRef);
			}
			this.controller.onFacade.onInput(event);
		}
	};
}
