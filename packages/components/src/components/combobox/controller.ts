import type {
	ComboboxWatches,
	OptionsWithOptgroupPropType,
	RowsPropType,
	ComboboxOption,
	SelectProps,
	Stringified,
	W3CInputValue,
	Option,
} from '@public-ui/schema';
import { STATE_CHANGE_EVENT, validateOptionsWithOptgroup, validateRows, watchBoolean, watchJsonArrayString } from '@public-ui/schema';

import { InputIconController } from '../@deprecated/input/controller-icon';
import { fillKeyOptionMap } from '../input-radio/controller';

import type { Generic } from 'adopted-style-sheets';
export class ComboboxController extends InputIconController implements ComboboxWatches {
	protected readonly component: Generic.Element.Component & SelectProps;
	private onStateChange!: () => void;
	private readonly keyOptionMap = new Map<string, Option<W3CInputValue>>();

	public constructor(component: Generic.Element.Component & SelectProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public readonly getOptionByKey = (key: string): Option<W3CInputValue> | undefined => this.keyOptionMap.get(key);

	private readonly isValueInOptions = (value: string, options: ComboboxOption<W3CInputValue>[]): boolean => {
		return options.find((option) => (typeof option.value === 'string' ? option.value === value : false)) !== undefined;
	};

	private readonly filterValuesInOptions = (values: string[], options: ComboboxOption<W3CInputValue>[]): string[] => {
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
			fillKeyOptionMap(this.keyOptionMap, options as ComboboxOption<W3CInputValue>[]);
			const value = nextState.has('_value') ? nextState.get('_value') : this.component.state._value;
			const selected = this.filterValuesInOptions(
				Array.isArray(value) && value.length > 0 ? (value as string[]) : [],
				options as ComboboxOption<W3CInputValue>[],
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

	public validateOptions(value?: OptionsWithOptgroupPropType): void {
		validateOptionsWithOptgroup(this.component, value, {
			hooks: {
				afterPatch: this.afterPatchOptions,
				beforePatch: this.beforePatchOptions,
			},
		});
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

		this.validateOptions(this.component._options);
		this.validateRequired(this.component._required);
		this.validateRows(this.component._rows);
		this.validateValue(this.component._value);
	}
}
