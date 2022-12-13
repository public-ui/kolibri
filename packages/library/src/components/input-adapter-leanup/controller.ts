import { Generic } from '@public-ui/core';
import { watchBoolean } from '../../utils/prop.validators';
import { Props, Watches } from './types';

export class ControlledInputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;
	protected readonly name: string;
	protected readonly host?: HTMLElement;

	public readonly formAssociated: HTMLInputElement;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		this.component = component;
		this.name = name;
		this.host = host;
		this.formAssociated = document.createElement('input');
		this.formAssociated.setAttribute('type', 'hidden');
		const children = this.host?.children || [];
		for (let i = 0; i < children.length; i++) {
			if (this.host?.children[i].tagName === 'INPUT') {
				this.host?.removeChild(this.host?.children[i]);
			}
		}
		this.host?.appendChild(this.formAssociated);
	}

	protected readonly syncFormAssociated = () => {
		this.formAssociated.setAttribute('name', (this.component.state._name as string) || (this.component.state._id as string));
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateAlert(value?: boolean): void {
		watchBoolean(this.component, '_alert', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateTouched(value?: boolean): void {
		watchBoolean(this.component, '_touched', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAlert(this.component._alert);
		this.validateTouched(this.component._touched);
	}
}
