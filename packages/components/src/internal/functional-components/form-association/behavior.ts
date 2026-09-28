import { getOptions } from '../../../core/bootstrap';
import type { StencilUnknown } from '../../../schema';
import { devHint, devWarning, getExperimentalMode } from '../../../schema';
import type { HostInternals } from '../../../utils/aria-labelledby';
import { attachInternals, resolveTargets } from '../../../utils/aria-labelledby';
import { ariaDetailsProp, nameProp } from '../../props';
import { BaseBehavior } from '../base-behavior';
import type { BehaviorInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { FormAssociationApi, FormAssociationType } from './api';
import { formAssociationPropsConfig } from './api';

type FormAssociatedElement = HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

type HTMLInputFileElement = HTMLInputElement & {
	files: FileList;
};

const ASSOCIATED_TAG_NAMES = new Set([
	'KOL-BUTTON',
	'KOL-COMBOBOX',
	'KOL-INPUT-CHECKBOX',
	'KOL-INPUT-COLOR',
	'KOL-INPUT-DATE',
	'KOL-INPUT-EMAIL',
	'KOL-INPUT-FILE',
	'KOL-INPUT-NUMBER',
	'KOL-INPUT-PASSWORD',
	'KOL-INPUT-RADIO',
	'KOL-INPUT-RANGE',
	'KOL-INPUT-TEXT',
	'KOL-SELECT',
	'KOL-SINGLE-SELECT',
	'KOL-TEXTAREA',
]);

/** Tells the developer that a form field without a name cannot take part in autocomplete and static submission. */
export const hintMissingName = (): void => {
	devHint(
		`A name on input fields or switches is not strictly required, but it might be relevant for the autocomplete function and for the static submission of the input field.`,
	);
};

type FormAssociationOptions = {
	/** The custom element; for a `shadow: false` element the next ancestor with a shadow root is used. */
	host?: Element;
	type: FormAssociationType;
	/**
	 * The name the element has when it is constructed. The hidden form element is only created
	 * when it is set, a name applied later does not create it.
	 */
	name?: string;
};

/**
 * Lets a component take part in native forms without being form-associated itself.
 *
 * With `register(…, { reflectInputValues: true })` it appends a hidden native element to the light
 * DOM of the host and mirrors the value into it; the element's `name` is only set in experimental
 * mode. Also in experimental mode, `syncValueBySelector` mirrors the value into a native control
 * outside the component. `ariaDetails` is resolved into `ElementInternals.ariaDetailsElements`,
 * because an IDREF cannot cross the shadow boundary.
 *
 * Construct it in the constructor of the concrete element, after `super()`: `@Element()` is only
 * populated there, and the hidden element depends on the name known at that point.
 */
export class FormAssociationBehavior extends BaseBehavior<FormAssociationApi> implements BehaviorInterface<FormAssociationApi> {
	private readonly experimentalMode = getExperimentalMode();
	private readonly type: FormAssociationType;

	/** The host whose light DOM holds the hidden form element. */
	public readonly host?: Element;
	public readonly internals?: HostInternals;
	public readonly formAssociated?: FormAssociatedElement;
	public syncToOwnInput?: FormAssociatedElement;

	public constructor(stateAccess: StateAccess<FormAssociationApi>, { host, type, name }: FormAssociationOptions) {
		super(stateAccess, formAssociationPropsConfig);
		this.host = this.findHostWithShadowRoot(host);
		this.type = type;
		this.internals = attachInternals(this.host);

		if (getOptions()?.reflectInputValues && ASSOCIATED_TAG_NAMES.has(this.host?.tagName ?? '') && name) {
			this.host?.querySelectorAll('input,select,textarea').forEach((el) => {
				this.host?.removeChild(el);
			});
			this.formAssociated = this.createFormAssociatedElement();
			this.formAssociated.setAttribute('data-form-associated', '');
			this.formAssociated.setAttribute('hidden', '');
			this.host?.appendChild(this.formAssociated);
		}
	}

	public componentWillLoad(props: ResolvedInputProps<FormAssociationApi>): void {
		this.watchName(props.name);
		this.watchSyncValueBySelector(props.syncValueBySelector);
		this.watchAriaDetails(props.ariaDetails);
	}

	public watchAriaDetails(value?: string): void {
		ariaDetailsProp.apply(value, (v) => this.setRenderProp('ariaDetails', v));
		const elements = resolveTargets(this.host, value);
		if (this.internals) {
			try {
				this.internals.ariaDetailsElements = elements;
			} catch {
				// ariaDetailsElements is not supported in this environment — silently skip.
			}
		}
	}

	public watchName(value?: string): void {
		nameProp.apply(value, (v) => {
			this.setRenderProp('name', v);
			this.setNameAttribute(v);
		});
		if (typeof value === 'undefined') {
			hintMissingName();
		}
	}

	public watchSyncValueBySelector(value?: string): void {
		if (this.experimentalMode && typeof value === 'string') {
			this.setRenderProp('syncValueBySelector', value);
			const input = document.querySelector(value) as FormAssociatedElement;
			if (input /* SSR instanceof HTMLInputElement */) {
				this.syncToOwnInput = input;
			}
		}
	}

	/** Sets the `name` attribute of the hidden form element; only in experimental mode. */
	public setNameAttribute(value?: string): void {
		this.setAttribute('name', this.formAssociated, value);
	}

	/**
	 * Mirrors the value into the hidden form element and into the `syncValueBySelector` target.
	 *
	 * @see https://github.com/public-ui/kolibri/discussions/2821
	 */
	public readonly setFormAssociatedValue = (rawValue: StencilUnknown): void => {
		const name = this.formAssociated?.getAttribute('name');
		if (name === null || name === '') {
			devHint(` The form field (${this.type}) must have a name attribute to be form-associated. Please define the _name attribute.`);
		}
		const strValue = this.tryToStringifyValue(rawValue);
		this.syncValue(rawValue, strValue, this.formAssociated);
		this.syncValue(rawValue, strValue, this.syncToOwnInput);
	};

	private createFormAssociatedElement(): FormAssociatedElement {
		switch (this.type) {
			case 'button':
			case 'color':
			case 'date':
			case 'email':
			case 'file':
			case 'number':
			case 'password':
			case 'radio':
			case 'range':
			case 'text': {
				const input = document.createElement('input');
				input.setAttribute('type', this.type);
				return input;
			}
			case 'select': {
				const select = document.createElement('select');
				select.setAttribute('multiple', '');
				return select;
			}
			case 'textarea':
				return document.createElement('textarea');
			default: {
				const input = document.createElement('input');
				input.setAttribute('type', 'hidden');
				return input;
			}
		}
	}

	/**
	 * The associated elements must not reside within the ShadowRoot and must
	 * reside as children in the host to be recognized by native forms.
	 */
	private findHostWithShadowRoot(host?: Element): Element | undefined {
		while (host?.shadowRoot === null && host !== document.body) {
			const parent = host?.parentNode;
			if (parent instanceof ShadowRoot) {
				host = parent.host;
			} else {
				host = parent instanceof Element ? parent : undefined;
			}
		}
		return host;
	}

	private setAttribute(qualifiedName: string, element?: HTMLElement, value?: string | number | boolean): void {
		if (this.experimentalMode) {
			try {
				value = typeof value === 'object' && value !== null ? JSON.stringify(value) : value;
				if (typeof value === 'boolean' || typeof value === 'number' || typeof value === 'string') {
					element?.setAttribute(qualifiedName, `${value as string}`);
				} else {
					throw new Error(`Invalid value type: ${typeof value}`);
				}
			} catch {
				element?.removeAttribute(qualifiedName);
			}
		}
	}

	/**
	 * `setAttribute` needs a string. An object value is stringified as JSON.
	 *
	 * TODO: A cyclic object value cannot be stringified; it needs a custom JSON.stringify from outside.
	 */
	private tryToStringifyValue(value: StencilUnknown): string | null {
		try {
			return typeof value === 'object' && value !== null ? JSON.stringify(value).toString() : value === null || value === undefined ? null : value.toString();
		} catch (e) {
			devWarning(`The form field raw value is not able to stringify! ${e as string}`);
			return '';
		}
	}

	private syncValue(rawValue: StencilUnknown, strValue: string | null, associatedElement?: FormAssociatedElement): void {
		if (associatedElement) {
			switch (this.type) {
				case 'file':
					(associatedElement as HTMLInputFileElement).files = rawValue as FileList;
					break;
				case 'select':
					(associatedElement as HTMLSelectElement).querySelectorAll('option').forEach((el) => {
						(associatedElement as HTMLSelectElement).removeChild(el);
					});
					if (Array.isArray(rawValue)) {
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
				case 'radio':
					if (typeof strValue === 'string') {
						associatedElement.setAttribute('value', strValue);
						associatedElement.setAttribute('checked', '');
						associatedElement.value = strValue;
					}
					break;
				default:
					if (typeof strValue === 'string') {
						associatedElement.setAttribute('value', strValue);
						associatedElement.value = strValue;
					} else {
						associatedElement.removeAttribute('value');
						associatedElement.value = '';
					}
			}
		}
	}
}
