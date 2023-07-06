import { Generic } from '@a11y-ui/core';

import { validateTouched } from '../../types/props/touched';
import { getExperimalMode } from '../../utils/dev.utils';
import { watchBoolean } from '../../utils/prop.validators';
import { Props, Watches } from './types';

const EXPERIMENTAL_MODE = getExperimalMode();

function syncElementAttribute(qualifiedName: string, element?: HTMLElement, value?: string | number | boolean) {
	if (EXPERIMENTAL_MODE) {
		if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
			element?.setAttribute(qualifiedName, `${value as string}`);
		} else {
			element?.removeAttribute(qualifiedName);
		}
	}
}

export class ControlledInputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;
	protected readonly name: string;
	protected readonly host?: HTMLElement;

	public readonly formAssociated?: HTMLInputElement;
	public syncToOwnInput?: HTMLInputElement;

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

	/**
	 * We try to support native form-associated custom elements.
	 *
	 * @see https://github.com/public-ui/kolibri/discussions/2821
	 */
	protected readonly syncFormAssociatedName = () => {
		syncElementAttribute('id', this.formAssociated, this.component.state._id as string);
		syncElementAttribute('name', this.formAssociated, this.component.state._name as string);
		syncElementAttribute('value', this.formAssociated, this.component.state._value as string);
	};

	public readonly setFormAssociatedValue = (value: string | null = null) => {
		syncElementAttribute('value', this.formAssociated, value as string);
		syncElementAttribute('value', this.syncToOwnInput, value as string);
	};

	public validateAlert(value?: boolean): void {
		watchBoolean(this.component, '_alert', value);
	}

	public validateSyncValueBySelector(value?: string): void {
		if (EXPERIMENTAL_MODE && typeof value === 'string') {
			const input = document.querySelector(value);
			if (input instanceof HTMLInputElement) {
				this.syncToOwnInput = input;
			}
		}
	}

	public validateTouched(value?: boolean): void {
		validateTouched(this.component, value);
	}

	public componentWillLoad(): void {
		this.validateAlert(this.component._alert);
		this.validateSyncValueBySelector(this.component._syncValueBySelector);
		this.validateTouched(this.component._touched);
	}
}
