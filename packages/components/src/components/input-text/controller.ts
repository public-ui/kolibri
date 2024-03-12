import type { Generic } from 'adopted-style-sheets';

import { Stringified } from '../../types/common';
import { InputTextType } from '../../types/input/control/text';
import { validateHasCounter } from '../../types/props/has-counter';
import { PropLabelWithExpertSlot } from '../../types/props/label';
import { PropSuggestions, SuggestionsPropType, validateSuggestions } from '../../types/props/suggestions';
import { watchValidator } from '../../utils/prop.validators';
import { InputPasswordController } from '../input-password/controller';
import { Props as InputTextProps, Watches as InputTextWatches } from './types';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	id: string;
	list: Stringified<string[]>;
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

	/**
	 * @deprecated remains to satisfy `Watches` interface
	 */
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public validateList(): void {}

	public validateSuggestions(value?: SuggestionsPropType): void {
		validateSuggestions(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateSuggestions(this.component._suggestions || this.component._list);
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
			(value): boolean => typeof value === 'string' && (value === 'text' || value === 'search' || value === 'url' || value === 'tel'),
			new Set(['String {text, search, url, tel}']),
			value,
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
