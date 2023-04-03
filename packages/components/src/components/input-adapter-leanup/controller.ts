import { Generic } from '@a11y-ui/core';
import { getExperimalMode } from '../../utils/dev.utils';
import { watchBoolean } from '../../utils/prop.validators';
import { Props, Watches } from './types';

const EXPERIMENTAL_MODE = getExperimalMode();

export class ControlledInputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;
	protected readonly name: string;
	protected readonly host?: HTMLElement;

	public readonly formAssociated?: HTMLInputElement;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		this.component = component;
		this.name = name;
		this.host = host;
		if (EXPERIMENTAL_MODE) {
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
	}

	protected readonly syncFormAssociatedName = () => {
		if (EXPERIMENTAL_MODE) {
			this.formAssociated?.setAttribute('name', (this.component.state._name as string) || (this.component.state._id as string));
		}
	};

	public readonly setFormAssociatedValue = (value: string | null = null) => {
		if (EXPERIMENTAL_MODE) {
			this.formAssociated?.setAttribute('value', value as string);
		}
	};

	public validateAlert(value?: boolean): void {
		watchBoolean(this.component, '_alert', value);
	}

	public validateTouched(value?: boolean): void {
		watchBoolean(this.component, '_touched', value);
	}

	public componentWillLoad(): void {
		this.validateAlert(this.component._alert);
		this.validateTouched(this.component._touched);
	}
}
