import type { Generic } from 'adopted-style-sheets';
import type { LabelPropType, IconProps } from '../../schema';
import { validateLabel, watchString } from '../../schema';

export class IconController {
	protected readonly component: Generic.Element.Component & IconProps;

	public constructor(component: Generic.Element.Component & IconProps) {
		this.component = component;
	}

	public validateIcons(value?: string): void {
		watchString(this.component, '_icons', value, { required: true });
	}

	public validateLabel(value?: LabelPropType): void {
		validateLabel(this.component, value, { required: true });
	}

	public componentWillLoad(): void {
		this.validateIcons(this.component._icons);
		this.validateLabel(this.component._label);
	}
}
