import { Generic } from '@a11y-ui/core';

import { StencilUnknown } from '../../components';
import { validateTouched } from '../../types/props/touched';
import { devHint, devWarning } from '../../utils/a11y.tipps';
import { getExperimentalMode } from '../../utils/dev.utils';
import { watchBoolean } from '../../utils/prop.validators';
import { Props, Watches } from './types';

const EXPERIMENTAL_MODE = getExperimentalMode();

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
	 * We need to stringify the value, for the setAttribute method.
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/attributes#value
	 *
	 * TODO: It is possible that the value are a cyclic object value. So we need a custom
	 *       JSON.stringify method from outside to convert it to string.
	 */
	private tryToStringifyValue(value: StencilUnknown): string | null {
		try {
			return typeof value === 'object' && value !== null ? JSON.stringify(value).toString() : value === null || value === undefined ? null : value.toString();
		} catch (e) {
			devWarning(`The form field raw value is not able to stringify! ${e as string}`);
			return '';
		}
	}

	/**
	 * We try to support native form-associated custom elements.
	 *
	 * @see https://github.com/public-ui/kolibri/discussions/2821
	 */
	public readonly setFormAssociatedValue = (rawValue: StencilUnknown) => {
		const name = this.formAssociated?.getAttribute('name');
		if (name === null || name === '') {
			devHint(` The form field (${this.name}) must have a name attribute to be form-associated. Please define the _name attribute.`);
		}
		const strValue = this.tryToStringifyValue(rawValue);
		this.syncValue(rawValue, strValue, this.formAssociated);
		this.syncValue(rawValue, strValue, this.syncToOwnInput);
	};

	private syncValue(rawValue: StencilUnknown, strValue: string | null, associatedElement?: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
		if (associatedElement) {
			if (typeof strValue === 'string' && strValue.length > 0) {
				associatedElement.setAttribute('value', strValue);
				switch (this.name) {
					case 'select':
						(associatedElement as HTMLSelectElement).querySelectorAll('option').forEach((el) => {
							(associatedElement as HTMLSelectElement).removeChild(el);
						});
						if (Array.isArray(rawValue) && rawValue.length > 0) {
							rawValue.forEach((rawValueItem) => {
								const strValueItem = this.tryToStringifyValue(rawValueItem as string);
								if (typeof strValueItem === 'string') {
									const option = document.createElement('option');
									option.setAttribute('value', strValueItem);
									option.setAttribute('selected', '');
									(associatedElement as HTMLSelectElement).appendChild(option);
								}
							});
						}
						break;
					case 'textarea':
						(associatedElement as HTMLTextAreaElement).innerHTML = strValue;
						break;
					default:
						(associatedElement as HTMLInputElement).value = strValue;
						break;
				}
			} else {
				associatedElement.removeAttribute('value');
			}
		}
	}

	public validateAlert(value?: boolean): void {
		watchBoolean(this.component, '_alert', value);
	}

	public validateSyncValueBySelector(value?: string): void {
		if (EXPERIMENTAL_MODE && typeof value === 'string') {
			const input = document.querySelector(value) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
			if (input /* SSR instanceof HTMLInputElement */) {
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
