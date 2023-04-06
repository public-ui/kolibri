import { watchJsonArrayString, watchValidator } from '../../utils/prop.validators';
import { InputPasswordController } from '../input-password/controller';
import { Props as InputTextProps, Watches as InputTextWatches } from './types';

import { Generic } from '@a11y-ui/core';
import { InputTextType } from '../../types/input/control/text';
import { Stringified } from '../../types/common';

type RequiredProps = unknown;
type OptionalProps = {
	id: string;
	list: Stringified<string[]>;
};
type InputTextEmailProps = Generic.Element.Members<RequiredProps, OptionalProps>;
type InputTextEmailWatches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

export class InputTextEmailController extends InputPasswordController implements InputTextEmailWatches {
	protected readonly component: Generic.Element.Component & InputTextEmailProps;

	public constructor(component: Generic.Element.Component & InputTextEmailProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateList(value?: Stringified<string[]>): void {
		watchJsonArrayString(this.component, '_list', (item: string) => typeof item === 'string', value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateList(this.component._list);
	}
}

export class InputTextController extends InputTextEmailController implements InputTextWatches {
	protected readonly component: Generic.Element.Component & InputTextProps;

	public hasError = false;
	public hasList = false;

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
			value
		);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateType(this.component._type);
	}
}
