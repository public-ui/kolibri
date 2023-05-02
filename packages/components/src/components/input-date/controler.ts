import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import { InputDateType } from '../../types/input/control/number';
import { Iso8601 } from '../../types/input/iso8601';
import { InputTypeOnOff } from '../../types/input/types';
import { watchBoolean, watchJsonArrayString, watchNumber, watchString, watchValidator } from '../../utils/prop.validators';
import { InputIconController } from '../@deprecated/input/controller-icon';
import { Props, Watches } from './types';

export class InputDateController extends InputIconController implements Watches {
	private readonly DEFAULT_MAX_DATE = new Date(9999, 11, 31, 23, 59, 59);

	/**
	 * Regex to check whether a string is a date in ISO-8601 format.
	 * Test the regex here: https://regex101.com/r/ys3ij0/1
	 */
	private readonly isoDateRegex =
		/(^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])([T ][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?([+-][0-2]\d:[0-5]\d|Z)?)?$)|(^[0-2]\d:[0-5]\d(:[0-5]\d)?$)/;
	private readonly isoLocalDateTimeRegex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])[T ][0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/;
	private readonly isoMonthRegex = /^\d{4}-([0]\d|1[0-2])/;
	private readonly isoTimeRegex = /^[0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/;
	private readonly isoWeekRegex = /^\d{4}-W(?:[0-4]\d|5[0-3])$/;

	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAutoComplete(value?: InputTypeOnOff): void {
		watchValidator(
			this.component,
			'_autoComplete',
			(value): boolean => typeof value === 'string' && (value === 'on' || value === 'off'),
			new Set(['on | off']),
			value
		);
	}

	public validateList(value?: Stringified<string[]>): void {
		watchJsonArrayString(this.component, '_list', (item: string) => typeof item === 'string', value);
	}

	private readonly parseToString = (value?: Date | string | null) => {
		if (typeof value === 'string') {
			return value;
		}
		if (typeof value === 'object' && value instanceof Date) {
			return this.valueAsIsoDate(value);
		}
		return '';
	};

	private valueAsIsoDate(value?: Iso8601 | Date | null, defaultValue?: Date): Iso8601 | null | undefined {
		const v: Iso8601 | Date | undefined = value ?? defaultValue;
		if (typeof v === 'string') {
			return v;
		}
		if (typeof v === 'object' && v instanceof Date) {
			const type = this.component._type;
			switch (type) {
				case 'date':
					return `${v.getFullYear()}-${v.getMonth() + 1}-${v.getDate()}`;
				case 'datetime-local':
					return `${v.getFullYear()}-${v.getMonth() + 1}-${v.getDate()}T${v.getHours()}:${v.getMinutes()}:${v.getSeconds()}`;
				case 'month':
					return `${v.getFullYear()}-${v.getMonth() + 1}`;
				case 'time':
					// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#using_the_step_attribute
					if (
						this.component._step === undefined ||
						(typeof this.component._step === 'string' && this.component._step === '60') ||
						(typeof this.component._step === 'number' && this.component._step === 60)
					) {
						return `${v.getHours()}:${v.getMinutes()}`;
					} else {
						return `${v.getHours()}:${v.getMinutes()}:${v.getSeconds()}`;
					}
				case 'week':
					throw new Error('Auto convert to week is not supported!');
				default:
					throw new Error(`No supported type set: ${typeof this.component._type}`);
			}
		}
		if (value === null) {
			return null;
		}
		return undefined;
	}

	private readonly validateIso8601 = (propName: string, value?: Date | Iso8601 | null, afterPatch?: (v: string) => void) => {
		return watchValidator(
			this.component,
			propName,
			(value): boolean => value === undefined || value === '' || (typeof value === 'string' && this.isoDateRegex.test(value)),
			new Set(['Date', 'string{ISO-8601}']),
			this.parseToString(value),
			{
				hooks: {
					afterPatch: (value) => {
						if (typeof value === 'string' && afterPatch) {
							afterPatch(value);
						}
					},
				},
			}
		);
	};

	protected onChange(event: Event): void {
		super.onChange(event);

		// set the value here when the value is switched between blank and set (or vice versa) to enable value resets via setting null as value.
		if (!!(event.target as HTMLInputElement).value !== !!this.component._value) {
			this.component._value = (event.target as HTMLInputElement).value as Iso8601;
		}
	}

	private validateDateString(value: Iso8601): boolean {
		switch (this.component._type) {
			case 'date':
				return this.isoDateRegex.test(value);
			case 'datetime-local':
				return this.isoLocalDateTimeRegex.test(value);
			case 'month':
				return this.isoMonthRegex.test(value);
			case 'time':
				return this.isoTimeRegex.test(value);
			case 'week':
				return this.isoWeekRegex.test(value);
			default:
				throw new Error('_type is not correct');
		}
	}

	public validateMax(value?: Date | Iso8601): void {
		watchValidator(
			this.component,
			'_max',
			(value): boolean => value === undefined || (value !== null && this.validateDateString(value)),
			new Set(['Iso8601', 'Date']),
			this.valueAsIsoDate(value, this.component._type === 'date' || this.component._type === 'month' || this.component._type === 'datetime-local' ? this.DEFAULT_MAX_DATE : undefined)
		);
	}

	public validateMin(value?: Date | Iso8601): void {
		watchValidator(
			this.component,
			'_min',
			(value): boolean => value === undefined || (value !== null && this.validateDateString(value)),
			new Set(['Iso8601', 'Date']),
			this.valueAsIsoDate(value)
		);
	}

	public validatePlaceholder(value?: string): void {
		watchString(this.component, '_placeholder', value);
	}

	public validateReadOnly(value?: boolean): void {
		watchBoolean(this.component, '_readOnly', value);
	}

	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateStep(value?: number): void {
		watchNumber(this.component, '_step', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 * @deprecated
	 */
	public validateType(value?: InputDateType): void {
		watchValidator(
			this.component,
			'_type',
			(value): boolean =>
				typeof value === 'string' && (value === 'date' || value === 'datetime-local' || value === 'month' || value === 'time' || value === 'week'),
			new Set(['String {date, datetime-local, month, time, week}']),
			value
		);
	}

	public validateValue(value?: Date | Iso8601 | null): void {
		watchValidator(
			this.component,
			'_value',
			(value): boolean => value === undefined || value === null || this.validateDateString(value),
			new Set(['Iso8601', 'Date']),
			this.valueAsIsoDate(value)
		);
	}

	/**
	 * Overload of validate value. Extends by an after patch callback function.
	 */
	public validateValueEx(value?: Date | Iso8601 | null, afterPatch?: (v: string) => void): void {
		this.validateIso8601('_value', value, afterPatch);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateMax(this.component._max);
		this.validateMin(this.component._min);
		this.validateList(this.component._list);
		this.validateReadOnly(this.component._readOnly);
		this.validateRequired(this.component._required);
		this.validateStep(this.component._step);
		this.validateType(this.component._type);
		this.validateValue(this.component._value);
	}
}
