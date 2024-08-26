import type { Generic } from 'adopted-style-sheets';

import type {
	InputRadioProps,
	InputRadioWatches,
	Optgroup,
	RadioOption,
	OptionsPropType,
	Orientation,
	PropLabelWithExpertSlot,
	SelectOption,
	StencilUnknown,
	Stringified,
	W3CInputValue,
} from '../../schema';
import { mapString2Unknown, orientationOptions, setState, validateOptions, validateRequired, watchValidator } from '../../schema';

import { InputController } from '../@deprecated/input/controller';

export const fillKeyOptionMap = <T>(keyOptionMap: Map<string, RadioOption<T>>, options: SelectOption<T>[], preKey = ''): void => {
	options.forEach((option, index) => {
		const key = `${preKey}-${index}`;
		if (typeof option === 'object' && option !== null && typeof option.label === 'string' && option.label.length > 0) {
			if (Array.isArray((option as Optgroup<T>).options)) {
				fillKeyOptionMap(keyOptionMap, (option as Optgroup<T>).options, key);
			} else {
				keyOptionMap.set(key, option as RadioOption<T>);
			}
		}
	});
};

type RequiredProps = PropLabelWithExpertSlot;
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

	public validateRequired(value?: boolean): void {
		validateRequired(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateRequired(this.component._required);
	}
}

export class InputRadioController extends InputCheckboxRadioController implements InputRadioWatches {
	protected readonly component: Generic.Element.Component & InputRadioProps;
	private readonly keyOptionMap = new Map<string, RadioOption<W3CInputValue>>();

	public constructor(component: Generic.Element.Component & InputRadioProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public readonly getOptionByKey = (key: string): RadioOption<W3CInputValue> | undefined => this.keyOptionMap.get(key);

	protected readonly afterPatchOptions = (value: unknown, _state: Record<string, unknown>, _component: Generic.Element.Component, key: string): void => {
		if (key === '_value') {
			this.setFormAssociatedValue(value as string);
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
			},
		);
	}

	protected readonly beforePatchOptions = (_value: unknown, nextState: Map<string, unknown>): void => {
		const options = nextState.has('_options') ? nextState.get('_options') : this.component.state._options;
		if (Array.isArray(options) && options.length > 0) {
			this.keyOptionMap.clear();
			fillKeyOptionMap(this.keyOptionMap, options as SelectOption<W3CInputValue>[]);
		}
	};

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

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateOrientation(this.component._orientation);
		this.validateOptions(this.component._options);
		this.validateValue(this.component._value);
	}
}
