import type {
	AutoCompletePropType,
	InputNumberProps,
	InputNumberWatches,
	NumberString,
	ReadOnlyPropType,
	RequiredPropType,
	SuggestionsPropType,
} from '../../schema';
import { validateReadOnly, validateRequired, validateSuggestions } from '../../schema';
import { validateAutoComplete } from '../../schema/props/auto-complete';
import { type PlaceholderPropType, validatePlaceholder } from '../../schema/props/placeholder';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class InputNumberController extends InputIconController implements InputNumberWatches {
	protected readonly component: Generic.Element.Component & InputNumberProps;

	public constructor(component: Generic.Element.Component & InputNumberProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAutoComplete(value?: AutoCompletePropType): void {
		validateAutoComplete(this.component, value);
	}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public validateMax(value?: number | NumberString): void {
		this.validateNumber('_max', value);
	}

	public validateMin(value?: number | NumberString): void {
		this.validateNumber('_min', value);
	}

	public validatePlaceholder(value?: PlaceholderPropType): void {
		validatePlaceholder(this.component, value);
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

	public validateValue(value?: number | NumberString | null): void {
		this.validateNumber('_value', value);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	public validateAriaDetails(): void {
		// no-op — resolution is handled by ElementInternals
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateMax(this.component._max);
		this.validateMin(this.component._min);
		this.validateSuggestions(this.component._suggestions);
		this.validatePlaceholder(this.component._placeholder);
		this.validateReadOnly(this.component._readOnly);
		this.validateRequired(this.component._required);
		this.validateStep(this.component._step);
		this.validateValue(this.component._value);
	}
}
