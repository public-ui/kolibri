import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import { Optgroup, Option, SelectOption } from '../../types/input/types';
import { W3CInputValue } from '../../types/w3c';
import { watchBoolean, watchJsonArrayString, watchNumber, watchString } from '../../utils/prop.validators';
import { STATE_CHANGE_EVENT } from '../../utils/validator';
import { InputIconController } from '../@deprecated/input/controller-icon';
import { fillKeyOptionMap } from '../input-radio/controller';
import { Props, Watches } from './types';

const validateInputSelectList = <T>(option: SelectOption<T>): boolean => {
	if (typeof option === 'object' && option !== null && typeof option.label === 'string' && option.label.length > 0) {
		if (Array.isArray((option as Optgroup<T>).options)) {
			return (
				(option as Optgroup<T>).options.find((item) => {
					return validateInputSelectList(item) === false;
				}) === undefined
			);
		}
		return true;
	}
	return false;
};

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

	private readonly beforePatchListValue = (_value: unknown, nextState: Map<string, unknown>): void => {
		const list = nextState.has('_list') ? nextState.get('_list') : this.component.state._list;
		if (Array.isArray(list) && list.length > 0) {
			this.keyOptionMap.clear();
			fillKeyOptionMap(this.keyOptionMap, list as SelectOption<W3CInputValue>[]);
			const value = nextState.has('_value') ? nextState.get('_value') : this.component.state._value;
			const selected = this.filterValuesInOptions(Array.isArray(value) && value.length > 0 ? (value as string[]) : [], list as SelectOption<W3CInputValue>[]);
			if (this.component._multiple === false && selected.length === 0) {
				nextState.set('_value', [
					(
						list[0] as {
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

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 * @deprecated Use _size instead.
	 */
	public validateHeight(value?: string): void {
		watchString(this.component, '_height', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateList<T>(value?: SelectOption<T>[] | string): void {
		watchJsonArrayString(this.component, '_list', validateInputSelectList, value, undefined, {
			hooks: {
				beforePatch: this.beforePatchListValue,
			},
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateMultiple(value?: boolean): void {
		watchBoolean(this.component, '_multiple', value, {
			hooks: {
				beforePatch: this.beforePatchListValue,
			},
		});
		// if (value === true) {
		// 	devHint(
		// 		'[KolSelect] Aktuell wird die Mehrfachauswahl noch nicht unterstützt. Wir sind dran die Mehrfachauswahl funktionsfähig zu implementieren, da der Browser-Standard hier ein paar Lücken hat.'
		// 	);
		// 	devHint('[KolSelect] Bei der Mehrfachauswahl sollte zusätzlich auch die Listenlänge (size) gesetzt werden.');
		// }
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
	public validateSize(value?: number): void {
		watchNumber(this.component, '_size', value, {
			min: 1,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateValue(value?: Stringified<W3CInputValue[]>): void {
		watchJsonArrayString(this.component, '_value', () => true, value, undefined, {
			hooks: {
				beforePatch: this.beforePatchListValue,
			},
		});
		this.setFormAssociatedValue(this.component._value as string);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
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

		this.validateHeight(this.component._height);
		this.validateList(this.component._list);
		this.validateMultiple(this.component._multiple);
		this.validateRequired(this.component._required);
		this.validateSize(this.component._size);
		this.validateValue(this.component._value);
	}
}
