import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { Stringified } from '../../types/common';

import { InputTypeOnDefault, Optgroup, Option, SelectOption } from '../../types/input/types';
import { W3CInputValue } from '../../types/w3c';
import { propagateFocus } from '../../utils/reuse';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { getRenderStates } from '../input/controller';
import { SelectController } from './controller';
import { ComponentApi, States } from './types';

const isSelected = (valueList: unknown[] | null, optionValue: unknown): boolean => {
	return Array.isArray(valueList) && valueList.includes(optionValue);
};

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
		const { ariaDiscribedBy } = getRenderStates(this.state);
		return (
			<Host
				class={{
					'has-value': this.state._hasValue,
				}}
			>
				<kol-input
					_disabled={this.state._disabled}
					_error={this.state._error}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_icon={this.state._icon}
					_id={this.state._id}
					_required={this.state._required}
					_touched={this.state._touched}
				>
					<span slot="label">
						<slot />
					</span>
					<select
						ref={this.catchRef}
						title=""
						accessKey={this.state._accessKey}
						aria-describedby={ariaDiscribedBy.length > 0 ? ariaDiscribedBy.join(' ') : undefined}
						aria-labelledby={`${this.state._id}-label`}
						autoCapitalize="off"
						autoCorrect="off"
						disabled={this.state._disabled}
						id={this.state._id}
						multiple={this.state._multiple}
						name={this.state._name}
						required={this.state._required}
						size={this.state._size}
						slot="input"
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
				</kol-input>
			</Host>
		);
	}

	private readonly controller: SelectController;

	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Gibt an, ob das Eingabefeld aktiviert oder deaktiviert ist.
	 */
	@Prop({ reflect: true }) public _disabled?: boolean;

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
	 * Gibt an, ob das Eingabefeld kein sichtbares Label haben soll.
	 */
	@Prop({ reflect: true }) public _hideLabel?: boolean;

	/**
	 * Gibt den Text für eine Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.
	 */
	@Prop() public _icon?: Stringified<KoliBriHorizontalIcon>;

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 */
	@Prop() public _id!: string;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _list!: Stringified<SelectOption<W3CInputValue>[]>;

	/**
	 * Gibt an, ob mehrere Werte eingegeben werden können.
	 */
	@Prop({ reflect: true }) public _multiple?: boolean = false;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Gibt an, ob die Selectbox ein Pflichtfeld ist.
	 */
	@Prop({ reflect: true }) public _required?: boolean;

	/**
	 * Gibt an, wie viele Optionen im Drop-Down-Menü sichtbar sein sollen.
	 */
	@Prop() public _size?: number;

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 */
	@Prop() public _tabIndex?: number;

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
		_id: '…', // ⚠ required
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
