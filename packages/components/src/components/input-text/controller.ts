import { Generic } from '@a11y-ui/core';
import { InputTextType, inputTextTypeOptions } from '../../types/input/control/text';
import { validateHasCounter } from '../../types/props/has-counter';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropSuggestions, SuggestionsPropType, validateSuggestions } from '../../types/props/suggestions';
import { watchValidator } from '../../utils/prop.validators';
import { InputPasswordController } from '../input-password/controller';
import { Props as InputTextProps, Watches as InputTextWatches } from './types';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	id: string;
} & PropLabelWithExpertSlot &
	PropSuggestions;
type InputTextEmailProps = Generic.Element.Members<RequiredProps, OptionalProps>;
type InputTextEmailWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export class InputTextEmailController extends InputPasswordController implements InputTextEmailWatches {
	protected readonly component: Generic.Element.Component & InputTextEmailProps;

	public constructor(component: Generic.Element.Component & InputTextEmailProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateSuggestions(this.component._suggestions);
	}
}

export class InputTextController extends InputTextEmailController implements InputTextWatches {
	protected readonly component: Generic.Element.Component & InputTextProps;

	public hasError = false;

	public constructor(component: Generic.Element.Component & InputTextProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateType(value?: InputTextType): void {
		watchValidator(
			this.component,
			'_type',
			(value): boolean => typeof value === 'string' && inputTextTypeOptions.includes(value),
			new Set([`String {${inputTextTypeOptions.join(', ')}`]),
			value
		);
	}

	public validateHasCounter(value?: boolean): void {
		validateHasCounter(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateType(this.component._type);
		this.validateHasCounter(this.component._hasCounter);
	}
}
