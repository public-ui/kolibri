import { Generic } from '@a11y-ui/core';

import { Stringified } from '../../types/common';
import { Optgroup, Option, SelectOption } from '../../types/input/types';
import { HideErrorPropType, validateHideError } from '../../types/props/hide-error';
import { OptionsWithOptgroupPropType, validateOptionsWithOptgroup } from '../../types/props/options';
import { RowsPropType, validateRows } from '../../types/props/rows';
import { W3CInputValue } from '../../types/w3c';
import { a11yHint } from '../../utils/a11y.tipps';
import { watchBoolean, watchJsonArrayString } from '../../utils/prop.validators';
import { STATE_CHANGE_EVENT } from '../../utils/validator';
import { InputIconController } from '../@deprecated/input/controller-icon';
import { fillKeyOptionMap } from '../input-radio/controller';
import { Props, Watches } from './types';

export class SelectController extends InputIconController implements Watches {
	protected readonly component: Generic.Element.Component & Props;
	private onStateChange!: () => void;
	private readonly keyOptionMap = new Map<string, Option<W3CInputValue>>();

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public readonly getOptionByKey = (key: string): Option<W3CInputValue> | undefined => this.keyOptionMap.get(key);

	private readonly isValueInOptions = (value: string, options: SelectOption<W3CInputValue>[]): boolean => {
		return (
			options.find((option) =>
				typeof (option as Option<W3CInputValue>).value === 'string'
					? (option as Option<W3CInputValue>).value === value
					: Array.isArray((option as Optgroup<string>).options)
					? this.isValueInOptions(value, (option as Optgroup<string>).options)
					: false
			) !== undefined
		);
	};

	private readonly filterValuesInOptions = (values: string[], options: SelectOption<W3CInputValue>[]): string[] => {
		return values.filter((value) => this.isValueInOptions(value, options) !== undefined);
	};

	private readonly beforePatchOptions = (_value: unknown, nextState: Map<string, unknown>): void => {
		const options = nextState.has('_options') ? nextState.get('_options') : this.component.state._options;
		if (Array.isArray(options) && options.length > 0) {
			this.keyOptionMap.clear();
			fillKeyOptionMap(this.keyOptionMap, options as SelectOption<W3CInputValue>[]);
			const value = nextState.has('_value') ? nextState.get('_value') : this.component.state._value;
			const selected = this.filterValuesInOptions(
				Array.isArray(value) && value.length > 0 ? (value as string[]) : [],
				options as SelectOption<W3CInputValue>[]
			);
			if (this.component._multiple === false && selected.length === 0) {
				nextState.set('_value', [
					(
						options[0] as {
							value: string;
						}
					).value,
				]);
				this.onStateChange();
			} else if (Array.isArray(value) && selected.length < value.length) {
				nextState.set('_value', selected);
				this.onStateChange();
			}
		}
	};

	public validateHideError(value?: HideErrorPropType): void {
		validateHideError(this.component, value, {
			hooks: {
				afterPatch: () => {
					if (this.component.state._hideError) {
						a11yHint('Property hide-error for inputs: Only use when the error message is shown outside of the input component.');
					}
				},
			},
		});
	}

	public validateOptions(value?: OptionsWithOptgroupPropType): void {
		validateOptionsWithOptgroup(this.component, value, {
			hooks: {
				beforePatch: this.beforePatchOptions,
			},
		});
	}

	public validateMultiple(value?: boolean): void {
		watchBoolean(this.component, '_multiple', value, {
			hooks: {
				beforePatch: this.beforePatchOptions,
			},
		});
		// if (value === true) {
		// 	devHint(
		// 		'[KolSelect] Aktuell wird die Mehrfachauswahl noch nicht unterstützt. Wir sind dran die Mehrfachauswahl funktionsfähig zu implementieren, da der Browser-Standard hier ein paar Lücken hat.'
		// 	);
		// 	devHint('[KolSelect] Bei der Mehrfachauswahl sollte zusätzlich auch die Listenlänge (size) gesetzt werden.');
		// }
	}

	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateRows(value?: RowsPropType) {
		validateRows(this.component, value);
	}

	public validateValue(value?: Stringified<W3CInputValue[]>): void {
		watchJsonArrayString(this.component, '_value', () => true, value, undefined, {
			hooks: {
				beforePatch: this.beforePatchOptions,
			},
		});
		this.setFormAssociatedValue(this.component._value as string);
	}

	public componentWillLoad(onChange?: (event: Event) => void): void {
		super.componentWillLoad();

		this.onStateChange = () => {
			if (typeof onChange === 'function') {
				const timeout = setTimeout(() => {
					clearTimeout(timeout);
					onChange(STATE_CHANGE_EVENT);
				});
			}
		};

		this.validateHideError(this.component._hideError);
		this.validateOptions(this.component._options);
		this.validateMultiple(this.component._multiple);
		this.validateRequired(this.component._required);
		this.validateRows(this.component._rows);
		this.validateValue(this.component._value);
	}
}
