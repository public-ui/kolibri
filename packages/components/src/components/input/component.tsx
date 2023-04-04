/* eslint-disable jsx-a11y/label-has-associated-control */
import { Component, h, Host, JSX, Prop } from '@stencil/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriCustomIcon } from '../../types/icon';

import { KoliBriHorizontalIcon } from '../../types/icon';
import { Props } from './types';

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
						<span>
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
					{this._icon?.left ? <kol-icon _ariaLabel="" _icon={(this._icon.left as KoliBriCustomIcon).icon}></kol-icon> : <i />}
					<slot name="input"></slot>
					{typeof this._smartButton === 'object' && this._smartButton !== null && (
						<kol-button-wc
							_ariaLabel={this._smartButton._ariaLabel}
							_customClass={this._smartButton._customClass}
							_disabled={this._smartButton._disabled}
							_icon={this._smartButton._icon}
							_iconOnly={true}
							_id={this._smartButton._id}
							_label={this._smartButton._label}
							_on={this._smartButton._on}
							_tooltipAlign={this._smartButton._tooltipAlign}
							_variant={this._smartButton._variant}
						></kol-button-wc>
					)}
					{this._icon?.right ? <kol-icon _ariaLabel="" _icon={(this._icon.right as KoliBriCustomIcon).icon}></kol-icon> : <i />}
				</div>
				{hasError && (
					<kol-alert class="error" id={`${this._id}-error`} _alert={this._alert} _type="error" _variant="msg">
						{this._error}
					</kol-alert>
				)}
				{Array.isArray(this._list) && this._list.length > 0 && (
					<datalist id={`${this._id}-list`}>
						{this._list.map((option: string) => (
							<option value={option} />
						))}
					</datalist>
				)}
			</Host>
		);
	}

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	@Prop({ reflect: true }) public _alert?: boolean = true;

	/**
	 * Setzt das Feld in einen inaktiven Zustand, in dem es keine Interaktion erlaubt.
	 */
	@Prop({ reflect: true }) public _disabled?: boolean = false;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string = '';

	/**
	 * Versteckt das sichtbare Label des Elements.
	 */
	@Prop({ reflect: true }) public _hideLabel?: boolean = false;

	/**
	 * Gibt den Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.
	 */
	@Prop() public _icon?: KoliBriHorizontalIcon;

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 */
	@Prop() public _id!: string;

	/**
	 * Gibt die Liste der Vorschlagswörter an.
	 */
	@Prop() public _list?: Stringified<string[]>;

	/**
	 * Gibt an, ob die Eingabefeld nur lesend ist.
	 */
	@Prop({ reflect: true }) public _readOnly?: boolean = false;

	/**
	 * Gibt an, ob die Komponente kein Label rendern soll.
	 */
	@Prop({ reflect: true }) public _renderNoLabel?: boolean = false;

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 */
	@Prop({ reflect: true }) public _required?: boolean = false;

	/**
	 * Ermöglicht eine Schaltfläche ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (ohne label).
	 */
	@Prop() public _smartButton?: ButtonProps;

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop({ reflect: true }) public _touched?: boolean = false;
}
