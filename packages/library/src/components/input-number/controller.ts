import { Generic } from '@public-ui/core';
import { Stringified } from '../../types/common';
import { InputNumberType } from '../../types/input/control/number';
import { InputTypeOnOff } from '../../types/input/types';
import { devHint } from '../../utils/a11y.tipps';
import { watchBoolean, watchJsonArrayString, watchNumber, watchString, watchValidator } from '../../utils/prop.validators';
import { InputController } from '../@deprecated/input/controller';
import { Props, Watches } from './types';

export class InputNumberController extends InputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string) {
		super(component, name);
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateMax(value?: number): void {
		watchNumber(this.component, '_max', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateMin(value?: number): void {
		watchNumber(this.component, '_min', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validatePlaceholder(value?: string): void {
		watchString(this.component, '_placeholder', value);
		devHint(`[KolInputNumber] Für Zahlenwert-bezogene Eingabefelder ist laut W3C-Standard "eigentlich" kein Placeholder-Attribute vorgesehen.`);
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
	public validateValue(value?: string | null): void {
		if (value === null) {
			this.component.state._value = null;
		} else {
			watchString(this.component, '_value', value, {
				minLength: 0,
			});
		}
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
