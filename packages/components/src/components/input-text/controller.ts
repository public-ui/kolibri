import type { InputTextProps, InputTextType, InputTextWatches, PropLabelWithExpertSlot, PropSuggestions, SuggestionsPropType } from '@public-ui/schema';
import { inputTextTypeOptions, validateHasCounter, validateSuggestions, watchValidator } from '@public-ui/schema';

import { InputPasswordController } from '../input-password/controller';

import type { Generic } from 'adopted-style-sheets';
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
