/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component, Fragment, h, Host, JSX, Prop } from '@stencil/core';

import { translate } from '../../i18n';
import { Props as ButtonProps } from '../button/types';
import { Stringified } from '../../types/common';
import { KoliBriCustomIcon, KoliBriHorizontalIcon } from '../../types/icon';
import { SuggestionsPropType } from '../../types/props/suggestions';
import { W3CInputValue } from '../../types/w3c';
import { Props } from './types';
import { AlertPropType } from '../../types/props/alert';
import { DisabledPropType } from '../../types/props/disabled';
import { HasCounterPropType } from '../../types/props/has-counter';
import { HideLabelPropType } from '../../types/props/hide-label';
import { ReadOnlyPropType } from '../../types/props/read-only';
import { RequiredPropType } from '../../types/props/required';
import { TouchedPropType } from '../../types/props/touched';
import { IdPropType } from '../../types/props/id';

/**
 * @internal
 */
@Component({
	tag: 'kol-input',
	shadow: false,
})
export class KolInput implements Props {
	public render(): JSX.Element {
		const hasError = typeof this._error === 'string' && this._error.length > 0 && this._touched === true;
		const hasHint = typeof this._hint === 'string' && this._hint.length > 0;
		const hideLabel = this._hideLabel === true && this._required !== true;
		const slotName = this._slotName ? this._slotName : 'input';

		return (
			<Host
				class={{
					disabled: this._disabled === true,
					error: hasError === true,
					'read-only': this._readOnly === true,
					required: this._required === true,
					touched: this._touched === true,
				}}
			>
				{this._renderNoLabel === false && (
					<label id={`${this._id}-label`} hidden={hideLabel} htmlFor={this._id}>
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
					<slot name={slotName}></slot>
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
				{hasError && (
					<kol-alert class="error" id={`${this._id}-error`} _alert={this._alert} _type="error" _variant="msg">
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
					<span aria-atomic="true" aria-live="polite">
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
	 */
	@Prop() public _alert?: AlertPropType = true;

	/**
	 * @internal
	 */
	@Prop() public _currentLength?: number;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: DisabledPropType = false;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string = '';

	/**
	 * Shows the character count on the lower border of the input.
	 */
	@Prop() public _hasCounter?: HasCounterPropType;

	/**
	 * Hides the label and shows the description in a Tooltip instead.
	 */
	@Prop() public _hideLabel?: HideLabelPropType = false;

	/**
	 * Gibt den Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: KoliBriHorizontalIcon;

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id!: IdPropType;

	/**
	 * Gibt an, wie viele Zeichen maximal eingegeben werden können.
	 */
	@Prop() public _maxLength?: number;

	/**
	 * Makes the input element read only.
	 */
	@Prop() public _readOnly?: ReadOnlyPropType = false;

	/**
	 * Gibt an, ob die Komponente kein Label rendern soll.
	 */
	@Prop() public _renderNoLabel?: boolean = false;

	/**
	 * Makes the input element required.
	 */
	@Prop() public _required?: RequiredPropType = false;

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
	 * Ermöglicht eine Schaltfläche in das Eingabefeld mit einer beliebigen Aktion zu einzufügen (ohne label).
	 */
	@Prop() public _smartButton?: Stringified<ButtonProps>;

	/**
	 * Shows if the input was touched by a user.
	 */
	@Prop() public _touched?: TouchedPropType = false;
}
