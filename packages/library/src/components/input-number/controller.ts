import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import { InputNumberType } from '../../types/input/control/number';
import { Iso8601 } from '../../types/input/iso8601';
import { InputTypeOnOff } from '../../types/input/types';
import { watchBoolean, watchJsonArrayString, watchNumber, watchString, watchValidator } from '../../utils/prop.validators';
import { InputIconController } from '../@deprecated/input/controller-icon';
import { Props, Watches } from './types';

export class InputNumberController extends InputIconController implements Watches {
	/**
	 * Regex to check whether a string is a number or a date in ISO-8601 format.
	 * Test the regex here: https://regex101.com/r/ddGR4V/1
	 */
	private readonly numberOrIsoDateRegex =
		/^\d+$|(^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])([T ][0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?([+-][0-2]\d:[0-5]\d|Z)?)?$)|(^[0-2]\d:[0-5]\d(:[0-5]\d)?$)/;

	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateAutoComplete(value?: InputTypeOnOff): void {
		watchValidator(
			this.component,
			'_autoComplete',
			(value): boolean => typeof value === 'string' && (value === 'on' || value === 'off'),
			new Set(['on | off']),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateList(value?: Stringified<string[]>): void {
		watchJsonArrayString(this.component, '_list', (item: string) => typeof item === 'string', value);
	}

	private readonly parseToString = (value?: number | Date | string | null) => {
		if (typeof value === 'string') {
			return value;
		}
		if (typeof value === 'number') {
			return `${value}`;
		}
		if (typeof value === 'object' && value instanceof Date) {
			return value.toISOString();
		}
		return '';
	};

	private readonly validateIso8601 = (propName: string, value?: number | Iso8601 | null, afterPatch?: (v: string) => void) => {
		const parsedValue = parseFloat(value as string);
		const valueMatched = parsedValue == value;
		return watchValidator(
			this.component,
			propName,
			(value): boolean => value === undefined || value === '' || (valueMatched && typeof parsedValue === 'number') || this.numberOrIsoDateRegex.test(value),
			new Set(['number', 'Date', 'string{ISO-8601}']),
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
		this.component._value = (event.target as HTMLInputElement).value as number | Iso8601;
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateMax(value?: number | Iso8601): void {
		this.validateIso8601('_max', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateMin(value?: number | Iso8601): void {
		this.validateIso8601('_min', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validatePlaceholder(value?: string): void {
		watchString(this.component, '_placeholder', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateReadOnly(value?: boolean): void {
		watchBoolean(this.component, '_readOnly', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateStep(value?: number): void {
		watchNumber(this.component, '_step', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 * @deprecated
	 */
	public validateType(value?: InputNumberType): void {
		watchValidator(
			this.component,
			'_type',
			(value): boolean =>
				typeof value === 'string' &&
				(value === 'date' || value === 'datetime-local' || value === 'month' || value === 'number' || value === 'time' || value === 'week'),
			new Set(['String {date, datetime-local, month, number, time, week}']),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateValue(value?: number | Iso8601 | null): void {
		this.validateValueEx(value);
	}

	/**
	 * Overload of validate value. Extends by an after patch callback function.
	 */
	public validateValueEx(value?: number | Iso8601 | null, afterPatch?: (v: string) => void): void {
		this.validateIso8601('_value', value, afterPatch);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
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
