import type { Generic } from 'adopted-style-sheets';
import type {
	InputRadioWatches,
	Optgroup,
	Option,
	OptionsPropType,
	Orientation,
	PropLabelWithExpertSlot,
	SelectOption,
	StencilUnknown,
	Stringified,
	W3CInputValue,
} from '@public-ui/schema';
import { mapString2Unknown, orientationOptions, setState, STATE_CHANGE_EVENT, validateOptions, validateRequired, watchValidator } from '@public-ui/schema';

import { InputController } from '../@deprecated/input/controller';
import type { KolInputRadio } from './component';

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
type InputCheckboxRadioWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export class InputCheckboxRadioController extends InputController implements InputCheckboxRadioWatches {
	protected readonly component: KolInputRadio;

	public constructor(component: KolInputRadio, name: string, host?: HTMLElement) {
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

export class InputRadioController extends InputCheckboxRadioController implements InputRadioWatches {
	protected readonly component: KolInputRadio;
	private onStateChange!: () => void;
	private readonly keyOptionMap = new Map<string, Option<W3CInputValue>>();

	public constructor(component: KolInputRadio, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public readonly getOptionByKey = (key: string): Option<W3CInputValue> | undefined => this.keyOptionMap.get(key);

	private readonly isValueInOptions = (value: W3CInputValue | undefined, options: Option<W3CInputValue>[]): boolean => {
		if (value === undefined) {
			return false;
		}
		return options.map((option) => option.value).includes(value) !== undefined;
	};

	protected readonly beforePatchOptions: Generic.Element.NextStateHooksCallback = (_value: unknown, nextState: Map<string, unknown>): void => {
		const options = nextState.has('_options') ? nextState.get('_options') : this.component.state._options;

		if (Array.isArray(options) && options.length > 0) {
			this.keyOptionMap.clear();
			fillKeyOptionMap(this.keyOptionMap, options as SelectOption<W3CInputValue>[]);

			const value = nextState.has('_value') ? nextState.get('_value') : this.component.state._value;

			if (!this.isValueInOptions(value as W3CInputValue, options as Option<W3CInputValue>[])) {
				const newValue = (
					options[0] as {
						value: string;
					}
				).value;

				nextState.set('_value', String(newValue));
			} else {
				nextState.set('_value', String(value));
			}
			this.onStateChange();
		}
	};

	public validateOrientation(value?: Orientation): void {
		watchValidator(
			this.component,
			'_orientation',
			(value): boolean => typeof value === 'string' && orientationOptions.includes(value),
			new Set([`Orientation {${orientationOptions.join(', ')}`]),
			value,
			{
				defaultValue: 'vertical',
			}
		);
	}

	public validateOptions(value?: OptionsPropType): void {
		validateOptions(this.component, value, {
			hooks: {
				beforePatch: this.beforePatchOptions,
			},
		});
	}

	public validateValue(value?: Stringified<StencilUnknown>): void {
		value = mapString2Unknown(value);
		value = Array.isArray(value) ? (value[0] as StencilUnknown) : value;
		setState(this.component, '_value', value, {
			beforePatch: this.beforePatchOptions,
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

		this.validateOrientation(this.component._orientation);
		this.validateOptions(this.component._options);
		this.validateValue(this.component._value);
	}
}
