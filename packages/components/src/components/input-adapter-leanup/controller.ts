import { Generic } from '@a11y-ui/core';

import { validateTouched } from '../../types/props/touched';
import { devHint } from '../../utils/a11y.tipps';
import { getExperimalMode } from '../../utils/dev.utils';
import { watchBoolean } from '../../utils/prop.validators';
import { Props, Watches } from './types';

const EXPERIMENTAL_MODE = getExperimalMode();

export class ControlledInputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;
	protected readonly name: string;
	protected readonly host?: HTMLElement;

	public readonly formAssociated?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
	public syncToOwnInput?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		this.component = component;
		this.name = name;
		this.host = host;
		if (EXPERIMENTAL_MODE) {
			this.host?.querySelectorAll('input,select,textarea').forEach((el) => {
				this.host?.removeChild(el);
			});
			switch (this.name) {
				case 'select':
					this.formAssociated = document.createElement('select');
					this.formAssociated.setAttribute('multiple', '');
					break;
				case 'textarea':
					this.formAssociated = document.createElement('textarea');
					break;
				default:
					this.formAssociated = document.createElement('input');
					this.formAssociated.setAttribute('type', 'hidden');
					break;
			}
			this.formAssociated.setAttribute('aria-hidden', 'true');
			this.formAssociated.setAttribute('data-form-associated', '');
			this.formAssociated.setAttribute('hidden', '');
			this.host?.appendChild(this.formAssociated);
		}
	}

	protected setAttribute(qualifiedName: string, element?: HTMLElement, value?: string | number | boolean) {
		if (EXPERIMENTAL_MODE) {
			try {
				value = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
				if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
					element?.setAttribute(qualifiedName, `${value as string}`);
				} else {
					throw new Error(`Invalid value type: ${typeof value}`);
				}
			} catch (e) {
				element?.removeAttribute(qualifiedName);
			}
		}
	}

	/**
	 * We try to support native form-associated custom elements.
	 *
	 * @see https://github.com/public-ui/kolibri/discussions/2821
	 */
	public readonly setFormAssociatedValue = (value: string | null = null) => {
		const name = this.formAssociated?.getAttribute('name');
		if (name === null || name === '') {
			devHint(` The form field (${this.name}) must have a name attribute to be form-associated. Please define the _name attribute.`);
		}

		try {
			/**
			 * We need to stringify the value, for the setAttribute method.
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
			 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes#value
			 *
			 * TODO: It is possible that the value are a cyclic object value. So we need a custom
			 *       JSON.stringify method from outside to convert it to string.
			 *
			 *       The following code is to complex!
			 */
			const val = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
			if (typeof val === 'boolean' || typeof val === 'number' || typeof val === 'string') {
				this.formAssociated?.setAttribute('value', val);
				this.syncToOwnInput?.setAttribute('value', val);
			} else {
				// This exception jump over many lines of code.
				throw new Error(`Invalid value type: ${typeof val}`);
			}
			switch (this.name) {
				case 'select':
					if (this.formAssociated) {
						(this.formAssociated as HTMLSelectElement).querySelectorAll('option').forEach((el) => {
							(this.formAssociated as HTMLSelectElement).removeChild(el);
						});
						if (Array.isArray(value) && value.length > 0) {
							value.forEach((val) => {
								const option = document.createElement('option');
								option.setAttribute('value', val as string);
								option.setAttribute('selected', '');
								(this.formAssociated as HTMLSelectElement).appendChild(option);
							});
						}
					}
					if (this.syncToOwnInput) {
						(this.syncToOwnInput as HTMLSelectElement).querySelectorAll('option').forEach((el) => {
							(this.syncToOwnInput as HTMLSelectElement).removeChild(el);
						});
					}
					break;
				case 'textarea':
					if (this.formAssociated) {
						(this.formAssociated as HTMLTextAreaElement).innerHTML = value as string;
					}
					if (this.syncToOwnInput) {
						(this.syncToOwnInput as HTMLTextAreaElement).innerHTML = value as string;
					}
					break;
				default:
					if (this.formAssociated) {
						(this.formAssociated as HTMLInputElement).value = value as string;
					}
					if (this.syncToOwnInput) {
						(this.syncToOwnInput as HTMLInputElement).value = value as string;
					}
					break;
			}
		} catch (e) {
			this.formAssociated?.removeAttribute('value');
			this.syncToOwnInput?.removeAttribute('value');
		}
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
