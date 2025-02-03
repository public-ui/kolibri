import type {
	Optgroup,
	Option,
	OptionsWithOptgroupPropType,
	RowsPropType,
	SelectOption,
	SelectProps,
	SelectWatches,
	Stringified,
	W3CInputValue,
} from '../../schema';
import { validateOptionsWithOptgroup, validateRows, watchBoolean, watchJsonArrayString } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';
import { fillKeyOptionMap } from '../input-radio/controller';

import type { Generic } from 'adopted-style-sheets';
export class SelectController extends InputIconController implements SelectWatches {
	protected readonly component: Generic.Element.Component & SelectProps;
	private readonly keyOptionMap = new Map<string, Option<W3CInputValue>>();

	public constructor(component: Generic.Element.Component & SelectProps, name: string, host?: HTMLElement) {
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
						: false,
			) !== undefined
		);
	};

	private readonly filterValuesInOptions = (values: string[], options: SelectOption<W3CInputValue>[]): string[] => {
		return values.filter((value) => this.isValueInOptions(value, options) !== undefined);
	};

	protected readonly afterPatchOptions = (value: unknown, _state: Record<string, unknown>, _component: Generic.Element.Component, key: string): void => {
		if (key === '_value') {
			this.setFormAssociatedValue(value as string);
		}
	};

	private readonly beforePatchOptions = (_value: unknown, nextState: Map<string, unknown>): void => {
		const options = nextState.has('_options') ? nextState.get('_options') : this.component.state._options;
		if (Array.isArray(options) && options.length > 0) {
			this.keyOptionMap.clear();
			fillKeyOptionMap(this.keyOptionMap, options as SelectOption<W3CInputValue>[]);
			const value = nextState.has('_value') ? nextState.get('_value') : this.component.state._value;
			const selected = this.filterValuesInOptions(
				Array.isArray(value) && value.length > 0 ? (value as string[]) : [],
				options as SelectOption<W3CInputValue>[],
			);
			if (this.component._multiple === false && selected.length === 0) {
				nextState.set('_value', [
					(
						options[0] as {
							value: string;
						}
					).value,
				]);
			} else if (Array.isArray(value) && selected.length < value.length) {
				nextState.set('_value', selected);
			}
		}
	};

	public validateOptions(value?: OptionsWithOptgroupPropType): void {
		validateOptionsWithOptgroup(this.component, value, {
			hooks: {
				afterPatch: this.afterPatchOptions,
				beforePatch: this.beforePatchOptions,
			},
		});
	}

	public validateMultiple(value?: boolean): void {
		watchBoolean(this.component, '_multiple', value, {
			hooks: {
				afterPatch: this.afterPatchOptions,
				beforePatch: this.beforePatchOptions,
			},
		});
		// if (value === true) {
		// 	devHint(
		// 		'[KolSelect] Currently, multiple selection is not yet supported. We are working on implementing it to be functional, as there are some gaps in the browser standard.'
		// 	);
		// 	devHint('[KolSelect] For multiple selections, the list length (size) should also be set.');
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
				afterPatch: this.afterPatchOptions,
				beforePatch: this.beforePatchOptions,
			},
		});
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateOptions(this.component._options);
		this.validateMultiple(this.component._multiple);
		this.validateRequired(this.component._required);
		this.validateRows(this.component._rows);
		this.validateValue(this.component._value);
	}
}
