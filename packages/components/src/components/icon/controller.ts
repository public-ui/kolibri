import type { Generic } from 'adopted-style-sheets';
import type { LabelPropType, IconProps, IconWatches } from '../../schema';
import { validateLabel, watchString } from '../../schema';

type Component = Generic.Element.Component & IconProps;

export class IconController implements IconWatches {
	protected readonly component: Component;

	public constructor(component: Component) {
		this.component = component;
	}

	public validateIcons(value?: string): void {
		watchString(this.component, '_icons', value, { required: true });
	}

	public validateLabel(value?: LabelPropType): void {
		validateLabel(this.component, value, { required: true, defaultValue: '' });
	}

	public componentWillLoad(): void {
		this.validateIcons(this.component._icons);
		this.validateLabel(this.component._label);
	}
}
