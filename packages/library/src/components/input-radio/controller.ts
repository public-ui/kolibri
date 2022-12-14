import { Generic } from '@public-ui/core';
import { Stringified } from '../../types/common';
import { Optgroup, Option, SelectOption } from '../../types/input/types';
import { Orientation } from '../../types/orientation';
import { mapString2Unknown, setState, watchBoolean, watchJsonArrayString, watchValidator } from '../../utils/prop.validators';
import { STATE_CHANGE_EVENT } from '../../utils/validator';
import { InputController } from '../@deprecated/input/controller';
import { Props, Watches } from './types';

export const fillKeyOptionMap = <T>(keyOptionMap: Map<string, Option<T>>, options: SelectOption<T>[], preKey = ''): void => {
	options.forEach((option, index) => {
		const key = `${preKey}-${index}`;
		if (typeof option === 'object' && option !== null && typeof option.label === 'string' && option.label.length > 0) {
			if (Array.isArray((option as Optgroup<T>).options)) {
				fillKeyOptionMap(keyOptionMap, (option as Optgroup<T>).options, key);
			} else {
				keyOptionMap.set(key, option as Option<T>);
			}
		}
	});
};

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = {
	required: boolean;
};
type InputCheckboxRadioProps = Generic.Element.Members<RequiredProps, OptionalProps>;
type InputCheckboxRadioWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export class InputCheckboxRadioController extends InputController implements InputCheckboxRadioWatches {
	protected readonly component: Generic.Element.Component & InputCheckboxRadioProps;

	public constructor(component: Generic.Element.Component & InputCheckboxRadioProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateRequired(this.component._required);
	}
}

export class InputRadioController extends InputCheckboxRadioController implements Watches {
	protected readonly component: Generic.Element.Component & Props;
	private onStateChange!: () => void;
	private readonly keyOptionMap = new Map<string, Option<unknown>>();

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public readonly getOptionByKey = (key: string): Option<unknown> | undefined => this.keyOptionMap.get(key);

	private readonly isValueInOptions = (value: unknown, options: Option<unknown>[]): boolean => {
		return options.find((option) => option.value === value) !== undefined;
	};

	protected readonly beforePatchListValue = (_value: unknown, nextState: Map<string, unknown>): void => {
		const list = nextState.has('_list') ? nextState.get('_list') : this.component.state._list;
		if (Array.isArray(list) && list.length > 0) {
			this.keyOptionMap.clear();
			fillKeyOptionMap(this.keyOptionMap, list as SelectOption<unknown>[]);
			const value = nextState.has('_value') ? nextState.get('_value') : this.component.state._value;
			if (this.isValueInOptions(value, list as Option<unknown>[]) === false) {
				const newValue = (
					list[0] as {
						value: string;
					}
				).value;
				nextState.set('_value', newValue);
				this.onStateChange();
			}
		}
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateOrientation(value?: Orientation): void {
		watchValidator(
			this.component,
			'_orientation',
			(value): boolean => value === 'horizontal' || value === 'vertical',
			new Set(['Orientation {horizontal, vertical}']),
			value,
			{
				defaultValue: 'vertical',
			}
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateList(value?: Stringified<Option<unknown>[]>): void {
		watchJsonArrayString(
			this.component,
			'_list',
			(item: Option<unknown>) => typeof item === 'object' && item !== null && typeof item.label === 'string' && item.label.length > 0,
			value,
			undefined,
			{
				hooks: {
					beforePatch: this.beforePatchListValue,
				},
			}
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateValue(value?: Stringified<unknown>): void {
		value = mapString2Unknown(value);
		value = Array.isArray(value) ? value[0] : value;
		setState(this.component, '_value', value, {
			beforePatch: this.beforePatchListValue,
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

		this.validateOrientation(this.component._orientation);
		this.validateList(this.component._list);
		this.validateValue(this.component._value);
	}
}
