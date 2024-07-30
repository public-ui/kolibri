import type {
	AdjustHeightPropType,
	CSSResize,
	FocusableElement,
	HasCounterPropType,
	HideErrorPropType,
	IdPropType,
	InputTypeOnDefault,
	KoliBriHorizontalIcons,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	RowsPropType,
	Stringified,
	SyncValueBySelectorPropType,
	TextareaAPI,
	TextareaStates,
	TooltipAlignPropType,
} from '../../schema';
import { devWarning, setState, showExpertSlot } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, Element, Fragment, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { nonce } from '../../utils/dev.utils';
import { getRenderStates } from '../input/controller';
import { InternalUnderlinedAccessKey } from '../span/InternalUnderlinedAccessKey';
import { TextareaController } from './controller';
import { KolInputWcTag } from '../../core/component-names';

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
	shadow: true,
})
export class KolTextarea implements TextareaAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolTextareaElement;
	private textareaRef?: HTMLTextAreaElement;

	private readonly catchRef = (ref?: HTMLTextAreaElement) => {
		this.textareaRef = ref;
	};

	/**
	 * Get value of textarea.
	 * @returns {Promise<string | undefined>}
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<string | undefined> {
		return this.textareaRef?.value;
	}

	/**
	 * Sets the focus on the textarea input.
	 * @deprecated Use kolFocus instead.
	 */
	@Method()
	// eslint-disable-next-line @stencil-community/reserved-member-names
	public async focus() {
		await this.kolFocus();
	}

	/**
	 * Sets the focus on the textarea input.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.textareaRef?.focus();
	}

	private handleClick = (): void => {
		this.textareaRef?.focus()
	}

	public render(): JSX.Element {
		const { ariaDescribedBy } = getRenderStates(this.state);
		const hasExpertSlot = showExpertSlot(this.state._label);

		return (
			<Host class={{ 'kol-textarea': true, 'has-value': this.state._hasValue }}>
				<KolInputWcTag
					class={{ textarea: true, 'hide-label': !!this.state._hideLabel, 'has-counter': !!this.state._hasCounter }}
					_accessKey={this.state._accessKey}
					_alert={this.state._alert}
					_currentLength={this.state._currentLength}
					_disabled={this.state._disabled}
					_hideError={this.state._hideError}
					_hasCounter={this.state._hasCounter}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_icons={this.state._icons}
					_id={this.state._id}
					_label={this.state._label}
					_maxLength={this.state._maxLength}
					_msg={this.state._msg}
					_readOnly={this.state._readOnly}
					_required={this.state._required}
					_tooltipAlign={this._tooltipAlign}
					_touched={this.state._touched}
					onClick={this.handleClick}
					role={`presentation` /* Avoid element being read as 'clickable' in NVDA */}
				>
					<span slot="label">
						{hasExpertSlot ? (
							<slot name="expert"></slot>
						) : typeof this.state._accessKey === 'string' ? (
							<>
								<InternalUnderlinedAccessKey accessKey={this.state._accessKey} label={this.state._label} />{' '}
								<span class="access-key-hint" aria-hidden="true">
									{this.state._accessKey}
								</span>
							</>
						) : (
							<span>{this.state._label}</span>
						)}
					</span>
					<div slot="input">
						<textarea
							ref={this.catchRef}
							title=""
							accessKey={this.state._accessKey}
							aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
							aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
							autoCapitalize="off"
							autoCorrect="off"
							disabled={this.state._disabled}
							id={this.state._id}
							maxlength={this.state._maxLength}
							name={this.state._name}
							readOnly={this.state._readOnly}
							required={this.state._required}
							rows={this.state._rows}
							placeholder={this.state._placeholder}
							spellcheck="false"
							{...this.controller.onFacade}
							onInput={this.onInput}
							style={{
								resize: this.state._resize,
							}}
							value={this.state._value}
						/>
					</div>
				</KolInputWcTag>
			</Host>
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
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Defines the error message text.
	 * @deprecated Will be removed in v3. Use `msg` instead.
	 */
	@Prop() public _error?: string;

	/**
	 * Shows the character count on the lower border of the input.
	 * @TODO: Change type back to `HasCounterPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCounter?: boolean = false;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideErrorPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ reflect: true }) public _hideError?: boolean = false;

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
	@Prop() public _msg?: MsgPropType;

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
	@Prop() public _value?: string;

	@State() public state: TextareaStates = {
		_adjustHeight: false,
		_currentLength: 0,
		_hasValue: false,
		_hideError: false,
		_id: `id-${nonce()}`,
		_label: '', // ⚠ required
		_resize: 'vertical',
	};

	public constructor() {
		this.controller = new TextareaController(this, 'textarea', this.host);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_adjustHeight')
	public validateAdjustHeight(value?: AdjustHeightPropType): void {
		this.controller.validateAdjustHeight(value);
	}

	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		this.controller.validateAlert(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_error')
	public validateError(value?: string): void {
		this.controller.validateError(value);
	}

	@Watch('_hasCounter')
	public validateHasCounter(value?: HasCounterPropType): void {
		this.controller.validateHasCounter(value);
	}

	@Watch('_hideError')
	public validateHideError(value?: HideErrorPropType): void {
		this.controller.validateHideError(value);
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
	public validateMsg(value?: MsgPropType): void {
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
		if (value === 'both' || value === 'horizontal') {
			devWarning(
				'In version 3 (v3), horizontal resizing is abolished. The corresponding property is then reduced to the properties `none` (default) and `vertical`.',
			);
		}
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
					this.state?._rows != null && this.state._rows > increaseTextareaHeight(this.textareaRef) ? this.state._rows : increaseTextareaHeight(this.textareaRef);
			} else if (this._rows == null) {
				this._rows = 1;
			}
		}, 0);
	}

	public componentWillLoad(): void {
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
		this.state._hasValue = this.state._value != null;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = Boolean(v)));
	}

	private readonly onInput = (event: InputEvent) => {
		if (this.textareaRef instanceof HTMLTextAreaElement) {
			setState(this, '_currentLength', this.textareaRef.value.length);
			if (this.state._adjustHeight) {
				this._rows = increaseTextareaHeight(this.textareaRef);
			}
			this.controller.onFacade.onInput(event);
		}
	};
}
