import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault, Optgroup, Option, SelectOption } from '../../types/input/types';
import { Align } from '../../types/props/align';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { W3CInputValue } from '../../types/w3c';
import { nonce } from '../../utils/dev.utils';
import { propagateFocus } from '../../utils/reuse';
import { getRenderStates } from '../input/controller';
import { SelectController } from './controller';
import { ComponentApi, States } from './types';

const isSelected = (valueList: unknown[] | null, optionValue: unknown): boolean => {
	return Array.isArray(valueList) && valueList.includes(optionValue);
};

/**
 * @slot - Die Beschriftung des Eingabefeldes.
 */
@Component({
	tag: 'kol-select',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolSelect implements ComponentApi {
	@Element() private readonly host?: HTMLKolSelectElement;
	private ref?: HTMLSelectElement;

	private readonly catchRef = (ref?: HTMLSelectElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	private renderOptgroup(optgroup: Optgroup<string>, preKey: string): JSX.Element {
		return (
			<optgroup disabled={optgroup.disabled === true} label={optgroup.label}>
				{optgroup.options?.map((option: SelectOption<W3CInputValue>, index: number) => {
					const key = `${preKey}-${index}`;
					if (Array.isArray((option as Optgroup<string>).options)) {
						return this.renderOptgroup(option as Optgroup<string>, key);
					} else {
						return (
							<option
								disabled={option.disabled === true}
								key={key}
								// label={option.label}
								selected={isSelected(this.state._value, (option as Option<W3CInputValue>).value)}
								value={key}
							>
								{option.label}
							</option>
						);
					}
				})}
			</optgroup>
		);
	}

	public render(): JSX.Element {
		const { ariaDescribedBy } = getRenderStates(this.state);
		const hasExpertSlot = this.state._label === false; // _label="" or _label

		return (
			<Host class={{ 'has-value': this.state._hasValue }}>
				<kol-input
					class={{
						'hide-label': !!this.state._hideLabel,
						select: true,
					}}
					_disabled={this.state._disabled}
					_error={this.state._error}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_icon={this.state._icon}
					_id={this.state._id}
					_required={this.state._required}
					_touched={this.state._touched}
					onClick={() => this.ref?.focus()}
				>
					{/*  TODO: der folgende Slot ohne Name muss später entfernt werden */}
					<span slot="label">{hasExpertSlot ? <slot></slot> : this.state._label}</span>
					<div slot="input">
						<select
							ref={this.catchRef}
							title=""
							accessKey={this.state._accessKey}
							aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
							aria-labelledby={`${this.state._id}-label`}
							autoCapitalize="off"
							autoCorrect="off"
							disabled={this.state._disabled}
							id={this.state._id}
							multiple={this.state._multiple}
							name={this.state._name}
							required={this.state._required}
							size={this.state._size}
							spellcheck="false"
							style={{
								height: this.state._height,
							}}
							{...{
								onClick: this.controller.onFacade.onClick,
								onBlur: this.controller.onFacade.onBlur,
								onFocus: this.controller.onFacade.onFocus,
							}}
							onChange={this.onChange}
						>
							{this.state._list.map((option, index) => {
								/**
								 * Damit der Value einer Option ein beliebigen Typ haben kann
								 * muss man auf HTML-Ebene den Value auf einen String-Wert
								 * mappen. Das tun wir mittels der Map.
								 */
								const key = `-${index}`;
								if (Array.isArray((option as unknown as Optgroup<string>).options)) {
									return this.renderOptgroup(option as unknown as Optgroup<string>, key);
								} else {
									return (
										<option
											disabled={option.disabled === true}
											key={key}
											// label={option.label}
											selected={isSelected(this.state._value, (option as unknown as Option<W3CInputValue>).value)}
											value={key}
										>
											{option.label}
										</option>
									);
								}
							})}
						</select>
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

	private readonly controller: SelectController;

	/**
	 * Gibt an, mit welcher Tastenkombination man das interaktive Element der Komponente auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 */
	@Prop() public _disabled?: boolean;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string;

	/**
	 * Gibt an, ob eine individuelle Höhe übergeben werden soll.
	 *
	 * @deprecated Use _size instead.
	 */
	@Prop() public _height?: string;

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
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _list!: Stringified<SelectOption<W3CInputValue>[]>;

	/**
	 * Gibt an, ob mehrere Werte eingegeben werden können.
	 */
	@Prop() public _multiple?: boolean = false;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Macht das Eingabeelementzu einem Pflichtfeld.
	 */
	@Prop() public _required?: boolean;

	/**
	 * Wechselt das Eingabeelement in den Auswahlfeld modus und setzt die Höhe des Feldes.
	 */
	@Prop() public _size?: number;

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
	@Prop({ mutable: true, reflect: false }) public _value?: Stringified<W3CInputValue[]>;

	@State() public state: States = {
		_hasValue: false,
		_height: '',
		_id: nonce(), // ⚠ required
		_label: false, // ⚠ required
		_list: [],
		_multiple: false,
		_value: [],
	};

	public constructor() {
		this.controller = new SelectController(this, 'textarea', this.host);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
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

	@Watch('_height')
	public validateHeight(value?: string): void {
		this.controller.validateHeight(value);
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
	public validateList(value?: Stringified<SelectOption<W3CInputValue>[]>): void {
		this.controller.validateList(value);
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

	@Watch('_required')
	public validateRequired(value?: boolean): void {
		this.controller.validateRequired(value);
	}

	@Watch('_size')
	public validateSize(value?: number): void {
		this.controller.validateSize(value);
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
	public validateValue(value?: Stringified<W3CInputValue[]>): void {
		this.controller.validateValue(value);
	}

	public componentWillLoad(): void {
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad(this.onChange);

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}

	private onChange = (event: Event): void => {
		/**
		 * TODO: Find values via value keys.
		 */
		this._value = Array.from(this.ref?.options || [])
			.filter((option) => option.selected === true)
			.map((option) => this.controller.getOptionByKey(option.value)?.value as string);
		this.controller.setFormAssociatedValue(this._value as unknown as string);
		if (typeof this.state._on?.onChange === 'function') {
			this.state._on.onChange(event, this._value);
		}
	};
}
