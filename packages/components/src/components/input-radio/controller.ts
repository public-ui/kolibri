import type { Generic } from 'adopted-style-sheets';

import { Stringified } from '../../types/common';
import { Optgroup, Option, SelectOption } from '../../types/input/types';
import { Orientation } from '../../types/orientation';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { OptionsPropType, validateOptions } from '../../types/props/options';
import { validateRequired } from '../../types/props/required';
import { StencilUnknown } from '../../types/unknown';
import { W3CInputValue } from '../../types/w3c';
import { mapString2Unknown, setState, watchValidator } from '../../utils/prop.validators';
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

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	required: boolean;
} & PropLabelWithExpertSlot;
type InputCheckboxRadioProps = Generic.Element.Members<RequiredProps, OptionalProps>;
type InputCheckboxRadioWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export class InputCheckboxRadioController extends InputController implements InputCheckboxRadioWatches {
	protected readonly component: Generic.Element.Component & InputCheckboxRadioProps;

	public constructor(component: Generic.Element.Component & InputCheckboxRadioProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateRequired(value?: boolean): void {
		validateRequired(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateRequired(this.component._required);
	}
}

export class InputRadioController extends InputCheckboxRadioController implements Watches {
	protected readonly component: Generic.Element.Component & Props;
	private onStateChange!: () => void;
	private readonly keyOptionMap = new Map<string, Option<W3CInputValue>>();

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public readonly getOptionByKey = (key: string): Option<W3CInputValue> | undefined => this.keyOptionMap.get(key);

	private readonly isValueInOptions = (value: unknown, options: Option<W3CInputValue>[]): boolean => {
		return options.find((option) => option.value === value) !== undefined;
	};

	protected readonly afterPatchOptions = (value: unknown, _state: Record<string, unknown>, _component: Generic.Element.Component, key: string): void => {
		if (key === '_value') {
			this.setFormAssociatedValue(value as string);
		}
	};

	protected readonly beforePatchOptions = (_value: unknown, nextState: Map<string, unknown>): void => {
		const options = nextState.has('_options') ? nextState.get('_options') : this.component.state._options;
		if (Array.isArray(options) && options.length > 0) {
			this.keyOptionMap.clear();
			fillKeyOptionMap(this.keyOptionMap, options as SelectOption<W3CInputValue>[]);
			const value = nextState.has('_value') ? nextState.get('_value') : this.component.state._value;
			if (this.isValueInOptions(value, options as Option<W3CInputValue>[]) === false) {
				nextState.set(
					'_value',
					(
						options[0] as {
							value: string;
						}
					).value
				);
				this.onStateChange();
			}
		}
	};

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

	public validateOptions(value?: OptionsPropType): void {
		validateOptions(this.component, value, {
			hooks: {
				afterPatch: this.afterPatchOptions,
				beforePatch: this.beforePatchOptions,
			},
		});
	}

	public validateValue(value?: Stringified<StencilUnknown>): void {
		value = mapString2Unknown(value);
		value = Array.isArray(value) ? (value[0] as StencilUnknown) : value;
		setState(this.component, '_value', value, {
			afterPatch: this.afterPatchOptions,
			beforePatch: this.beforePatchOptions,
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

		this.validateOrientation(this.component._orientation);
		this.validateOptions(this.component._options || this.component._list);
		this.validateValue(this.component._value);
	}
}
