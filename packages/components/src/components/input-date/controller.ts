import type {
	AutoCompletePropType,
	InputDateProps,
	InputDateWatches,
	InputTypeOnDefault,
	Iso8601,
	NumberString,
	ReadOnlyPropType,
	RequiredPropType,
	SuggestionsPropType,
} from '../../schema';
import { setState, validateReadOnly, validateRequired, validateSuggestions, watchValidator } from '../../schema';
import { validateAutoComplete } from '../../schema/props/auto-complete';
import { type InputDateTypePropType, validateTypeInputDate } from '../../schema/props/type-input-date';

import { formatIsoDate, getIsoWeekNumber, isIsoDateString } from '../../internal/props/helpers/iso-date';
import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';

export class InputDateController extends InputIconController implements InputDateWatches {
	protected readonly component: Generic.Element.Component & InputDateProps;

	public constructor(component: Generic.Element.Component & InputDateProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAutoComplete(value?: AutoCompletePropType): void {
		validateAutoComplete(this.component, value);
	}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public static tryParseToString(value: Iso8601 | Date | null | undefined, type?: InputDateTypePropType, step?: string | number): string | null | undefined {
		return formatIsoDate(value, type, step);
	}

	static getWeekNumberOfDate(date: Date): string {
		return getIsoWeekNumber(date);
	}

	private validateDateString(value: string): boolean {
		return isIsoDateString(value, this.component._type);
	}

	private readonly validateIso8601 = (propName: string, value?: Date | Iso8601 | null, afterPatch?: (v: string) => void) => {
		return watchValidator(
			this.component,
			propName,
			(value): boolean => value === undefined || value === null || value === '' || this.validateDateString(value),
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

	protected onBlur(event: FocusEvent): void {
		super.onBlur(event);

		// set the value here when the value is switched between blank and set (or vice versa) to enable value resets via setting null as value.
		if (!!(event.target as HTMLInputElement).value !== !!this.component._value) {
			this.component._value = (event.target as HTMLInputElement).value as Iso8601;
		}
	}

	public validateMax(value?: Iso8601 | Date): void {
		this.validateIso8601('_max', value);
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

	public validateRequired(value?: RequiredPropType): void {
		validateRequired(this.component, value);
	}

	public validateStep(value?: number | NumberString): void {
		this.validateNumber('_step', value);
	}

	public validateType(value?: InputDateTypePropType): void {
		validateTypeInputDate(this.component, value);
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
