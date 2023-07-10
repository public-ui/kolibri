import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { Align } from '../../types/props/align';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { nonce } from '../../utils/dev.utils';
import { setState } from '../../utils/prop.validators';
import { propagateFocus } from '../../utils/reuse';
import { propagateSubmitEventToForm } from '../form/controller';
import { getRenderStates } from '../input/controller';
import { InputEmailController } from './controller';
import { ComponentApi, States } from './types';

/**
 * @slot - Die Beschriftung des Eingabefeldes.
 */
@Component({
	tag: 'kol-input-email',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolInputEmail implements ComponentApi {
	@Element() private readonly host?: HTMLKolInputEmailElement;
	private ref?: HTMLInputElement;

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	private readonly onKeyUp = (event: KeyboardEvent) => {
		setState(this, '_currentLength', (event.target as HTMLInputElement).value.length);
		if (event.code === 'Enter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ref,
			});
		} else {
			this.controller.onFacade.onChange(event);
		}
	};

	public render(): JSX.Element {
		const { ariaDescribedBy } = getRenderStates(this.state);
		const hasList = Array.isArray(this.state._list) && this.state._list.length > 0;
		const hasExpertSlot = this.state._label === false; // _label="" or _label

		return (
			<Host
				class={{
					'has-value': this.state._hasValue,
				}}
			>
				<kol-input
					class={{ email: true, 'hide-label': !!this.state._hideLabel }}
					_alert={this.state._alert}
					_currentLength={this.state._currentLength}
					_disabled={this.state._disabled}
					_error={this.state._error}
					_hasCounter={this.state._hasCounter}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_icon={this.state._icon}
					_id={this.state._id}
					_list={this.state._list}
					_maxLength={this.state._maxLength}
					_readOnly={this.state._readOnly}
					_required={this.state._required}
					_smartButton={this.state._smartButton}
					_touched={this.state._touched}
					onClick={() => this.ref?.focus()}
				>
					{/*  TODO: der folgende Slot ohne Name muss später entfernt werden */}
					<span slot="label">{hasExpertSlot ? <slot></slot> : this.state._label}</span>
					<div slot="input">
						<input
							ref={this.catchRef}
							title=""
							accessKey={this.state._accessKey}
							aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
							aria-labelledby={`${this.state._id}-label`}
							autoCapitalize="off"
							autoComplete={this.state._autoComplete}
							autoCorrect="off"
							disabled={this.state._disabled}
							multiple={this.state._multiple}
							id={this.state._id}
							list={hasList ? `${this.state._id}-list` : undefined}
							maxlength={this.state._maxLength}
							name={this.state._name}
							pattern={this.state._pattern}
							placeholder={this.state._placeholder}
							readOnly={this.state._readOnly}
							required={this.state._required}
							size={this.state._size}
							spellcheck="false"
							type="email"
							value={this.state._value as string}
							{...this.controller.onFacade}
							onKeyUp={this.onKeyUp}
						/>
						<kol-tooltip
							/**
							 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
							 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
							 */
							aria-hidden="true"
							hidden={hasExpertSlot || !this.state._hideLabel}
							_align={this._tooltipAlign}
							_id={`${this.state._id}-tooltip`}
							_label={typeof this.state._label === 'string' ? this.state._label : ''}
						></kol-tooltip>
					</div>
				</kol-input>
			</Host>
		);
	}

	private readonly controller: InputEmailController;

	/**
	 * Gibt an, mit welcher Tastenkombination man das interaktive Element der Komponente auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Gibt an, ob das Eingabefeld autovervollständigt werden kann.
	 */
	@Prop() public _autoComplete?: InputTypeOnOff;

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 */
	@Prop() public _disabled?: boolean;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string;

	/**
	 * Aktiviert den Zeichenanzahlzähler am unteren Rand des Eingabefeldes.
	 */
	@Prop() public _hasCounter?: boolean;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop() public _hideLabel?: boolean;

	/**
	 * Gibt den Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: Stringified<KoliBriHorizontalIcon>;

	/**
	 * Gibt die interne ID des primären Elements in der Komponente an.
	 */
	@Prop() public _id?: string;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Gibt die Liste der Vorschlagswörter an.
	 */
	@Prop() public _list?: Stringified<string[]>;

	/**
	 * Gibt an, wie viele Zeichen maximal eingegeben werden können.
	 */
	@Prop() public _maxLength?: number;

	/**
	 * Gibt an, ob mehrere Werte eingegeben werden können.
	 */
	@Prop() public _multiple?: boolean;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Gibt ein Prüfmuster (Pattern) für das Eingabefeld an.
	 */
	@Prop() public _pattern?: string;

	/**
	 * Gibt den Platzhalter des Eingabefeldes an, wenn es leer ist.
	 */
	@Prop() public _placeholder?: string;

	/**
	 * Setzt das Eingabefeld in den schreibgeschützten Modus.
	 */
	@Prop() public _readOnly?: boolean;

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 */
	@Prop() public _required?: boolean;

	/**
	 * Setzt die Breite des Eingabefeldes in Buchstabenbreiten.
	 */
	@Prop() public _size?: number;

	/**
	 * Ermöglicht eine Schaltfläche ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (ohne label).
	 */
	@Prop() public _smartButton?: ButtonProps;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: string;

	/**
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: Align = 'top';

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Gibt den Wert des Eingabefeldes an.
	 */
	@Prop() public _value?: string;

	@State() public state: States = {
		_autoComplete: 'off',
		_currentLength: 0,
		_hasValue: false,
		_id: nonce(), // ⚠ required
		_label: false, // ⚠ required
		_list: [],
	};

	public constructor() {
		this.controller = new InputEmailController(this, 'email', this.host);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		this.controller.validateAlert(value);
	}

	@Watch('_autoComplete')
	public validateAutoComplete(value?: InputTypeOnOff): void {
		this.controller.validateAutoComplete(value);
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
	public validateHasCounter(value?: boolean): void {
		this.controller.validateHasCounter(value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		this.controller.validateHideLabel(value);
	}

	@Watch('_hint')
	public validateHint(value?: string): void {
		this.controller.validateHint(value);
	}

	@Watch('_icon')
	public validateIcon(value?: Stringified<KoliBriHorizontalIcon>): void {
		this.controller.validateIcon(value);
	}

	@Watch('_id')
	public validateId(value?: string): void {
		this.controller.validateId(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		this.controller.validateLabel(value);
	}

	@Watch('_list')
	public validateList(value?: Stringified<string[]>): void {
		this.controller.validateList(value);
	}

	@Watch('_maxLength')
	public validateMaxLength(value?: number): void {
		this.controller.validateMaxLength(value);
	}

	@Watch('_multiple')
	public validateMultiple(value?: boolean): void {
		this.controller.validateMultiple(value);
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		this.controller.validateOn(value);
	}

	@Watch('_pattern')
	public validatePattern(value?: string): void {
		this.controller.validatePattern(value);
	}

	@Watch('_placeholder')
	public validatePlaceholder(value?: string): void {
		this.controller.validatePlaceholder(value);
	}

	@Watch('_readOnly')
	public validateReadOnly(value?: boolean): void {
		this.controller.validateReadOnly(value);
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
		this.controller.validateRequired(value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_size')
	public validateSize(value?: number): void {
		this.controller.validateSize(value);
	}

	@Watch('_smartButton')
	public validateSmartButton(value?: ButtonProps | string): void {
		this.controller.validateSmartButton(value);
	}

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: string): void {
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

	public componentWillLoad(): void {
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad();

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}
}
