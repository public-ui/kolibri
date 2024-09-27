import type {
	InputDateProps,
	InputDateType,
	InputDateWatches,
	InputTypeOnDefault,
	InputTypeOnOff,
	Iso8601,
	ReadOnlyPropType,
	SuggestionsPropType,
} from '../../schema';
import { inputDateTypeOptions, setState, validateReadOnly, validateSuggestions, watchBoolean, watchNumber, watchValidator } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class InputDateController extends InputIconController implements InputDateWatches {
	// test: https://regex101.com/r/NTVh4L/1
	private static readonly isoDateRegex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])/;
	private static readonly isoLocalDateTimeRegex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])[T ][0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/;
	private static readonly isoMonthRegex = /^\d{4}-([0]\d|1[0-2])/;
	private static readonly isoTimeRegex = /^[0-2]\d:[0-5]\d(:[0-5]\d(?:\.\d+)?)?/;
	private static readonly isoWeekRegex = /^\d{4}-W(?:[0-4]\d|5[0-3])$/;

	private static readonly DEFAULT_MAX_DATE = new Date(9999, 11, 31, 23, 59, 59);

	protected readonly component: Generic.Element.Component & InputDateProps;

	public constructor(component: Generic.Element.Component & InputDateProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAutoComplete(value?: InputTypeOnOff): void {
		watchValidator(
			this.component,
			'_autoComplete',
			(value): boolean => typeof value === 'string' && (value === 'on' || value === 'off'),
			new Set(['on | off']),
			value,
		);
	}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public static tryParseToString(value: Iso8601 | Date | null | undefined, type?: InputDateType, step?: string | number): string | null | undefined {
		if (typeof value === 'string' || value === null) {
			return value;
		}

		if (typeof value === 'object' && value instanceof Date) {
			const formattedYear = value.getFullYear();
			const formattedMonth = String(value.getMonth() + 1).padStart(2, '0');
			const formattedDay = String(value.getDate()).padStart(2, '0');
			const formattedHours = String(value.getHours()).padStart(2, '0');
			const formattedMinutes = String(value.getMinutes()).padStart(2, '0');
			const formattedSeconds = String(value.getSeconds()).padStart(2, '0');

			const formattedDate = [formattedYear, formattedMonth, formattedDay].join('-');
			const formattedTimeWithSeconds = [formattedHours, formattedMinutes, formattedSeconds].join(':');

			switch (type) {
				case 'date':
					return formattedDate;
				case 'datetime-local':
					return `${formattedDate}T${formattedTimeWithSeconds}`;
				case 'month':
					return `${formattedYear}-${formattedMonth}`;
				case 'time':
					// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/time#using_the_step_attribute
					if (step === undefined || String(step) === '60') {
						return `${formattedHours}:${formattedMinutes}`;
					} else {
						return formattedTimeWithSeconds;
					}
				case 'week':
					const weekNumber = this.getWeekNumberOfDate(value);
					return `${formattedYear}-W${weekNumber}`;
			}
		}
	}

	static getWeekNumberOfDate(date: Date): string {
		const yearStart = new Date(date.getFullYear(), 0, 1);
		const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		const dayOfYear = (+today - +yearStart + 8400000) / 86400000;
		return Math.ceil(dayOfYear / 7)
			.toString()
			.padStart(2, '0');
	}

	private validateDateString(value: string): boolean {
		switch (this.component._type) {
			case 'date':
				return InputDateController.isoDateRegex.test(value);
			case 'datetime-local':
				return InputDateController.isoLocalDateTimeRegex.test(value);
			case 'month':
				return InputDateController.isoMonthRegex.test(value);
			case 'time':
				return InputDateController.isoTimeRegex.test(value);
			case 'week':
				return InputDateController.isoWeekRegex.test(value);
			default:
				return false;
		}
	}

	private readonly validateIso8601 = (propName: string, value?: Date | Iso8601 | null, afterPatch?: (v: string) => void) => {
		return watchValidator(
			this.component,
			propName,
			(value): boolean => value === undefined || value == null || value === '' || this.validateDateString(value),
			new Set(['Date', 'string{ISO-8601}']),
			InputDateController.tryParseToString(value, this.component._type, this.component._step),
			{
				hooks: {
					afterPatch: (value) => {
						if (typeof value === 'string' && afterPatch) {
							afterPatch(value);
						}
					},
				},
			},
		);
	};

	protected onBlur(event: Event): void {
		super.onBlur(event);

		// set the value here when the value is switched between blank and set (or vice versa) to enable value resets via setting null as value.
		if (!!(event.target as HTMLInputElement).value !== !!this.component._value) {
			this.component._value = (event.target as HTMLInputElement).value as Iso8601;
		}
	}

	public validateMax(value?: Iso8601 | Date): void {
		const ensuredValue =
			(value === undefined || value === null) &&
			(this.component._type === 'date' || this.component._type === 'month' || this.component._type === 'datetime-local')
				? InputDateController.DEFAULT_MAX_DATE
				: value;

		this.validateIso8601('_max', ensuredValue);
	}

	public validateMin(value?: Iso8601 | Date): void {
		this.validateIso8601('_min', value);
	}

	public validateOn(value?: InputTypeOnDefault) {
		setState(this.component, '_on', {
			...value,
			onChange: (e: Event, v: unknown) => {
				// set the value here when the value is switched between blank and set (or vice versa) to enable value resets via setting null as value.
				if (!!v !== !!this.component._value) {
					this.component._value = v as Iso8601;
				}

				if (value?.onChange) {
					value.onChange(e, v);
				}
			},
		});
	}

	public validateReadOnly(value?: ReadOnlyPropType): void {
		validateReadOnly(this.component, value);
	}

	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateStep(value?: number): void {
		watchNumber(this.component, '_step', value);
	}

	public validateType(value?: InputDateType): void {
		watchValidator(
			this.component,
			'_type',
			(value): boolean => typeof value === 'string' && inputDateTypeOptions.includes(value),
			new Set([`String {${inputDateTypeOptions.join(', ')}`]),
			value,
		);
	}

	public validateValue(value?: Iso8601 | Date | null): void {
		this.validateValueEx(value);
	}

	/**
	 * Overload of validate value. Extends by an after patch callback function.
	 */
	public validateValueEx(value?: Iso8601 | Date | null, afterPatch?: (v: string) => void): void {
		this.validateIso8601('_value', value, afterPatch);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateMax(this.component._max);
		this.validateMin(this.component._min);
		this.validateLabel(this.component._label);
		this.validateSuggestions(this.component._suggestions);
		this.validateOn(this.component._on);
		this.validateReadOnly(this.component._readOnly);
		this.validateRequired(this.component._required);
		this.validateStep(this.component._step);
		this.validateType(this.component._type);
		this.validateValue(this.component._value);
	}
}
