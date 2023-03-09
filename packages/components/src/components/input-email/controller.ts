import { Generic } from '@a11y-ui/core';
import { watchBoolean } from '../../utils/prop.validators';
import { InputTextEmailController } from '../input-text/controller';
import { Props, Watches } from './types';

export class InputEmailController extends InputTextEmailController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateMultiple(value?: boolean): void {
		watchBoolean(this.component, '_multiple', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateMultiple(this.component._multiple);
	}
}
