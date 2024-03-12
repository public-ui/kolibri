import type { Generic } from 'adopted-style-sheets';

import { NamePropType, validateName } from '../../types/props/name';
import { PropSyncValueBySelector, SyncValueBySelectorPropType } from '../../types/props/sync-value-by-selector';
import { StencilUnknown } from '../../types/unknown';
import { devHint, devWarning } from '../../utils/a11y.tipps';
import { getExperimentalMode } from '../../utils/dev.utils';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	name: string;
} & PropSyncValueBySelector;
type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

type HTMLInputFileElement = HTMLInputElement & {
	files: FileList;
};

const isAssociatedTagName = (name?: string): boolean =>
	name === 'KOL-BUTTON' ||
	name === 'KOL-INPUT-CHECKBOX' ||
	name === 'KOL-INPUT-COLOR' ||
	name === 'KOL-INPUT-DATE' ||
	name === 'KOL-INPUT-EMAIL' ||
	name === 'KOL-INPUT-FILE' ||
	name === 'KOL-INPUT-NUMBER' ||
	name === 'KOL-INPUT-PASSWORD' ||
	name === 'KOL-INPUT-RADIO' ||
	name === 'KOL-INPUT-RANGE' ||
	name === 'KOL-INPUT-TEXT' ||
	name === 'KOL-SELECT' ||
	name === 'KOL-TEXTAREA';

export class AssociatedInputController implements Watches {
	private readonly experimentalMode = getExperimentalMode();

	protected readonly component: Generic.Element.Component & Props;
	protected readonly type: string;
	protected readonly host?: HTMLElement;

	public readonly formAssociated?: HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
	public syncToOwnInput?: HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

	public constructor(component: Generic.Element.Component & Props, type: string, host?: HTMLElement) {
		this.component = component;
		this.host = this.findHostWithShadowRoot(host);
		this.type = type;

		if (this.experimentalMode && isAssociatedTagName(this.host?.tagName)) {
			this.host?.querySelectorAll('input,select,textarea').forEach((el) => {
				this.host?.removeChild(el);
			});
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
				case 'text':
					this.formAssociated = document.createElement('input');
					this.formAssociated.setAttribute('type', this.type);
					break;
				case 'select':
					this.formAssociated = document.createElement('select');
					this.formAssociated.setAttribute('multiple', '');
					break;
				case 'textarea':
					this.formAssociated = document.createElement('textarea');
					break;
				case 'checkbox': // Checkbox use default case
				default:
					this.formAssociated = document.createElement('input');
					this.formAssociated.setAttribute('type', 'hidden');
			}
			this.formAssociated.setAttribute('aria-hidden', 'true');
			this.formAssociated.setAttribute('data-form-associated', '');
			this.formAssociated.setAttribute('hidden', '');
			this.host?.appendChild(this.formAssociated);
		}
	}

	/**
	 * The associated elements must not reside within the ShadowRoot and must
	 * reside as children in the host to be recognized by native forms.
	 */
	private findHostWithShadowRoot(host?: HTMLElement): HTMLElement | undefined {
		while (host?.shadowRoot === null && host !== document.body) {
			host = host?.parentNode as HTMLElement;
			if ((host as unknown as ShadowRoot).host) {
				host = (host as unknown as ShadowRoot).host as HTMLElement;
			}
		}
		return host;
	}

	protected setAttribute(qualifiedName: string, element?: HTMLElement, value?: string | number | boolean) {
		if (this.experimentalMode) {
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
			devHint(` The form field (${this.type}) must have a name attribute to be form-associated. Please define the _name attribute.`);
		}
		const strValue = this.tryToStringifyValue(rawValue);
		this.syncValue(rawValue, strValue, this.formAssociated);
		this.syncValue(rawValue, strValue, this.syncToOwnInput);
	};

	private syncValue(
		rawValue: StencilUnknown,
		strValue: string | null,
		associatedElement?: HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
	) {
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

	public validateName(value?: NamePropType): void {
		validateName(this.component, value, {
			hooks: {
				afterPatch: () => {
					this.setAttribute('name', this.formAssociated, this.component.state._name as string);
				},
			},
		});
		if (typeof value === 'undefined') {
			devHint(
				`Ein Name am Eingabefeldern oder Schalter ist nicht zwingend erforderlich, kann aber für die Autocomplete-Funktion und für das statische Versenden des Eingabefeldes relevant sein.`,
			);
		}
	}

	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		if (this.experimentalMode && typeof value === 'string') {
			const input = document.querySelector(value) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
			if (input /* SSR instanceof HTMLInputElement */) {
				this.syncToOwnInput = input;
			}
		}
	}

	public componentWillLoad(): void {
		this.validateName(this.component._name);
		this.validateSyncValueBySelector(this.component._syncValueBySelector);
	}
}
