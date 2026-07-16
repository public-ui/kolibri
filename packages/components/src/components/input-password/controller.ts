import type {
	AutoCompletePropType,
	HasCounterPropType,
	InputPasswordProps,
	InputPasswordWatches,
	MaxLengthBehaviorPropType,
	PlaceholderPropType,
	ReadOnlyPropType,
	RequiredPropType,
	VariantClassNamePropType,
} from '../../schema';
import {
	validateHasCounter,
	validateMaxLength,
	validatePattern,
	validatePlaceholder,
	validateReadOnly,
	validateRequired,
	validateVariantClassName,
	watchString,
} from '../../schema';
import { validateAutoComplete } from '../../schema/props/auto-complete';
import { validateMaxLengthBehavior } from '../../schema/props/max-length-behavior';
import { validateVisibilityToggle, type VisibilityTogglePropType } from '../../schema/props/visibility-toggle';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';

export class InputPasswordController extends InputIconController implements InputPasswordWatches {
	protected readonly component: Generic.Element.Component & InputPasswordProps;

	public constructor(component: Generic.Element.Component & InputPasswordProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAutoComplete(value?: AutoCompletePropType): void {
		validateAutoComplete(this.component, value);
	}

	public validateHasCounter(value?: HasCounterPropType): void {
		validateHasCounter(this.component, value);
	}

	public validateMaxLengthBehavior(value?: MaxLengthBehaviorPropType): void {
		validateMaxLengthBehavior(this.component, value);
	}

	public validateMaxLength(value?: number): void {
		validateMaxLength(this.component, value);
	}

	public validatePattern(value?: string): void {
		validatePattern(this.component, value);
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

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	public validateVariant(value?: VariantClassNamePropType): void {
		validateVariantClassName(this.component, value);
	}

	public validateVisibilityToggle(value?: VisibilityTogglePropType): void {
		validateVisibilityToggle(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateHasCounter(this.component._hasCounter);
		this.validateMaxLengthBehavior(this.component._maxLengthBehavior);
		this.validateMaxLength(this.component._maxLength);
		this.validatePattern(this.component._pattern);
		this.validatePlaceholder(this.component._placeholder);
		this.validateReadOnly(this.component._readOnly);
		this.validateRequired(this.component._required);
		this.validateValue(this.component._value);
		this.validateVariant(this.component._variant);
		this.validateVisibilityToggle(this.component._visibilityToggle);
	}
}
