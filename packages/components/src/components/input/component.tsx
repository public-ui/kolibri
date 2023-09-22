/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component, Element, Fragment, h, Host, JSX, Prop } from '@stencil/core';

import { translate } from '../../i18n';
import { Stringified } from '../../types/common';
import { KoliBriCustomIcon, KoliBriHorizontalIcon } from '../../types/icon';
import { IdPropType } from '../../types/props/id';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { SuggestionsPropType } from '../../types/props/suggestions';
import { TooltipAlignPropType } from '../../types/props/tooltip-align';
import { W3CInputValue } from '../../types/w3c';
import { handleSlotContent } from '../../utils/reuse';
import { Props as ButtonProps } from '../button/types';
import { Props } from './types';

/**
 * @internal
 */
@Component({
	tag: 'kol-input',
	shadow: false,
})
export class KolInput implements Props {
	@Element() private readonly host?: HTMLElement;

	private slotName: string = 'input';

	public componentWillRender(): void {
		this.slotName = this._slotName ? this._slotName : 'input';
	}

	private catchInputSlot = (slot?: HTMLDivElement): void => {
		handleSlotContent(this.host!, slot!, this.slotName);
	};

	public render(): JSX.Element {
		const hasError = typeof this._error === 'string' && this._error.length > 0 && this._touched === true;
		const hasExpertSlot = this._label === false; // _label="" or _label
		const hasHint = typeof this._hint === 'string' && this._hint.length > 0;

		return (
			<Host
				class={{
					disabled: this._disabled === true,
					error: hasError === true,
					'read-only': this._readOnly === true,
					required: this._required === true,
					touched: this._touched === true,
					'hidden-error': this._hideError === true,
				}}
			>
				{(hasExpertSlot || !this._hideLabel) && (
					<label id={`${this._id}-label`} htmlFor={this._id}>
						{/* INFO: span is needed for css styling :after content like a star (*) or optional text ! */}
						<span>
							{/* INFO: label comes with any html tag or as plain text! */}
							<slot name="label"></slot>
						</span>
					</label>
				)}
				{hasHint && (
					<span class="hint" id={`${this._id}-hint`}>
						{this._hint}
					</span>
				)}
				<div
					class={{
						input: true,
						'icon-left': typeof this._icon?.left === 'object',
						'icon-right': typeof this._icon?.right === 'object',
					}}
				>
					{this._icon?.left && <kol-icon _ariaLabel="" _icon={(this._icon.left as KoliBriCustomIcon).icon}></kol-icon>}
					<div ref={this.catchInputSlot} id={this.slotName} class="input-slot"></div>
					{typeof this._smartButton === 'object' && this._smartButton !== null && (
						<kol-button-wc
							_customClass={this._smartButton._customClass}
							_disabled={this._smartButton._disabled}
							_icon={this._smartButton._icon}
							_hideLabel={true}
							_id={this._smartButton._id}
							_label={this._smartButton._label}
							_on={this._smartButton._on}
							_tooltipAlign={this._smartButton._tooltipAlign}
							_variant={this._smartButton._variant}
						></kol-button-wc>
					)}
					{this._icon?.right && <kol-icon _ariaLabel="" _icon={(this._icon.right as KoliBriCustomIcon).icon}></kol-icon>}
				</div>
				{!hasExpertSlot && this._hideLabel && (
					<kol-tooltip-wc
						/**
						 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
						 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
						 */
						aria-hidden="true"
						class="input-tooltip"
						_align={this._tooltipAlign}
						_id={this._hideLabel ? `${this._id}-label` : undefined}
						_label={this._label as string}
					>
						<slot name="label" slot="expert"></slot>
					</kol-tooltip-wc>
				)}
				{hasError && (
					<kol-alert
						_alert={this._alert}
						_type="error"
						_variant="msg"
						aria-hidden={this._hideError}
						class={`error${this._hideError ? ' hidden' : ''}`}
						id={`${this._id}-error`}
					>
						{this._error}
					</kol-alert>
				)}
				{Array.isArray(this._suggestions) && this._suggestions.length > 0 && (
					<datalist id={`${this._id}-list`}>
						{this._suggestions.map((option: W3CInputValue) => (
							<option value={option} />
						))}
					</datalist>
				)}
				{this._hasCounter && (
					<span class="counter" aria-atomic="true" aria-live="polite">
						{this._currentLength}
						{this._maxLength && (
							<Fragment>
								<span aria-label={translate('kol-of')} role="img">
									/
								</span>
								{this._maxLength}
							</Fragment>
						)}{' '}
						<span>{translate('kol-characters')}</span>
					</span>
				)}
			</Host>
		);
	}

	/**
	 * Defines whether the screen-readers should read out the notification.
	 * @TODO: Change type back to `AlertPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _alert?: boolean = true;

	/**
	 * @internal
	 */
	@Prop() public _currentLength?: number;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Defines the error message text.
	 */
	@Prop() public _error?: string = '';

	/**
	 * Shows the character count on the lower border of the input.
	 * @TODO: Change type back to `HasCounterPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCounter?: boolean;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideErrorPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideError?: boolean = false;

	/**
	 * Hides the label and shows the description in a Tooltip instead.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the hint text.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Defines the icon classnames (e.g. `_icon="fa-solid fa-user"`).
	 */
	@Prop() public _icon?: KoliBriHorizontalIcon;

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id!: IdPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the maximum number of input characters.
	 */
	@Prop() public _maxLength?: number;

	/**
	 * Makes the input element read only.
	 * @TODO: Change type back to `ReadOnlyPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _readOnly?: boolean = false;

	/**
	 * Gibt an, ob die Komponente kein Label rendern soll.
	 */
	@Prop() public _renderNoLabel?: boolean = false;

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Ermöglicht den Slotnamen zu bestimmen. Wird nur verwendet, wenn sonst mehrere Slots mit dem gleichen Namen innerhalb eines Shadow DOMs existieren würden.
	 * @internal
	 */
	@Prop() public _slotName?: string;

	/**
	 * Suggestions to provide for the input.
	 */
	@Prop() public _suggestions?: SuggestionsPropType;

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<ButtonProps>;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Shows if the input was touched by a user.
	 * @TODO: Change type back to `TouchedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _touched?: boolean = false;
}
