import type {
	MultiSelectProps,
	MultiSelectWatches,
	Option,
	OptionsPropType,
	PlaceholderPropType,
	RequiredPropType,
	SelectOption,
	StencilUnknown,
	Stringified,
	W3CInputValue,
} from '../../schema';
import { validateOptions, validatePlaceholder, validateRequired, watchBoolean, watchJsonArrayString, watchNumber } from '../../schema';

import { InputIconController } from '../@deprecated/input/controller-icon';
import { fillKeyOptionMap } from '../input-radio/controller';

import type { Generic } from 'adopted-style-sheets';

export class MultiSelectController extends InputIconController implements MultiSelectWatches {
	protected readonly component: Generic.Element.Component & MultiSelectProps;
	private readonly keyOptionMap = new Map<string, Option<string>>();

	public constructor(component: Generic.Element.Component & MultiSelectProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	protected readonly afterPatchOptions = (value: unknown, _state: Record<string, unknown>, _component: Generic.Element.Component, key: string): void => {
		if (key === '_value') {
			this.setFormAssociatedValue(value as StencilUnknown[]);
		}
	};

	protected readonly beforePatchOptions = (_value: unknown, nextState: Map<string, unknown>): void => {
		const options = nextState.has('_options') ? nextState.get('_options') : this.component.state._options;
		const rawValue = nextState.has('_value') ? nextState.get('_value') : this.component.state._value;
		if (!Array.isArray(rawValue)) {
			nextState.set('_value', typeof rawValue === 'undefined' ? [] : [rawValue]);
		}
		if (Array.isArray(options) && options.length > 0) {
			this.keyOptionMap.clear();
			fillKeyOptionMap(this.keyOptionMap, options as SelectOption<W3CInputValue>[]);
			const value = (nextState.has('_value') ? nextState.get('_value') : this.component.state._value) as StencilUnknown[];
			const filteredValues = value.filter((item) => (options as Option<StencilUnknown>[]).some((option) => option.value === item));
			nextState.set('_value', filteredValues);
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

	public validateRequired(value?: RequiredPropType): void {
		validateRequired(this.component, value);
	}

	public validateValue(value?: Stringified<StencilUnknown[]>): void {
		watchJsonArrayString(this.component, '_value', () => true, value, undefined, {
			hooks: {
				afterPatch: this.afterPatchOptions,
				beforePatch: this.beforePatchOptions,
			},
		});
	}

	public validatePlaceholder(value?: PlaceholderPropType): void {
		validatePlaceholder(this.component, value);
	}

	public validateHideClearButton(value?: boolean): void {
		watchBoolean(this.component, '_hideClearButton', value);
	}

	public validateRows(value?: number): void {
		watchNumber(this.component, '_rows', value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateOptions(this.component._options);
		this.validateRequired(this.component._required);
		this.validateValue(this.component._value);
		this.validatePlaceholder(this.component._placeholder);
		this.validateHideClearButton(this.component._hideClearButton);
		this.validateRows(this.component._rows);
	}
}
