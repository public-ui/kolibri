import type { NamePropType, PropSyncValueBySelector, StencilUnknown, SyncValueBySelectorPropType } from '../../schema';
import { validateName } from '../../schema';

import type { Generic } from 'adopted-style-sheets';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { FormAssociationType } from '../../internal/functional-components/form-association/api';
import { FormAssociationBehavior, hintMissingName } from '../../internal/functional-components/form-association/behavior';
import { validateAriaDetails } from '../../schema/props/aria-details';
import type { HostInternals } from '../../utils/aria-labelledby';

type RequiredProps = NonNullable<unknown>;
type OptionalProps = {
	name: string;
} & PropSyncValueBySelector;
type Props = Generic.Element.Members<RequiredProps, OptionalProps>;
type Watches = Generic.Element.Watchers<RequiredProps, OptionalProps>;

/**
 * Form association of the legacy form fields. The native form participation lives in
 * `FormAssociationBehavior`; this controller keeps the legacy state bag in sync (`_name`,
 * `_ariaDetails`) for the state wrappers that read it.
 */
export class AssociatedInputController implements Watches {
	private readonly formAssociation: FormAssociationBehavior;

	protected readonly component: Generic.Element.Component & Props;
	protected readonly host?: Element;

	public constructor(component: Generic.Element.Component & Props, type: string, host?: Element) {
		this.component = component;
		this.formAssociation = new FormAssociationBehavior(BaseWebComponent.stateLess, {
			host,
			type: type as FormAssociationType,
			name: component._name,
		});
		this.host = this.formAssociation.host;
	}

	public get internals(): HostInternals | undefined {
		return this.formAssociation.internals;
	}

	public get formAssociated(): HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined {
		return this.formAssociation.formAssociated;
	}

	public get syncToOwnInput(): HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | undefined {
		return this.formAssociation.syncToOwnInput;
	}

	public readonly setFormAssociatedValue = (rawValue: StencilUnknown): void => {
		this.formAssociation.setFormAssociatedValue(rawValue);
	};

	public validateName(value?: NamePropType): void {
		validateName(this.component, value, {
			hooks: {
				afterPatch: () => {
					this.formAssociation.setNameAttribute(this.component.state._name as string);
				},
			},
		});
		if (typeof value === 'undefined') {
			hintMissingName();
		}
	}

	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.formAssociation.watchSyncValueBySelector(value);
	}

	public validateAriaDetails(value?: string): void {
		validateAriaDetails(this.component, this.host, this.internals, value);
	}

	public componentWillLoad(): void {
		this.validateName(this.component._name);
		this.validateSyncValueBySelector(this.component._syncValueBySelector);
	}
}
