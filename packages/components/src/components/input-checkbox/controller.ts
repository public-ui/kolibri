import type {
	CheckedPropType,
	IndeterminatePropType,
	InputCheckboxIconsProp,
	InputCheckboxIconsPropType,
	InputCheckboxIconsState,
	InputCheckboxProps,
	InputCheckboxVariantPropType,
	InputCheckboxWatches,
	LabelAlignPropType,
	StencilUnknown,
} from '../../schema';
import { isString, setState, validateChecked, validateIndeterminate, validateLabelAlign, validateVariantInputCheckbox, watchValidator } from '../../schema';

import { InputCheckboxRadioController } from '../input-radio/controller';

import type { Generic } from 'adopted-style-sheets';
export class InputCheckboxController extends InputCheckboxRadioController implements InputCheckboxWatches {
	protected readonly component: Generic.Element.Component & InputCheckboxProps;

	public constructor(component: Generic.Element.Component & InputCheckboxProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public readonly setFormAssociatedCheckboxValue = (value: StencilUnknown) => {
		if (this.component._checked) {
			this.setFormAssociatedValue(value);
		} else {
			this.setFormAssociatedValue(null);
		}
	};

	public validateChecked(value?: CheckedPropType): void {
		validateChecked(this.component, value);
		this.setFormAssociatedCheckboxValue(this.component.state._value as StencilUnknown);
	}

	public validateIcons(value?: InputCheckboxIconsPropType): void {
		watchValidator<unknown>(
			this.component,
			'_icons',
			(value): boolean => {
				const v = value as Record<string, unknown>;
				return typeof v === 'object' && v !== null && (isString(v.checked, 1) || isString(v.indeterminate, 1) || isString(v.unchecked, 1));
			},
			new Set(['InputCheckboxIcons']),
			value as unknown,
			{
				hooks: {
					beforePatch: (nextValue: unknown, nextState: Map<string, unknown>, component: Generic.Element.Component) => {
						nextState.set('_icons', {
							...(component.state._icons as InputCheckboxIconsState),
							...(nextValue as InputCheckboxIconsProp),
						});
					},
				},
			},
		);
	}

	public validateIndeterminate(value?: IndeterminatePropType): void {
		validateIndeterminate(this.component, value);
	}

	public validateLabelAlign(value?: LabelAlignPropType): void {
		validateLabelAlign(this.component, value);
	}

	public validateValue(value: StencilUnknown): void {
		setState(this.component, '_value', value);
		this.setFormAssociatedCheckboxValue(this.component.state._value as StencilUnknown);
	}

	public validateVariant(value?: InputCheckboxVariantPropType): void {
		validateVariantInputCheckbox(this.component, value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateChecked(this.component._checked);
		this.validateIcons(this.component._icons);
		this.validateIndeterminate(this.component._indeterminate);
		this.validateValue(this.component._value);
		this.validateVariant(this.component._variant);
		this.validateLabelAlign(this.component._labelAlign);
	}
}
