import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { InputDateType } from '../../types/input/control/number';
import { Iso8601 } from '../../types/input/iso8601';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { setState, watchValidator } from '../../utils/prop.validators';
import { propergateFocus } from '../../utils/reuse';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { ComponentApi, States } from './types';

@Component({
	tag: 'kol-input-date',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolInputDate implements ComponentApi {
	@Element() private readonly host?: HTMLKolInputDateElement;
	private ref?: HTMLKolInputNumberElement;

	private static readonly DEFAULT_MAX_DATE = new Date(9999, 11, 31, 23, 59, 59);

	// test: https://regex101.com/r/NTVh4L/1
	private static readonly isoDateRegex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])/;
	private static readonly isoLocalDateTimeRegex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])[T ][0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/;
	private static readonly isoMonthRegex = /^\d{4}-([0]\d|1[0-2])/;
	private static readonly isoTimeRegex = /^[0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/;
	private static readonly isoWeekRegex = /^\d{4}-W(?:[0-4]\d|5[0-3])$/;

	private readonly catchRef = (ref?: HTMLKolInputNumberElement) => {
		this.ref = ref;
		propergateFocus(this.host, this.ref);
	};

	public render(): JSX.Element {
		return (
			<Host>
				<kol-input-number
					ref={this.catchRef}
					_accessKey={this._accessKey}
					_alert={this._alert}
					_autoComplete={this._autoComplete}
					_disabled={this._disabled}
					_error={this._error}
					_hideLabel={this._hideLabel}
					_hint={this._hint}
					_icon={this._icon}
					_id={this._id}
					_list={this._list}
					_max={this.state._max}
					_min={this.state._min}
					_name={this._name}
					_on={this.state._on}
					_readOnly={this._readOnly}
					_required={this._required}
					_smartButton={this._smartButton}
					_step={this._step}
					_tabIndex={this._tabIndex}
					_touched={this._touched}
					_type={this._type}
					_value={this.state._value}
				>
					<slot />
				</kol-input-number>
			</Host>
		);
	}

	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Gibt an, ob das Eingabefeld autovervollständigt werden kann.
	 */
	@Prop() public _autoComplete?: InputTypeOnOff;

	/**
	 * Gibt an, ob das Eingabefeld aktiviert oder deaktiviert ist.
	 */
	@Prop({ reflect: true }) public _disabled?: boolean;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string;

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
	 * Gibt die Liste der Vorschlagszahlen an.
	 */
	@Prop() public _list?: Stringified<string[]>;

	/**
	 * Gibt den größtmöglichen Datumswert an.
	 */
	@Prop() public _max?: Iso8601 | Date;

	/**
	 * Gibt den kleinstmöglichen Datumswert an.
	 */
	@Prop() public _min?: Iso8601 | Date;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Gibt an, ob das Eingabefeld nur lesend ist.
	 */
	@Prop({ reflect: true }) public _readOnly?: boolean;

	/**
	 * Gibt an, ob das Eingabefeld ein Pflichtfeld ist.
	 */
	@Prop({ reflect: true }) public _required?: boolean;

	/**
	 * Ermöglicht einen Schalter ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (nur Icon-Only).
	 */
	@Prop() public _smartButton?: ButtonProps;

	/**
	 * Gibt die Schrittweite der Wertveränderung an
	 */
	@Prop() public _step?: number;

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Gibt den Typ des Eingabefeldes an.
	 */
	@Prop() public _type: InputDateType = 'date';

	/**
	 * Gibt den Wert des Eingabefeldes an.
	 */
	@Prop({ mutable: true }) public _value?: Iso8601 | Date | null;

	@State() public state: States = {};

	private valueAsIsoDate(value?: Iso8601 | Date | null, defaultValue?: Date): Iso8601 | null | undefined {
		const v: Iso8601 | Date | undefined = value ?? defaultValue;
		if (typeof v === 'string') {
			return v;
		}
		if (typeof v === 'object' && v instanceof Date) {
			switch (this._type) {
				case 'date':
					return `${v.getFullYear()}-${v.getMonth() + 1}-${v.getDate()}`;
				case 'datetime-local':
					return `${v.getFullYear()}-${v.getMonth() + 1}-${v.getDate()}T${v.getHours()}:${v.getMinutes()}:${v.getSeconds()}`;
				case 'month':
					return `${v.getFullYear()}-${v.getMonth() + 1}`;
				case 'time':
					// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#using_the_step_attribute
					if (this._step === undefined || (typeof this._step === 'string' && this._step === '60') || (typeof this._step === 'number' && this._step === 60)) {
						return `${v.getHours()}:${v.getMinutes()}`;
					} else {
						return `${v.getHours()}:${v.getMinutes()}:${v.getSeconds()}`;
					}
				case 'week':
					throw new Error('Auto convert to week is not supported!');
			}
		}
		if (value === null) {
			return null;
		}
		return undefined;
	}

	private validateDateString(value: Iso8601): boolean {
		switch (this._type) {
			case 'date':
				return KolInputDate.isoDateRegex.test(value);
			case 'datetime-local':
				return KolInputDate.isoLocalDateTimeRegex.test(value);
			case 'month':
				return KolInputDate.isoMonthRegex.test(value);
			case 'time':
				return KolInputDate.isoTimeRegex.test(value);
			case 'week':
				return KolInputDate.isoWeekRegex.test(value);
		}
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault) {
		setState(this, '_on', {
			...value,
			onChange: (e: Event, v: unknown) => {
				// set the value here when the value is switched between blank and set (or vice versa) to enable value resets via setting null as value.
				if (!!v !== !!this._value) {
					this._value = v as Iso8601;
				}

				if (value?.onChange) {
					value.onChange(e, v);
				}
			},
		});
	}

	@Watch('_max')
	public validateMax(value?: Iso8601 | Date): void {
		watchValidator(
			this,
			'_max',
			(value): boolean => value === undefined || (value !== null && this.validateDateString(value)),
			new Set(['Iso8601', 'Date']),
			this.valueAsIsoDate(value, this._type === 'date' || this._type === 'month' || this._type === 'datetime-local' ? KolInputDate.DEFAULT_MAX_DATE : undefined)
		);
	}

	@Watch('_min')
	public validateMin(value?: Iso8601 | Date): void {
		watchValidator(
			this,
			'_min',
			(value): boolean => value === undefined || (value !== null && this.validateDateString(value)),
			new Set(['Iso8601', 'Date']),
			this.valueAsIsoDate(value)
		);
	}

	@Watch('_value')
	public validateValue(value?: Iso8601 | Date | null): void {
		watchValidator(
			this,
			'_value',
			(value): boolean => value === undefined || value === null || this.validateDateString(value),
			new Set(['Iso8601', 'Date']),
			this.valueAsIsoDate(value)
		);
	}

	public componentWillLoad(): void {
		this.validateOn(this._on);
		this.validateMax(this._max);
		this.validateMin(this._min);
		this.validateValue(this._value);
	}
}
